/**
 * 推送单程参数到url，供航班信息查询使用
 * 
 * @param oricode
 *            出发机场
 * @param destcode
 *            目的机场
 * @param gdate
 *            去程时间
 */
function passOneWayParam(oricode, destcode, gdate) {
	var choose_ori = oricode;
	var choose_dest = destcode;
	var choose_flightDt = new Date(gdate).formatDate("yyyy-MM-dd");
	window.location.href = contextRootPath
			+ '/business/shopping/oneway-search/index.jsp?ori=' + choose_ori
			+ '&dest=' + choose_dest + '&flightDt=' + choose_flightDt;

}

/**
 * 解析url中包含的参数
 * 
 * @param name
 *            解析字段的名称
 * @returns
 */
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); // 匹配目标参数
	if (r != null)
		return unescape(r[2]);
	return null; // 返回参数值

}

function skipPageAssFlgQuery() {
	var ori = getUrlParam("ori");
	var dest = getUrlParam("dest");
	var gdate = getUrlParam("flightDt");

	if (	ori != null && ori != "" &
			dest != null && dest != "" &
			gdate != null && gdate != "") {
		document.getElementById('ori').value = ori;
		document.getElementById('dest').value = dest;
		document.getElementById('flightDt').value = gdate;
		return true;
	}
}

$(document).ready(function() {
	if (skipPageAssFlgQuery()) {
		$("#search").trigger("click");
	}
});