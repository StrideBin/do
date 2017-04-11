
var waitHandling  = new Ceair.LoadingDialog({
	contentStr: '航班信息查询中，请您稍等片刻........',
	noCancel: true
});
var dataArray = "";
$(document).ready(function() {
	
	//初始化页面规则
	initPageElementRule();	
	
	//查询按钮提交
	$("#search").click(function() {
		searchFormSubmit();
	});
	
	//回车提交
     $('#question').bind('keypress',function(event){
             if(event.keyCode == "13")    
             {
            	 searchFormSubmit();
             }
         });
});

/**
 * 语义搜索
 */
function searchFormSubmit() {
	waitHandling.open();
	//清空内容
	clearContent();
	clearOverlays();
	initMarkers();
	
	var param = {};
	var serverUrl = "";
	serverUrl = contextRootPath + "/semSrch/aiQryFltRte.do";
	param = {
		question : $("#question").val(),
		userId : 'userId',
		platform : 'web',
		chanCode : "38"
	};
	
	$.ajax({
		url : serverUrl,
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
			data = data[0];
			dataArray = data;
			if(data.busData){
				//航班搜索展示
				if(data.busData.fltRtes){
					fltView(data);
				}
				//最低价页面展示
				if(data.busData.minPriceInfoVOs){
					lowBudgetView(data);
				}
			}else{		
				$(".errorMsg").text("对不起,我不太明白您在说什么。");
				$("#msgModal").show();
				$("#queryResultTable").html("");
				$("#queryResultTableDetail").html("");
				waitHandling.close();
				setTimeout(function() {
					$("#msgModal").hide();
					$(".errorMsg").text("很抱歉,没有查询到合适的航班。");
				}, 1500);
			}
		}
	});
}

//航班搜索展示
function fltView(data){
	if (data.transRslt.rsltSts == 0) {
		var fltRtnRtesSize = data.busData.fltRtnRtes.length;
		if (fltRtnRtesSize == 0) {
			setFltSingle(data);
		} else if (fltRtnRtesSize > 0) {
			setFltDouble(data);
		} else {
		}
	} 
		waitHandling.close();
	$("#queryResultTable").show();
}

function clearContent(){
	$("#queryResultTable").html("");
	$("#queryResultTableDetail").html("");
}

/**
 * 单程航班信息
 * 
 * @param data
 */
function setFltSingle(data) {
	var resData = data.busData.fltRtes;
	// 最低价舱位信息
	// 航班详细信息
	var queryResultTable = "";
	var queryResultTableDetail = "";
	if (resData) {	
		showFloatFlight(resData, null,0);
	}
}

/**
 * 往返航班信息
 * 
 * @param data
 */
function setFltDouble(data) {
	var resData = data.busData.fltRtes;
	var resDataRtn = data.busData.fltRtnRtes;
	// 最低价舱位信息
	// 航班详细信息
	var queryResultTable = "";
	var queryResultTableDetail = "";
	if (resData !=null && resData !="" &&  resDataRtn !=null && resDataRtn !="") {	
		showRtnFloatFlight(resData,resDataRtn, null,0);
	}	
}

//最低价页面展示
function lowBudgetView(data){
	if (data.transRslt.rsltSts == 0) {
		var minPriceInfoVOsSize = data.busData.minPriceInfoVOs.length;
		if(minPriceInfoVOsSize == 1){
			setSemaBudgetSingle(data);
		} else if(minPriceInfoVOsSize == 2){
			setSemaBudgetDouble(data);
		} 
	} else {
	}
		waitHandling.close();
	$("#queryResultTable").show();
}

/**
 * 最低价日历
 * 
 * @param data
 */
function setSemaBudgetSingle(data) {
	//多机场多目的地时选最低价
	var resData = data.busData.minPriceInfoVOs[0].segmentInfoOutputs;
 	for(var i=0; i<resData.length-1; i++){
 		if(resData[i].flightDt.time == resData[i+1].flightDt.time){
			if(resData[i].lowestPrice < resData[i+1].lowestPrice){
				resData.remove(i+1)
			}else{
				resData.remove(i)
			}
		}
 	}	
	// 最低价舱位信息
	// 航班详细信息
	var queryResultTable = "";
 	if (resData) {
		 queryResultTable += "<table>";
		 queryResultTable += "<tr style ='background-color:blue'>";
		 queryResultTable += "<td>星期日";
		 queryResultTable += "</td>";
		 queryResultTable += "<td>星期一";
		 queryResultTable += "</td>";
		 queryResultTable += "<td>星期二";
		 queryResultTable += "</td>";
		 queryResultTable += "<td>星期三";
		 queryResultTable += "</td>";
		 queryResultTable += "<td>星期四";
		 queryResultTable += "</td>";
		 queryResultTable += "<td>星期五";
		 queryResultTable += "</td>";
		 queryResultTable += "<td>星期六";
		 queryResultTable += "</td>";
		 queryResultTable += "</tr>";
		 for(var i = 0;i < 5 ; i++ ){
			 queryResultTable += "<tr>";
				 for(var j = 0 ;j < 7 ;j++ ){
						 queryResultTable += "<td style = 'width:20px ;height: 10px'> " ;
 						 queryResultTable += "</td>";
					} 
			 queryResultTable += "</tr>"; 
		 }
	
		queryResultTable += "</table>";
		$("#queryResultTable").html(queryResultTable);
		
		//取第一个日期
		 var whichday = new Date(resData[0].flightDt.time);
		 //获取第一个日期从第几个格子开始画
		 whichday = whichday.getDay()+7;
		 var insertPrice = "";
 
		 for(var h = 0; h < resData.length ; h++){
			 if(h==0){
				 insertPrice += "<div class = 'click_id' ";
				 insertPrice += ">";
				 insertPrice +="<div>";
				 insertPrice += new Date(resData[h].flightDt.time).formatDate("yyyy/MM/dd");
				 insertPrice +="</div>";
				 insertPrice +="<div><dfn>￥</dfn><b>";
				 insertPrice += resData[h].lowestPrice;
				 insertPrice +="</b></div>";
				 insertPrice += "<div id ='oriEng' style='display:none'>" + resData[h].oriEng + "</div>";
				 insertPrice += "<div id ='desEng' style='display:none'>" + resData[h].desEng+ "</div>";
				 insertPrice += "<div id ='startFltDt' style='display:none'>" + new Date(resData[h].flightDt.time).formatDate("yyyy-MM-dd") + "</div>";
				 insertPrice +="</div>";	
				 $("td").eq(whichday).html(insertPrice);
				 insertPrice="";
			 }else{
				var s1= new Date(resData[h-1].flightDt.time) ;
				var s2= new Date(resData[h].flightDt.time) ;
				var days = s2.getTime() - s1.getTime();
				var time = parseInt(days / (1000 * 60 * 60 * 24));
				
				 insertPrice += "<div class = 'click_id' ";
				 insertPrice += ">";
				 insertPrice +="<div>";
				 insertPrice += new Date(resData[h].flightDt.time).formatDate("yyyy/MM/dd");
				 insertPrice +="</div>";
				 insertPrice +="<div><dfn>￥</dfn><b>";
				 insertPrice += resData[h].lowestPrice;
				 insertPrice +="</b></div>";
				 insertPrice += "<div id ='oriEng' style='display:none'>" + resData[h].oriEng + "</div>";
				 insertPrice += "<div id ='desEng' style='display:none'>" + resData[h].desEng+ "</div>";
				 insertPrice += "<div id ='startFltDt' style='display:none'>" + new Date(resData[h].flightDt.time).formatDate("yyyy-MM-dd") + "</div>";
				 insertPrice +="</div>";
				 whichday = whichday + time;			 
				 $("td").eq(whichday).html(insertPrice);
				 insertPrice="";	 
				 }
			 }
		 
		 $('.click_id').click(function(){
			 //$('#queryResultTable').css("display","none");
			   $('#queryResultTable').hide();
 			 var dateVal = $(this).find("div").eq(4).html(),
			     oriVal = $(this).find("div").eq(2).html(),
			     destVal = $(this).find("div").eq(3).html();
			    //flightDetail(dateVal,null,oriVal,destVal,null) ;
 			      flightDetailClick(dateVal,null,oriVal,destVal,null);
		 });
		 
		}	 
}

