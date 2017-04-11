
var singleMark;
var markers=[];
var curves=[];
var singleCurve;
var lastSearchSign="";
var traveSign;
var ts;
var tss;
var dd=[];

$(function(){
	
	$(".flight-show-mid").click(function(){
		ts=$(".flight-show-dep-big").text();
		tss=$(".flight-show-dep-small").text();
		$(".flight-show-dep-big").text($(".flight-show-arr-big").text());
		$(".flight-show-dep-small").text($(".flight-show-arr-small").text());
		$(".flight-show-arr-big").text(ts);
		$(".flight-show-arr-small").text(tss);
		
		var travelMode = $('input[name="travelMode"]:checked').val();
		var oriVal=getCodeByName($(".flight-show-dep-big").text());
		var destVal=getCodeByName($(".flight-show-arr-big").text());
		
		var depardate =$('#depart-date').val();
		var returndate=$('#return-date').val();
		if(travelMode==1){	
			flightDetail(depardate, null,oriVal,destVal,null);
		}else {
			flightDetail(depardate, returndate,oriVal,destVal,null);
		}	
		
	})
    $('#origCode').bind('keypress',function(event){
        if(event.keyCode == "13")    
        {
        	$(this).blur();
        	$(".selectAirport").hide();
    		$(".search-date-fixed").text($("#search-date").val());
    		if($("#origCode")[0].value==""&&$("#destCode")[0].value==""){
    			return;
    		}
    			$("#origSearch").click();
        }
    });	
    $('#destCode').bind('keypress',function(event){
        if(event.keyCode == "13")    
        	
        {$(this).blur();
        	$(".selectAirport").hide();
    		$(".search-date-fixed").text($("#search-date").val());
    		if($("#origCode")[0].value==""&&$("#destCode")[0].value==""){
    			return;
    		}
    			$("#destSearch").click();
        }
    });	
	/*$(".depart-date-fixed").text(GetDateStr(0));
	$(".return-date-fixed").text(GetDateStr(1));
	$(".search-date-fixed").text(GetDateStr(0));
	$("#depart-date").change(function(e){ 
		var dep=getCodeByName($(".flight-show-dep-big").text());
		var arr=getCodeByName($(".flight-show-arr-big").text());
		 $(".depart-date-fixed").text($("#depart-date").val());
		 flightDetail($('#depart-date').val(), $('#return-date').val(),dep,arr,null); 
		});  
	$("#return-date").change(function(e){ 
		var dep=getCodeByName($(".flight-show-dep-big").text());
		var arr=getCodeByName($(".flight-show-arr-big").text());
		 $(".return-date-fixed").text($("#return-date").val());
		 flightDetail($('#depart-date').val(), $('#return-date').val(),dep,arr,null); 
		});  
	$("#search-date").change(function(e){ 
		$(".search-date-fixed").text($("#search-date").val());
		if($("#origCode")[0].value==""&&$("#destCode")[0].value==""){
			return;
		}else if($("#origCode")[0].value==""){
				$("#destSearch").click();
			}
			else if($("#destCode")[0].value==""){
			$("#origSearch").click();
		}
		});*/
	
	$(".left-control-zoomIn").click(function(){
		map.setZoom(map.getZoom() - 1);
	})

	$(".left-control-zoomOut").click(function(){
		map.setZoom(map.getZoom() +1);
	})
	$(".left-control-top").click(function(){
		map.panBy(0, 240,null);
	})
		$(".left-control-down").click(function(){
		map.panBy(0, -240,null);
	})
		$(".left-control-left").click(function(){
		map.panBy(240, 0,null);
	})
		$(".left-control-right").click(function(){
		map.panBy(-240, 0,null);
	})
	
	$(".one-way").click(function(){
		$("#single")[0].checked=true;
		$("#roundTrip")[0].checked=false;
		$(".return-date-fixed").hide();
	})
	$(".round-trip").click(function(){
		$("#single")[0].checked=false;
		$("#roundTrip")[0].checked=true;
		$(".return-date-fixed").show();
	})
	
	var nowDate=getNowDate;
	$("#search-date").attr('value',nowDate);
	$(".areaSearch").click(function(){
		$(".flight-panel").hide();
		$(".flight-navigable").hide();
	})
	$("#close-hide").click(function(){
		$(".flight-panel").hide();
		$(".flight-navigable").hide();
	})
	
	$("#origCode").mouseover(function(){
		$('#destCode').attr("readonly","true");
		$('#origCode').removeAttr("readonly");
		});
	$("#destCode").mouseover(function(){
		
		$('#origCode').attr("readonly","true");
		$('#destCode').removeAttr("readonly");
		});
	$("#origCode").focus(function(){
		$('#destCode')[0].value="";
		$(".selectAirport").html("");
		$(".selectAirport").hide();
	})
	$("#origCode").keyup(function(){
		$(".selectAirport").css("margin-top","45px");
		$(".selectAirport").html("");
		var names=[];
		if($("#origCode")[0].value==""||$("#origCode")[0].value==null){
			$(".selectAirport").hide();
			return;
		}else{
			var name=$("#origCode")[0].value;
			names=fuzzyQueryByName(name);
			if(names.length==0){
					$(".selectAirport").hide();
				return;}
			for (var i = 0; i < names.length; i++) {
				if(i==0){
				$(".selectAirport").append("<div class='airs bkblue'>"+names[i]+"</div>")
				}else{
					$(".selectAirport").append("<div class='airs'>"+names[i]+"</div>")
				}
			}
			$(".selectAirport").show();
		}
		$(".airs").click(function(){
			$("#origCode").val($(this).text());
			$(".selectAirport").hide();
		})
		
	})
	$("#destCode").focus(function(){
			$('#origCode')[0].value="";
			$(".selectAirport").html("");
			$(".selectAirport").hide();
	})
		$("#destCode").keyup(function(){
		$(".selectAirport").css("margin-top","120px");
		$(".selectAirport").html("");
		var names=[];
		if($("#destCode")[0].value==""||$("#destCode")[0].value==null){
			$(".selectAirport").hide();
			return;
		}else{
			var name=$("#destCode")[0].value;
			names=fuzzyQueryByName(name);
			if(names.length==0){
					$(".selectAirport").hide();
				return;}
			for (var i = 0; i < names.length; i++) {
				if(i==0){
				$(".selectAirport").append("<div class='airs bkblue'>"+names[i]+"</div>")
				}else{
					$(".selectAirport").append("<div class='airs'>"+names[i]+"</div>")
				}
			}
			$(".selectAirport").show();
		}
		$(".airs").click(function(){
			$("#destCode").val($(this).text());
			$(".selectAirport").hide();
		})
		
	})
	$("#origSearch").click(function(){
		$(".selectAirport").html("");
		$(".selectAirport").hide();
		lastSearchSign="orig";
		 singleMark=null;
		 markers=[];
		 curves=[];
		 singleCurve=null;
		var transReqPkg = new TransReqPkg();
		var fltRteQry = new FltRteQry();
		var cityName=getCodeByName($("#origCode").val());
		if(cityName==null||cityName=="")
		{
		$(".msg").show();
		$(".msg").text("请输入正确机场信息");
			return ;}
		fltRteQry.oriEng=getCodeByName($("#origCode").val());
		fltRteQry.diType="0";
		fltRteQry.odType="0";
/*		if($("#search-date").val()==null||$("#search-date").val()==""){
			$(".error-msg").text("请选择出发日期!");
			$("#search-date").click();
			return;
		}*/
		
	 	var dep=new Date($("#search-date").val().replace("-", "/").replace("-", "/")); 
	 	var now=new Date(GetDateStr(0).replace("-", "/").replace("-", "/")); 
	 	if(dep<now){
	 		initMarkers();
	 		$(".msg").show();
	 		$(".msg").text("请输入正确出发日期!");
	 		return;
	 		
	 	}
		fltRteQry.strStartFltDt=$("#search-date").val();
		fltRteQry.topNumber="30";
		transReqPkg.busData = fltRteQry;
		
	var serverUrl = "";
	serverUrl = contextRootPath+"/baseDataSrch/qryAvailableDesApt.do";
	param = {
		"fltTransReqPkg" : JsonUtils.jsonToStr(transReqPkg)};
	$.ajax({
		url:serverUrl,
		type:'post',
		dataType:'json',
		data:param,
		cache:false,
		async:true,
		error: function() {},
		complete: function(data) {
			hideElement($('#loading'));
		},
		success:function(data) {
			if(data[0].busData!=null){
			toSuccess("orig",data[0].busData.aptCds);
			}
			else{
			toError(data[0].transRslt.rsltInfos[0].infoMsg);
			}
		}
	});
	})
	$("#destSearch").click(function(){
		$(".selectAirport").html("");
		$(".selectAirport").hide();
		lastSearchSign="dest";
			singleMark=null;
			markers=[];
			curves=[];
			singleCurve=null;
		var transReqPkg = new TransReqPkg();
		var fltRteQry = new FltRteQry();
		var cityName=getCodeByName($("#destCode").val());
	 	var dep=new Date($("#search-date").val().replace("-", "/").replace("-", "/")); 
	 	var now=new Date(GetDateStr(0).replace("-", "/").replace("-", "/")); 
	 	if(dep<now){
	 		initMarkers();
	 		$(".msg").show();
	 		$(".msg").text("请输入正确出发日期!");
	 		return;
	 		
	 	}
		if(cityName==null||cityName=="")
		{
			$(".msg").show();
			$(".msg").text("请输入正确机场信息");
			return ;}
		fltRteQry.desEng=getCodeByName($("#destCode").val());
		fltRteQry.diType="0";
		fltRteQry.odType="0";
		fltRteQry.strStartFltDt=$("#search-date").val();
		fltRteQry.topNumber="30";
		transReqPkg.busData = fltRteQry;
	
	var serverUrl = "";
	serverUrl = contextRootPath+"/baseDataSrch/qryAvailableOriApt.do";
	param = {
		"fltTransReqPkg" : JsonUtils.jsonToStr(transReqPkg)};
	$.ajax({
		url:serverUrl,
		type:'post',
		dataType:'json',
		data:param,
		cache:false,
		async:true,
		error: function() {},
		complete: function(data) {
			hideElement($('#loading'));
		},
		success:function(data) {
			if(data[0].busData!=null){
				toSuccess("dest",data[0].busData.aptCds);
				}
				else{
				toError(data[0].transRslt.rsltInfos[0].infoMsg);
				}
		}
	});
			
	})
function getLngLatByCode(code) {
	var posi = [];
	var airports = getAirports();
	for (var i = 0; i < airports.length; i++) {
		if (airports[i].code == code) {
			posi[0]=airports[i].longitude;
			posi[1]=airports[i].latitude;
			return posi;
		}				
	}
	return null;
}

	$(".input-navigable").focus(function() {
		$(".msg").hide();
	})
	
	$(".openToNavigationSearch").click(function(){
		$(".flight-navigable").show();
		$("#flightsarea").hide();
		$("#queryResultTable").hide();
		$("#left-control").hide();
		$(".flight-panel").hide();	
		$("#origCode").val("");
		$("#destCode").val("");
		$(".msg").text("");
		$(".msg").hide();
		traveSign=3;
		$(".areaSearch").css({"border-bottom":"none","color":"#AFC9FB","padding":"0px"});
		$(".flightSearch").css({"border-bottom":"none","color":"#AFC9FB","padding":"0px"});
		$(this).css({"border-bottom":"2px solid #ddd","color":"white","padding":"6px"})
		initMarkers();
		
	})
		$(".flightSearch").click(function(){
			$(".flight-show-dep-big").text("上海浦东");
			$(".flight-show-dep-small").text("上海浦东");
			$(".flight-show-arr-big").text("北京首都");
			$(".flight-show-arr-small").text("北京首都");
			traveSign=$('input[name="travelMode"]:checked').val();
			$("#flightsarea").hide();
			$("#queryResultTable").hide();
			$("#left-control").hide();
			$(".areaSearch").css({"border-bottom":"none","color":"#AFC9FB","padding":"0px"});
			$(".openToNavigationSearch").css({"border-bottom":"none","color":"#AFC9FB","padding":"0px"});
			$(this).css({"border-bottom":"2px solid #ddd","color":"white","padding":"6px"})

			initMarkers();
			newMarkers();
			//window.location.reload();
		$(".flight-navigable").hide();
		$(".flight-panel").show();	
	})
	$(".areaSearch").click(function(){
		$("#queryResultTable").hide();
		$("#flightsarea").hide();
		$("#left-control").show();
				
/*		// 定义一个控件类,即function
		function ZoomControl(){
		  // 默认停靠位置和偏移量
		  this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;
		  this.defaultOffset = new BMap.Size(10, 10);
		}

		// 通过JavaScript的prototype属性继承于BMap.Control
		ZoomControl.prototype = new BMap.Control();

		// 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
		// 在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中
		ZoomControl.prototype.initialize = function(map){
		  // 创建一个DOM元素
		  var div = $("#left-control");
		  // 添加文字说明
		  div.onclick = function(e){
			map.setZoom(map.getZoom() + 2);
		  }
		  return div;
		}
		// 创建控件
		var myZoomCtrl = new ZoomControl();
		// 添加到地图当中
		map.addControl(myZoomCtrl);*/
		
/*			var opts = {type: BMAP_NAVIGATION_CONTROL_LARGE,showZoomInfo:true} 
			map.addControl(new BMap.NavigationControl(opts));  */ 
			$(".flightSearch").css({"border-bottom":"none","color":"#AFC9FB","padding":"0px"});
			$(".openToNavigationSearch").css({"border-bottom":"none","color":"#AFC9FB","padding":"0px"});
			$(this).css({"border-bottom":"2px solid #ddd","color":"white","padding":"6px"})

	})
	
	function getNameByCode(code){
		var airports = getAirports();
		for (var i = 0; i < airports.length; i++) {
			if (airports[i].code == code) return airports[i].name;
		}
		return null;	
	}	
})
	function initMarkers(){
		DepartAirportMarker.enableMassClear();
		TransferAirportMarker.enableMassClear();
		ReturnAirportMarker.enableMassClear();
		clearOverlays();
	}
	/**增加覆盖物点击事件**/
	function addMarkerClickEvent(marker){
		marker.addEventListener('click',markerClickEndEvent);
	} 
	
	function markerClickEndEvent(e){
	    
		var marker = e.target;
/*		if(lastCurve!=null){
			Map.removeOverlay(lastCurve);
			Map.addOverlay(lastCurveDash);
		}*/
		if(singleCurve!=null){
			singleCurve.setStrokeStyle("dashed");
		}
		var s=100;
		for (var i = 0; i < markers.length; i++) {
			if(markers[i]==marker){
				//var points = [];
				for (var j = 0; j < curves.length; j++) {
					for (var k = 0; k < curves[j].ia.length; k++) {
						//console.info(Math.abs(curves[j].ia[k].lat-markers[i].point.lat)+Math.abs(curves[j].ia[k].lng-markers[i].point.lng));
						if(s>Math.abs(curves[j].ia[k].lat-markers[i].point.lat)+Math.abs(curves[j].ia[k].lng-markers[i].point.lng)){
						s=Math.abs(curves[j].ia[k].lat-markers[i].point.lat)+Math.abs(curves[j].ia[k].lng-markers[i].point.lng);
						singleCurve=curves[j];}
					}
					//console.info(i+": lat="+Math.abs(curves[j].Mu.ul.lat-markers[i].point.lat)+"///////////lng="+Math.abs(curves[j].Mu.ul.lng-markers[i].point.lng));
/*					if(Math.abs(curves[j].Mu.ul.lat-markers[i].point.lat)<0.01&&Math.abs(curves[j].Mu.ul.lng-markers[i].point.lng)<0.01){
						singleCurve=curves[j];
					}*/
				}
				/*points.push(singleMark.point.lat,singleMark.point.lng);
				points.push(markers[i].point.lat,markers[i].point.lng);
				var curve = new BMapLib.CurveLine(points, {strokeColor:'rgb(17, 63, 149)', strokeWeight:1.5, strokeOpacity:1,strokeStyle:'solid',enableClicking:false});
				Map.addOverlay(curve);
				curve.enableEditing(); */
			}
		}
		var markerName=marker.getLabel().content;
		var sign=marker.getTitle();
/*		$(".to-show").show();
		var X=e.screenX;
		var Y=e.screenY;
		$(".to-show").text(markerName);
		$(".to-show").css({top:Y-60,left:X+15})
		setTimeout(function(){
			$(".to-show").hide();
}, 500);*/
		var depCode="";
		var arrCode=""
		if(sign=="到达"){
		 arrCode=getCodeByName(markerName);
		 depCode=getCodeByName(singleMark.getLabel().content);
		}else if(sign=="出发"){
			depCode=getCodeByName(markerName);
			arrCode=getCodeByName(singleMark.getLabel().content);
		}
		var transReqPkg = new TransReqPkg();
		var fltRteQry = new FltRteQry();
		fltRteQry.oriEng=depCode;
		fltRteQry.desEng=arrCode;
		fltRteQry.transferEng=null;
		fltRteQry.odType="2";
		fltRteQry.strStartFltDt=$("#search-date").val();
		fltRteQry.strStartRtnFltDt = "";
	 	transReqPkg.busData = fltRteQry;
		var transChan = new TransChan();
		transChan.chanCode = "38";
		transReqPkg.transChan = transChan; 	
		var param = {};
		var serverUrl = "";
	 		serverUrl = contextRootPath+"/fltSrch/qryFltRte.do";
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
						
						if(data.fltRtes[0].invSegInfo ==null)
						{$("#msgModal").show();
						setTimeout(function () {
							$("#msgModal").hide();
					    }, 1500);
						}else{
					    singleCurve.setStrokeStyle("solid");
					    //newFly();
						showMyFloatFlight(data.fltRtes, "",marker);
						}
						
						//ClosestAirportIndex = null;
						//clearTimeout(Timer);
						//clearTimeout(DragEndTimer);
						//showNearAirports(e);
						//hideAiportMarkers(AirportMarkers);
						//marker = e.target;
					    //marker.setPosition(AirportMarkers[ClosestAirportIndex].getPosition());
					    //var airports = getAirports();
					    //marker.getLabel().setContent(airports[ClosestAirportIndex].name);   
					    //setAirportMarkerIcon(AirportMarkers[ClosestAirportIndex]); 
						
					    //myOutput(airports[ClosestAirportIndex], marker);
					   
					    //if(outputSuccess){showFloatFlight(data.fltRtes, "");}
					    
					    //ClosestAirportIndex = null;
						
							//display(data.fltRtes,data.fltRtnRtes,OpenWindow) ;             //这里要添加往返逻辑
					}else{
					$("#msgModal").show();
					setTimeout(function () {
						$("#msgModal").hide();
				    }, 1500);}	
					waitHandling.close();
				}		
			});	 		
	}

