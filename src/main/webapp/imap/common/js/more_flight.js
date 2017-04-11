var waitHandling  = new Ceair.LoadingDialog({
	contentStr: '系统处理中，请您稍等片刻........',
	noCancel: true
});

function getMoreFlight(obj){ 
	waitHandling.open();
	//开始检索时间
	var startTime = new Date();
	var executeTime = "";
	var tr = $(obj).parent().parent();
	//清空原有内容
//	clearFlightContent(tr);
	
	var travelMode = $('input[name="travelMode"]:checked').val();

	var param = {};
	var serverUrl = "";
	
	if (travelMode == 1) {
		serverUrl = shoppingApiContextPath + "/v1/invs/oneWayFlight.json";
		param = {
				ori : tr.find("#ori").text(),
				dest : tr.find("#dest").text(),
				flightDt : tr.find("#flightDt").text(),
				serverUrl : serverUrl
		};
	} else if (travelMode == 2){
		serverUrl = shoppingApiContextPath + "/v1/invs/oneWayFlightRound.json";
		param = {
				ori : tr.find("#ori").text(),
				dest : tr.find("#dest").text(),
				flightDt :tr.find("#flightDt").text(),
				rtndt : tr.find("#rtndt").text(),
				serverUrl : serverUrl
				
		};
	}

	
	 
    var appKey = $("#appKey").val();
    var secret = $("#secret").val();
    var sign = getSign(appKey,secret,param);
    param["appKey"]=appKey;
    param["sign"]=sign;
     
	$.ajax({
		url : contextRootPath + "/shoppingJson.do",
		data : param,
		type : "POST",
		cache: false,
	    async: true,
		dataType : "json",
		error : function() {
			a_alert({
				titleStr:"系统处理超时",
				contentStr: "系统处理异常，请稍收再试！",
				okStr: '确定',
				okBtnShow:true,
				okFunc:function() {
					
				}
			});
		},
		success : function(data) {
			var queryResultDesc;
			var execStats = "处理失败";
			executeTime = data.executeTime;
			if (data.rc == 0) {
				execStats = "查询成功";
				var size = 0;
				var travelMode = $('input[name="travelMode"]:checked').val();
				if(travelMode == 1){
					if(data.oneWayFlightSearchVOs){
						size = data.oneWayFlightSearchVOs.length;
					}
					execStats += "，共" + size + "条记录 ";
					if(size>0){
						setSingleFlight(data);
						$("#queryResultCode").val(JsonUtils.jsonFormat(data.oneWayFlightSearchVOs[0]));
					}
					else{
						noMoreflight();
					}
				} else if(travelMode == 2){
					if(data.oneWayFlightRoundSearchVOs){
						size = data.oneWayFlightRoundSearchVOs.length;
					}
					execStats += "，共" + size + "条记录 ";
					if(size>0){
						setDoubleFlight(data);
						$("#queryResultCode").val(JsonUtils.jsonFormat(data.oneWayFlightRoundSearchVOs[0]));
					}
					else{
						noMoreflight();
					}
				} else {
					execStats += "-没有查询记录";
				} 
			} else {
				execStats += "-" + data.rmsg;
			}
			//结束检索时间
			var endTime = new Date();
			var totalProcessTime = dateDiff(startTime, endTime, "ms");
			queryResultDesc = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>服务处理时间：</b>" + executeTime + "毫秒<br />";
			queryResultDesc += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>总处理时间：</b>" + totalProcessTime + "毫秒 <br />";
			queryResultDesc += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>处理信息：</b>" + execStats;
			$("#queryResultDesc").html(queryResultDesc);
			waitHandling.close();
		}
	});
}

 function setSingleFlight(data){
 	var oneWayFlightSearchVOs = data.oneWayFlightSearchVOs;
 	if (oneWayFlightSearchVOs) {
 		var queryResultTable ;
 		for (var i = 0; i < oneWayFlightSearchVOs.length; i++) {
 			var vo = oneWayFlightSearchVOs[i];
 			// 拼tr的id，形式：SHAPEK_MU5423_Y
 			var ori = vo.oricode;
 			var fltno1 = vo.fltno1;
 			var fltno2 = vo.fltno2;
 			// 无中转
			var dest = vo.destcode;
 			if(fltno2){
 				// 有中转
 				dest = vo.transcode;
 			}
 			// 第一段
 			var subclass1 = vo.subclass1;
 			queryResultTable += getResultTableSingle(ori,dest,fltno1,subclass1,vo.deptime1,vo.arrtime1,vo.fare);
 			
 			// 第二段
 			if(fltno2){
 				var ori = vo.transcode;
 				var dest = vo.destcode;
	 			var subclass2 = vo.subclass2;
	 			queryResultTable += getResultTableSingle(ori,dest,fltno2,subclass2,vo.deptime2,vo.arrtime2);
	 			
 			}
 		}
 		$("#queryResultDiv").load("../oneway-search/detail/app_demo_detail.jsp #single", function() {
		  $("#queryResultDetail").html(queryResultTable);
		});
 		
 	}
 }
 
 function setDoubleFlight(data){
 	var oneWayFlightRoundSearchVOs = data.oneWayFlightRoundSearchVOs;
 	if (oneWayFlightRoundSearchVOs) {
 		var queryResultTable;
 		// 限定显示条数
 		var size = oneWayFlightRoundSearchVOs.length;
 		if(size>20){
 			size = 20;
 		}
 		for (var i = 0; i < size; i++) {
 			var vo = oneWayFlightRoundSearchVOs[i];
 			// 拼tr的id，形式：SHAPEK_MU5423_Y
 			// 去程
 			var goOri = vo.oricode;
 			var goFltno1 = vo.gofltno1;
 			var goFltno2 = vo.gofltno2;
 			// 无中转
			var goDest = vo.destcode;
 			if(goFltno2){
 				// 有中转
 				goDest = vo.gotranscode;
 			}
 			// 第一段
 			var goSubclass1 = vo.gosubclass1;
 			queryResultTable += getResultTableDouble("去程",goOri,goDest,goFltno1,goSubclass1,vo.godeptime1,vo.goarrtime1,vo.gofare,vo.tlfare);
 			
 			// 第二段
 			if(goFltno2){
 				var goOri = vo.gotranscode;
 				var goDest = vo.destcode;
	 			var goSubclass2 = vo.gosubclass2;
	 			queryResultTable += getResultTableDouble("去程",goOri,goDest,goFltno2,goSubclass2,vo.godeptime2,vo.goarrtime2);
	 			
 			}
 			
 			// 回程
 			var bkOri = vo.destcode;
 			var bkFltno1 = vo.bkfltno1;
 			var bkFltno2 = vo.bkfltno2;
 			// 无中转
			var bkDest = vo.oricode;
 			if(bkFltno2){
 				// 有中转
 				bkDest = vo.bktranscode;
 			}
 			// 第一段
 			var bkSubclass1 = vo.bksubclass1;
 			queryResultTable += getResultTableDouble("回程",bkOri,bkDest,bkFltno1,bkSubclass1,vo.bkdeptime1,vo.bkarrtime1,vo.bkfare);
 			
 			// 第二段
 			if(bkFltno2){
 				var bkOri = vo.bktranscode;
 				var bkDest = vo.oricode;
	 			var bkSubclass2 = vo.bksubclass2;
	 			queryResultTable += getResultTableDouble("回程",bkOri,bkDest,bkFltno2,bkSubclass2,vo.bkdeptime2,vo.bkarrtime2);
	 			
 			}
 		}
 		$("#queryResultDiv").load("../oneway-search/detail/app_demo_detail.jsp #double", function() {
		  $("#queryResultDetail").html(queryResultTable);
		});
 	}
 }
 
