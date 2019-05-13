layui.define("layer", function (exports) {
    var $ = layui.jquery;
    var okUtils = {
		isFrontendBackendSeparate: true,
        baseUrl: "http://localhost:8080",
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
                        // 业务错误
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
        }
    }

    exports("okUtils", okUtils);
});
