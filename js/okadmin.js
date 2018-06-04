layui.use(['element', 'jquery'], function () {
    var element = layui.element;
    var $ = layui.jquery;

    /**
     * 左边菜单显示/隐藏功能
     * @type {boolean}
     */
    var flag = true;
    $(".menu-switch").click(function () {
        if (flag) {
            $(".layui-layout-admin .layui-side").animate({left: "-200px"});
            $(".layui-layout-admin .content-body").animate({left: "0px"});
            $(".layui-layout-admin .layui-footer").animate({left: "0px"});
            $(".menu-switch span").removeClass("layui-icon-shrink-right").addClass("layui-icon-spread-left");
            flag = false;
        } else {
            $(".layui-layout-admin .layui-side").animate({left: "0px"});
            $(".layui-layout-admin .content-body").animate({left: "200px"});
            $(".layui-layout-admin .layui-footer").animate({left: "200px"});
            $(".menu-switch span").removeClass("layui-icon-spread-left").addClass("layui-icon-shrink-right");
            flag = true;
        }
    });

    /**
     * 点击左边菜单在右边添加选项卡
     */
    $(".layui-nav-child").find("dd").click(function () {
        var title = $(this).text();
        var path = $(this).children('a').attr('path');
        var tabId = $(this).children('a').attr('tab-id');
        // 去重复
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