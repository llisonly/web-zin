'use strict';

var $ = require('jquery'),
    env = require('@dal/web-env'),
    api = require('./api'),
    initShare = require('@dal/web-widgets').share,
    template = api.template,
    levelTemplate = require('./art/group.art');

require('./css/main.css');
require('./css/group.css');
$(document).ready(init);

function init() {
    var url = api.urlFn('/index.php?_c=groupon&_a=getGrouponIndexData'),
        requestUserId = env.param("req_user_id");
    //$("#goods-list").html(showHtml(dataTest));
    //$("#btn-my-group").html(template.render('<a href=\"{{"/src/groupon/my_list.html" | urlFn}}\" class="click-one">我的抱抱团</a>'))
    initShare({
        text: '超多优惠的达令抱抱团，快来一起抱' || document.title,
        image: $("img").eq(0).attr("src"),
        desc: '和姐妹们一起败，才更便宜，更快乐',
        link: location.href
    });
    api.ajax({
        url: url
    }).then(function (data) {
        if (data.status == true) {
            //console.log(data);
            $(".c-content").html(showHtml(data));
            $("#btn-my-group")
                .click(function () {
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
            return data;
        }
    });
};

function showHtml(data) {
    return levelTemplate(data);
}