/**
 * 往返航班信息
 * 
 * @param data
 */
function setSemaBudgetDouble(data) {
  	var resData = data.busData.minPriceInfoVOs[0];
 	var rtnResData = data.busData.minPriceInfoVOs[1];
 	
 	//多机场多目的地时选最低价
	var resDataSegment = resData.segmentInfoOutputs;
 	for(var i=0; i<resDataSegment.length-1; i++){
 		if(resDataSegment[i].flightDt.time == resDataSegment[i+1].flightDt.time){
			if(resDataSegment[i].lowestPrice < resDataSegment[i+1].lowestPrice){
				resDataSegment.remove(i+1)
			}else{
				resDataSegment.remove(i)
			}
		}
 	}
 	
 	var rtnResDataSegment = rtnResData.segmentInfoOutputs;
 	for(var i=0; i<rtnResDataSegment.length-1; i++){
 		if(rtnResDataSegment[i].flightDt.time == rtnResDataSegment[i+1].flightDt.time){
			if(rtnResDataSegment[i].lowestPrice < rtnResDataSegment[i+1].lowestPrice){
				rtnResDataSegment.remove(i+1)
			}else{
				rtnResDataSegment.remove(i)
			}
		}
 	}

	var insertPrice ="";
	var queryResultTable = "";
 	
	//绘制7x7表格
	queryResultTable +="<table>";
	for(var i = 0;i < 7;i++){
		queryResultTable +="<tr>";
			for(var j = 0;j < 7;j++){
				queryResultTable +="<td style = 'width:20px ;height: 10px'>";
				queryResultTable +="</td>";
			}
		queryResultTable +="</tr>";
	}
	
	queryResultTable +="</table>";
 	$("#queryResultTable").html(queryResultTable);
	 whichday = 0;
 	for(var i =0;i < resData.segmentInfoOutputs.length;i++){
 		for(var j = 0;j < rtnResData.segmentInfoOutputs.length;j++){
 			var myDate=new Date();
 			var Today = myDate.setDate(myDate.getDate()-1);
			 whichday = i*7+j;
 			if(resData.segmentInfoOutputs[i].flightDt.time < rtnResData.segmentInfoOutputs[j].flightDt.time && resData.segmentInfoOutputs[i].flightDt.time >= Today){
 				 insertPrice += "<div class = 'click_id' ";
				 insertPrice += ">";

				 insertPrice +="<div>";
				 insertPrice += new Date(resData.segmentInfoOutputs[i].flightDt.time).formatDate("yyyy/MM/dd");
				 insertPrice +="<br />";
				 insertPrice += resData.segmentInfoOutputs[i].oriEng+"-";
				 insertPrice += resData.segmentInfoOutputs[i].desEng;
				 insertPrice +="<dfn>￥</dfn><b>";
				 insertPrice += resData.segmentInfoOutputs[i].lowestPrice;
				 insertPrice +="</b></div>";

				 insertPrice +="<div>";
				 insertPrice += new Date(rtnResData.segmentInfoOutputs[j].flightDt.time).formatDate("yyyy/MM/dd");
				 insertPrice +="<br />";
				 insertPrice += rtnResData.segmentInfoOutputs[j].oriEng+"-";
				 insertPrice += rtnResData.segmentInfoOutputs[j].desEng;
				 insertPrice +="<dfn>￥</dfn><b>";
				 insertPrice += rtnResData.segmentInfoOutputs[j].lowestPrice;
				 insertPrice +="</b></div>";
		 
				 insertPrice += "<div id ='oriEng' style='display:none'>" + resData.segmentInfoOutputs[i].oriEng + "</div>";
				 insertPrice += "<div id ='desEng' style='display:none'>" + resData.segmentInfoOutputs[i].desEng + "</div>";
				 insertPrice += "<div id ='startFltDt' style='display:none'>" + new Date(resData.segmentInfoOutputs[i].flightDt.time).formatDate("yyyy-MM-dd") + "</div>";
				 insertPrice += "<div id ='startRtnFltDt' style='display:none'>" + new Date(rtnResData.segmentInfoOutputs[j].flightDt.time).formatDate("yyyy-MM-dd") + "</div>";

				 insertPrice +="</div>";
 				 $("td").eq(whichday).html(insertPrice);
				 insertPrice="";			
 			}
 		}
	}
 	
 	 $('.click_id').click(function(){
 		    $('#queryResultTable').hide();
			 var dateVal = $(this).find("div").eq(4).html(),
			 rtndateVal = $(this).find("div").eq(5).html(),
		     oriVal = $(this).find("div").eq(2).html(),
		     destVal = $(this).find("div").eq(3).html();
			 //flightDetail(dateVal,rtndateVal,oriVal,destVal,null) ;	
			 flightDetailClick(dateVal,null,oriVal,destVal,null);
	 });
}

