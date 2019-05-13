var dateUtil = {
    /**
     * 格式化时间
     * @param date
     * @param fmt
     * @returns {*}
     */
    dateFormat: function (date, fmt) {
        var o = {
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
            "h+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds(),
            "q+": Math.floor((date.getMonth() + 3) / 3),
            "S": date.getMilliseconds()
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }
}


var strUtil = {
    /**
     * 判断字符串是否为空
     * @param str 传入的字符串
     * @returns {}
     */
    isEmpty: function (str) {
        if (str != null && str.length > 0) {
            return true;
        } else {
            return false;
        }
    },
    /**
     * 判断两个字符串是否相同
     * @param str1
     * @param str2
     * @returns {Boolean}
     */
    isEquals: function (str1, str2) {
        if (str1 == str2) {
            return true;
        } else {
            return false;
        }
    },
    /**
     * 忽略大小写判断字符串是否相同
     * @param str1
     * @param str2
     * @returns {Boolean}
     */
    isEqualsIgnoreCase: function (str1, str2) {
        if (str1.toUpperCase() == str2.toUpperCase()) {
            return true;
        } else {
            return false;
        }
    },
    /**
     * 判断是否是数字
     * @param value
     * @returns {Boolean}
     */
    isNum: function (value) {
        if (value != null && value.length > 0 && isNaN(value) == false) {
            return true;
        } else {
            return false;
        }
    },
    /**
     * 判断是否是中文
     * @param str
     * @returns {Boolean}
     */
    isChinese: function (str) {
        var reg = /^([u4E00-u9FA5]|[uFE30-uFFA0])*$/;
        if (reg.test(str)) {
            return false;
        }
        return true;
    }
};
