NProgress.start();
window.onload = function() {
	NProgress.done();
}
layui.use(['element', 'layer'], function () {
    var element = layui.element;
    var $ = layui.jquery;
    var layer = layui.layer;

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
        var title = $(this).text();
        var path = $(this).children('a').attr('path');
        var tabId = $(this).children('a').attr('tab-id');
        // 去重复选项卡
        for (var i = 0; i < $('.ok-frame').length; i++) {
            if ($('.ok-frame').eq(i).attr('tab-id') == tabId) {
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
    });

    /**
     * 捐赠作者
     */
    $(".layui-footer button").click(function () {
        layer.tab({
            area: ["330px", "350px"],
            tab: [{
                title: "支付宝",
                content: "<img src='images/zfb.jpg' width='200' height='300' style='margin-left: 60px'>"
            }, {
                title: "微信",
                content: "<img src='images/wx.jpg' width='200' height='300' style='margin-left: 60px'>"
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
            layer.prompt({btn: ['确定'], title: '输入密码解锁(123456)', closeBtn: 0, formType: 1}, function (value, index, elem) {
                if (value == "123456") {
                    layer.close(index);
                    $(".yy").hide();
                } else {
                    layer.msg('密码错误', {anim: 6});
                }
            });
        });
    });
});