//删除数组元素
Array.prototype.remove=function(dx) { 
    if(isNaN(dx)||dx>this.length){return false;} 
    for(var i=0,n=0;i<this.length;i++) 
    { 
        if(this[i]!=this[dx]) 
        { 
            this[n++]=this[i] 
        } 
    } 
    this.length-=1 
}
function more(objId) {
	$("#queryResultTable").hide();
	$("#queryResultTableDetail").show();
	$("#" + objId).show();
	$("#callBack").show();
}

  function flightDetail(dateVal,rtndateVal,oriVal,destVal,transferAirportCode)  {
	waitHandling.open();
 	var travelMode = $('input[name="travelMode"]:checked').val();
 	var depTime=dateVal; 
	 	var dep=new Date(depTime.replace("-", "/").replace("-", "/")); 
	 	var now=new Date(GetDateStr(0).replace("-", "/").replace("-", "/")); 
	 	
 	if(dep<now){
 		waitHandling.close();
 		return;
 	} 	

 	 // 查询参数赋值
	var transReqPkg = new TransReqPkg();
	var fltRteQry = new FltRteQry();
	fltRteQry.oriEng=oriVal;
	fltRteQry.desEng=destVal;
	fltRteQry.transferEng=transferAirportCode;
	fltRteQry.odType="0";
	fltRteQry.strStartFltDt=dateVal;
	fltRteQry.strStartRtnFltDt = rtndateVal;
 	transReqPkg.busData = fltRteQry;
	var transChan = new TransChan();
	transChan.chanCode = "38";
	transReqPkg.transChan = transChan; 	
	var param = {};
	var serverUrl = "";
 	if (travelMode == 1 ) {
 		serverUrl = contextRootPath + "/fltSrch/qryFltRte.do";
	    param = {
		                  "fltTransReqPkg" : JsonUtils.jsonToStr(transReqPkg) };
 	}else {
 	 	if(rtndateVal!=null&&rtndateVal!=""){
 	 	 	var depTime=dateVal; 
 	 	 	var dep=new Date(depTime.replace("-", "/").replace("-", "/")); 
 	 	 	var rtndateTime=rtndateVal; 
 	 	 	var rtn=new Date(rtndateTime.replace("-", "/").replace("-", "/")); 
 	 	 	if(rtn<dep){
 	 	 		waitHandling.close();
 	 	 		return;
 	 	 	}
 	 	}
 		serverUrl = contextRootPath + "/fltSrch/qryFltRndRte.do";
 		//serverUrl = "http://localhost:9002/imap/fltSrch/qryFltRndRte.do";
	    param = {
		                  "fltTransReqPkg" : JsonUtils.jsonToStr(transReqPkg) };
 	}

	$.ajax({
		url :serverUrl,
		data : param,
		type : "POST",
		cache: false,
	    async: true,
		dataType : "json",
		error : function() {
			a_alert({
				titleStr:"系统处理超时",
				contentStr: "系统处理异常，请稍后再试！",
				okStr: '确定',
				okBtnShow:true,
				okFunc:function() {	
				}
			});
		},
		complete: function(data) {
			hideElement($('#loading'));
		},
		success:function(data) {
			if(data[0].transRslt.rsltDesc=="成功"){
				dataArray=data[0];
			   data = data[0].busData;
			if (data != null && data != "") {
				if(data.fltRtes !=null && data.fltRtes !=""){
					if(data.fltRtnRtes !=null && data.fltRtnRtes !=""){
						refreshDepartReturnAirportMarkers(data.fltRtes[0].oriEng, transferAirportCode, data.fltRtes[0].desEng);
						//refreshDepartReturnAirportMarkers(data.fltRtnRtes[0].oriEng, transferAirportCode, data.fltRtnRtes[0].desEng);
						drawCurveLine(data.fltRtes[0].oriEng, transferAirportCode, data.fltRtes[0].desEng);
						drawRtnCurveLine(data.fltRtnRtes[0].oriEng, transferAirportCode, data.fltRtnRtes[0].desEng);
						buildFlights(data.fltRtes, data.fltRtnRtes,transferAirportCode,travelMode);
					}else {
						refreshDepartReturnAirportMarkers(data.fltRtes[0].oriEng, transferAirportCode, data.fltRtes[0].desEng);
					    drawCurveLine(data.fltRtes[0].oriEng, transferAirportCode, data.fltRtes[0].desEng);
					    buildFlights(data.fltRtes,null, transferAirportCode,travelMode);
					}			
			   }
			}
			}else{
				$("#msgModal").show();
				setTimeout(function () {
					$("#msgModal").hide();
			    }, 3000);			
			}	
			waitHandling.close();
		}		
	});
}
  
  function flightDetailClick(dateVal,rtndateVal,oriVal,destVal,transferAirportCode)  {
		waitHandling.open();
	 	var travelMode = $('input[name="travelMode"]:checked').val();
	 	var depTime=dateVal; 
		 	var dep=new Date(depTime.replace("-", "/").replace("-", "/")); 
		 	var now=new Date(GetDateStr(0).replace("-", "/").replace("-", "/")); 
		 	
	 	if(dep<now){
	 		waitHandling.close();
	 		return;
	 	} 	

	 	 // 查询参数赋值
		var transReqPkg = new TransReqPkg();
		var fltRteQry = new FltRteQry();
		fltRteQry.oriEng=oriVal;
		fltRteQry.desEng=destVal;
		fltRteQry.transferEng=transferAirportCode;
		fltRteQry.odType="0";
		fltRteQry.strStartFltDt=dateVal;
		fltRteQry.strStartRtnFltDt = rtndateVal;
	 	transReqPkg.busData = fltRteQry;
		var transChan = new TransChan();
		transChan.chanCode = "38";
		transReqPkg.transChan = transChan; 	
		var param = {};
		var serverUrl = "";
	 	if (travelMode == 1 ) {
	 		serverUrl = contextRootPath + "/fltSrch/qryFltRte.do";
		    param = {
			                  "fltTransReqPkg" : JsonUtils.jsonToStr(transReqPkg) };
	 	}else {
	 	 	if(rtndateVal!=null&&rtndateVal!=""){
	 	 	 	var depTime=dateVal; 
	 	 	 	var dep=new Date(depTime.replace("-", "/").replace("-", "/")); 
	 	 	 	var rtndateTime=rtndateVal; 
	 	 	 	var rtn=new Date(rtndateTime.replace("-", "/").replace("-", "/")); 
	 	 	 	if(rtn<dep){
	 	 	 		waitHandling.close();
	 	 	 		return;
	 	 	 	}
	 	 	}
	 		serverUrl = contextRootPath + "/fltSrch/qryFltRndRte.do";
	 		//serverUrl = "http://localhost:9002/imap/fltSrch/qryFltRndRte.do";
		    param = {
			                  "fltTransReqPkg" : JsonUtils.jsonToStr(transReqPkg) };
	 	}

		$.ajax({
			url :serverUrl,
			data : param,
			type : "POST",
			cache: false,
		    async: true,
			dataType : "json",
			error : function() {
				a_alert({
					titleStr:"系统处理超时",
					contentStr: "系统处理异常，请稍后再试！",
					okStr: '确定',
					okBtnShow:true,
					okFunc:function() {	
					}
				});
			},
			complete: function(data) {
				hideElement($('#loading'));
			},
			success:function(data) {
				if(data[0].transRslt.rsltDesc=="成功"){
					dataArray=data[0];
				   data = data[0].busData;
				if (data != null && data != "") {
					if(data.fltRtes !=null && data.fltRtes !=""){
						if(data.fltRtnRtes !=null && data.fltRtnRtes !=""){
							refreshDepartReturnAirportMarkers(data.fltRtes[0].oriEng, transferAirportCode, data.fltRtes[0].desEng);
							drawAreaCurveLine(data.fltRtes[0].oriEng, data.fltRtes[0].desEng);
							drawRtnCurveLine(data.fltRtnRtes[0].oriEng, transferAirportCode, data.fltRtnRtes[0].desEng);
							buildFlights(data.fltRtes, data.fltRtnRtes,transferAirportCode,travelMode);
						}else {
							refreshDepartReturnAirportMarkers(data.fltRtes[0].oriEng, transferAirportCode, data.fltRtes[0].desEng);
							drawAreaCurveLine(data.fltRtes[0].oriEng, data.fltRtes[0].desEng);
						    buildFlights(data.fltRtes,null, transferAirportCode,travelMode);
						}			
				   }
				}
				}else{
					$("#msgModal").show();
					setTimeout(function () {
						$("#msgModal").hide();
				    }, 3000);			
				}	
				waitHandling.close();
			}		
		});
	}
  
function flightAreaDetail(dateVal,rtndateVal,oriVal,destVal,transferAirportCode)  {
		waitHandling.open();
	 	
	 	 // 查询参数赋值
		var transReqPkg = new TransReqPkg();
		var fltRteQry = new FltRteQry();
		fltRteQry.oriEng=oriVal;
		fltRteQry.desEng=destVal;
		fltRteQry.transferEng=transferAirportCode;
		fltRteQry.odType="0";
		fltRteQry.strStartFltDt=dateVal;
		fltRteQry.strStartRtnFltDt = rtndateVal;
	 	transReqPkg.busData = fltRteQry;
		var transChan = new TransChan();
		transChan.chanCode = "38";
		transReqPkg.transChan = transChan; 	
		var param = {};
		var serverUrl = "";
		
	 	serverUrl = contextRootPath + "/fltSrch/qryDayLprFltRte.do";
		 param = {
			              "fltTransReqPkg" : JsonUtils.jsonToStr(transReqPkg) };
		$.ajax({
			url :serverUrl,
			data : param,
			type : "POST",
			cache: false,
		    async: true,
			dataType : "json",
			error : function() {
				a_alert({
					titleStr:"系统处理超时",
					contentStr: "系统处理异常，请稍后再试！",
					okStr: '确定',
					okBtnShow:true,
					okFunc:function() {	
					}
				});
			},
			complete: function(data) {
				hideElement($('#loading'));
			},
			success:function(data) {
				data = data[0].busData;
				if (data != null && data != "") {
					if(data.fltRtes !=null && data.fltRtes !=""){
							refreshDepartReturnAirportMarkers(data.fltRtes[0].oriEng, transferAirportCode, data.fltRtes[0].desEng);
						    buildAreaFlights(data.fltRtes);
				   }
				}	
				waitHandling.close();
			}		
		});
	}

