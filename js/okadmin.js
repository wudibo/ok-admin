// layui.use(['element', 'jquery', 'code', 'layer'], function () {
//     var element = layui.element;
//     var $ = layui.jquery;
//     var layer = layui.layer;
//     // 引用code方法
//     layui.code({about: false});
//
//     /**
//      * 左边菜单显示/隐藏功能
//      * @type {boolean}
//      */
//     $(".menu-switch").click(function () {
//         if ($(".layui-layout-admin .layui-side").css("left") == '0px') {
//             $(".layui-layout-admin .layui-side").animate({left: "-200px"});
//             $(".layui-layout-admin .content-body").animate({left: "0px"});
//             $(".layui-layout-admin .layui-footer").animate({left: "0px"});
//         } else {
//             $(".layui-layout-admin .layui-side").animate({left: "0px"});
//             $(".layui-layout-admin .content-body").animate({left: "200px"});
//             $(".layui-layout-admin .layui-footer").animate({left: "200px"});
//         }
//     });
//
//     /**
//      * 点击左边菜单在右边添加选项卡
//      */
//     $(".layui-nav-child").find("dd").click(function () {
//         var title = $(this).text();
//         var path = $(this).children('a').attr('path');
//         var tabId = $(this).children('a').attr('tab-id');
//         // 去重复选项卡
//         for (var i = 0; i < $('.ok-frame').length; i++) {
//             if ($('.ok-frame').eq(i).attr('tab-id') == tabId) {
//                 element.tabChange("ok-tab", tabId);
//                 event.stopPropagation();
//                 return;
//             }
//         }
//         // 添加选项卡
//         element.tabAdd("ok-tab", {
//             title: title,
//             content: "<iframe src='" + path + "' tab-id='" + tabId + "' class='ok-frame' frameborder='0' scrolling='yes' width='100%' height='100%'></iframe>",
//             id: tabId
//         });
//         // 切换选项卡
//         element.tabChange("ok-tab", tabId);
//     });
//
//     /**
//      * 捐赠作者
//      */
//     $(".layui-footer button").click(function () {
//         layer.tab({
//             area: ["330px", "350px"],
//             tab: [{
//                 title: "支付宝",
//                 content: "<img src='images/zfb.jpg' width='200' height='300' style='margin-left: 60px'>"
//             }, {
//                 title: "微信",
//                 content: "<img src='images/wx.jpg' width='200' height='300' style='margin-left: 60px'>"
//             }]
//         });
//     });
// });
//
//
// /**
//  * 获取当前时间
//  */
// var nowDate1 = "";
//
// function setDate() {
//     var date = new Date();
//     var year = date.getFullYear();
//     nowDate1 = year + "-" + addZero((date.getMonth() + 1)) + "-" + addZero(date.getDate()) + "  ";
//     nowDate1 += addZero(date.getHours()) + ":" + addZero(date.getMinutes()) + ":" + addZero(date.getSeconds());
//     document.getElementById("nowTime").innerHTML = nowDate1;
//     setTimeout('setDate()', 1000);
// }
//
// /**
//  * 年月日是分秒为10以下的数字则添加0字符串
//  * @param time
//  * @returns {number | *}
//  */
// function addZero(time) {
//     var i = parseInt(time);
//     if (i / 10 < 1) {
//         i = "0" + i;
//     }
//     return i;
// }