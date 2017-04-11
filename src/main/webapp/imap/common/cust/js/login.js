$(document).ready(function() {
	if (StringUtils.isNotBlank(custInfoJsonStr)) {
		getCustormerInfo(custInfoJson);
	}
	$("#custLoginTrigger").click(function() {
		login_dialog();
	});
	$("#resetButton").click(function() {
		$("#loginform").reset();
	});
	$("#exitLogin").click(function() {
		$.ajax({
			url : contextRootPath + "/custLogout.do"
		});
		$("#custLoginTrigger").show();
		$("#loginInfo").hide();

	});
});

function loadLoginForm() {

	var clickForm = $('<form id="loginform" name="loginform" method="post" class="pure-form">'
			+ '<fieldset>'
			+ '<div class="pure-control-group">'
			+ '<label for="name" class="input_label">用户名</label>'
			+ '<input id="name" type="text" placeHolder="请输入用户名" class="pure-input-2-3"/>'
			+ '</div>'
			+ '</fieldset>'
			+ '<fieldset>'
			+ '<div class="pure-control-group">'
			+ '<label for="password" class="input_label">密&nbsp;&nbsp;&nbsp;&nbsp;码</label>'
			+ '<input id="passwd" type="password" placeHolder="请输入密码" class="pure-input-2-3"/>'
			+ '</div>' + '</fieldset>' + '</form>');

	return clickForm;
}

function login_dialog() {
	new Ceair.LoginDialog({
		layout : loadLoginForm(),
		okStr : '登录',
		closeIconShow : true,
		okFunc : function() {
			return loginFormSubmit();
		}
	}).open();
	// 插码
}

function loginFormSubmit() {
	var loginFlag = false;
	var name = $("#name").val();
	var passwd = $("#passwd").val();

	if (StringUtils.isBlank(name) && StringUtils.isBlank(passwd)) {
		Ceair.alert({
			contentStr : "请输入用户名、密码！",
			okFunc : function() {
				login_dialog()();
			}
		});
	} else if (StringUtils.isBlank(name)) {
		Ceair.alert({
			contentStr : "请输入用户名！",
			okFunc : function() {
				login_dialog();
			}
		});
	} else if (StringUtils.isBlank(passwd)) {
		Ceair.alert({
			contentStr : "请输入密码！",
			okFunc : function() {
				login_dialog()();
			}
		});
	}

	var param = {};
	var serverUrl = "";
	serverUrl = shoppingApiContextPath + "/v1/custormer/custormer.json";
	//serverUrl = "http://127.0.0.1:8080/shoppingcs/v1/custormer/custormer.json";

	param = {
		name : encodeURI(name),
		passwd : passwd,
		serverUrl : serverUrl
	};

	var appKey = $("#appKey").val();
	var secret = $("#secret").val();
	var sign = getSign(appKey, secret, param);
	param["appKey"] = appKey;
	param["sign"] = sign;

	$.ajax({
		url : contextRootPath + "/custormerJson.do",
		data : param,
		type : "POST",
		async : false,
		dataType : "json",
		error : function() {
			a_alert({
				titleStr : "登录失败",
				contentStr : "请确认账户以及密码是否正确！",
				okStr : '确定',
				okBtnShow : true,
				okFunc : function() {

				}
			});
		},
		success : function(data) {
			var execStats = "登陆 ";
			if (data.rc == 0) {
				execStats = "查询成功";
				getCustormerInfo(data);
				loginFlag = true;
			} else {
				execStats += "-" + data.rmsg;
				Ceair.alert({
					contentStr : execStats,
					okFunc : function() {
						login_dialog()();
					}
				});
			}

			// 用户信息全局变量赋值
			custInfoJsonStr = JsonUtils.jsonToStr(data);
			custInfoJson = data;

		}
	});

	return loginFlag;
}

/**
 * 
 * @param data
 */