function flightAreaDetailInfo(dateVal,rtndateVal,oriVal,destVal,transferAirportCode)  {
	waitHandling.open();
 	
 	 // 查询参数赋值
	var transReqPkg = new TransReqPkg();
	var fltRteQry = new FltRteQry();
	fltRteQry.oriEng=oriVal;
	fltRteQry.desEng=destVal;
	fltRteQry.transferEng=transferAirportCode;
	fltRteQry.odType="0";
	fltRteQry.strStartFltDt=dateVal;
	fltRteQry.strStartRtnFltDt = rtndateVal;
 	transReqPkg.busData = fltRteQry;
	var transChan = new TransChan();
	transChan.chanCode = "38";
	transReqPkg.transChan = transChan; 	
	var param = {};
	var serverUrl = "";
	
 	serverUrl = contextRootPath + "/fltSrch/qryDayLprFltRte.do";
	 param = {
		              "fltTransReqPkg" : JsonUtils.jsonToStr(transReqPkg) };
	$.ajax({
		url :serverUrl,
		data : param,
		type : "POST",
		cache: false,
	    async: true,
		dataType : "json",
		error : function() {
			a_alert({
				titleStr:"系统处理超时",
				contentStr: "系统处理异常，请稍后再试！",
				okStr: '确定',
				okBtnShow:true,
				okFunc:function() {	
				}
			});
		},
		complete: function(data) {
			hideElement($('#loading'));
		},
		success:function(data) {
			dataArray=data[0];
			data = data[0].busData;
			if (data != null && data != "") {				    
					    if(data.fltRtnRtes !=null && data.fltRtnRtes !=""){
							refreshDepartReturnAirportMarkers(data.fltRtes[0].oriEng, transferAirportCode, data.fltRtes[0].desEng);
							//refreshDepartReturnAirportMarkers(data.fltRtnRtes[0].oriEng, transferAirportCode, data.fltRtnRtes[0].desEng);
							//drawCurveLine(data.fltRtes[0].oriEng, transferAirportCode, data.fltRtes[0].desEng);
							drawAreaCurveLine(data.fltRtes[0].oriEng, data.fltRtes[0].desEng);
							drawRtnCurveLine(data.fltRtnRtes[0].oriEng, transferAirportCode, data.fltRtnRtes[0].desEng);
							buildFlights(data.fltRtes, data.fltRtnRtes,transferAirportCode,1);
						}else {
							refreshDepartReturnAirportMarkers(data.fltRtes[0].oriEng, transferAirportCode, data.fltRtes[0].desEng);
						    //drawCurveLine(data.fltRtes[0].oriEng, transferAirportCode, data.fltRtes[0].desEng);
							drawAreaCurveLine(data.fltRtes[0].oriEng, data.fltRtes[0].desEng);
						    buildFlights(data.fltRtes,null, transferAirportCode,1);
						}
			}	
			waitHandling.close();
		}		
	});
}

//新更多航班信息
function buildFlightDetails() {
	var set = dataArray;
	var resflts = dataArray.busData.fltRtes;
	var resfltRtns = dataArray.busData.fltRtnRtes;
	OpenWindow=window.open();
	display(resflts,resfltRtns,OpenWindow) ; 
	dataArray = set;
}

  //更多航班信息_原始版本
  function buildFlightDetails_Yuan() {
	  waitHandling.open();
	  OpenWindow=window.open();
	  var oriVal = "";
	  var destVal ="";
	  var dateVal = $('#depart-date')[0].value;
	  var dateValRtn = $('#return-date')[0].value;
	  
	  if($('#airportori')[0] !=undefined ){ 
		    oriVal=$('#airportori')[0].textContent;
	  }else {
		    oriVal ="PVG";
	  }
	  
	  if($('#airportdes')[0] !=undefined ){ 
		  destVal=$('#airportdes')[0].textContent;
	  }else {
		  destVal="PEK";    
	  }
	    
	  /*免优票组不需要中转航班*/
	 /* if($('#airportori')[0] ==undefined ){ 
		  if($('#airportoriO')[0] !=undefined ){
			  oriVal=$('#airportoriO')[0].textContent;
		  }
	  }else {
		      oriVal=$('#airportori')[0].textContent;
	  }
	  
	  if($('#airportdes')[0] ==undefined ){ 
		  if($('#airportdesD')[0] !=undefined ){
			  destVal=$('#airportdesD')[0].textContent;
		  }
	  }else {
		      destVal=$('#airportdes')[0].textContent;
	  }*/
	  
	  var travelMode = $('input[name="travelMode"]:checked').val();
	  if(traveSign==1){travelMode=1};
	 	 // 查询参数赋值
		var transReqPkg = new TransReqPkg();
		var fltRteQry = new FltRteQry();
		fltRteQry.oriEng=getCodeByName(oriVal);
		fltRteQry.desEng=getCodeByName(destVal);
		fltRteQry.transferEng=null;
		fltRteQry.odType="0";
		fltRteQry.strStartFltDt=dateVal;
		fltRteQry.strStartRtnFltDt = dateValRtn;
	 	transReqPkg.busData = fltRteQry;
		var transChan = new TransChan();
		transChan.chanCode = "38";
		transReqPkg.transChan = transChan; 	
		var param = {};
		var serverUrl = "";
	 	if (travelMode == 1 ) {
	 		serverUrl = contextRootPath + "/fltSrch/qryFltRte.do";
		param = {
			"fltTransReqPkg" : JsonUtils.jsonToStr(transReqPkg) };
	 	}else {
	 		serverUrl = contextRootPath + "/fltSrch/qryFltRndRte.do";
		param = {
			"fltTransReqPkg" : JsonUtils.jsonToStr(transReqPkg) };
	 	}
		$.ajax({
			url :serverUrl,
			data : param,
			type : "POST",
			cache: false,
		    async: true,
			dataType : "json",
			error : function() {
				a_alert({
					titleStr:"系统处理超时",
					contentStr: "系统处理异常，请稍后再试！",
					okStr: '确定',
					okBtnShow:true,
					okFunc:function() {	
					}
				});
			},
			complete: function(data) {
				hideElement($('#loading'));
			},
			success:function(data) {
				data = data[0].busData;
				
				if (data != null && data != "") {
						display(data.fltRtes,data.fltRtnRtes,OpenWindow) ; 
				}				
				waitHandling.close();
			}		
		});
  }

