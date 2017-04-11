$(document).ready(function(){
	autoAdjustMenuWidth();
	footerAlwaysBottom();
})

/**
 * 自动调整菜单宽度和底部宽度一致
 */
function autoAdjustMenuWidth() {
	 var headWrapperWidth = $("#headWrapper").width();
	 $("#topNav").css("width", headWrapperWidth);
}

/**
 * 页脚始终居于底部
 */
function  footerAlwaysBottom() {
	var offsetHeight = 80;
	var screenHeight = $(window).height();// 获取屏幕可视区域的宽度。
	var headWrapperHeight = $("#headWrapper").height();// 获取屏幕可视区域的高度。
	var middleWrapperHeight = $("#middleWrapper").height();// 获取屏幕可视区域的高度。
	var divHeight = $("#footer").height() + 1;// bottomDiv的高度再加上它一像素的边框。
	var scrollHeight = $(document).scrollTop();// 获取滚动条滚动的高度。
	var topHeight = screenHeight + scrollHeight - (divHeight + headWrapperHeight + middleWrapperHeight + offsetHeight);
	console.log("=======================================");
	console.log("screenHeight:"+ screenHeight);
	console.log("scrollHeight:" + scrollHeight);
	console.log("divHeight:" + divHeight);
	console.log("headWrapperHeight:" + headWrapperHeight);
	console.log("middleWrapperHeight:" + middleWrapperHeight);
	console.log("topHeight:" +topHeight);
	console.log("=======================================");
	if (topHeight > 0) {
		$("#footer").css("margin-top", topHeight);
	}
}