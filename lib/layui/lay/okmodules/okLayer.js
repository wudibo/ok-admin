"use strict";
layui.define(["layer"], function (exports) {
    var okLayer = {
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
         * @param successFunction
		 * @param endFunction
         */
        open: function (title, content, width, height, successFunction, endFunction) {
            layer.open({
                title: title,
                type: 2,
                maxmin: true,
                shade: 0.5,
                anim: okLayer.animChoose(),
                area: [width, height],
                content: content,
                zIndex: layer.zIndex,
                skin: okLayer.skinChoose(),
				success: successFunction,
                end: endFunction
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
			var storage = window.localStorage;
			var skin = storage.getItem("skin");
            if (skin == 1) {
                // 灰白色
                return "";
            } else if (skin == 2) {
                // 墨绿色
                return "layui-layer-molv";
            } else if (skin == 3) {
                // 蓝色
                return "layui-layer-lan";
            } else if (!skin || skin == 4) {
                // 随机颜色
				var skinArray = ["", "layui-layer-molv", "layui-layer-lan"];
                return skinArray[Math.floor(Math.random() * skinArray.length)];
            }
        },
        /**
         * 动画选择
         * @returns {number}
         */
        animChoose: function () {
			var storage = window.localStorage;
			var anim = storage.getItem("anim");
			var animArray = ["0", "1", "2", "3", "4", "5", "6"];
            if (animArray.indexOf(anim) > -1) {
				// 用户选择的动画
                return anim;
            } else if (!anim || anim == 7) {
                // 随机动画
                return Math.floor(Math.random() * animArray.length);
            }
        }
    }

    exports("okLayer", okLayer);
});