function fuzzyQueryByName(name){
		var airports = getAirports();
		var airportNames=[];
		for (var i = 0; i < airports.length; i++) {
			if(name==airports[i].name.substring(0,name.length))
				{
				airportNames.push(airports[i].name);
				}
		}
		return airportNames;
		
	}

function getCodeByName(name) {
		var airports = getAirports();
		for (var i = 0; i < airports.length; i++) {
			if (airports[i].name == name) return airports[i].code;
		}
		return null;
	}

function getNowDate(){
		   var mydate = new Date();
		   var str =mydate.getFullYear() + "-";
		   if(mydate.getMonth()+1<10){
			   str +="0"+(mydate.getMonth()+1) + "-";
		   }else{
			   str +=(mydate.getMonth()+1) + "-";
		  }
		   if(mydate.getDate()<10){
			   str +="0"+mydate.getDate();
		   }else{
		   str += mydate.getDate();}
		   return str;}

function GetDateStr(AddDayCount) {
	    var dd = new Date();
	    dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
	    var y = dd.getFullYear();
	    if(dd.getMonth()+1<10){var m = "0"+(dd.getMonth()+1)}else{ var m = dd.getMonth()+1}
	    if(dd.getDate()+1<10){ var d = "0"+(dd.getDate())}else{ var d = dd.getDate()}
	    return y+"-"+m+"-"+d;
	}

