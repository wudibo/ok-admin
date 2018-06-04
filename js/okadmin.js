layui.use(['element', 'jquery'], function () {
    var element = layui.element;
    var $ = layui.jquery;

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
                tab.tabChange(tabId);
                event.stopPropagation();
                return;
            }
        }
        // 添加选项卡
        element.tabAdd("ok-tab", {
            title: title,
            content: "<iframe src='"+path+"' tab-id='"+tabId+"' class='ok-frame' frameborder='0' scrolling='yes' width='100%' height='100%'></iframe>",
            id: tabId
        });
        // 切换选项卡
        element.tabChange("ok-tab", tabId);
    });
});