function display(resData,resDateRtn,OpenWindow) {
	
	      var totalfligths = resData.length;
	      var totalfligthsRtn = resDateRtn.length;
	      var totalNum = totalfligthsRtn + totalfligths;
	      OpenWindow.document.writeln("<HTML>");
		  OpenWindow.document.write("<TITLE>更多航班详细信息</TITLE>") ;
		  OpenWindow.document.write("<BODY BGCOLOR=#fef4d9>") ;
		  OpenWindow.document.write("<h1>共");
		  OpenWindow.document.write(totalNum);
		  OpenWindow.document.write("个航班详细信息如下：</h1>") ;

		  if(resDateRtn !=null && resDateRtn !=""){				  
			   if (resData !=null && resData !="") {   
					OpenWindow.document.write( "<table border='1'>");
					OpenWindow.document.write("<thead>");
					OpenWindow.document.write("<tr>");
					OpenWindow.document.write("<th colspan='12'>去程航班信息</th>");
					OpenWindow.document.write("</tr>");	
					OpenWindow.document.write("<tr>");
					OpenWindow.document.write("<th>序号</th>");
					OpenWindow.document.write("<th>出发机场</th>");
					//OpenWindow.document.write("<th>中转机场</th>");    /*免优票组不需要中转航班*/
					OpenWindow.document.write("<th>到达机场</th>");
					OpenWindow.document.write("<th>起飞时间</th>");
					OpenWindow.document.write("<th>到达时间</th>");
					OpenWindow.document.write("<th>飞行时间</th>");
					OpenWindow.document.write("<th>航班号</th>");
					OpenWindow.document.write("<th>最低价</th>");
					OpenWindow.document.write("<th>总价</th>");
					OpenWindow.document.write("<th>舱位</th>");
					OpenWindow.document.write("<th>剩余舱位数量</th>");
					OpenWindow.document.write("</tr>");
					OpenWindow.document.write("</thead>");
					OpenWindow.document.write("<tbody>");

					for ( var i = 0; i < resData.length; i++) {
						var vo = resData[i];
						var oriEng = vo.oriEng;
						var desEng = vo.desEng;
						var invSegInfo = vo.invSegInfo;
						/*免优票组不需要中转航班*/
//						var invSegInfoO = vo.invSegInfoO;
//						var invSegInfoD = vo.invSegInfoD;
						var price = vo.discountPrice; 

						if (invSegInfo != null && invSegInfo != "") {
							var subclass = invSegInfo.subclassInfos[0].subclass;
							var dlss =  invSegInfo.subclassInfos[0].lss;
							var fltno = invSegInfo.flightNo;
							var carrier = invSegInfo.carrier;
							var dprice = invSegInfo.subclassInfos[0].price;
							
							var fltTime ="";
							if(invSegInfo.fltTime < 60){
								fltTime = invSegInfo.fltTime+"分钟";
							}else{
								fltTime =  (invSegInfo.fltTime/60>>0)+"小时"+invSegInfo.fltTime%60+"分钟";
							}
							
							OpenWindow.document.write("<tr>");				
							OpenWindow.document.write("<td>") 
			                OpenWindow.document.write(i+1);
							OpenWindow.document.write("</td>");			
							OpenWindow.document.write("<td>") 
			                OpenWindow.document.write(findAirportName(oriEng) );
							OpenWindow.document.write("</td>");	
							/*免优票组不需要中转航班*/
//							OpenWindow.document.write("<td>") 
//			                OpenWindow.document.write("无");
//							OpenWindow.document.write("</td>");			
							OpenWindow.document.write("<td>");
							OpenWindow.document.write(findAirportName(desEng))
							OpenWindow.document.write("</td>");			
							OpenWindow.document.write("<td>");
							OpenWindow.document.write(new Date(invSegInfo.depTime.time).formatDate("yyyy-MM-dd HH:mm "));
							OpenWindow.document.write("</td>");
							OpenWindow.document.write("<td>");
							OpenWindow.document.write(new Date(invSegInfo.arrTime.time).formatDate("yyyy-MM-dd HH:mm"));
							OpenWindow.document.write("</td>");				
							OpenWindow.document.write("<td>");
							OpenWindow.document.write(fltTime);
							OpenWindow.document.write("</td>");			
							OpenWindow.document.write("<td>") ;
							OpenWindow.document.write(carrier);
							OpenWindow.document.write(fltno);
							OpenWindow.document.write("</td>");		
							OpenWindow.document.write("<td>") ;
							OpenWindow.document.write(price)
							OpenWindow.document.write("</td>");		
							OpenWindow.document.write("<td>") ;
							OpenWindow.document.write(vo.totalPrice);
							OpenWindow.document.write("</td>");			
							OpenWindow.document.write("<td>")
							OpenWindow.document.write(invSegInfo.subclassInfos[0].subclass );
							OpenWindow.document.write("</td>");					
			                OpenWindow.document.write("<td> ");
							OpenWindow.document.write(dlss);
							OpenWindow.document.write("</td>");
							OpenWindow.document.write("</tr>");
						}					
						/*免优票组不需要中转航班*/
/*						else {	
							var subclassO = invSegInfoO.subclassInfos[0].subclass;
							var dlssO =  invSegInfoO.subclassInfos[0].lss;
							var subclassD = invSegInfoD.subclassInfos[0].subclass;
							var dlssD =  invSegInfoD.subclassInfos[0].lss;					
							var fltnoO = invSegInfoO.flightNo;
							var fltnoD = invSegInfoD.flightNo;					
											
							var fltTimeO ="";
							if(invSegInfoO.fltTime < 60){
								fltTimeO = invSegInfoO.fltTime+"分钟";
							}else{
								fltTimeO =  (invSegInfoO.fltTime/60>>0)+"小时"+invSegInfoO.fltTime%60+"分钟";
							}
							var fltTimeD ="";
							if(invSegInfoD.fltTime < 60){
								fltTimeD = invSegInfoD.fltTime+"分钟";
							}else{
								fltTimeD =  (invSegInfoD.fltTime/60>>0)+"小时"+invSegInfoD.fltTime%60+"分钟";
							}

							OpenWindow.document.write("<tr>");			
							OpenWindow.document.write("<td>");
							OpenWindow.document.write(i+1);
							OpenWindow.document.write("</td>");				
							OpenWindow.document.write("<td>");
							OpenWindow.document.write(findAirportName(invSegInfoO.oriEng) );
							OpenWindow.document.write("</td>");			
							OpenWindow.document.write("<td>");
							OpenWindow.document.write(findAirportName(invSegInfoO.desEng) );
							OpenWindow.document.write("</td>");
							OpenWindow.document.write("<td>");
							OpenWindow.document.write(findAirportName(invSegInfoD.desEng) );
							OpenWindow.document.write("</td>");				
							OpenWindow.document.write("<td>");
							OpenWindow.document.write("第一段：");
							OpenWindow.document.write(new Date(invSegInfoO.depTime.time).formatDate("yyyy-MM-dd HH:mm"));
							OpenWindow.document.write("<br />");
							OpenWindow.document.write("第二段：");
							OpenWindow.document.write(new Date(invSegInfoD.depTime.time).formatDate("yyyy-MM-dd HH:mm"));		
							OpenWindow.document.write("</td>");			
							OpenWindow.document.write("<td>");
							OpenWindow.document.write("第一段：");
							OpenWindow.document.write(new Date(invSegInfoO.arrTime.time).formatDate("yyyy-MM-dd HH:mm"));
							OpenWindow.document.write("<br />");
							OpenWindow.document.write("第二段：");
							OpenWindow.document.write(new Date(invSegInfoD.arrTime.time).formatDate("yyyy-MM-dd HH:mm"));	
							OpenWindow.document.write("</td>");			
							OpenWindow.document.write("<td>");
							OpenWindow.document.write("第一段：");
							OpenWindow.document.write(fltTimeO);
							OpenWindow.document.write("<br />");
							OpenWindow.document.write("第二段：");
							OpenWindow.document.write(fltTimeD);	
							OpenWindow.document.write("</td>");			
							OpenWindow.document.write("<td>");
							OpenWindow.document.write("第一段：");
							OpenWindow.document.write(invSegInfoO.carrier);
							OpenWindow.document.write(fltnoO);
							OpenWindow.document.write("<br />");
							OpenWindow.document.write("第二段：");
							OpenWindow.document.write(invSegInfoD.carrier);
							OpenWindow.document.write(fltnoD);
							OpenWindow.document.write("</td>");			
							OpenWindow.document.write("<td>") ;
							OpenWindow.document.write(price)
							OpenWindow.document.write("</td>");			
							OpenWindow.document.write("<td>") ;
							OpenWindow.document.write(vo.totalPrice);
							OpenWindow.document.write("</td>");	
							OpenWindow.document.write("<td>");
							OpenWindow.document.write("第一段：");
							OpenWindow.document.write(subclassO);
							OpenWindow.document.write("<br />");
							OpenWindow.document.write("第二段：");
							OpenWindow.document.write(subclassD);	
							OpenWindow.document.write("</td>");
							OpenWindow.document.write("<td>");
							OpenWindow.document.write("第一段：");
							OpenWindow.document.write(dlssO);
							OpenWindow.document.write("<br />");
							OpenWindow.document.write("第二段：");
							OpenWindow.document.write(dlssD);	
							OpenWindow.document.write("</td>");
							OpenWindow.document.write("</tr>");
						}	*/
					}					
					        OpenWindow.document.write("</table>");
				}	
						OpenWindow.document.write( "<table border='1'>");
						OpenWindow.document.write("<thead>");
						OpenWindow.document.write("<tr>");
						OpenWindow.document.write("<th colspan='12'>往程航班信息</th>");
						OpenWindow.document.write("</tr>");	
						OpenWindow.document.write("<tr>");
						OpenWindow.document.write("<th>序号</th>");
						OpenWindow.document.write("<th>出发机场</th>");
						/*免优票组不需要中转航班*/
						//OpenWindow.document.write("<th>中转机场</th>");
						OpenWindow.document.write("<th>到达机场</th>");
						OpenWindow.document.write("<th>起飞时间</th>");
						OpenWindow.document.write("<th>到达时间</th>");
						OpenWindow.document.write("<th>飞行时间</th>");
						OpenWindow.document.write("<th>航班号</th>");
						OpenWindow.document.write("<th>最低价</th>");
						OpenWindow.document.write("<th>总价</th>");
						OpenWindow.document.write("<th>舱位</th>");
						OpenWindow.document.write("<th>剩余舱位数量</th>");
						OpenWindow.document.write("</tr>");
						OpenWindow.document.write("</thead>");
						OpenWindow.document.write("<tbody>");
		
						for ( var i = 0; i < resDateRtn.length; i++) {
							var vo = resDateRtn[i];
							var oriEng = vo.oriEng;
							var desEng = vo.desEng;
							var invSegInfo = vo.invSegInfo;
							/*免优票组不需要中转航班*/
//							var invSegInfoO = vo.invSegInfoO;
//							var invSegInfoD = vo.invSegInfoD;
							var price = vo.discountPrice; 
		
							if (invSegInfo != null && invSegInfo != "") {
								var subclass = invSegInfo.subclassInfos[0].subclass;
								var fltno = invSegInfo.flightNo;
								var carrier = invSegInfo.carrier;
								var dprice = invSegInfo.subclassInfos[0].price;
								var dlss =  invSegInfo.subclassInfos[0].lss;
								
								var fltTime ="";
								if(invSegInfo.fltTime < 60){
									fltTime = invSegInfo.fltTime+"分钟";
								}else{
									fltTime =  (invSegInfo.fltTime/60>>0)+"小时"+invSegInfo.fltTime%60+"分钟";
								}
								
								OpenWindow.document.write("<tr>");				
								OpenWindow.document.write("<td>") 
				                OpenWindow.document.write(i+1);
								OpenWindow.document.write("</td>");			
								OpenWindow.document.write("<td>") 
				                OpenWindow.document.write(findAirportName(oriEng) );
								OpenWindow.document.write("</td>");	
								/*免优票组不需要中转航班*/
//								OpenWindow.document.write("<td>") 
//				                OpenWindow.document.write("无");
//								OpenWindow.document.write("</td>");			
								OpenWindow.document.write("<td>");
								OpenWindow.document.write(findAirportName(desEng))
								OpenWindow.document.write("</td>");			
								OpenWindow.document.write("<td>");
								OpenWindow.document.write(new Date(invSegInfo.depTime.time).formatDate("yyyy-MM-dd HH:mm "));
								OpenWindow.document.write("</td>");
								OpenWindow.document.write("<td>");
								OpenWindow.document.write(new Date(invSegInfo.arrTime.time).formatDate("yyyy-MM-dd HH:mm"));
								OpenWindow.document.write("</td>");				
								OpenWindow.document.write("<td>");
								OpenWindow.document.write(fltTime);
								OpenWindow.document.write("</td>");			
								OpenWindow.document.write("<td>") ;
								OpenWindow.document.write(carrier);
								OpenWindow.document.write(fltno);
								OpenWindow.document.write("</td>");		
								OpenWindow.document.write("<td>") ;
								OpenWindow.document.write(price)
								OpenWindow.document.write("</td>");		
								OpenWindow.document.write("<td>") ;
								OpenWindow.document.write(vo.totalPrice);
								OpenWindow.document.write("</td>");			
								OpenWindow.document.write("<td>")
								OpenWindow.document.write(invSegInfo.subclassInfos[0].subclass );
								OpenWindow.document.write("</td>");		
				                OpenWindow.document.write("<td> ");
								OpenWindow.document.write(dlss);
								OpenWindow.document.write("</td>");
								OpenWindow.document.write("</tr>");
							}
							
							/*免优票组不需要中转航班*/
/*							else {	
								var subclassO = invSegInfoO.subclassInfos[0].subclass;
								var fltnoO = invSegInfoO.flightNo;
								var subclassD = invSegInfoD.subclassInfos[0].subclass;
								var fltnoD = invSegInfoD.flightNo;
								var dlssO =  invSegInfoO.subclassInfos[0].lss;
								var dlssD =  invSegInfoD.subclassInfos[0].lss;
								
								var fltTimeO ="";
								if(invSegInfoO.fltTime < 60){
									fltTimeO = invSegInfoO.fltTime+"分钟";
								}else{
									fltTimeO =  (invSegInfoO.fltTime/60>>0)+"小时"+invSegInfoO.fltTime%60+"分钟";
								}
								var fltTimeD ="";
								if(invSegInfoD.fltTime < 60){
									fltTimeD = invSegInfoD.fltTime+"分钟";
								}else{
									fltTimeD =  (invSegInfoD.fltTime/60>>0)+"小时"+invSegInfoD.fltTime%60+"分钟";
								}
		
								OpenWindow.document.write("<tr>");			
								OpenWindow.document.write("<td>");
								OpenWindow.document.write(i+1);
								OpenWindow.document.write("</td>");				
								OpenWindow.document.write("<td>");
								OpenWindow.document.write(findAirportName(invSegInfoO.oriEng) );
								OpenWindow.document.write("</td>");			
								OpenWindow.document.write("<td>");
								OpenWindow.document.write(findAirportName(invSegInfoO.desEng) );
								OpenWindow.document.write("</td>");
								OpenWindow.document.write("<td>");
								OpenWindow.document.write(findAirportName(invSegInfoD.desEng) );
								OpenWindow.document.write("</td>");				
								OpenWindow.document.write("<td>");
								OpenWindow.document.write("第一段：");
								OpenWindow.document.write(new Date(invSegInfoO.depTime.time).formatDate("yyyy-MM-dd HH:mm"));
								OpenWindow.document.write("<br />");
								OpenWindow.document.write("第二段：");
								OpenWindow.document.write(new Date(invSegInfoD.depTime.time).formatDate("yyyy-MM-dd HH:mm"));		
								OpenWindow.document.write("</td>");			
								OpenWindow.document.write("<td>");
								OpenWindow.document.write("第一段：");
								OpenWindow.document.write(new Date(invSegInfoO.arrTime.time).formatDate("yyyy-MM-dd HH:mm"));
								OpenWindow.document.write("<br />");
								OpenWindow.document.write("第二段：");
								OpenWindow.document.write(new Date(invSegInfoD.arrTime.time).formatDate("yyyy-MM-dd HH:mm"));	
								OpenWindow.document.write("</td>");			
								OpenWindow.document.write("<td>");
								OpenWindow.document.write("第一段：");
								OpenWindow.document.write(fltTimeO);
								OpenWindow.document.write("<br />");
								OpenWindow.document.write("第二段：");
								OpenWindow.document.write(fltTimeD);	
								OpenWindow.document.write("</td>");			
								OpenWindow.document.write("<td>");
								OpenWindow.document.write("第一段：");
								OpenWindow.document.write(invSegInfoO.carrier);
								OpenWindow.document.write(fltnoO);
								OpenWindow.document.write("<br />");
								OpenWindow.document.write("第二段：");
								OpenWindow.document.write(invSegInfoD.carrier);
								OpenWindow.document.write(fltnoD);
								OpenWindow.document.write("</td>");			
								OpenWindow.document.write("<td>") ;
								OpenWindow.document.write(price)
								OpenWindow.document.write("</td>");			
								OpenWindow.document.write("<td>") ;
								OpenWindow.document.write(vo.totalPrice);
								OpenWindow.document.write("</td>");	
								OpenWindow.document.write("<td>");
								OpenWindow.document.write("第一段：");
								OpenWindow.document.write(subclassO);
								OpenWindow.document.write("<br />");
								OpenWindow.document.write("第二段：");
								OpenWindow.document.write(subclassD);	
								OpenWindow.document.write("</td>");
								OpenWindow.document.write("<td>");
								OpenWindow.document.write("第一段：");
								OpenWindow.document.write(dlssO);
								OpenWindow.document.write("<br />");
								OpenWindow.document.write("第二段：");
								OpenWindow.document.write(dlssD);	
								OpenWindow.document.write("</td>");
								OpenWindow.document.write("</tr>");
							}*/	
						}					
						        OpenWindow.document.write("</table>");  
		  }else {
			   if (resData !=null && resData !="") {
					OpenWindow.document.write( "<table border='1'>");
					OpenWindow.document.write("<thead>");
					OpenWindow.document.write("<tr>");
					OpenWindow.document.write("<th>序号</th>");
					OpenWindow.document.write("<th>出发机场</th>");
					/*免优票组不需要中转航班*/
//					OpenWindow.document.write("<th>中转机场</th>");
					OpenWindow.document.write("<th>到达机场</th>");
					OpenWindow.document.write("<th>起飞时间</th>");
					OpenWindow.document.write("<th>到达时间</th>");
					OpenWindow.document.write("<th>飞行时间</th>");
					OpenWindow.document.write("<th>航班号</th>");
					OpenWindow.document.write("<th>最低价</th>");
					OpenWindow.document.write("<th>总价</th>");
					OpenWindow.document.write("<th>舱位</th>");
					OpenWindow.document.write("<th>剩余舱位数量</th>");
					OpenWindow.document.write("</tr>");
					OpenWindow.document.write("</thead>");
					OpenWindow.document.write("<tbody>");

					for ( var i = 0; i < resData.length; i++) {
						var vo = resData[i];
						var oriEng = vo.oriEng;
						var desEng = vo.desEng;
						var invSegInfo = vo.invSegInfo;
						/*免优票组不需要中转航班*/
//						var invSegInfoO = vo.invSegInfoO;
//						var invSegInfoD = vo.invSegInfoD;
						var price = vo.discountPrice; 

						if (invSegInfo != null && invSegInfo != "") {
							var subclass = invSegInfo.subclassInfos[0].subclass;
							var dlss =  invSegInfo.subclassInfos[0].lss;
							var fltno = invSegInfo.flightNo;
							var carrier = invSegInfo.carrier;
							var dprice = invSegInfo.subclassInfos[0].price;
										
							var fltTime ="";
							if(invSegInfo.fltTime < 60){
								fltTime = invSegInfo.fltTime+"分钟";
							}else{
								fltTime =  (invSegInfo.fltTime/60>>0)+"小时"+invSegInfo.fltTime%60+"分钟";
							}
							
							OpenWindow.document.write("<tr>");				
							OpenWindow.document.write("<td>") 
			                OpenWindow.document.write(i+1);
							OpenWindow.document.write("</td>");			
							OpenWindow.document.write("<td>") 
			                OpenWindow.document.write(findAirportName(oriEng) );
							OpenWindow.document.write("</td>");
							/*免优票组不需要中转航班*/
//							OpenWindow.document.write("<td>") 
//			                OpenWindow.document.write("无");
//							OpenWindow.document.write("</td>");			
							OpenWindow.document.write("<td>");
							OpenWindow.document.write(findAirportName(desEng))
							OpenWindow.document.write("</td>");			
							OpenWindow.document.write("<td>");
							OpenWindow.document.write(new Date(invSegInfo.depTime.time).formatDate("yyyy-MM-dd HH:mm "));
							OpenWindow.document.write("</td>");
							OpenWindow.document.write("<td>");
							OpenWindow.document.write(new Date(invSegInfo.arrTime.time).formatDate("yyyy-MM-dd HH:mm"));
							OpenWindow.document.write("</td>");				
							OpenWindow.document.write("<td>");
							OpenWindow.document.write(fltTime);
							OpenWindow.document.write("</td>");			
							OpenWindow.document.write("<td>") ;
							OpenWindow.document.write(carrier);
							OpenWindow.document.write(fltno);
							OpenWindow.document.write("</td>");		
							OpenWindow.document.write("<td>") ;
							OpenWindow.document.write(price)
							OpenWindow.document.write("</td>");		
							OpenWindow.document.write("<td>") ;
							OpenWindow.document.write(vo.totalPrice);
							OpenWindow.document.write("</td>");			
							OpenWindow.document.write("<td>")
							OpenWindow.document.write(invSegInfo.subclassInfos[0].subclass );
							OpenWindow.document.write("</td>");
							
			                OpenWindow.document.write("<td> ");
							OpenWindow.document.write(dlss);
							OpenWindow.document.write("</td>");
							OpenWindow.document.write("</tr>");
						}						
						/*免优票组不需要中转航班*/		
/*						else {	
							var subclassO = invSegInfoO.subclassInfos[0].subclass;
							var dlssO =  invSegInfoO.subclassInfos[0].lss;
							var fltnoO = invSegInfoO.flightNo;
							
							var subclassD = invSegInfoD.subclassInfos[0].subclass;
							var dlssD =  invSegInfoD.subclassInfos[0].lss;
							var fltnoD = invSegInfoD.flightNo;
					
							var fltTimeO ="";
							if(invSegInfoO.fltTime < 60){
								fltTimeO = invSegInfoO.fltTime+"分钟";
							}else{
								fltTimeO =  (invSegInfoO.fltTime/60>>0)+"小时"+invSegInfoO.fltTime%60+"分钟";
							}
							var fltTimeD ="";
							if(invSegInfoD.fltTime < 60){
								fltTimeD = invSegInfoD.fltTime+"分钟";
							}else{
								fltTimeD =  (invSegInfoD.fltTime/60>>0)+"小时"+invSegInfoD.fltTime%60+"分钟";
							}

							OpenWindow.document.write("<tr>");			
							OpenWindow.document.write("<td>");
							OpenWindow.document.write(i+1);
							OpenWindow.document.write("</td>");				
							OpenWindow.document.write("<td>");
							OpenWindow.document.write(findAirportName(invSegInfoO.oriEng) );
							OpenWindow.document.write("</td>");			
							OpenWindow.document.write("<td>");
							OpenWindow.document.write(findAirportName(invSegInfoO.desEng) );
							OpenWindow.document.write("</td>");
							OpenWindow.document.write("<td>");
							OpenWindow.document.write(findAirportName(invSegInfoD.desEng) );
							OpenWindow.document.write("</td>");				
							OpenWindow.document.write("<td>");
							OpenWindow.document.write("第一段：");
							OpenWindow.document.write(new Date(invSegInfoO.depTime.time).formatDate("yyyy-MM-dd HH:mm"));
							OpenWindow.document.write("<br />");
							OpenWindow.document.write("第二段：");
							OpenWindow.document.write(new Date(invSegInfoD.depTime.time).formatDate("yyyy-MM-dd HH:mm"));		
							OpenWindow.document.write("</td>");			
							OpenWindow.document.write("<td>");
							OpenWindow.document.write("第一段：");
							OpenWindow.document.write(new Date(invSegInfoO.arrTime.time).formatDate("yyyy-MM-dd HH:mm"));
							OpenWindow.document.write("<br />");
							OpenWindow.document.write("第二段：");
							OpenWindow.document.write(new Date(invSegInfoD.arrTime.time).formatDate("yyyy-MM-dd HH:mm"));	
							OpenWindow.document.write("</td>");			
							OpenWindow.document.write("<td>");
							OpenWindow.document.write("第一段：");
							OpenWindow.document.write(fltTimeO);
							OpenWindow.document.write("<br />");
							OpenWindow.document.write("第二段：");
							OpenWindow.document.write(fltTimeD);	
							OpenWindow.document.write("</td>");			
							OpenWindow.document.write("<td>");
							OpenWindow.document.write("第一段：");
							OpenWindow.document.write(invSegInfoO.carrier);
							OpenWindow.document.write(fltnoO);
							OpenWindow.document.write("<br />");
							OpenWindow.document.write("第二段：");
							OpenWindow.document.write(invSegInfoD.carrier);
							OpenWindow.document.write(fltnoD);
							OpenWindow.document.write("</td>");			
							OpenWindow.document.write("<td>") ;
							OpenWindow.document.write(price)
							OpenWindow.document.write("</td>");			
							OpenWindow.document.write("<td>") ;
							OpenWindow.document.write(vo.totalPrice);
							OpenWindow.document.write("</td>");	
							OpenWindow.document.write("<td>");
							OpenWindow.document.write("第一段：");
							OpenWindow.document.write(subclassO);
							OpenWindow.document.write("<br />");
							OpenWindow.document.write("第二段：");
							OpenWindow.document.write(subclassD);	
							OpenWindow.document.write("</td>");
							OpenWindow.document.write("<td>");
							OpenWindow.document.write("第一段：");
							OpenWindow.document.write(dlssO);
							OpenWindow.document.write("<br />");
							OpenWindow.document.write("第二段：");
							OpenWindow.document.write(dlssD);	
							OpenWindow.document.write("</td>");
							OpenWindow.document.write("</tr>");
						}*/	
					}	
					        OpenWindow.document.write("</table>");
				}	  		   
		  }	  					   
							OpenWindow.document.write("</BODY>") 
							OpenWindow.document.write("</HTML>") 
							OpenWindow.document.close();
}	
  

