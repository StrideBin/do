var tsdata;
$(function() {
	var toggle=0;
	$.icheck = {
		init : function() {
			var _this = this;
			_this._checkbox = "checkbox";
			_this._radio = "radio";
			_this._disabled = "disabled";
			_this._enable = "enable";
			_this._checked = "checked";
			_this._hover = "hover";
			_this._arrtype = [ _this._checkbox, _this._radio ];
			_this._mobile = /ipad|iphone|ipod|android|blackberry|windows phone|opera mini|silk/i
					.test(navigator.userAgent);
			$.each(_this._arrtype, function(k, v) {
				_this.click(v);
				if (!_this._mobile) {
					_this.mouseover(v);
					_this.mouseout(v);
				}
			});
		},
		click : function(elem) {
			var _this = this;
			elem = "." + elem;
			$(document).on(
					"click",
					elem,
					function() {
						var $this = $(this), _ins = $this.find("ins");
						if (!(_ins.hasClass(_this._disabled) || _ins
								.hasClass(_this._enable))) {
							if (!!_ins.hasClass(_this._checked)) {
								if($this.attr("class")=="radio"){return ;}
								_ins.removeClass(_this._checked).addClass(
										_this._hover);
								$("#allChose").find("ins").removeClass("checked");
								$("#allChose").css("cursor", "pointer");
								toggle=0;
							} else {
								if (/radio/ig.test(elem)) {
									var _name = $this.attr("name");
									$(elem + "[name=" + _name + "]")
											.find("ins").removeClass(
													_this._checked);
								}
								$(elem).find("ins").removeClass(_this._hover);
								_ins.addClass(_this._checked);
								if($(".checked").length==$(".insCss").length+1){
									$("#allChose").css("cursor", "default");
									$("#allChose").find("ins").addClass("checked");
									toggle=1;
									
								}

							}
						}
					});
		},
		mouseover : function(elem) {
			var _this = this;
			elem = "." + elem;
			$(document).on(
					"mouseover",
					elem,
					function() {
						var $this = $(this);
						var _ins = $this.find("ins");
						if (!(_ins.hasClass(_this._disabled)
								|| _ins.hasClass(_this._enable) || _ins
								.hasClass(_this._checked))) {
							_ins.addClass(_this._hover);
							$this.css("cursor", "pointer");
						} else {
							$this.css("cursor", "default");
						}
					});
		},
		mouseout : function(elem) {
			var _this = this;
			elem = "." + elem;
			$(document).on("mouseout", elem, function() {
				$(elem).find("ins").removeClass(_this._hover);
			});
		}
	};
	
	$("#allChose").click(function(){
		
		if(toggle==0){
		$(".checkbox").css("cursor", "default");
		$(".insCss").addClass("checked");
		toggle=1;
		}else if(toggle==1){
			$(".checkbox").css("cursor", "pointer");
			$(".insCss").removeClass("checked");
			toggle=0;
		}
	})
	
	
	$.icheck.init();
	


	/**
	 * 加载动画模态框的位置计算 放在屏幕中间显示
	 */
	$('#loadingModal').css(
			{
				'margin-top' : function() {
					var modalHeight = $('#loadingModal').find(
							'.loading-img-bottom').height();
					return ($(window).height() / 2 - (modalHeight / 2));
				},
				'margin-left' : function() {
					var modalWidth = $("#loadingModal").find(
							'.loading-img-bottom').width();
					return ($(window).width() / 2 - (modalWidth / 2) - 500);
				}
			});

	$("#psdp-realtime-search")
			.click(
					function() {
						location.href = getRootPath()
								+ "/business/psdpRealTime/psdp-realtime-search/index.jsp";
					})
	$("#psdp-realtime-seg").click(
			function() {
				location.href = getRootPath()
						+ "/business/psdpRealTime/psdp-realtime-seg/index.jsp";
			})


})

function getRootPath() {
	// 获取当前网址，如： http://localhost:8080/jetair/login/login.jsp
	var curWwwPath = window.document.location.href;
	// 获取主机地址之后的目录，如：jetair/login/login.jsp
	var pathName = window.document.location.pathname;
	var pos = curWwwPath.indexOf(pathName);
	// 获取主机地址，如： http://localhost:8080
	var localhostPaht = curWwwPath.substring(0, pos);
	// 获取带"/"的项目名，如：/jetair
	var projectName = pathName
			.substring(0, pathName.substr(1).indexOf('/') + 1);
	return (localhostPaht + projectName);
}
function formatDate(now) {
	var year = now.getFullYear();
	var month = now.getMonth() + 1;
	var date = now.getDate();
	var hour = now.getHours();
	return year + "-" + month + "-" + date;
}
function formatDateDetail(now) {
	var year = now.getFullYear();
	var month = now.getMonth() + 1;
	var date = now.getDate();
	var hour = now.getHours();
	var minute = now.getMinutes();
	var second = now.getSeconds();
	return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":"
			+ second;
}
function isNull(str) {

	if (str == null) {
		return "";
	}
	return str;
}
/**
 * 等待动画开始
 */
function loadingStart() {
	timeInterval = 0;
	intervalId = setInterval(function() {
		timeInterval += 360;
		$("#loadingImgBottom").css({
			"-moz-transform" : "rotate(" + timeInterval + "deg)",
			"-webkit-transform" : "rotate(" + timeInterval + "deg)",
			"-o-transform" : "rotate(" + timeInterval + "deg)",
			"-ms-transform" : "rotate(" + timeInterval + "deg)",
			"transform" : "rotate(" + timeInterval + "deg)"
		});
	}, 1000);
	$('#loadingModal').modal({
		keyboard : false,
		backdrop : 'static'
	});
}

/**
 * 等待动画结束
 */
function loadingEnd() {
	$('#loadingModal').modal('hide');
	clearInterval(intervalId);
}
/**
 * json格式数据null转""
 * @param jsonobj
 * @returns
 */
function jsonTransfer(jsonobj){
	var jsonstr=JSON.stringify(jsonobj);
	var ti = new RegExp("null", "g");
	var jsontransferstr=jsonstr.replace(ti,"\"\"");
	var jsontransferobj=eval('(' + jsontransferstr + ')');
	return jsontransferobj;
}

