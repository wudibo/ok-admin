"use strict";
layui.define(["element", "okUtils"], function (exports) {
    var element = window.top.layui.element;
    var okUtils = layui.okUtils;
    var $ = layui.jquery;

    var okTab = {
        add: function (title, path) {
            // 参数校验
            if (!okTab.parameterCheck(title, path)) {
                return false;
            }
            // 根据path自动生成tabId值
            var tabId = okUtils.string.hash(path)
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
        parameterCheck: function (title, path) {
            if (title == undefined || title == "") {
                console.error("title未定义")
                return false;
            }
            if (path == undefined || path == "") {
                console.error("path未定义")
                return false;
            }
            return true;
        }
    }

    exports("okTab", okTab);
});