function getCustormerInfo(data) {
	var custormerSearchVOs = data.custormerSearchVOs;
	
	if (custormerSearchVOs) {
		var vo = "";
		var loginSuccess = "";
		var custInfoDetails="<div class='pure-u-1'>";
 		for ( var i = 0; i < custormerSearchVOs.length; i++) {
 			
			vo = custormerSearchVOs[0];
 			loginSuccess = vo.fullName;
 			var action_name="";
 			   if(vo.fullName  == "李四"){
 				  action_name="偏好乘坐15-19点的航班";
 			   }else if (vo.fullName == "张三"){
 				  action_name="偏好乘坐低价折扣舱";
 			   }else if (vo.fullName == "王五"){
 				  action_name="偏好乘坐15-19点的经济舱航班";
 			   }
			custInfoDetails += "<div class='pure-g' style='width:220px;'>";
			custInfoDetails += "<div class='pure-u-1-2'>";
			custInfoDetails += "<div class='li_title'> 姓名:</div>";
			custInfoDetails += "</div>";
			custInfoDetails += "<div class='pure-u-1-2'>";
			custInfoDetails += "<div class='li_box'>" + vo.fullName + "</div>";
			custInfoDetails += "</div>";
			custInfoDetails += "</div>";
			
			
			custInfoDetails += "<div class='pure-g' style='width:220px;'>";
			custInfoDetails += "<div class='pure-u-1-2'>";
			custInfoDetails += "<div class='li_title'> 身份证号:</div>";
			custInfoDetails += "</div>";
			custInfoDetails += "<div class='pure-u-1-2'>";
			custInfoDetails += "<div class='li_box'>" + vo.indvlCardNbr + "</div>";
			custInfoDetails += "</div>";
			custInfoDetails += "</div>";
			
			
			custInfoDetails += "<div class='pure-g' style='width:220px;'>";
			custInfoDetails += "<div class='pure-u-1-2'>";
			custInfoDetails += "<div class='li_title'> 乘机偏好:</div>";
			custInfoDetails += "</div>";
			custInfoDetails += "<div class='pure-u-1-2'>";
			custInfoDetails += "<div class='li_box'>" + action_name + "</div>";
			custInfoDetails += "</div>";
			custInfoDetails += "</div>";
			
			
			
//			custInfoDetails += "<div class='pure-g' style='width:240px;'>";
//			custInfoDetails += "<div class='pure-u-1-2'>";
//			custInfoDetails += "<div class='li_title'>乘坐公务舱次数 :</div>";
//			custInfoDetails += "</div>";
//			custInfoDetails += "<div class='pure-u-1-2'>";
//			custInfoDetails += "<div class='li_box'>" + vo.fb + "</div>";
//			custInfoDetails += "</div>";
//			custInfoDetails += "</div>";
//			
//			custInfoDetails += "<div class='pure-g' style='width:240px;'>";
//			custInfoDetails += "<div class='pure-u-1-2'>";
//			custInfoDetails += "<div class='li_title'>乘坐高等舱位次数 :</div>";
//			custInfoDetails += "</div>";
//			custInfoDetails += "<div class='pure-u-1-2'>";
//			custInfoDetails += "<div class='li_box'>" + vo.he + "</div>";
//			custInfoDetails += "</div>";
//			custInfoDetails += "</div>";
// 
//			custInfoDetails += "<div class='pure-g' style='width:240px;'>";
//			custInfoDetails += "<div class='pure-u-1-2'>";
//			custInfoDetails += "<div class='li_title'>乘坐中等舱位次数 :</div>";
//			custInfoDetails += "</div>";
//			custInfoDetails += "<div class='pure-u-1-2'>";
//			custInfoDetails += "<div class='li_box'>" + vo.me + "</div>";
//			custInfoDetails += "</div>";
//			custInfoDetails += "</div>";
//			 
//			custInfoDetails += "<div class='pure-g' style='width:240px;'>";
//			custInfoDetails += "<div class='pure-u-1-2'>";
//			custInfoDetails += "<div class='li_title'>乘坐低等舱位次数 :</div>";
//			custInfoDetails += "</div>";
//			custInfoDetails += "<div class='pure-u-1-2'>";
//			custInfoDetails += "<div class='li_box'>" + vo.le + "</div>";
//			custInfoDetails += "</div>";
//			custInfoDetails += "</div>";
// 
//			custInfoDetails += "<div class='pure-g' style='width:240px;'>";
//			custInfoDetails += "<div class='pure-u-1-2'>";
//			custInfoDetails += "<div class='li_title'>乘坐其他舱位次数 :</div>";
//			custInfoDetails += "</div>";
//			custInfoDetails += "<div class='pure-u-1-2'>";
//			custInfoDetails += "<div class='li_box'>" + vo.others + "</div>";
//			custInfoDetails += "</div>";
//			custInfoDetails += "</div>";
// 
//			custInfoDetails += "<div class='pure-g' style='width:240px;'>";
//			custInfoDetails += "<div class='pure-u-1-2'>";
//			custInfoDetails += "<div class='li_title'>乘坐0-10点次数 :</div>";
//			custInfoDetails += "</div>";
//			custInfoDetails += "<div class='pure-u-1-2'>";
//			custInfoDetails += "<div class='li_box'>" + vo.t010 + "</div>";
//			custInfoDetails += "</div>";
//			custInfoDetails += "</div>";
//	 
//			custInfoDetails += "<div class='pure-g' style='width:240px;'>";
//			custInfoDetails += "<div class='pure-u-1-2'>";
//			custInfoDetails += "<div class='li_title'>乘坐10-15点次数 :</div>";
//			custInfoDetails += "</div>";
//			custInfoDetails += "<div class='pure-u-1-2'>";
//			custInfoDetails += "<div class='li_box'>" + vo.t1015 + "</div>";
//			custInfoDetails += "</div>";
//			custInfoDetails += "</div>";
//
//			custInfoDetails += "<div class='pure-g' style='width:240px;'>";
//			custInfoDetails += "<div class='pure-u-1-2'>";
//			custInfoDetails += "<div class='li_title'>乘坐15-19点次数 :</div>";
//			custInfoDetails += "</div>";
//			custInfoDetails += "<div class='pure-u-1-2'>";
//			custInfoDetails += "<div class='li_box'>" + vo.t1519 + "</div>";
//			custInfoDetails += "</div>";
//			custInfoDetails += "</div>";
//
//			custInfoDetails += "<div class='pure-g' style='width:240px;'>";
//			custInfoDetails += "<div class='pure-u-1-2'>";
//			custInfoDetails += "<div class='li_title'>乘坐19-24点次数 :</div>";
//			custInfoDetails += "</div>";
//			custInfoDetails += "<div class='pure-u-1-2'>";
//			custInfoDetails += "<div class='li_box'>" + vo.t1924 + "</div>";
//			custInfoDetails += "</div>";
//			custInfoDetails += "</div>";
//			
//			custInfoDetails += "<div class='pure-g' style='width:240px;'>";
//			custInfoDetails += "<div class='pure-u-1-2'>";
//			custInfoDetails += "<div class='li_title'> 总飞行次数:</div>";
//			custInfoDetails += "</div>";
//			custInfoDetails += "<div class='pure-u-1-2'>";
//			custInfoDetails += "<div class='li_box'>" + vo.totalCountFly + "</div>";
//			custInfoDetails += "</div>";
//			custInfoDetails += "</div>";
			 
 
 		}
		custInfoDetails += "</div> ";

		$("#loginInfo").html(loginSuccess);
		$("#loginInfo").show();
		$("#loginInfo").qtip({
			content : custInfoDetails,
			position : {
				my : 'top center',
				at : 'bottom left',
				adjust: { x:  40, y: 5 } 
 				},
			 style: {
			      classes: 'websnapr qtip-blue',
 			    }
 				
		});
		$("#custLoginTrigger").hide();
	}
}

/**
 * 
 * @param data
 */
function findCustInfo(data) {
	var custormerSearchVOs = data.custormerSearchVOs;
	var custInfo = null;
	if (custormerSearchVOs) {
		for ( var i = 0; i < custormerSearchVOs.length; i++) {
			custInfo = custormerSearchVOs[0];
			break;
		}
	}
	return custInfo;
}

function hide(tag) {
	$("#light").hide();
	$("#fade").hide();
}
$("#exit").click(function() {
	$("#loginSuccess").html("");
	$("#custormerlogin").show();
});

 