function purchaseTickets() {
	var ori = "";
	var des = "";
	var oriO = "";
	var desD = "";
	
	var date = "";
	var year ="";
	var month ="";
	var day = "";
	var monthrtn ="";
	var dayrtn = "";
	var url = "";
	var arrdate = [];
	var arrdatertn = [];
	
	if($('#airportori')[0] ==undefined || $('#airportdes')[0] ==undefined){
		
		/*免优票组不需要中转航班*/
/*		if($('#airportoriO')[0] !=undefined && $('#airportdesD')[0] !=undefined){
			  oriO = $('#airportoriO')[0].innerText;
			  desD = $('#airportdesD')[0].innerText;
			  
			  if($('#depart-date')[0] !=undefined){
					date = $('#depart-date')[0].value;
				}
			  if($('#dateorirtn')[0] !=undefined){
					datertn = $('#dateorirtn')[0].innerText;
				}else {
					datertn = null;
				}
			  
			  if(oriO !=null && oriO !="" && desD !=null && desD !=""){
					ori =  getCodeByName(oriO).toLowerCase();
					des = getCodeByName(desD).toLowerCase();	
				}
			  
			  if(datertn !=null && datertn !=""){
					 if(date !=null && date !=""){	
						   arrdate = date.split('-');
							year =arrdate[0].substring(2);
							month = arrdate[1];
							day = arrdate[2];				
							arrdatertn = datertn.split('-');
							monthrtn = arrdatertn[0];
							dayrtn = arrdatertn[1];	
							
						    url = 'http://www.ceair.com/flight2014/' +ori +'-' +des+'-'+year+month+day+'-'+des+'-'+ori+'-'+year+monthrtn+dayrtn+'_CNY.html';
						    window.open(url);
					 }
			    }else {
					   if(date !=null && date !=""){		    
							arrdate = date.split('-');
							year =arrdate[0].substring(2);
							month = arrdate[1];
							day = arrdate[2];	
							
						    url = 'http://www.ceair.com/flight2014/' +ori +'-' +des+'-'+year+month+day+'_CNY.html';
							window.open(url);
				   }					
			   }
			  
		}*/

		//else {
				ori = "pvg";
				des = "pek";
				var myDate = new Date();
				var mydate = myDate.toLocaleDateString();
				arrdate = mydate.split('/');
				year =arrdate[0];
				month = arrdate[1];
				day = arrdate[2];
					year = year.substring(2);
					if(month.length==1){
						month = '0'+month;
					}
					if(day.length == 1){
						day = '0'+day;
					}
			     url = 'http://www.ceair.com/flight2014/' +ori +'-' +des+'-'+year+month+day+'_CNY.html';
			     window.open(url);
		//}	
	}else {
		//if($('#airportoriO')[0] ==undefined && $('#airportdesD')[0] ==undefined){
			ori = $('#airportori')[0].innerText;
			des = $('#airportdes')[0].innerText;
			
			if($('#depart-date')[0] !=undefined){
				date = $('#depart-date')[0].value;
			}
			if($('#dateorirtn')[0] !=undefined){
				datertn = $('#dateorirtn')[0].innerText;
			}else {
				datertn = null;
			}
			
			if(ori !=null && ori !="" && des !=null && des !=""){
				ori =  getCodeByName(ori).toLowerCase();
				des = getCodeByName(des).toLowerCase();	
			}
			
			if(datertn !=null && datertn !=""){
				 if(date !=null && date !=""){	
					   arrdate = date.split('-');
						year =arrdate[0].substring(2);
						month = arrdate[1];
						day = arrdate[2];				
						arrdatertn = datertn.split('-');
						monthrtn = arrdatertn[0];
						dayrtn = arrdatertn[1];	
						
					    url = 'http://www.ceair.com/flight2014/' +ori +'-' +des+'-'+year+month+day+'-'+des+'-'+ori+'-'+year+monthrtn+dayrtn+'_CNY.html';
					    window.open(url);
				 }
		    }else {
			   if(date !=null && date !=""){		    
						arrdate = date.split('-');
						year =arrdate[0].substring(2);
						month = arrdate[1];
						day = arrdate[2];	
						
					    url = 'http://www.ceair.com/flight2014/' +ori +'-' +des+'-'+year+month+day+'_CNY.html';
						window.open(url);
			   }					
		   }		
		//}
	}	
}


