layui.config({
    base: "../../lib/layui/lay/okmodules/"
}).extend({
    nprogress: "okProgress/nprogress"
}).define(["nprogress"], function (exports) {
    "use strict";

    // 顶部进度条
    // NProgress.start();
    // window.onload = function () {
    //     NProgress.done();
    // }

    NProgress.start();
    if (document.readyState == "complete" || document.readyState == "interactive") {
        NProgress.done();
    }

    exports("okProgress");
});