function addMyMarkerDraggingEffect(marker){
		marker.enableDragging();
		addMarkerDraggingEvent(marker);
		addMyMarkerDragEndEvent(marker);
	}

	function addMyMarkerDragEndEvent(marker) {
		marker.addEventListener('dragend', myMarkerDragEndEvent);
	}
	var signs="";
	
function myMarkerDragEndEvent(e) {
		 singleMark=null;
		 markers=[];
		 curves=[];
		 singleCurve=null;
		signs="";
		var marker = e.target;
		var sign=marker.getTitle();
		var markerName=marker.getLabel().content;
		if(sign=="出发"){
			signs="orig";
			$("#origCode").val(markerName)
		}else if(sign=="到达"){
			signs="dest";
			$("#destCode").val(markerName)
		}
		
		var transReqPkg = new TransReqPkg();
		var fltRteQry = new FltRteQry();
		var cityName=getCodeByName(markerName);
		fltRteQry.oriEng=getCodeByName(markerName);
		fltRteQry.diType="0";
		fltRteQry.odType="0";
/*		if($("#search-date").val()==null||$("#search-date").val()==""){
			$(".error-msg").text("请选择出发日期!");
			$("#search-date").click();
			return;
		}*/
		fltRteQry.strStartFltDt=$("#search-date").val();
		fltRteQry.topNumber="30";
		transReqPkg.busData = fltRteQry;
		
	var serverUrl = "";
	serverUrl = contextRootPath+"/baseDataSrch/qryAvailableDesApt.do";
	param = {
		"fltTransReqPkg" : JsonUtils.jsonToStr(transReqPkg)};
	$.ajax({
		url:serverUrl,
		type:'post',
		dataType:'json',
		data:param,
		cache:false,
		async:true,
		error: function() {},
		complete: function(data) {
			hideElement($('#loading'));
		},
		success:function(data) {
			if(data[0].busData!=null){
			toDragEndSuccess(signs,data[0].busData.aptCds,data[0].busData.oriEng);
			}
			else{
			toDragEndError(data[0].transRslt.rsltInfos[0].infoMsg,marker);
			}
		}
	});
	/*	var marker = e.target;
	    marker.setPosition(AirportMarkers[ClosestAirportIndex].getPosition());
	    
	    var airports = getAirports();
	    marker.getLabel().setContent(airports[ClosestAirportIndex].name);   
	    setAirportMarkerIcon(AirportMarkers[ClosestAirportIndex]); 
	 
	    DragEndTimer = setTimeout(function() {
			hideAiportMarkers(AirportMarkers);
		}, 3000);
	    
	    myOutput(airports[ClosestAirportIndex], marker)*/
	    //output(airports[ClosestAirportIndex], marker);  
//	    setViewportByMarkers(NearAirportMarkers);
	}