// 返回单程table内容
 function getResultTableSingle(ori,dest,fltno,subclassArray,deptime,arrtime,fare){
	var queryResultTable;
	// 拼tr的id，形式：SHAPEK_MU5423_Y
	var subclass = subclassArray[0].subclass;
	var trID = ori + dest + "_" + fltno +"_"+ subclass;
	queryResultTable += "<tr id="+ trID + ">";
	queryResultTable += "<td>" + findAirportName(ori) + "-" + findAirportName(dest) + "</td>";
//		queryResultTable += "<td>" + findAirportName(dest) + "</td>";
	queryResultTable += "<td>" + new Date(deptime).formatDate("HH:mm") + "-" + new Date(arrtime).formatDate("HH:mm") + "</td>";
//		queryResultTable += "<td>" + new Date(vo.arrtime1).formatDate("HH:mm") + "</td>";
	queryResultTable += "<td>" + fltno + "</td>";
	queryResultTable += "<td>" + subclass + "</td>";
	if(fare){
		// 第一段显示总价
		queryResultTable += "<td>￥" + fare + "</td>";
	}
	else{
		// 第二段不需显示总价
		queryResultTable += "	<td></td>";
	}
	queryResultTable += "<td> " ;
	if(subclassArray && subclassArray.length > 1){
		queryResultTable += "<div id='moreSubclass'  class='pure-button pure-button-primary' onclick='clickSubclass(this)'>更多舱位</div>";
	}
	else{
		queryResultTable += "<div id='moreSubclass' disabled=true class='pure-button pure-button-primary' '>更多舱位</div>";
	}
//		queryResultTable += "<div id='booking' class='pure-button pure-button-primary'>预订</div>";
	queryResultTable += "</td>" ;
	queryResultTable += "</tr>";
	
	var fltId =  ori + dest +"_"+ fltno;
	queryResultTable += setSubclass(subclassArray,3,fltId);
	return queryResultTable;
 }
 
