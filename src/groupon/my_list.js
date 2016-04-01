'use strict';

var $ = require('jquery'),
    env = require('@dal/web-env'),
    login = require('@dal/web-widgets').login,
    initShare = require('@dal/web-widgets').share,
    api = require('./api'),
    levelTemplate = require('./art/my_list.art');

require('./css/main.css');
require('./css/my_list.css');

$(document).ready(init);

function init() {
    var url = api.urlFn('/index.php?_c=groupon&_a=getMyGrouponData');
    //$("#my-list").prepend(showHtml(dataTest));
    initShare({
        text: '超多优惠的达令抱抱团，快来一起抱' || document.title,
        image: $("img").eq(0).attr("src"),
        desc: '和姐妹们一起败，才更便宜，更快乐',
        link: location.href
    });
    api.ajax({
        url: url,
        type:"POST"
    }).then(function (data) {
        //document.cookie='dl_user_info_key=4e68437ad1ab9a444b29f7cdf714b011;path=/'
        if (data.status == true) {
            //console.log(data);
            $("#my-list").prepend(showHtml(data));
            //$(".ul-list label").each(function(i,dom){
            //    $(dom).attr("for","pay"+i).find("input").attr("id","pay"+i);
            //
            //});
            return data;
        }

    });
    //login.loginDialog()
};

function showHtml (data) {

    return levelTemplate(data);
}
