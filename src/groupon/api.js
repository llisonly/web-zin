//exports

var $ = require('jquery'),
    env = require('@dal/web-env'),
    //base64 = require('js-base64').Base64,
    widgets = require('@dal/web-widgets'),
    login = widgets.login,
    art = require('art-template/dist/template'),
    download = widgets.download;
login.options({url:'http://m.ymall.com/groupon'});
var testUrl = 0; // 是否测试数据 1:假数据 ， 0：ajax数据
var testdata = {}; //require('./testdata');
//if ( testUrl || env.param("testdata") ) {// 是否测试数据 1:假数据 ， 0：ajax数据
//    testUrl = location.href.replace(/.*\/(\w+)\.html.*/ , function(a,b) {
//        var url = './testdata/' + b + '.js';
//        return b;
//    });
//}

var api = {};
var baseUrl = '';
env.screenMaxWidth();
function urlFn (url) {
    //if(/\?/.test(url)){
    //    url += '&daling_from=$share&groupon_id=$1'
    //}else{
    //    url += '?daling_from=share&groupon_id=1'
    //}

    if (/\/src\/groupon/.test(url)) {
        url = url.replace(/\/src\/groupon/,'.');
    }
    return baseUrl + url;
}
//env.param('groupon_id')
function timerDown (dom, str, timer, fn) {
    var time = timer>0?timer:0,s = getTwo(Math.floor(time%60)),
        m= getTwo(Math.floor(time/60%60)),
        h = Math.floor(time/60/60),
        day = Math.floor(time/60/60/24);
    if (/\$\{day\}/.test(str)) {
        h = Math.floor(h%24);
    }
    dom.html(str.replace(/\$\{(\w*)\}/g, function (a,b) {
        return eval( b );
    }));
    if (timer <= 0 ) {
        typeof(fn) == 'function' && fn();
    } else {
        setTimeout(function(){
            timerDown(dom,str,--timer,fn);
        },1000);
    }
}

function isLogin (fn) {
    var url = api.urlFn("/index.php?_c=groupon&_a=checkIsLogin");
    return api.ajax({
        url: url,
        dataType: "json"
    }).then(function (data) {
        //alert(JSON.stringify(data));
        if(testUrl){
            data = {
                code: 200,
                info: true,
                isInApp: false,
                status: true
            }
        };
        fn && fn(data);
        return data;
    });
}


api.ajax = function (obj) {
    var pormise = $.Deferred();
    var base = {
        dataType: "json",
        data: {
            daling_from : env.param("daling_from"),
            //groupon_id : env.param("groupon_id")
        }
    };
    $.extend(true, base, obj);
    if (!testUrl) {
        if (!/^http\:\/\/m./.test(base.url)){
            base.url = '/groupon' + base.url;
            //base.headers = base.headers || {};
            //base.headers["Access-Control-Allow-Origin"] = "http://m.ymall.com";
        }
        //if (/^http\:\/\/m./.test(location.href)) {
        //    base.headers = base.headers || {};
        //    base.headers["Access-Control-Allow-Origin"] = "http://m.ymall.com";
        //}
        var loading = widgets.toast.loading(10000);
        $.ajax(base).then(function (data) {
            loading.hide();
            if (data.status == false) {
                if (env.param('daling_from') == 'share') { }
                if (data.code == 302) {
                    //alert(302 + '\n' + data.info);
                    location.href = reload302();
                } else if (data.code == '5078') {
                    var loginDialog = login.loginDialog({})
                    if (!env.isApp()){
                        loginDialog.then(function (data){
                            if (data) {
                                location.reload();
                            }else {
                                location.href = urlFn('/src/groupon/group.html');
                            }
                        });
                    }
                } else {
                    widgets.toast(data.info);
                    //alert(data.info);
                    isEqualUrl() || setTimeout(function () {
                        location.href = urlFn('/src/groupon/group.html');
                    }, 2000);
                }
            }
            delCookie("is:url");
            pormise.resolve(data);
            //return data;
        });
    } else {
        pormise.resolve(testdata[testUrl]);
    }
    return pormise;
}
function getUrlName () {
    var name = location.pathname.match(/(\w+)(?:\.html)?$/);
    return name[1];
}
function locationHrefTo (str) {

}
function isEqualUrl () {
    if (getCookie("is:url") == location.href) {
        return true;
    }
    setCookie("is:url", location.href);
    return false;
}

function setCookie (name,value,expiredays) {
    var exdate=new Date();
    expiredays = expiredays || 3;
    exdate.setSeconds(exdate.getSeconds() + expiredays);
    document.cookie = name + "=" + escape(value) + ((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}
function delCookie(name) {
    setCookie (name,'',-1);
}
function getCookie(name)
{
    var arr,reg=new RegExp("(?:^|[\\s\\;]*)" + name + "\\s?=([^;]*)(;|$)?");
    if(arr=document.cookie.match(reg))
        return unescape(arr[1]);
    else
        return null;
}

function reload302 (url) {
    return location.href.replace(/(\w+)\.html/,"group_detail.html");
}
function getTwo (s) {
    return s <= 9 ? '0'+s : s;
}
art.helper('urlFn', urlFn);
art.helper('slice', function (me , start , end) {
    var endStr = '';
    if (end && me.length > end){
        endStr = '...';
    }
    return me.slice(start, end) + endStr;
});

api.template = art;
api.urlFn = urlFn;
api.isLogin = isLogin;
api.login = login;
api.timerDown = timerDown;
module.exports = api;

api.alert = function (txt) {
    alert(txt);
}