function purchaseAreaTickets(oricode,descode) {
	ori = oricode;
	des = descode;
	
	if($('#depart-date')[0] !=undefined){
		date = $('#depart-date')[0].value;
	}
	
	if(ori !=null && ori !="" && des !=null && des !=""){
		ori =  getCodeByName(ori).toLowerCase();
		des = getCodeByName(des).toLowerCase();	
	}

	if(date !=null && date !=""){		    
				arrdate = date.split('-');
				year =arrdate[0].substring(2);
				month = arrdate[1];
				day = arrdate[2];	
				
			    url = 'http://www.ceair.com/flight2014/' +ori +'-' +des+'-'+year+month+day+'_CNY.html';
				window.open(url);
	   }						
}

function purchaseFreeTickets() {
	      var url = "";
	      url = "http://eet.ceair.com";
	      //url ="http://eet.ceair.com/my/login.do";
	      window.open(url);
}

function flightDetailsDis(oricode,descode) {
	initMarkers();
	var oriVal = getCodeByName(oricode);
	var destVal = getCodeByName(descode); 
	var dateVal ="";
	
	if($('#depart-date')[0] !=undefined){
		dateVal = $('#depart-date')[0].value;
	}
	
	if(dateVal !=null && dateVal !=""){		
		flightAreaDetailInfo(dateVal,null,oriVal,destVal,null) ;
	}	
} 

