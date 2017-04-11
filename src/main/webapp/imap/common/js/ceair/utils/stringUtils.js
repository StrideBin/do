String.prototype.trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g, "");
};

String.prototype.removePrefix = function(prefix) {
	return this.replace(prefix, '');
};

String.prototype.toCharArray = function() {
	var strArray = new Array();
	for (var i = 1; i < this.length; i++) {
		strArray[i] = this.substr(i - 1, i);
	}
	return strArray;
};

/*******************************************************************************
 * 字符串替换
 */
String.prototype.replaceAll = function(oldString, newString) {
	var pattern = new RegExp(oldString, "g");
	var replaceStr = this.replace(pattern, newString);
	return replaceStr;
};

/**
 * 替换指定期间内的字符
 */
String.prototype.replaceRange = function(begin, end, char) {
	var beginStr = this.substring(0, begin);
	var rangeStr = this.substring(begin, end);
	var endStr = this.substring(end, this.length);
	var matchExp = /\w/g;
	return beginStr + rangeStr.replace(matchExp, char) + endStr;
};

var StringUtils = {
	/**
	 * <p>
	 * Checks if a String is whitespace, empty ("") or null.
	 * </p>
	 * 
	 * <pre>
	 * StringUtils.isBlank(null) = true
	 * StringUtils.isBlank(&quot;&quot;) = true
	 * StringUtils.isBlank(&quot; &quot;) = true
	 * StringUtils.isBlank(&quot;bob&quot;) = false
	 * StringUtils.isBlank(&quot;  bob  &quot;) = false
	 * </pre>
	 * 
	 * @param str
	 *            the String to check, may be null
	 * @return <code>true</code> if the String is null, empty or whitespace
	 * @since 2.0
	 */
	isBlank : function(str) {
		if (str == null || str == undefined || str.length == 0 || str == "") {
			return true;
		}
	},
	/**
	 * <p>
	 * Checks if a String is not empty (""), not null and not whitespace only.
	 * </p>
	 * 
	 * <pre>
	 * StringUtils.isNotBlank(null) = false
	 * StringUtils.isNotBlank(&quot;&quot;) = false
	 * StringUtils.isNotBlank(&quot; &quot;) = false
	 * StringUtils.isNotBlank(&quot;bob&quot;) = true
	 * StringUtils.isNotBlank(&quot;  bob  &quot;) = true
	 * </pre>
	 * 
	 * @param str
	 *            the String to check, may be null
	 * @return <code>true</code> if the String is not empty and not null and not
	 *         whitespace
	 * @since 2.0
	 */
	isNotBlank : function(str) {
		return !StringUtils.isBlank(str);
	},
	/**
	 * 替换指定期间内的字符
	 */
	replaceRange: function(str, begin, end, char) {
		var beginStr = str.substring(0, begin);
		var rangeStr = str.substring(begin, end);
		var endStr = str.substring(end, str.length);
		var matchExp = /\w/g;
		return beginStr + rangeStr.replace(matchExp, char) + endStr;
	}	
};