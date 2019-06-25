"use strict";
layui.define(["element", "okUtils"], function (exports) {
    var element = layui.element;
    var okUtils = layui.okUtils;
    var $ = layui.jquery;

    var okMenu = {
        generatorMenu: function (url, method) {
            okUtils.ajax(url, method).done(function (response) {
                var html = "";
                for (var i = 0; i < response.length; i++) {
                    var d = response[i];
                    html += okMenu.liHtml(d);
                    html += "<a href='javascript:;'>"
                    html += okMenu.iconHtml(d) + " " + response[i].title;
                    html += "</a>"
                    var temp = okMenu.createMenu(d.children);
                    html += temp;
                    html += "</li>";
                }
                $(".layui-nav-tree").html(html);
                element.render("nav");
            }).fail(function (error) {
                console.log(error)
            });
        },
        liHtml: function (obj) {
            var html = "";
            if (obj.spread) {
                html += "<li class='layui-nav-item layui-nav-itemed'>";
            } else {
                html += "<li class='layui-nav-item'>";
            }
            return html;
        },
        iconHtml: function (obj) {
            var html = "";
            if (obj.icon) {
                if (obj.font == "iconfont") {
                    html += "<i class='iconfont'>" + obj.icon + "</i>";
                } else if (obj.font == "layui-icon") {
                    html += "<i class='layui-icon'> " + obj.icon + "</i>";
                } else {
                    html += "<i class='iconfont'>" + obj.icon + "</i>";
                }
            } else {
                console.warn(obj.title, "icon未定义");
            }
            return html;
        },
        createMenu: function (obj) {
            var html = "";
            if (obj != undefined && obj.length > 0) {
                html += "<dl class='layui-nav-child'>"
                for (var i = 0; i < obj.length; i++) {
                    html += "<dd>";
                    html += "<a href='javascript:;' path='" + obj[i].path + "'>" + okMenu.iconHtml(obj[i]) + " " + obj[i].title + "</a>";
                    var children = obj[i].children;
                    if (children != undefined && children.length > 0) {
                        html += okMenu.createMenu(children);
                    }
                    html += "</dd>";
                }
                html += "</dl>"
            }
            return html;
        }
    }

    exports("okMenu", okMenu);
});