/*	function myOutput(airport, marker){
		var travelMode = $('input[name="travelMode"]:checked').val();
		if (marker.getTitle() == '出发') {
			DepartAirportCode = airport.code;
			if(travelMode == 1){
				myFlightDetail($('#depart-date').val(), $('#depart-date').val(),airport.code,ReturnAirportCode,null); 
			}else {
				myFlightDetail($('#depart-date').val(), $('#return-date').val(),airport.code,ReturnAirportCode,null); 
			}
			TransferAirportMarker.hide();
		} else if(marker.getTitle() == '到达') {
			ReturnAirportCode = airport.code;
			if(travelMode == 1){
				myFlightDetail($('#depart-date').val(), $('#depart-date').val(),DepartAirportCode,airport.code,null); 
			}else {
				myFlightDetail($('#depart-date').val(), $('#return-date').val(),DepartAirportCode,airport.code,null); 
			}
			TransferAirportMarker.hide();
		} 
			//clearOverlays();
	}*/
/*	function myFlightDetail(dateVal,rtndateVal,oriVal,destVal,transferAirportCode)  {
		
		//waitHandling.open();
	 	var travelMode = $('input[name="travelMode"]:checked').val();
	 	
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
		serverUrl = contextRootPath + "/fltSrch/qryFltRte.do";
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
				if(data[0].transRslt.rsltDesc=="成功"){
					outputSuccess=true;
				data = data[0].busData;
				if (data != null && data != "") {
					if(data.fltRtes !=null && data.fltRtes !=""){
					 
						    myDrawCurveLine(data.fltRtes[0].oriEng, transferAirportCode, data.fltRtes[0].desEng);
						    buildFlights(data.fltRtes,null, transferAirportCode,travelMode);
}			
				   }
				}else{
					outputSuccess=false;
					$("#msgModal").show();
					setTimeout(function () {
						$("#msgModal").hide();
				    }, 1500);			
				}	
				//waitHandling.close();
			}		
		});
	}*/
