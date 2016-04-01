'use strict';

var $ = require('jquery'),
    env = require('@dal/web-env'),
    api = require('./api'),
    widgets = require('@dal/web-widgets'),
    levelTemplate = require('./art/order.art'),
    isInApp = env.isApp();
    var address = require('./address.js');
    console.log(address)
require('./css/main.css');
require('./css/order.css');
initTemplate();
$(document).ready(init);
function init() {
    var paramObj = {
        groupon_rule_id:env.param('groupon_rule_id'), //'团购规则id  必填',
        groupon_id: env.param('groupon_id'), //'参团id  必填 h5只能参团',
        quantities: 1 || env.param('quantities'), // '数量 1，写死 （数组格式用|分隔）',
        goods_ids: env.param('goods_id') //'商品id， （数组格式用|分隔）'
    };
    //var $dom = $(".c-content");
    //$dom.html(showHtml(dataTest));
    //$(".ul-list label").each(function(i,dom){
    //    $(dom).attr("for", "pay0" + i).find("input[type=radio]").attr("id","pay0" + i);
    //});
    getAjaxFn(paramObj);
    //login.loginDialog()
};

function getAjaxFn (paramObj) {
    var getUrl = api.urlFn('/index.php?_c=groupon&_a=getGrouponPreOrderData');
    var data = {
        //order_sn : env.param('order_sn'), //
        order_from: 'groupon' ||env.param('daling_from'), //
        //groupon_id: env.param('groupon_id') //
    };
    data = $.extend(data, paramObj);
    console.log(data)
    var base = {
        url: getUrl,
        type : 'post',
        data :data
    };
    var getOrderObj = {
        groupon_rule_id:env.param('groupon_rule_id'), //'团购规则id  必填',
        groupon_id: env.param('groupon_id'), //'参团id  必填 h5只能参团',
        quantities: env.param('quantities'), // '数量 1，写死 （数组格式用|分隔）',
        goods_ids: env.param('goods_id') //'商品id， （数组格式用|分隔）'
    };
    //$.extend(base,{data: getOrderObj});
    api.ajax(base).then(function (data) {
        isInApp = data.isInApp;
        if (data.status == true) {
            console.log(data);
            showHtml(data);
            showCity($(".form-data-ul"));
            return data;
        }

    });
}
function submitAjaxFn () {
    var submitUrl = api.urlFn('/index.php?_c=groupon&_a=grouponWalletSubmit');
    var base = {
        url: submitUrl,
        type : 'post',
        data : {
            order_sn : env.param('order_sn'),
            //daling_from:env.param('daling_from')
        }
    };
    var submitOrderObj = {
        order_from: 'groupon' ||env.param('daling_from'), //
        consignee: '收货人',
        payment_ukey: $('input[name="payselect"]:checked').attr("ukey"),//'支付方式',
        payment_code: $('input[name="payselect"]:checked').val(),//'支付方式',
        phone_mob: '手机号码',
        region_name: $('[data-city="showcity"]').attr("region_name"),//'北京市-北京市-东城区',
        region_id : $('[data-city="showcity"] select[data-name="area"]').val(),//'110101',
        address: '详细地址',
        groupon_rule_id: env.param('groupon_rule_id'), //'团购规则id  必填',
        //groupon_id: env.param('groupon_id'), //'参团id  必填 h5只能参团',
        quantity: 1 ,//'数量 1，写死（数组格式用|分隔）',
        goods_id: env.param('goods_id') //'商品id， （数组格式用|分隔）'
    };
    //widgets.toast("提示");
    var text = $.trim($('input[submit-type="consignee"]').val());
    if (text == "") {
        widgets.toast("收货人不能为空");
        return ;
    }
    submitOrderObj.consignee = text;
    text = $('input[submit-type="phone_mob"]').val();
    if (!/^0?(?:13|14|15|18|17)\d{9}$/.test(text)) {
        widgets.toast("手机号码不正确");
        return ;
    }
    submitOrderObj.phone_mob = text;
    text = $.trim($('input[submit-type="address"]').val());
    if (text == '') {
        widgets.toast("地址不能空");
        return ;
    }
    submitOrderObj.address = text;
    if (!isInApp) {
        submitOrderObj.groupon_id = env.param('groupon_id'); //'参团id  必填 h5只能参团',
    }
    $.extend(base.data, submitOrderObj);
    //console.log(base)
    api.ajax(base).then(function(data){
        if (data.status == true) {
            console.log(data);
            var order_sn = data.info.order_sn;
            location.href = api.urlFn('/src/groupon/success.html?order_sn=' + order_sn);
            return data;
        }
        if (data.coke == 302) {
            location.href = '';
        }
        if (data.code == '5078') {
            login.loginDialog();
        } else {
            alert(data.info)
        }
    });
}

function showHtml (data) {
    var $dom = $(".c-content");
    data.info.address = data.info.address || {};
    $dom.html(levelTemplate(data));
    $(".ul-list label").each(function(i,dom) {
        $(dom).attr("for", "pay0" + i).find("input[type=radio]").attr("id","pay0" + i);
    });
    $dom.find(".order-btn").click(function(){
        submitAjaxFn();
        return false;
    });
    return $dom;
}
function initTemplate () {
    api.template.helper('postage', function(num) {
        if (num > 25) {
            return '0.00';
        }
        return '8.00';
    });
}

function showCity ($dom) {
    address = address.info;
    var province = $dom.find('[data-name="province"]'),
        city = $dom.find('[data-name="city"]'),
        area = $dom.find('[data-name="area"]');
    province.on("change", function(e) {
        city.listArr = getObjIdArr(address, this.value);
        city
            .html(getOptionStr(city.listArr))
            .trigger("change");
    }).html(getOptionStr(address));
    city.on("change", function(e) {
        area
            .html(getOptionStr(getObjIdArr(city.listArr, this.value)))
            .trigger("change");
    });
    area.on("change", function(e) {
        $dom.find("[data-city]").attr("region_name", region_name());
    });
    var region_id = $dom.find("[data-city]").attr("region_id");
    if (region_id) {
        province.val(region_id.slice(0,2)).trigger("change");
        city.val(region_id.slice(0,4)).trigger("change");
        area.val(region_id).trigger("change");
    } else {
        province.trigger("change");
    }
    function getObjIdArr (obj, id) {
        var i= 0,len = obj.length;
        for(; i < len; i++) {
            if (obj[i].id == id) {
                return obj[i].list;
            }
        }
    }
    function getOptionStr (list) {
        var optionBase = '{{each list as item}}<option value="{{item.id}}">{{item.name}}</option>{{/each}}',
            optionstr = '';//'<option value="0">请选择</option>';
        optionstr += api.template.compile(optionBase)({list:list});
        return optionstr;
    }

    function region_name () {
        return province.find('[value=' + province.val() + ']').html() + '-'
            + city.find('[value=' + city.val() + ']').html() + '-'
            + area.find('[value=' + area.val() + ']').html();
    }
}


