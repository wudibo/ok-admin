"use strict";
layui.define(["element"], function (exports) {
    var element = window.top.layui.element;
    var $ = layui.jquery;

    var okTab = {
        add: function (title, path, tabId) {
            // 参数校验
            if (!okTab.parameterCheck(title, path, tabId)) {
                return false;
            }
            // 去重复选项卡
            var okFrame = $(".ok-frame", window.top.document);
            for (var i = 0; i < okFrame.length; i++) {
                var _tabId = okFrame.eq(i).attr("tab-id");
                if (_tabId == tabId) {
                    element.tabChange("ok-tab", tabId);
                    event.stopPropagation();
                    return;
                }
            }
            // 添加选项卡
            element.tabAdd("ok-tab", {
                title: title,
                content: "<iframe src='" + path + "' tab-id='" + tabId + "' class='ok-frame' frameborder='0' scrolling='yes' width='100%' height='100%'></iframe>",
                id: tabId
            });
            // 切换选项卡
            element.tabChange("ok-tab", tabId);
        },
        /**
         * 参数校验
         * @param title
         * @param path
         * @param tabId
         * @returns {boolean}
         */
        parameterCheck: function (title, path, tabId) {
            if (title == undefined || title == "") {
                console.error("title未定义")
                return false;
            }
            if (path == undefined || path == "") {
                console.error("path未定义")
                return false;
            }
            if (tabId == undefined || tabId == "") {
                console.error("tabId未定义")
                return false;
            }
            return true;
        }
    }

    exports("okTab", okTab);
});
