layui.define(["layer"], function (exports) {
    var $ = layui.jquery;
    var okLayer = {
        skinStyle: 2,
        animStyle: 2,
        tableCheck: function (table) {
            var checkStatus = table.checkStatus("tableId");
            var rows = checkStatus.data.length;
            if (rows > 0) {
                var idsStr = "";
                for (var i = 0; i < checkStatus.data.length; i++) {
                    idsStr += checkStatus.data[i].id + ",";
                }
                return idsStr;
            } else {
                layer.msg("未选择有效数据", {offset: "t", anim: 6});
            }
        },
        tableOperationMsg: function (content) {
            layer.msg(content, {icon: 1, time: 1000}, function () {
                $(".layui-laypage-btn")[0].click();
            });
        },
        confirm: function (content, yesFunction) {
            var options = {skin: okLayer.skinChoose(), icon: 2, title: "提示", anim: okLayer.animChoose()};
            layer.confirm(content, options, yesFunction);
        },
        open: function (title, content, width, height, isRefreshTable) {
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
                end: function () {
					if (isRefreshTable) {
						$(".layui-laypage-btn")[0].click();
					}
                }
            });
        },
        skinChoose: function () {
            if (okLayer.skinStyle == 1) {
                return "layui-layer-lan";
            } else if (okLayer.skinStyle == 2) {
                return "layui-layer-molv";
            }
        },
        animChoose: function () {
            if (okLayer.animStyle == 1) {
                return 0;
            } else if (okLayer.animStyle == 2) {
                return Math.floor(Math.random() * 7);
            }
        }
    }

    exports("okLayer", okLayer);
});
