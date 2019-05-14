layui.define("layer", function (exports) {
    var $ = layui.jquery;
    var okUtils = {
        isFrontendBackendSeparate: true,
        baseUrl: "http://localhost:8080",
        /**
         * ajax()函数二次封装
         * @param url
         * @param type
         * @param param
         * @returns {*|*|*}
         */
        ajax: function (url, type, param) {
            var deferred = $.Deferred();
            var loadIndex;
            $.ajax({
                url: okUtils.isFrontendBackendSeparate ? okUtils.baseUrl + url : url,
                type: type || "get",
                data: param || {},
                dataType: "json",
                beforeSend: function () {
                    loadIndex = layer.load(0, {shade: false});
                },
                success: function (data) {
                    if (data.status == 1000) {
                        // 业务正常
                        deferred.resolve(data.data)
                    } else {
                        // 业务异常
                        layer.msg(data.msg, {icon: 7, time: 2000});
                        deferred.reject("okUtils.ajax warn: " + data.msg);
                    }
                },
                complete: function () {
                    layer.close(loadIndex);
                },
                error: function () {
                    layer.close(loadIndex);
                    layer.msg("服务器错误", {icon: 2, time: 2000});
                    deferred.reject("okUtils.ajax error: 服务器错误");
                }
            });
            return deferred.promise();
        },
		table: {
			/**
			 * 主要用于针对表格批量操作操作之前的检查
			 * @param table
			 * @returns {string}
			 */
			batchCheck: function (table) {
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
			/**
			 * 在表格页面操作成功后弹窗提示
			 * @param content
			 */
			operationSuccessMsg: function (content) {
			    layer.msg(content, {icon: 1, time: 1000}, function () {
			        // 刷新当前table数据
			        $(".layui-laypage-btn")[0].click();
			    });
			},
		}
    }

    exports("okUtils", okUtils);
});