// 返回往返table的内容
 function getResultTableDouble(travelMode,ori,dest,fltno,subclassArray,deptime,arrtime,fare,tlfare){
		var queryResultTable;
		// 拼tr的id，形式：SHAPEK_MU5423_Y
		var subclass = subclassArray[0].subclass;
		var trID = ori + dest + "_" + fltno +"_"+ subclass;
		queryResultTable += "<tr id="+ trID + ">";
		queryResultTable += "<td>" + travelMode + "</td>";
		queryResultTable += "<td>" + findAirportName(ori) + "-" + findAirportName(dest) + "</td>";
//		queryResultTable += "<td>" + findAirportName(destGo) + "</td>";
		queryResultTable += "<td>" + new Date(deptime).formatDate("HH:mm") + "-" + new Date(arrtime).formatDate("HH:mm") + "</td>";
//		queryResultTable += "<td>" + new Date(vo.goarrtime1).formatDate("HH:mm") + "</td>";
		queryResultTable += "<td>" + fltno + "</td>";
		if(tlfare){
			// 去程第一段显示总价
			queryResultTable += "<td >￥" + tlfare + "</td>";
		}
		else{
			// 其他不需显示总价
			queryResultTable += "	<td></td>";
		}
		queryResultTable += "<td>" + subclass + "</td>";
		if(fare){
			// 第一段显示总价
			queryResultTable += "<td>￥" + fare + "</td>";
		}
		else{
			// 第二段不需显示总价
			queryResultTable += "	<td></td>";
		}
		queryResultTable += "<td> ";
		if(subclassArray && subclassArray.length > 1){
			queryResultTable += "<div id='moreSubclass'  class='pure-button pure-button-primary' onclick ='clickSubclass(this);'>更多舱位</div>";
		}
		else{
			queryResultTable += "<div id='moreSubclass' disabled=true class='pure-button pure-button-primary' '>更多舱位</div>";
		}
//			queryResultTable += "<div id='booking' class='pure-button pure-button-primary'>预订</div>";
		queryResultTable += "</td>" ;
		queryResultTable += "</tr>";
		var fltId =  ori + dest +"_"+ fltno;
		queryResultTable += setSubclass(subclassArray,5,fltId);
		return queryResultTable;
 }
 
//返回更多舱位内容
function setSubclass(subclass,colspan,fltId){
	var subclass1ResultTable="";
 	if (subclass  && subclass.length > 1 ) {
 		for (var i = 1; i < subclass.length; i++) {
 			var svo = subclass[i];
 			// 拼tr的id，形式：SHAPEK_MU5423_Y
 			var trID = fltId +"_"+ svo.subclass;
 			subclass1ResultTable += "<tr id="+ trID + " style='display:none;' >";
 			// 前面合并的格数
 			for(var j=0;j<colspan;j++){
//	 				subclass1ResultTable += "	<td colspan= "+ colspan +  "></td>";
 				subclass1ResultTable += "	<td></td>";
 			}
 			// 舱位和价格
 			subclass1ResultTable += "	<td>" + svo.subclass + "</td>";
 			subclass1ResultTable += "	<td>￥" + svo.price + "</td>";
 			// 最后空一格
	 		subclass1ResultTable += "	<td></td>";
 			subclass1ResultTable += "</tr>";
 		}
 		
 	}
 	return subclass1ResultTable;
}
 
// 隐藏、显示更多舱位
function clickSubclass(obj) {
	// 父元素tr的id
	var trId = $(obj).parent().parent().attr('id');
	// 去掉最后两位舱位信息
	var fltId = trId.substring(0,trId.length-2);
	// 从按钮的下一行开始遍历
	var trAll =  $(obj).parent().parent().nextAll();
	trAll.each(function(i){
		// 该行tr的id
		var thisTrId =  $(this).attr('id');
		// 去掉最后两位舱位信息
		var thisfltId = thisTrId.substring(0,trId.length-2);
		// 该行如果航段、no、起始地、目的地、航班号相同，则是更多舱位
		if(fltId == thisfltId){
			$(this).toggle();;
		}
		// 否则是下一条记录，不必再遍历
		else {
			return false;
		}
	});
}
 
function noMoreflight() {
	a_alert({
		titleStr : "航班详情",
		contentStr : "没有更多航班信息",
		okStr : '确定',
		okBtnShow : true,
		okFunc : function() {

		}
	});
} 
// function clearFlightContent(tr){
//	 tr.find("#flightDetailTable").remove();
//}
