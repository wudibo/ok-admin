// NProgress.start();
// window.onload = function () {
//     NProgress.done();
// }

layui.use(["element", "layer"], function () {
    var element = layui.element;
    var $ = layui.jquery;
    var layer = layui.layer;

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

    /**
     * 点击左边菜单在右边添加选项卡
     */
    $(".layui-nav-child").find("dd").click(function () {
        // 纯文字
        var title = $(this).text();
        // 图标+文字
        // var title = $(this).find("a").html();
        var path = $(this).children("a").attr("path");
        var tabId = $(this).children("a").attr("tab-id");
        tabAdd(title, path, tabId);
    });

    /**
     * 添加tab
     * @param title 标题
     * @param path 路径
     * @param tabId tabId必须唯一
     */
    window.tabAdd = function (title, path, tabId) {
        if (self == top) {
            // console.log("不在iframe中")
            tabAdd1(title, path, tabId)
        } else {
            // console.log("在iframe中")
            tabAdd2(title, path, tabId)
        }
    }

    function tabAdd1(title, path, tabId) {
        // 参数校验
        parameterCheck(title, path, tabId);
        // 去重复选项卡
        var okFrame = $(".ok-frame");
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
    }

    function tabAdd2(title, path, tabId) {
        // 参数校验
        parameterCheck(title, path, tabId);
        // 去重复选项卡
        var parentOkFrame = $(".ok-frame", parent.document);
        for (var i = 0; i < parentOkFrame.length; i++) {
            var _tabId = parentOkFrame.eq(i).attr("tab-id");
            if (_tabId == tabId) {
                console.warn("tabId=" + tabId + "有重复元素,请检查！")
                parent.layui.element.tabChange("ok-tab", tabId);
                event.stopPropagation();
                return;
            }
        }
        // 添加选项卡
        parent.layui.element.tabAdd("ok-tab", {
            title: title,
            content: "<iframe src='" + path + "' tab-id='" + tabId + "' class='ok-frame' frameborder='0' scrolling='yes' width='100%' height='100%'></iframe>",
            id: tabId
        });
        // 切换选项卡
        parent.layui.element.tabChange("ok-tab", tabId);
    }

    function parameterCheck(title, path, tabId) {
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
            window.location = "login.html";
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
