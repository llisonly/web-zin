'use strict';

var $ = require('jquery'),
    api = require('./api'),
    proxyUrl = api.proxyUrl,
    initShare = require('@dal/web-widgets').share,
    base64 = require('js-base64').Base64,
    levelTemplate = require('./art/index.art');

require('./css/main.css');

$(document).ready(init);

function init() {
    var requestUserId = env.param("req_user_id");
    if (!requestUserId) {
        alert("用户不存在");
    }
    return $.ajax({
        url: proxyUrl,
        type: "post",
        data: "data=" + JSON.stringify({
            url : api.serviceUrl + "user/user_level_desc.do",
            req_user_id : requestUserId
        })
    }).then(function (ret) {
        var json = $.parseJSON(ret),
            status = json["status"],
            data,
            html;
        if (status != '200') {
            return alert(json.error_detail);
        }
        data = json["data"];
        if (!data) {
            return;
        }
        api.getUID().then(function (myUserId) {
            html = levelTemplate($.extend(data, {
                'level_tntro_desc' : data.level_tntro_desc.replace(/&lt\;br.*?\&gt\;/g,'<br>'),
                'requestUserId' : requestUserId,
                'myUserId' : myUserId
            }));
            $(".c-content").append(html);
        });
    }).fail(function (XMLHttpRequest, textStatus) {
        alert(textStatus);
    });
}