"use strict";
layui.define(["layer"], function (exports) {
    var $ = layui.jquery;
    var okLayer = {
        // 控制了msg() confirm() open()方法的弹窗皮肤
        skinStyle: 3,
        // 控制了msg() confirm() open()方法的弹窗动画
        animStyle: 2,
        /**
         * confirm()函数二次封装
         * @param content
         * @param yesFunction
         */
        confirm: function (content, yesFunction) {
            var options = {skin: okLayer.skinChoose(), icon: 3, title: "提示", anim: okLayer.animChoose()};
            layer.confirm(content, options, yesFunction);
        },
        /**
         * open()函数二次封装,支持在table页面和普通页面打开
         * @param title
         * @param content
         * @param width
         * @param height
         * @param isRefreshTable
         */
        open: function (title, content, width, height, callbackFunction) {
            layer.open({
                title: title,
                type: 2,
                shade: false,
                maxmin: true,
                shade: 0.5,
                anim: okLayer.animChoose(),
                area: [width, height],
                content: content,
                zIndex: layer.zIndex,
                skin: okLayer.skinChoose(),
                end: callbackFunction
            });
        },
        /**
         * msg()函数二次封装
         */
        msg: {
            // msg弹窗默认消失时间
            time: 1000,
            // 绿色勾
            greenTick: function (content, callbackFunction) {
                var options = {icon: 1, time: okLayer.msg.time, anim: okLayer.animChoose()};
                layer.msg(content, options, callbackFunction);
            },
            // 红色叉
            redCross: function (content, callbackFunction) {
                var options = {icon: 2, time: okLayer.msg.time, anim: okLayer.animChoose()};
                layer.msg(content, options, callbackFunction);
            },
            // 黄色问号
            yellowQuestion: function (content, callbackFunction) {
                var options = {icon: 3, time: okLayer.msg.time, anim: okLayer.animChoose()};
                layer.msg(content, options, callbackFunction);
            },
            // 灰色锁
            grayLock: function (content, callbackFunction) {
                var options = {icon: 4, time: okLayer.msg.time, anim: okLayer.animChoose()};
                layer.msg(content, options, callbackFunction);
            },
            // 红色哭脸
            redCry: function (content, callbackFunction) {
                var options = {icon: 5, time: okLayer.msg.time, anim: okLayer.animChoose()};
                layer.msg(content, options, callbackFunction);
            },
            // 绿色笑脸
            greenLaugh: function (content, callbackFunction) {
                var options = {icon: 6, time: okLayer.msg.time, anim: okLayer.animChoose()};
                layer.msg(content, options, callbackFunction);
            },
            // 黄色感叹号
            yellowSigh: function (content, callbackFunction) {
                var options = {icon: 7, time: okLayer.msg.time, anim: okLayer.animChoose()};
                layer.msg(content, options, callbackFunction);
            }
        },
        /**
         * 皮肤选择
         * @returns {string}
         */
        skinChoose: function () {
            if (okLayer.skinStyle == 1) {
                // 默认皮肤
                return "";
            } else if (okLayer.skinStyle == 2) {
                // 墨绿色
                return "layui-layer-molv";
            } else if (okLayer.skinStyle == 3) {
                // 蓝色
                return "layui-layer-lan";
            }
        },
        /**
         * 动画选择
         * @returns {number}
         */
        animChoose: function () {
            if (okLayer.animStyle == 1) {
                // 默认动画
                return 0;
            } else if (okLayer.animStyle == 2) {
                // 随机动画
                return Math.floor(Math.random() * 7);
            }
        }
    }

    exports("okLayer", okLayer);
});
