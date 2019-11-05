"use strict";
layui.define("layer", function (exports) {
    var $ = layui.jquery;
    var okUtils = {
        isFrontendBackendSeparate: false,
        baseUrl: "http://rap2api.taobao.org/app/mock/233042",
        /**
         * ajax()函数二次封装
         * @param url
         * @param type
         * @param param
         * @returns {*|*|*}
         */
        ajax: function (uri, type, param) {
            var deferred = $.Deferred();
            var loadIndex;
            $.ajax({
                url: okUtils.isFrontendBackendSeparate ? okUtils.baseUrl + uri : uri,
                type: type || "get",
                data: param || {},
                dataType: "json",
                beforeSend: function () {
                    loadIndex = layer.load(0, {shade: false});
                },
                success: function (data) {
                    if (data.code == 0) {
                        // 业务正常
                        deferred.resolve(data.data)
                    } else {
                        // 业务异常
                        layer.msg(data.msg, {icon: 7, time: 2000});
                        deferred.reject("okUtils.ajax warn: " + data.msg);
                    }
                },
                complete: function () {
                    layer.close(loadIndex);
                },
                error: function () {
                    layer.close(loadIndex);
                    layer.msg("服务器错误", {icon: 2, time: 2000});
                    deferred.reject("okUtils.ajax error: 服务器错误");
                }
            });
            return deferred.promise();
        },
        table: {
            /**
             * 主要用于针对表格批量操作操作之前的检查
             * @param table
             * @returns {string}
             */
            batchCheck: function (table) {
                var checkStatus = table.checkStatus("tableId");
                var rows = checkStatus.data.length;
                if (rows > 0) {
                    var idsStr = "";
                    for (var i = 0; i < checkStatus.data.length; i++) {
                        idsStr += checkStatus.data[i].id + ",";
                    }
                    return idsStr;
                } else {
                    layer.msg("未选择有效数据", {offset: "t", anim: 6});
                }
            },
            /**
             * 在表格页面操作成功后弹窗提示
             * @param content
             */
            successMsg: function (content) {
                layer.msg(content, {icon: 1, time: 1000}, function () {
                    // 刷新当前页table数据
                    $(".layui-laypage-btn")[0].click();
                });
            }
        },
        date: {
            /**
             * 格式化日期时间
             * @param date
             * @param fmt
             * @returns {*}
             */
            dateFormat: function (date, fmt) {
                var o = {
                    "M+": date.getMonth() + 1,
                    "d+": date.getDate(),
                    "h+": date.getHours(),
                    "m+": date.getMinutes(),
                    "s+": date.getSeconds(),
                    "q+": Math.floor((date.getMonth() + 3) / 3),
                    "S": date.getMilliseconds()
                };
                if (/(y+)/.test(fmt))
                    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (var k in o)
                    if (new RegExp("(" + k + ")").test(fmt))
                        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                return fmt;
            }
        },
        string: {
            /**
             * 为字符串生成hash值
             * @param value
             * @returns {number}
             */
            hash: function (value) {
                var hash = 1315423911, i, ch;
                for (i = value.length - 1; i >= 0; i--) {
                    ch = value.charCodeAt(i);
                    hash ^= ((hash << 5) + ch + (hash >> 2));
                }
                return (hash & 0x7FFFFFFF);
            }
        },
        number: {
            /**
             * 判断是否为一个正常的数字
             * @param num
             */
            isNumber: function (num) {
                if (num && !isNaN(num)) {
                    return true;
                }
                return false;
            },
            /**
             * 判断一个数字是否包括在某个范围
             * @param num
             * @param begin
             * @param end
             */
            isNumberWith: function (num, begin, end) {
                if (this.isNumber(num)) {
                    if (num >= begin && num <= end) {
                        return true;
                    }
                    return false;
                }
            },
        },
        mockApi: {
            login: "http://rap2api.taobao.org/app/mock/233042/login",
            menu: {
                list: "http://rap2api.taobao.org/app/mock/233042/menu/list"
            },
            user: {
                list: "http://rap2api.taobao.org/app/mock/233042/user/list",
                update: "http://rap2api.taobao.org/app/mock/233042/user/update",
                add: "http://rap2api.taobao.org/app/mock/233042/user/add",
                delete: "http://rap2api.taobao.org/app/mock/233042/user/delete",
                startOrStop: "http://rap2api.taobao.org/app/mock/233042/user/start-or-stop",
            },
            role: {
                list: "http://rap2api.taobao.org/app/mock/233042/role/list"
            },
            permission: {
                list: "http://rap2api.taobao.org/app/mock/233042/permission/list"
            },
            article: {
                list: "http://rap2api.taobao.org/app/mock/233042/article/list"
            },
            log: {
                list: "http://rap2api.taobao.org/app/mock/233042/log/list"
            },
            message: {
                list: "https://easy-mock.com/mock/5d0ce725424f15399a6c2068/okadmin/message/list"
            }
        }
    }

    exports("okUtils", okUtils);
});