/**
 * 初始化页面元素规则
 */
function initPageElementRule() {
	$('#queryResultTable').hide();
	//$('#flights').hide();
}

function searchTrigger(value){
	$("#question").val(value);
	$("#search").trigger("click");
}

function getCodeByName(name) {
	var code = null;
	var airports = getAirports();
	for (var i = 0; i < airports.length; i++) {
		if (airports[i].name == name) {
			code = airports[i].code;
		}
	}
	return code;
}

function adaptFltData(data){
	if(data.busData != null){
		return data.busData.fltRtes;
	}else{
		return data.busData;
	}
}

function setD(){
	cFunc('d');
}

function setM(){
   if($dp.cal.date.d == $dp.cal.newdate.d){
		cFunc('M');
	} 
}

function setY(){
	if($dp.cal.date.d == $dp.cal.newdate.d
			&& $dp.cal.date.M == $dp.cal.newdate.M ){
		cFunc('y');
	}
}

function cFunc(who){
	if(traveSign==3){
	if($("#origCode")[0].value==""&&$("#destCode")[0].value==""){
		return;
	}else if($("#origCode")[0].value==""){
			$("#destSearch").click();
		}
		else if($("#destCode")[0].value==""){
		$("#origSearch").click();}}else{
		
	var travelMode = $('input[name="travelMode"]:checked').val();
	var oriVal=getCodeByName($(".flight-show-dep-big").text());
	var destVal=getCodeByName($(".flight-show-arr-big").text());
	
	var year = $dp.cal.newdate.y;
	var month = $dp.cal.newdate.M;
	var day = $dp.cal.newdate.d;
	var date = year +'-'+month+'-'+day;
	
	if(travelMode==1){	
		flightDetail(date, null,oriVal,destVal,null);
	}else {
		var depardate =$('#depart-date').val();
		flightDetail(depardate, date,oriVal,destVal,null);
	}	
}
}