/*	function myDrawCurveLine(departAirportCode, transferAirportCode, returnAirportCode) {
		//clearOverlays();
		var points = [];
		points.push(getPointByCode(departAirportCode));
		points.push(getPointByCode(returnAirportCode));
		
		var marker = new BMap.Marker(points[0]);
		DepartAirportMarker = marker;
		marker.disableMassClear();  
		marker.setTitle('出发');
		var depName=getNameByCode(departAirportCode);
		var arrName=getNameByCode(returnAirportCode);
		var label = new BMap.Label(depName, {offset:new BMap.Size(0, -20)});
		//label.setStyle({ borderColor:'black'});
		marker.setLabel(label);
		var icon = new BMap.Icon('../../../common/images/map/dragging/dep-mark.png', new BMap.Size(43, 48), 
				{anchor:new BMap.Size(18,36)});
		marker.setIcon(icon);
		marker.setTop(true);
		Map.addOverlay(marker);
		DepartureTransferArrivalMarkers.push(marker);
		//addMarkerDraggingEffect(marker);
		
		
		var marker = new BMap.Marker(points[1]);
		ReturnAirportMarker = marker;
		marker.disableMassClear();
		marker.setTitle('到达');
		var label = new BMap.Label(arrName, {offset:new BMap.Size(0, -20)});
		marker.setLabel(label);
		var icon = new BMap.Icon('../../../common/images/map/dragging/arr-mark.png', new BMap.Size(43, 48), 
				{anchor:new BMap.Size(18,36)});
		marker.setIcon(icon);
		marker.setTop(true);
		Map.addOverlay(marker);
		DepartureTransferArrivalMarkers.push(marker);
		addMarkerDraggingEffect(marker);
		
		var curve = new BMapLib.CurveLine(points, {strokeColor:'rgb(17, 63, 149)', strokeWeight:1.5, strokeOpacity:1,strokeStyle:'solid',enableClicking:true});
		lastCurve=curve;
		Map.addOverlay(curve);
		lastCurveDash=curve.setStrokeStyle("dashed");
		curve.setStrokeStyle("solid");
		//curve.enableEditing(); 
		
	
}*/
	function toSuccess(OD,codes){
		initMarkers();
		$(".msg").show();
		$(".msg").text("本次通航搜索共有"+codes.length+"条航班信息");
		var lngLat=[];
		var code="";
		if(OD=="orig"){	
			lngLat=getLngLatByCode(getCodeByName($("#origCode").val()));
			code=getCodeByName($("#origCode").val());
			DepartAirportCode=code;
		}
		if(OD=="dest"){
			lngLat=getLngLatByCode(getCodeByName($("#destCode").val()));
			code=getCodeByName($("#destCode").val());
			ReturnAirportCode=code;
		}
		var depName=getNameByCode(code);
		var shpoint = new BMap.Point(lngLat[0], lngLat[1]);
		var marker = new BMap.Marker(shpoint);// 创建标注
		singleMark=marker;
		marker.enableMassClear();   
		if(OD=="orig"){
		DepartAirportMarker = marker;
		var icon = new BMap.Icon('../../../common/images/map/dragging/dep-mark.png', new BMap.Size(43, 48), 
					{anchor:new BMap.Size(18,36)});
		marker.setTitle('出发');}
		if(OD=="dest"){
		ReturnAirportMarker = marker;
		var icon = new BMap.Icon('../../../common/images/map/dragging/arr-mark.png', new BMap.Size(43, 48), 
					{anchor:new BMap.Size(18,36)});
		marker.setTitle('到达');}
		var label = new BMap.Label(depName, {offset:new BMap.Size(-10, -20)});
		marker.setLabel(label);
		marker.setIcon(icon);
		Map.addOverlay(marker);
		addMyMarkerDraggingEffect(marker);
		for (var i = 0; i < codes.length; i++) {
			
			var position =[];
			if(getLngLatByCode(codes[i])!=null){
			position=getLngLatByCode(codes[i]);}
			else{continue;}
			var point = new BMap.Point(position[0], position[1]);
			var mpoints = [shpoint,point];
			var curve = new BMapLib.CurveLine(mpoints, {
				strokeColor:'rgb(17, 63, 149)', strokeWeight:1.5, strokeOpacity:1,strokeStyle:'dashed',enableClicking:true
			/*strokeColor:'rgb(17, 63, 149)', strokeWeight:1.5, strokeOpacity:1,enableClicking:true*/});
			//var curve = new BMapLib.CurveLine(mpoints, {strokeColor:"blue", strokeWeight:3, strokeOpacity:0.5}); //创建弧线对象
			Map.addOverlay(curve); //添加到地图中	
			curves[curves.length]=curve;
			var marker = new BMap.Marker(point);
			
			if(OD=="orig"){
				ReturnAirportMarker = marker;
				var icon = new BMap.Icon('../../../common/images/map/dragging/arr-mark.png', new BMap.Size(43, 48), 
							{anchor:new BMap.Size(18,36)});
				marker.setTitle('到达');}
			if(OD=="dest"){
				DepartAirportMarker = marker;
				var icon = new BMap.Icon('../../../common/images/map/dragging/dep-mark.png', new BMap.Size(43, 48), 
							{anchor:new BMap.Size(18,36)});
				marker.setTitle('出发');}
				
			marker.enableMassClear();
			var arrName=getNameByCode(codes[i]);
			var label = new BMap.Label(arrName, {offset:new BMap.Size(-10, -20)});
			
			marker.setLabel(label);
			marker.setIcon(icon);
			Map.addOverlay(marker);
			//DepartureTransferArrivalMarkers.push(marker);
			marker.disableDragging();
			markers[markers.length]=marker;
			addMarkerClickEvent(marker);
			//addMyMarkerDraggingEffect(marker);
			//drawCurveXLine(code, codes[i]);
			//setViewportByMarkers(DepartureTransferArrivalMarkers);
	/*		var myIcon = new BMap.Icon("../../../common/images/map/dragging/arr-mark.png", new BMap.Size(50,50));
			var marker = new BMap.Marker(point,{icon:myIcon}); // 创建标注 
			Map.addOverlay(marker);  */           // 将标注添加到地图中
		}
		
		
	}	
		function toError(msg){
			$(".msg").show();
			$(".msg").text(msg);
			initMarkers();
			hideAiportMarkers(AirportMarkers);
		}
		function toDragEndError(msg,marker){
			$(".msg").show();
			$(".msg").text(msg);
			DepartAirportMarker.enableMassClear();
			TransferAirportMarker.enableMassClear();
			ReturnAirportMarker.enableMassClear();
			marker.disableMassClear();
			clearOverlays();
			hideAiportMarkers(AirportMarkers);
		}
		function toDragEndSuccess(OD,codes,orig){
			
			initMarkers();
			hideAiportMarkers(AirportMarkers);
			$(".msg").show();
			$(".msg").text("本次通航搜索共有"+codes.length+"条航班信息");
			var lngLat=[];
			var code="";
			if(OD=="orig"){	
				lngLat=getLngLatByCode(orig);
				code=orig;
				DepartAirportCode=code;
				//$("#origCode").val(getNameByCode(code));
			}
			if(OD=="dest"){
				lngLat=getLngLatByCode(orig);
				code=orig;
				ReturnAirportCode=code;
			}
			var depName=getNameByCode(code);
			var shpoint = new BMap.Point(lngLat[0], lngLat[1]);
			var marker = new BMap.Marker(shpoint);// 创建标注
			singleMark=marker;
			marker.enableMassClear();   
			if(OD=="orig"){
			DepartAirportMarker = marker;
			var icon = new BMap.Icon('../../../common/images/map/dragging/dep-mark.png', new BMap.Size(43, 48), 
						{anchor:new BMap.Size(18,36)});
			marker.setTitle('出发');}
			if(OD=="dest"){
			ReturnAirportMarker = marker;
			var icon = new BMap.Icon('../../../common/images/map/dragging/arr-mark.png', new BMap.Size(43, 48), 
						{anchor:new BMap.Size(18,36)});
			marker.setTitle('到达');}
			var label = new BMap.Label(depName, {offset:new BMap.Size(-10, -20)});
			marker.setLabel(label);
			marker.setIcon(icon);
			Map.addOverlay(marker);
			
			addMyMarkerDraggingEffect(marker);
			for (var i = 0; i < codes.length; i++) {
				var position =[];
				if(getLngLatByCode(codes[i])!=null){
				position=getLngLatByCode(codes[i]);}
				else{continue;}
				var point = new BMap.Point(position[0], position[1]);
				var mpoints = [shpoint,point];
				var curve = new BMapLib.CurveLine(mpoints, {
					strokeColor:'rgb(17, 63, 149)', strokeWeight:1.5, strokeOpacity:1,strokeStyle:'dashed',enableClicking:true});
				//var curve = new BMapLib.CurveLine(mpoints, {strokeColor:"blue", strokeWeight:3, strokeOpacity:0.5}); //创建弧线对象
				Map.addOverlay(curve); //添加到地图中	
				var marker = new BMap.Marker(point);
				curves[curves.length]=curve;
				
				if(OD=="orig"){
					ReturnAirportMarker = marker;
					var icon = new BMap.Icon('../../../common/images/map/dragging/arr-mark.png', new BMap.Size(43, 48), 
								{anchor:new BMap.Size(18,36)});
					marker.setTitle('到达');}
				if(OD=="dest"){
					DepartAirportMarker = marker;
					var icon = new BMap.Icon('../../../common/images/map/dragging/dep-mark.png', new BMap.Size(43, 48), 
								{anchor:new BMap.Size(18,36)});
					marker.setTitle('出发');}
					
				marker.enableMassClear();
				var arrName=getNameByCode(codes[i]);
				var label = new BMap.Label(arrName, {offset:new BMap.Size(-10, -20)});
				
				marker.setLabel(label);
				marker.setIcon(icon);
				Map.addOverlay(marker);
				//DepartureTransferArrivalMarkers.push(marker);
				marker.disableDragging();
				addMarkerClickEvent(marker);
				markers[markers.length]=marker;
				//addMyMarkerDraggingEffect(marker);
				//drawCurveXLine(code, codes[i]);
				//setViewportByMarkers(DepartureTransferArrivalMarkers);
		/*		var myIcon = new BMap.Icon("../../../common/images/map/dragging/arr-mark.png", new BMap.Size(50,50));
				var marker = new BMap.Marker(point,{icon:myIcon}); // 创建标注 
				Map.addOverlay(marker);  */           // 将标注添加到地图中
			}
			
			
		}	
		
		function  showMyFloatFlight(flights, transferAirportCode,marker){
			
			if (flights == null || flights.length == 0) {
				$('#flights').html("");
				return;
			}
			$('#flights').html("");
			
			var $flight = $('#template > .flight-info');
			var $flightClone = $flight.clone();
			var orgName=getNameByCode(flights[0].oriEng);
			var arrName=getNameByCode(flights[0].desEng);
			$(".flight-show-dep-big").text(orgName);
			$(".flight-show-dep-small").text(orgName);
			$(".flight-show-arr-big").text(arrName);
			$(".flight-show-arr-small").text(arrName);
			
			if(flights[0].invSegInfo !=null && flights[0].invSegInfo !=""){
				$flightClone.find('.top-info').html('<span>' + '相隔距离：' + '<i>'+flights[0].invSegInfo.distance + '</i>'+'&nbsp;&nbsp;&nbsp;km'+ '</span>');
				$flightClone.find('.top-info').append('<div class="cl">'+ '</div>');
				
				var airportori = getNameByCode(flights[0].oriEng);
				var airportdes = getNameByCode(flights[0].desEng);
				$flightClone.find('#second > .stylel').html('<span class="dib f15 go-border mr10">' + '单程' + '</span>');
				$flightClone.find('#second > .stylel').append('<span class="dib f15 zhida-border">' + '直达' + '</span>');	
				$flightClone.find('#second > .stylel').append('<span class="dib f15 mr10 bottom-info" id="dateori">' + new Date(flights[0].depTime.time).formatDate("yyyy-MM-dd HH:mm ").substring(5,10) + '</span>');	
				
				$flightClone.find('#second > .stylel').append('<span class="f15 mr10" >' +'舱位:'+'&nbsp;&nbsp;'+flights[0].invSegInfo.subclassInfos[0].subclass +'&nbsp;&nbsp;&nbsp;'+'剩余座位:');
				if(flights[0].invSegInfo.subclassInfos[0].lss<0){
					$flightClone.find('#second > .stylel').append('<span class="colored">' +getSeats(flights[0].invSegInfo.subclassInfos[0].lss) + '</span>');
				}else {
					$flightClone.find('#second > .stylel').append('<span>' +getSeats(flights[0].invSegInfo.subclassInfos[0].lss) + '</span>');			
				}
				$flightClone.find('#second > .stylel').append('</span>');

				$flightClone.find('#second > .styler').html('<span class="db lowest-price mt5">' + '</span>');
				$flightClone.find('#second > .styler').append('<span class="ce1525 f18">' + flights[0].price + '</span>');
				$flightClone.find('#second').append('<div class="cl">'+ '</div>');
				
				$flightClone.find('#third > .l').html('<span class="f18 l">' + flights[0].invSegInfo.carrier +'   ' + flights[0].invSegInfo.flightNo +'</span>');
				$flightClone.find('#third > .pt').html('<span class="l lh18">' + '<i class="db n f15" id="airportori">' + airportori +'</i>'+'<i class="n f12 fblue">' +new Date(flights[0].depTime.time).formatDate("yyyy-MM-dd HH:mm ").substring(10)+'</i>'+'</span>');
				$flightClone.find('#third > .pt').append('<span class="n g9 dib p-bg tc">' +'<i class="n rel t10 mt5 dib ">'+flights[0].invSegInfo.aircraftType + '</i>'+'</span>');	
				$flightClone.find('#third > .pt').append('<span class="r lh18">' +'<i class="db n f15" id="airportdes">'+airportdes + '</i>'+'<i class="n f12 fblue">'+new Date(flights[0].arrTime.time).formatDate("yyyy-MM-dd HH:mm ").substring(10) +'</i>'+'</span>');
					
				$flightClone.find('#third').append('<div class="cl">'+ '</div>');	
				$flightClone.appendTo($('#flights'));
			}	

			var content = $('#flights')[0].innerHTML;	
			var opts ="";
			if(flights[0].invSegInfo !=null && flights[0].invSegInfo !=""){
				opts = {    
						 width : 380,    
						 height: 140,  
						} 
			}
			var infoWindow = new BMap.InfoWindow(content,opts);  
			marker.openInfoWindow(infoWindow);		
		}
/*	function newFly(e){
		 
		var shpoint = new BMap.Point(singleCurve.ia[1].lng, singleCurve.ia[1].lat);
		var marker = new BMap.Marker(shpoint);// 创建标注
		marker.enableMassClear();   
		var icon = new BMap.Icon('../../../common/images/map/dragging/air-loadding.gif', new BMap.Size(43, 48), 
					{anchor:new BMap.Size(18,36)});
		marker.setIcon(icon);
		Map.addOverlay(marker);
		var i=1;
		t=setInterval(function (){
				i+=1;
				var  nextPoint=new BMap.Point(singleCurve.ia[i].lng, singleCurve.ia[i].lat);
				marker.setRotation(singleCurve.Gr[i]);
				marker.setPosition(nextPoint);
				if(i==singleCurve.ia.length-1){
					Map.removeOverlay(marker);
					clearInterval(t);
				}
			}, 30);


	}*/
		