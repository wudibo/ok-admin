layui.config({
    base: "lib/okPlugins/"
}).extend({
    okTab: "okTab",
    okUtils: "okUtils"
}).use(["element", "layer", "okTab", "okUtils"], function () {
    var element = layui.element;
    var layer = layui.layer;
    var $ = layui.jquery;
    var okTab = layui.okTab;
    var okUtils = layui.okUtils;

    /**
     * localhost运行提示
     */
    var href = location.href;
    if (href.substring(0, 4) != "http") {
        layer.msg("请先部署到localhost环境下再访问！", {icon: 7, time: 3000, anim: 1});
    }

    /**
     * 左边菜单显示/隐藏功能
     * @type {boolean}
     */
    $(".menu-switch").click(function () {
        if ($(".layui-layout-admin .layui-side").css("left") == '0px') {
            $(".layui-layout-admin .layui-side").animate({left: "-200px"});
            $(".layui-layout-admin .content-body").animate({left: "0px"});
            $(".layui-layout-admin .layui-footer").animate({left: "0px"});
        } else {
            $(".layui-layout-admin .layui-side").animate({left: "0px"});
            $(".layui-layout-admin .content-body").animate({left: "200px"});
            $(".layui-layout-admin .layui-footer").animate({left: "200px"});
        }
    });

    // TODO 加载左侧菜单 ！！！！！！！！！！！！
    // okUtils.ajax("data/menu.json", "get").done(function (response) {
    //     var html = "";
    //     for (var i = 0; i < response.length; i++) {
    //         var d = response[i];
    //         html += "<li class='layui-nav-item'>"
    //         html += "<a href='javascript:;'>"
    //         html += "<i class='iconfont icon-huiyuan'></i> " + response[i].title;
    //         html += "</a>"
    //         if (d.children != undefined && d.children.length > 0) {
    //             html += "<dl class='layui-nav-child'>"
    //             for (var j = 0; j < d.children.length; j++) {
    //                 html += "<dd><a href='javascript:;' path='pages/user/user.html' tab-id='1-1'><i class='iconfont icon-dianliyonghuzongshu'></i> " + d.children[j].title + "</a></dd>";
    //             }
    //             html += "</dl>"
    //         }
    //         html += "</li>";
    //     }
    //     $(".layui-nav-tree").html(html);
    //     element.render("nav");
    // }).fail(function (error) {
    //     console.log(error)
    // });

    /**
     * 监听导航菜单的点击
     */
    // element.on("nav(navFilter)", function (elem) {
    //     var path = elem.context.attributes.path;
    //     var tabId = elem.context.attributes["tab-id"];
    //     var text = elem.context.innerText;
    //     console.log(path, tabId, text)
    // });

    $(".layui-nav-child").find("dd").click(function () {
        var title = $(this).text();
        var path = $(this).children("a").attr("path");
        okTab.add(title, path)
    });

    /**
     * 修改copyright结束时间
     */
    var data = new Date();
    var year = data.getFullYear();
    $("#endYear").text(year);

    /**
     * 捐赠作者
     */
    $(".layui-footer button.donate").click(function () {
        layer.tab({
            area: ["330px", "350px"],
            tab: [{
                title: "支付宝",
                content: "<img src='imgs/zfb.jpg' width='200' height='300' style='margin-left: 60px'>"
            }, {
                title: "微信",
                content: "<img src='imgs/wx.jpg' width='200' height='300' style='margin-left: 60px'>"
            }]
        });
    });

    /**
     * QQ群交流
     */
    $(".layui-footer button.communication").click(function () {
        layer.tab({
            area: ["330px", "350px"],
            tab: [{
                title: "QQ群",
                content: "<img src='imgs/qq.jpeg' width='200' height='300' style='margin-left: 60px'>"
            }]
        });
    });

    /**
     * 退出操作
     */
    $("#logout").click(function () {
        layer.confirm("确定要退出吗？", {skin: 'layui-layer-lan', icon: 3, title: '提示', anim: 6}, function () {
            window.location = "pages/user/login.html";
        });
    });

    /**
     * 锁定账户
     */
    $("#lock").click(function () {
        layer.confirm("确定要锁定账户吗？", {skin: 'layui-layer-lan', icon: 4, title: '提示', anim: 1}, function (index) {
            layer.close(index);
            $(".yy").show();
            layer.prompt({
                btn: ['确定'],
                title: '输入密码解锁(123456)',
                closeBtn: 0,
                formType: 1
            }, function (value, index, elem) {
                if (value == "123456") {
                    layer.close(index);
                    $(".yy").hide();
                } else {
                    layer.msg('密码错误', {anim: 6});
                }
            });
        });
    });

    console.log("        __                         .___      .__        \n" +
        "  ____ |  | __         _____     __| _/_____ |__| ____  \n" +
        " /  _ \\|  |/ /  ______ \\__  \\   / __ |/     \\|  |/    \\ \n" +
        "(  <_> )    <  /_____/  / __ \\_/ /_/ |  Y Y  \\  |   |  \\\n" +
        " \\____/|__|_ \\         (____  /\\____ |__|_|  /__|___|  /\n" +
        "            \\/              \\/      \\/     \\/        \\/ \n" +
        "版本：v1.0\n" +
        "作者：bobi\n" +
        "邮箱：bobi1234@foxmail.com\n" +
        "描述：一个很赞的，扁平化风格的，响应式布局的后台管理模版，旨为后端程序员减压！")
});
