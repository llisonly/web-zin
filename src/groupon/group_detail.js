'use strict';

var $ = require('jquery'),
    env = require('@dal/web-env'),
    api = require('./api'),
    initShare = require('@dal/web-widgets').share,
    base64 = require('js-base64').Base64,
    art = require('art-template/dist/template'),
    levelTemplate = require('./art/group_detail.art');

require('./css/main.css');
require('./css/group_detail.css');
$(document).ready(init);

function init() {
    //alert(env.isApp());
    //initShare = initShare({})
    var url = api.urlFn('/index.php?_c=groupon&_a=getGrouponDetailData');
    api.ajax({
        url:url,
        data: {
            groupon_id: env.param('groupon_id')
        }
    }).then(function (data) {
        if (data.status == true) {
            //console.log(data);
            showHtml(data);
            btnFn(data.info);
            //分享梦层
            initShare = initShare({
                text: '超实惠的团，必须搞到手' || document.title,
                image: $("img").eq(0).attr("src"),
                desc: '就差你了，快来一起抱团' || document.title,
                link: location.href
            });
            return data;
        }
    });
};

function btnFn (data) {
    $("#destination").attr('href','javascript:;').click(function () {
        var $this = $(this);
        var dataId = $this.attr("data-id");
        var datastr = [];
        if (dataId == 1) {
            //groupon_rule_id:env.param('groupon_rule_id'), //'团购规则id  必填',
            //    groupon_id: env.param('groupon_id'), //'参团id  必填 h5只能参团',
            //    quantities: env.param('quantities'), // '数量 1，写死 （数组格式用|分隔）',
            //    goods_ids: env.param('goods_ids') //'商品id， （数组格式用|分隔）'
            datastr.push('goods_id=' + data.goods_id);
            datastr.push('groupon_id=' + data.groupon_id);
            datastr.push('groupon_rule_id=' + data.groupon_rule_id);
            api.isLogin().then(function (data) {
                //return ;
                if (data.info) {
                    location.href = api.urlFn('/src/groupon/order.html?' + datastr.join("&"));
                } else {
                    api.login.loginDialog().then(function (data) {
                        if (data) {
                            location.href = api.urlFn('/src/groupon/order.html?' + datastr.join("&"));
                        }
                    });
                }
            });
        } else if (dataId == 2) {// 完成
            datastr.push('order_sn=' + data.order_sn);
            datastr.push('groupon_id=' + data.groupon_id);
            location.href = api.urlFn('/src/groupon/success.html?' + datastr.join("&"));
        } else if (dataId == 3) {// 参加过
            //分享梦层
            //alert("share")
            //alert(Object.keys(initShare()));
            if (env.isApp()) {
                $(".dal-wg-share-hint").show();
            } else {
                //alert(initShare()())
                initShare();
            }
        }else if (dataId == 4) {
            location.href = api.urlFn('/src/groupon/group.html');
        }
    });
}
art.helper('toHeadcount', function (acunt,num) {
    var str = '';
    for (var i=0; i < acunt; i++) {
        str += '<li class="li-head '+ (i<(num) ? 'li-headed':'') +'">'
            + (i==0?'<i class="group-star"></i>':'')
            + '</li>'
    }
    console.log(str, acunt, num)
    return str;
});
function showHtml (data) {
    var $dom = $(".c-content");
    $dom.html(levelTemplate(data));
    var $downTime = $("#down-times");
    if (data.info.groupon_status == 1) {
        api.timerDown($downTime.show(), $downTime.html(), $downTime.attr('time-end') - $downTime.attr('time-cur'));
    } else {
        api.timerDown($downTime.show(), $downTime.html(), 0);
    }
    $("#my-list").click(function () {
        $(this).attr("href","javascript:;");
        api.isLogin().then(function (data) {
            if (data.info) {
                location.href = api.urlFn('/src/groupon/my_list.html');
            } else {
                api.login.loginDialog().then(function (data) {
                    if (data) {
                        location.href = api.urlFn('/src/groupon/my_list.html');
                    }
                });
            }
        });
        return false;
    });
    return $dom;
}

