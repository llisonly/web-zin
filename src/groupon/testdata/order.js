module.exports = {
    "status": true,
    "code": 200,
    "info": {
        "user_id": 6444579,
        "user_name": "13836102762",
        "goods_amount": "6.00",
        "order_amount": "6.00",
        "goods": [
            {
                "goods_id": "112914",
                "goods_name": "补水保湿牛角 芦荟胶(250g)",
                "prefix": "[韩国Holika]",
                "price": "6.00",
                "goodsImage": "http://img1.cdn.daling.com/data/files/mobile/2015/03/16/14264782127972.jpg"
            }
        ],
        "address_": {
            "addr_id": "78308",
            "user_id": "6444579",
            "consignee": "龚麦玲",
            "region_id": "130627",
            "region_name": "河北省-保定市-唐县",
            "address": "陈家祠呢么",
            "phone_mob": "13836102762"
        },
        "payment_list": [
            {
                "title": "支付宝支付",
                "desc": "保税区商品只能使用支付宝支付",
                "desc_color": "#DB0000",
                "type": "online",
                "display_type": "row",
                "help_title": "",
                "help_desc": "",
                "payment_code": "appalipay",
                "ukey": "appalipay_global",
                "request_type": "sdk",
                "request_url": "",
                "can_use": true,
                "can_not_use_msg": "",
                "logo": "http://img1.cdn.daling.com",
                "default_ukey": true,
                "default_bank": 0
            },
            {
                "title": "支付宝支付",
                "desc": "推荐支付宝用户使用",
                "desc_color": "#cfcccd",
                "type": "online",
                "display_type": "row",
                "help_title": "",
                "help_desc": "",
                "payment_code": "appalipay",
                "ukey": "appalipay",
                "request_type": "sdk",
                "request_url": "",
                "can_use": true,
                "can_not_use_msg": "",
                "logo": "http://img1.cdn.daling.com",
                "default_ukey": false,
                "default_bank": 0
            },
            {
                "title": "微信支付",
                "desc": "操作简单易用，支持大额支付",
                "desc_color": "#cfcccd",
                "type": "online",
                "display_type": "row",
                "help_title": "",
                "help_desc": "",
                "payment_code": "wxpay",
                "ukey": "wxpay",
                "request_type": "sdk",
                "request_url": "",
                "can_use": true,
                "can_not_use_msg": "",
                "logo": "http://img1.cdn.daling.com",
                "default_ukey": false,
                "default_bank": 0
            },
            {
                "title": "财付通支付",
                "desc": "使用财付通账户支付",
                "desc_color": "#cfcccd",
                "type": "online",
                "display_type": "row",
                "help_title": "",
                "help_desc": "",
                "payment_code": "tenpay",
                "ukey": "tenpay",
                "request_type": "html",
                "request_url": "http://m.ymall.com/api/paycenter/payForm?type=tenpay",
                "can_use": true,
                "can_not_use_msg": "",
                "logo": "http://img1.cdn.daling.comaaa",
                "default_ukey": false,
                "default_bank": 0
            },
            {
                "title": "银联手机支付",
                "desc": "支持大额支付",
                "desc_color": "#cfcccd",
                "type": "online",
                "display_type": "row",
                "help_title": "",
                "help_desc": "",
                "payment_code": "unipay",
                "ukey": "unipay",
                "request_type": "sdk",
                "request_url": "",
                "can_use": true,
                "can_not_use_msg": "",
                "logo": "http://img1.cdn.daling.com/st/zt/images/payments/unionpay.png",
                "default_ukey": false,
                "default_bank": 0
            },
            {
                "title": "信用卡支付",
                "desc": "",
                "desc_color": "#cfcccd",
                "type": "online",
                "display_type": "list",
                "help_title": "",
                "help_desc": "",
                "payment_code": "tenpay",
                "ukey": "tenpay_credit",
                "request_type": "html",
                "request_url": "http://www.baidu.com",
                "can_use": true,
                "can_not_use_msg": "",
                "logo": "http://img1.cdn.daling.com",
                "default_ukey": false,
                "default_bank": 0,
                "bank_list": [
                    {
                        "bank_type": 3003,
                        "name": "工商银行",
                        "bank_logo": "http://img1.cdn.daling.com/st/zt/images/payments/gonghang.png"
                    },
                    {
                        "bank_type": 3007,
                        "name": "农业银行",
                        "bank_logo": "http://img1.cdn.daling.com/st/zt/images/payments/nonghang.png"
                    },
                    {
                        "bank_type": 3006,
                        "name": "招商银行",
                        "bank_logo": "http://img1.cdn.daling.com/st/zt/images/payments/zhaoshang.png"
                    },
                    {
                        "bank_type": 3106,
                        "name": "建设银行",
                        "bank_logo": "http://img1.cdn.daling.com/st/zt/images/payments/jianhang.png"
                    },
                    {
                        "bank_type": 3107,
                        "name": "中国银行",
                        "bank_logo": "http://img1.cdn.daling.com/st/zt/images/payments/zhonghang.png"
                    },
                    {
                        "bank_type": 3114,
                        "name": "深圳发展银行",
                        "bank_logo": "http://img1.cdn.daling.com/st/zt/images/payments/szfz.png"
                    },
                    {
                        "bank_type": 3113,
                        "name": "兴业银行",
                        "bank_logo": "http://img1.cdn.daling.com/st/zt/images/payments/xingye.png"
                    },
                    {
                        "bank_type": 3110,
                        "name": "平安银行",
                        "bank_logo": "http://img1.cdn.daling.com/st/zt/images/payments/pingan.png"
                    },
                    {
                        "bank_type": 3108,
                        "name": "光大银行",
                        "bank_logo": "http://img1.cdn.daling.com/st/zt/images/payments/guangda.png"
                    },
                    {
                        "bank_type": 3109,
                        "name": "广发银行",
                        "bank_logo": "http://img1.cdn.daling.com/st/zt/images/payments/gaungfa.png"
                    },
                    {
                        "bank_type": 3115,
                        "name": "中信银行",
                        "bank_logo": "http://img1.cdn.daling.com/st/zt/images/payments/zhongxin.png"
                    },
                    {
                        "bank_type": 3119,
                        "name": "民生银行",
                        "bank_logo": "http://img1.cdn.daling.com/st/zt/images/payments/minshneg.png"
                    },
                    {
                        "bank_type": 3205,
                        "name": "上海银行",
                        "bank_logo": "http://img1.cdn.daling.com/st/zt/images/payments/shanghai.png"
                    },
                    {
                        "bank_type": 3117,
                        "name": "浦发银行",
                        "bank_logo": "http://img1.cdn.daling.com/st/zt/images/payments/pufa.png"
                    }
                ]
            },
            {
                "title": "储蓄卡支付",
                "desc": "",
                "desc_color": "#cfcccd",
                "type": "online",
                "display_type": "list",
                "help_title": "",
                "help_desc": "",
                "payment_code": "tenpay",
                "ukey": "tenpay_debit",
                "request_type": "html",
                "request_url": "http://www.baidu.com",
                "can_use": true,
                "can_not_use_msg": "",
                "logo": "http://img1.cdn.daling.com",
                "default_ukey": false,
                "default_bank": 0,
                "bank_list": [
                    {
                        "bank_type": 4186,
                        "name": "农业银行",
                        "bank_logo": "http://img1.cdn.daling.com/st/zt/images/payments/nonghang.png"
                    },
                    {
                        "bank_type": 2011,
                        "name": "招商银行",
                        "bank_logo": "http://img1.cdn.daling.com/st/zt/images/payments/zhaoshang.png"
                    },
                    {
                        "bank_type": 2013,
                        "name": "建设银行",
                        "bank_logo": "http://img1.cdn.daling.com/st/zt/images/payments/jianhang.png"
                    },
                    {
                        "bank_type": 2016,
                        "name": "广发银行",
                        "bank_logo": "http://img1.cdn.daling.com/st/zt/images/payments/gaungfa.png"
                    },
                    {
                        "bank_type": 2125,
                        "name": "中信银行",
                        "bank_logo": "http://img1.cdn.daling.com/st/zt/images/payments/zhongxin.png"
                    },
                    {
                        "bank_type": 2014,
                        "name": "光大银行",
                        "bank_logo": "http://img1.cdn.daling.com/st/zt/images/payments/guangda.png"
                    },
                    {
                        "bank_type": 2008,
                        "name": "民生银行",
                        "bank_logo": "http://img1.cdn.daling.com/st/zt/images/payments/minshneg.png"
                    },
                    {
                        "bank_type": 2127,
                        "name": "华润银行",
                        "bank_logo": "http://img1.cdn.daling.com/st/zt/images/payments/huarun.png"
                    },
                    {
                        "bank_type": 2024,
                        "name": "平安银行",
                        "bank_logo": "http://img1.cdn.daling.com/st/zt/images/payments/pingan.png"
                    },
                    {
                        "bank_type": 2021,
                        "name": "兴业银行",
                        "bank_logo": "http://img1.cdn.daling.com/st/zt/images/payments/xingye.png"
                    },
                    {
                        "bank_type": 2147,
                        "name": "上海银行",
                        "bank_logo": "http://img1.cdn.daling.com/st/zt/images/payments/shanghai.png"
                    },
                    {
                        "bank_type": 2017,
                        "name": "浦发银行",
                        "bank_logo": "http://img1.cdn.daling.com/st/zt/images/payments/pufa.png"
                    },
                    {
                        "bank_type": 2032,
                        "name": "工商银行",
                        "bank_logo": "http://img1.cdn.daling.com/st/zt/images/payments/gonghang.png"
                    },
                    {
                        "bank_type": 2028,
                        "name": "中国银行",
                        "bank_logo": "http://img1.cdn.daling.com/st/zt/images/payments/zhonghang.png"
                    }
                ]
            },
            {
                "title": "农行支付",
                "desc": "农行银行卡支付",
                "desc_color": "#cfcccd",
                "type": "online",
                "display_type": "row",
                "help_title": "",
                "help_desc": "",
                "payment_code": "abcpay",
                "ukey": "abcpay",
                "request_type": "html",
                "request_url": "http://m.ymall.com/api/paycenter/payForm?type=abcpay",
                "can_use": true,
                "can_not_use_msg": "",
                "logo": "http://img1.cdn.daling.com/st/zt/images/payments/abcpay.png",
                "default_ukey": false,
                "default_bank": 0
            }
        ]
    },
    "hasLogin": true,
    "isInApp": true,
    "appVersion": 540
}