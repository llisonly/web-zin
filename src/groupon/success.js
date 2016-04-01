
var $ = require('jquery'),
    env = require('@dal/web-env'),
    api = require('./api'),
    levelTemplate = require('./art/success.art');

require('./css/main.css');
require('./css/success.css');
$(document).ready(init);

function init() {
    var url = api.urlFn('/index.php?_c=groupon&_a=getGrouponOrderSuccessData');
    api.ajax({
        url: url,
        data : {
            order_sn : env.param('order_sn')
        }
    }).then(function (data) {
        if (data.status == true) {
            showHtml(data);
            if (env.isApp()) {
                $("#down-app").hide();
            }
            return data;
        }

    });
    //login.loginDialog()
};

function showHtml (data) {
    var $dom = $(".c-content");
    $dom.html(levelTemplate(data));
    return $dom;
}
