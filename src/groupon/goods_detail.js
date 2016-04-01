'use strict';

var $ = require('jquery'),
    env = require('@dal/web-env'),
    widgets = require('@dal/web-widgets'),
    initShare = widgets.share,
    api = require('./api'),
    levelTemplate = require('./art/goods_detail.art');

require('./css/main.css');
require('./css/goods_detail.css');

$(document).ready(init);

function init() {
    var goodsId = env.param("goods_id");
    var groupon_rule_id = env.param("groupon_rule_id");
    var url = api.urlFn('/index.php?_c=groupon&_a=getGrouponGoodsDetailData&goods_id=' + goodsId + "&groupon_rule_id=" + groupon_rule_id);
    //$("#goods-detil").prepend(showHtml(dataTest));
    initShare({
        text: document.title,
        image: $("img").eq(0).attr("src"),
        desc: '超实惠的抱抱团，一起抱吧' || document.title,
        link: location.href
    });
    api.ajax({
        url: url
    }).then(function (data) {
        if (data.status == true) {
            //console.log(data);
            showHtml(data);
            return data;
        } else {
            location.href = api.urlFn('/src/groupon/group.html')
        }
    });
}

function showHtml(data) {
    var $dom = $("#goods-detil");
    if (data.isInApp) {
        //url = 'orderconfirm://?goodsid=112914&groupon_rule_id=2&order_from=groupon'
    } else {
        //下载
    }
    $dom.prepend(levelTemplate(data));
    $("#my-list").click(function () {
        api.isLogin().then(function (data) {
            if (data.info) {
                location.href = api.urlFn('/src/groupon/my_list.html');
            } else {
                api.login.loginDialog().then(function (data){
                    if (data) {
                        location.href = api.urlFn('/src/groupon/my_list.html');
                    }
                });
            }
        });
        return false;
    });
    $("#order-btn").click(function () {
        var $this = $(this);
        api.isLogin().then(function (data) {
            if (data.info) {
                location.href = $this.attr("href");
            } else {
                api.login.loginDialog().then(function (data) {
                    if (data) {
                        location.href = $this.attr("href");
                    }
                });
            }
        });
        return false;
    });
    $("#downloadApp").click(function(){
        var str = '爷您受累，要开团就请您移驾到达令APP去';
        widgets.toast.confirm(str).then(function(res){
            if (res) {
                location.href = "http://m.daling.com";
            }
        });
        return false;
    });
    //confirm("asdf")
    return $dom;
}

function shearefn() {
    var imgUrl = $('[data-share-image]').attr('data-share-image');  // 分享后展示的一张图片
    var lineLink = location.href; // 点击分享后跳转的页面地址
    var descContent = "xx！";  // 分享后的描述信息
    var shareTitle = 'xx';  // 分享后的标题
    var appid = '';  // 应用id,如果有可以填，没有就留空

    function shareFriend() {
        WeixinJSBridge.invoke('sendAppMessage',{
            "appid": appid,
            "img_url": imgUrl,
            "img_width": "200",
            "img_height": "200",
            "link": lineLink,
            "desc": descContent,
            "title": shareTitle
        }, function (res) {
            //_report('send_msg', res.err_msg);  // 这是回调函数，必须注释掉
        });
    }
    function shareTimeline() {
        WeixinJSBridge.invoke('shareTimeline',{
            "img_url": imgUrl,
            "img_width": "200",
            "img_height": "200",
            "link": lineLink,
            "desc": descContent,
            "title": shareTitle
        }, function(res) {
            //_report('timeline', res.err_msg); // 这是回调函数，必须注释掉
        });
    }
    function shareWeibo() {
        WeixinJSBridge.invoke('shareWeibo',{
            "content": descContent,
            "url": lineLink,
        }, function(res) {
            //_report('weibo', res.err_msg);
        });
    }
    //alert("weixin");
    // 当微信内置浏览器完成内部初始化后会触发WeixinJSBridgeReady事件。
    document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
        // 发送给好友
        //alert("weixin--");
        alert(WeixinJSBridge.on)
        WeixinJSBridge.on('menu:share:appmessage', function(argv){
            alert("weixin++");
            shareFriend();
        });
        // 分享到朋友圈
        WeixinJSBridge.on('menu:share:timeline', function(argv){
            shareTimeline();
        });
        // 分享到微博
        WeixinJSBridge.on('menu:share:weibo', function(argv){
            shareWeibo();
        });
    }, false);
}
