
$(document).ready(function() {
	initDragging();
	
	addMyEvents();
	
	initDepartReturnDate();
	
	newMarkers();
});

function addMyEvents() {
	$('.one-way').click(function () {
		$('.one-way-round-trip > .box').removeClass('one-way-round-trip-selected');
		$(this).addClass('one-way-round-trip-selected');
		$('#return-date').attr('disabled', 'disabled');	
		$('.return-date').addClass('display-none');
	});
	$('.round-trip').click(function () {
		$('.one-way-round-trip > .box').removeClass('one-way-round-trip-selected');
		$(this).addClass('one-way-round-trip-selected');
		$('#return-date').removeAttr('disabled');	
		$('.return-date').removeClass('display-none');
	});
	$('#question').click(function () {
		$("#flightsarea").hide();
		$("#queryResultTable").hide();
		//$(".areaSearch").css({"border-bottom":"none","color":"#AFC9FB","padding":"0px"});
		//$(".openToNavigationSearch").css({"border-bottom":"none","color":"#AFC9FB","padding":"0px"});
		//$(this).css({"border-bottom":"2px solid #ddd","color":"white","padding":"6px"})

		initMarkers();
		newMarkers();
		//window.location.reload();
	$(".flight-navigable").hide();
	$(".flight-panel").show();
	});
	$('#find-flights').click(function () {
		initMarkers();
		//newMarkers();
		showCanvas();
		hideDomElementsForDrawing();
		clearOverlays();
		closeInfoWin();
		
		DepartPolygonPath = [];
		ReturnPolygonPath = [];
	});
}

function initDepartReturnDate() {
	Date.prototype.toDateInputValue = (function() {
		var local = new Date(this);
		local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
		return local.toJSON().slice(0,10);
	});
	var today = new Date();
	$('#depart-date').val(today.toDateInputValue());
	today.setDate(today.getDate() + 1);
	$('#return-date').val(today.toDateInputValue());
}

function buildFlights(flights, flightsRtn,transferAirportCode,travelMode) {

			if (flights == null || flights.length == 0) {
				$('#flights').html("");
				return;
			}
			$('#flights').html("");
			
			if(travelMode == 1 ){ 
				showFloatFlight(flights, transferAirportCode,1);
			}else {  
				showRtnFloatFlight(flights, flightsRtn,transferAirportCode,1)
			}
}

function buildAreaFlights(flights){
	
	if (flights == null || flights.length == 0) {
		$('#flightsarea').html("");
		return;
	}
	    $('#flightsarea').html("");
	    
	    showAreaFloatFlight(flights);
}

function hideDomElementsForDrawing() {
		hideElement($('#flight-panel'));
		hideElement($('#flights'));
}

function showDomElementsForDrawing() {
	showElement($('#flight-panel'));
	//showElement($('#flights'));
}

function adaptFltData(data){
	if(data.busData != null){
		return data.busData.fltRtes;
	}else{
		return data.busData;
	}
}

function adaptConnectionFltData(data){
	if(data.busData != null){
		return data.busData;
	}else{
		return data.busData;
	}
}

function  showFloatFlight(flights, transferAirportCode,flag) {
	
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
		//$flightClone.find('#second > .stylel').append('<span class="f15 mr10" >' +'舱位：'+flights[0].invSegInfo.subclassInfos[0].subclass +'&nbsp;&nbsp;&nbsp;'+'剩余座位：'+getSeats(flights[0].invSegInfo.subclassInfos[0].lss)+ '</span>');
		
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
	/*免优票组不需要中转航班*/	
/*	else {
		var invSegInfoO = flights[0].invSegInfoO;
		var invSegInfoD = flights[0].invSegInfoD;
		var totalprice = flights[0].totalPrice;
		var disInO = invSegInfoO.distance;
		var disInD = invSegInfoD.distance;
		var totalDis = disInO+disInD;
				
		$flightClone.find('.top-info').html('<span>' + '相隔距离：' + '<i>'+totalDis + '</i>'+'&nbsp;&nbsp;&nbsp;km'+ '</span>');
		$flightClone.find('.top-info').append('<div class="cl">'+ '</div>');
		
		var airportoriO = getNameByCode(invSegInfoO.oriEng);
		var airportdesO = getNameByCode(invSegInfoO.desEng);
		var airportoriD = getNameByCode(invSegInfoD.oriEng);
		var airportdesD = getNameByCode(invSegInfoD.desEng);
		
		$flightClone.find('#second > .stylel').html('<span class="dib f15 go-border mr10">' + '单程' + '</span>');
		$flightClone.find('#second > .stylel').append('<span class="dib f15 zhida-border">' + '中转' + '</span>');	
		$flightClone.find('#second > .stylel').append('<span class="dib f15 mr30 bottom-info" id="dateori">' + new Date(invSegInfoO.depTime.time).formatDate("yyyy-MM-dd HH:mm ").substring(5,10) + '</span>');	
	
		$flightClone.find('#second > .styler').html('<span class="db lowest-price mt5">' + '</span>');
		$flightClone.find('#second > .styler').append('<span class="ce1525 f18">' + totalprice + '</span>');
//		$flightClone.find('#second').append('<div class="cl">'+'<span class="f15 mr10" >' +'第1段舱位:'+invSegInfoO.subclassInfos[0].subclass +' '+'剩余座位数:'+invSegInfoO.subclassInfos[0].lss+ '</span>' +'  '+ '<span class="f15 mr10" >' +'第2段舱位:'+invSegInfoD.subclassInfos[0].subclass +' '+'剩余座位数:'+invSegInfoD.subclassInfos[0].lss+ '</span>'+'</div>');
		$flightClone.find('#second').append('<div class="cl">'+'<span class="f15 mr10" >' +'第1段舱位:'+invSegInfoO.subclassInfos[0].subclass +' '+'剩余座位:'+getSeats(invSegInfoO.subclassInfos[0].lss)+ '</span>' +'  '+ '<span class="f15 mr10" >' +'第2段舱位:'+invSegInfoD.subclassInfos[0].subclass +' '+'剩余座位:'+getSeats(invSegInfoD.subclassInfos[0].lss)+ '</span>'+'</div>');
		
		$flightClone.find('#third > .l').html('<span class="f18 l">' + invSegInfoO.carrier +'   ' + invSegInfoO.flightNo +'</span>');
		$flightClone.find('#third > .pt').html('<span class="l lh18">' + '<i class="db n f15" id="airportoriO">' + airportoriO +'</i>'+'<i class="n f12 fblue">' +new Date(invSegInfoO.depTime.time).formatDate("yyyy-MM-dd HH:mm ").substring(10)+'</i>'+'</span>');
		$flightClone.find('#third > .pt').append('<span class="n g9 dib p-bg tc">' +'<i class="n rel t10 mt5 dib ">'+invSegInfoO.aircraftType + '</i>'+'</span>');	
		$flightClone.find('#third > .pt').append('<span class="r lh18">' +'<i class="db n f15" id="airportdesO">'+airportdesO + '</i>'+'<i class="n f12 fblue">'+new Date(invSegInfoO.arrTime.time).formatDate("yyyy-MM-dd HH:mm ").substring(10) +'</i>'+'</span>');	
		
		$flightClone.find('#four > .l').html('<span class="f18 l">' + invSegInfoD.carrier +'   ' + invSegInfoD.flightNo +'</span>');
		$flightClone.find('#four > .pt').html('<span class="l lh18">' + '<i class="db n f15" id="airportoriD">' + airportoriD +'</i>'+'<i class="n f12 fblue">' +new Date(invSegInfoD.depTime.time).formatDate("yyyy-MM-dd HH:mm ").substring(10)+'</i>'+'</span>');
		$flightClone.find('#four > .pt').append('<span class="n g9 dib p-bg tc">' +'<i class="n rel t10 mt5 dib ">'+invSegInfoD.aircraftType + '</i>'+'</span>');	
		$flightClone.find('#four > .pt').append('<span class="r lh18">' +'<i class="db n f15" id="airportdesD">'+airportdesD + '</i>'+'<i class="n f12 fblue">'+new Date(invSegInfoD.arrTime.time).formatDate("yyyy-MM-dd HH:mm ").substring(10) +'</i>'+'</span>');
			
		$flightClone.find('#four').append('<div class="cl">'+ '</div>');	
		$flightClone.appendTo($('#flights'));		
	}*/	
	var content = $('#flights')[0].innerHTML;	
	var opts ="";
	if(flights[0].invSegInfo !=null && flights[0].invSegInfo !=""){
		opts = {    
				 width : 380,    
				 height: 140,  
				} 
	}
	/*免优票组不需要中转航班*/	
	/*else {
		opts = {    
				 width : 380,    
				 height: 200,  
				} 
	}*/
	if(flag==1){
		var position =[];
		position = getLngLatByCode(flights[0].desEng);
		var point = new BMap.Point(position[0], position[1]);	
		var marker = new BMap.Marker(point);
		var infoWindow = new BMap.InfoWindow(content,opts);  
		map.addOverlay(marker);	
		marker.openInfoWindow(infoWindow);	
	}else {
		//drawCurveLine(flights[0].oriEng, null, flights[0].desEng);
		var arrpoint = new BMap.Point(getPointByCode(flights[0].desEng).lng, getPointByCode(flights[0].desEng).lat);
		var depoint = new BMap.Point(getPointByCode(flights[0].oriEng).lng, getPointByCode(flights[0].oriEng).lat);
		var arrmarker = new BMap.Marker(arrpoint); 
	    setArrUnMoveMarkerIcon(arrmarker);
	    arrmarker.setTop(true);
		Map.addOverlay(arrmarker);
		
		var depmarker = new BMap.Marker(depoint); 
		setDepUnMoveMarkerIcon(depmarker);
		depmarker.setTop(true);
		map.addOverlay(depmarker);
		
		var points = [];
		points.push(getPointByCode(flights[0].desEng));
		points.push(getPointByCode(flights[0].oriEng));
		var curve = new BMapLib.CurveLine(points, {strokeColor:'rgb(17, 63, 149)', strokeWeight:1.5, strokeOpacity:1,strokeStyle:'solid'});
		Map.addOverlay(curve);
		curve.enableEditing(); 
		
		
		var position =[];
		position = getLngLatByCode(flights[0].desEng);
		var point = new BMap.Point(position[0], position[1]);	
		var marker = new BMap.Marker(point);
		var infoWindow = new BMap.InfoWindow(content,opts);  
		map.addOverlay(marker);	
		marker.openInfoWindow(infoWindow);	
	}		
}

//showAreaFloatFlight最初版本，请勿删除
function  showAreaFloatFlight_Yuan(flights){
	
	if (flights == null || flights.length == 0) {
		$('#flightsarea').html("");
		return;
	}
	$('#flightsarea').html("");	
	var areaFlightInfo = "";
	
	areaFlightInfo += "<div style='background:#1B4EAC; color:#FFFFFF; height:50px;line-height: 50px;padding-left: 20px;'>";
	areaFlightInfo +="<span>";
	areaFlightInfo +=$('#depart-date').val();  
	areaFlightInfo +="</span>";
	areaFlightInfo += "<a id='resetArea' style='cursor:pointer,text-decoration:underline;padding-left: 180px;color:#FFFFFF !important' onclick='resetArea();' >";
	areaFlightInfo += "重新区域搜索"
	areaFlightInfo +=	"</a>";
	areaFlightInfo +="</div>";		
	areaFlightInfo += "<div class='template templepad' id='templatearea' > ";
	
	for(var i = 0; i < flights.length; i++){	
		if(flights[i].invSegInfo !=null && flights[i].invSegInfo !=""){
			
			var airportori = getNameByCode(flights[i].oriEng);
			var airportdes = getNameByCode(flights[i].desEng);
			
			 areaFlightInfo += "<div class='flight-info dib pb5 w100' id='flightarea'>";
			 areaFlightInfo += "<div class='top-info' id='firstarea'>";		 
			 areaFlightInfo += "<span>相隔距离：";
			 areaFlightInfo +="<i>" ;
			 areaFlightInfo += flights[i].invSegInfo.distance;
			 areaFlightInfo += "</i>";
			 areaFlightInfo += '&nbsp;&nbsp;&nbsp;km';
			 areaFlightInfo +="</span>";
			 areaFlightInfo +="<div class='cl'>";
			 areaFlightInfo +="</div></div>";	 
			 areaFlightInfo +="<div class='btm-9bb7ec'>";
			 areaFlightInfo +="<div  id='secondarea'>";
			 areaFlightInfo +="<div class='stylel rel t15'>";			 
			 areaFlightInfo +="<span class='dib f15 zhida-border'>";
			 areaFlightInfo +="直达";
			 areaFlightInfo +="</span>";
			 areaFlightInfo +="<span class='dib f15 mr30 bottom-info' id='dateoriarea'>";
			 areaFlightInfo +=new Date(flights[i].depTime.time).formatDate("yyyy-MM-dd HH:mm ").substring(5,10);
			 areaFlightInfo +="</span>";		 
			 areaFlightInfo +="<span class='f15 mr10'>";
			 areaFlightInfo +="舱位：";
			 areaFlightInfo +=flights[i].invSegInfo.subclassInfos[0].subclass;
			 areaFlightInfo +="&nbsp;&nbsp;&nbsp;";
			 areaFlightInfo +="剩余座位：";
			 if(flights[i].invSegInfo.subclassInfos[0].lss<0){
				 areaFlightInfo +="<font color='#FF0000'>";
				 areaFlightInfo +=getSeats(flights[i].invSegInfo.subclassInfos[0].lss);
				 areaFlightInfo +="</font>";
			 }else{
				 areaFlightInfo +=getSeats(flights[i].invSegInfo.subclassInfos[0].lss);
			 } 
			 areaFlightInfo +="</span>";
			 areaFlightInfo +="</div>";
			 
			 areaFlightInfo +="<div class='styler mr10'>";
			 areaFlightInfo +="<span class='db lowest-price mt5'>";
			 areaFlightInfo +="</span>";
			 areaFlightInfo +="<span class='ce1525 f18'>" ;
			 areaFlightInfo += flights[i].price;
			 areaFlightInfo += "</span>";
			 areaFlightInfo +="</div>";
			 areaFlightInfo +="<div class='cl'>";
			 areaFlightInfo +="</div></div>";	 
			 areaFlightInfo +="<div id='thirdarea'>";	 
			 areaFlightInfo +="<div class='l'>";
			 areaFlightInfo +="<span class='f18 l'>";
			 areaFlightInfo +=flights[i].invSegInfo.carrier;
			 areaFlightInfo +="  ";
			 areaFlightInfo +=flights[i].invSegInfo.flightNo;
			 areaFlightInfo +="</span>";
			 areaFlightInfo +="</div>";
			 areaFlightInfo +="<div class='pt rel tc flight-r'>";
			 areaFlightInfo +="<span class='l lh18'>";
			 areaFlightInfo +="<i class='db n f15' id='airportoriarea'>";
			 areaFlightInfo +=airportori;
			 areaFlightInfo +="</i>";
			 areaFlightInfo +="<i class='n f12 fblue'>";
			 areaFlightInfo +=new Date(flights[i].depTime.time).formatDate("yyyy-MM-dd HH:mm ").substring(10);
			 areaFlightInfo +="</i>";
			 areaFlightInfo +="</span>"; 
			 areaFlightInfo +="<span class='n g9 dib p-bg tc'>";
			 areaFlightInfo +="<i class='n rel t10 mt5 dib '>";
			 areaFlightInfo +=flights[i].invSegInfo.aircraftType ;
			 areaFlightInfo +="</i>";
			 areaFlightInfo +="</span>"; 
			 areaFlightInfo +="<span class='r lh18'>";
			 areaFlightInfo +="<i class='db n f15' id='airportdesarea'>";
			 areaFlightInfo +=airportdes;
			 areaFlightInfo +="</i>";
			 areaFlightInfo +="<i class='n f12 fblue'>";
			 areaFlightInfo +=new Date(flights[i].arrTime.time).formatDate("yyyy-MM-dd HH:mm ").substring(10);
			 areaFlightInfo +="</i>";
			 areaFlightInfo +="</span>";
			 areaFlightInfo +="</div>";	  
			 areaFlightInfo +="<div class='cl'>";
			 areaFlightInfo +="</div>"; 		 
			 //areaFlightInfo +="<a href='#'  onclick= 'purchaseTickets();'>";
			 areaFlightInfo +="<a href='#'  onclick=purchaseAreaTickets('"+airportori+"','"+airportdes+"');>";
			 areaFlightInfo +="直接订票";
			 areaFlightInfo +="</a>";		
			 areaFlightInfo +="&nbsp;&nbsp;&nbsp;";
			 areaFlightInfo +="<a href='#'  onclick= 'purchaseFreeTickets();'>";
			 areaFlightInfo +="免优票";
			 areaFlightInfo += "</a>";
//			 areaFlightInfo +="<a href='#'  onclick= 'buildFlightAreaDetails('"+airportori+"','"+airportdes+"');>";
//			 areaFlightInfo +="更多航班";
//			 areaFlightInfo += "</a>";	
			 
			 areaFlightInfo +="</div>"; 
			 areaFlightInfo +="</div>";			 		
			 //areaFlightInfo +="</div></div>";
			 areaFlightInfo +="</div>";
//			 $("#flightsarea").html(areaFlightInfo);
//			 $("#flightsarea").css({overflow:'auto',height:'200px'});
		}
		
		/*免优票组不需要中转航班*/			
/*		else {  
			var invSegInfoO = flights[i].invSegInfoO;
			var invSegInfoD = flights[i].invSegInfoD;
			var totalprice = flights[i].totalPrice;
			var disInO = invSegInfoO.distance;
			var disInD = invSegInfoD.distance;
			var totalDis = disInO+disInD;
			
			var airportoriO = getNameByCode(invSegInfoO.oriEng);
			var airportdesO = getNameByCode(invSegInfoO.desEng);
			var airportoriD = getNameByCode(invSegInfoD.oriEng);
			var airportdesD = getNameByCode(invSegInfoD.desEng);
			 areaFlightInfo += "<div class='flight-info dib pb5 w100' id='flightarea'>";
			 areaFlightInfo += "<div class='top-info' id='firstarea'>";		 
			 areaFlightInfo += "<span>相隔距离：";
			 areaFlightInfo +="<i>" ;
			 areaFlightInfo += totalDis;
			 areaFlightInfo += "</i>";
			 areaFlightInfo += '&nbsp;&nbsp;&nbsp;km';
			 areaFlightInfo +="</span>";
			 areaFlightInfo +="<div class='cl'>";
			 areaFlightInfo +="</div></div>"; 			 
			 areaFlightInfo +="<div class='btm-9bb7ec'>";
			 areaFlightInfo +="<div  id='secondarea'>";		 
			 areaFlightInfo +="<div class='stylel rel t15'>";			 
			 areaFlightInfo +="<span class='dib f15 zhida-border'>";
			 areaFlightInfo +="中转";
			 areaFlightInfo +="</span>";
			 areaFlightInfo +="<span class='dib f15 mr30 bottom-info' id='dateoriarea'>";
			 areaFlightInfo +=new Date(invSegInfoO.depTime.time).formatDate("yyyy-MM-dd HH:mm ").substring(5,10);
			 areaFlightInfo +="</span>";		
			 areaFlightInfo +="</div>";		 
			 areaFlightInfo +="<div class='styler mr10'>";	
			 areaFlightInfo +="<span class='db lowest-price mt5'>";
			 areaFlightInfo +="</span>";		
			 areaFlightInfo +="<span class='ce1525 f18'>";		
			 areaFlightInfo +=totalprice;
			 areaFlightInfo +="</span>";
			 areaFlightInfo +="</div>";	 
			 areaFlightInfo +="<div class='cl'>";
			 areaFlightInfo +="<span class='f15 mr10'>";
			 areaFlightInfo +="第1段舱位-";
			 //areaFlightInfo +="&nbsp;&nbsp;&nbsp;";
			 areaFlightInfo +=invSegInfoO.subclassInfos[0].subclass;
			 areaFlightInfo +="&nbsp;&nbsp;&nbsp;";
			 areaFlightInfo +="剩余座位-";
			 areaFlightInfo +=getSeats(invSegInfoO.subclassInfos[0].lss);
			 areaFlightInfo +="</span>";
			 areaFlightInfo +="|";
			 areaFlightInfo +="<span class='f15 mr10'>";
			 areaFlightInfo +="第2段舱位-";
			 areaFlightInfo +=invSegInfoD.subclassInfos[0].subclass;
			 areaFlightInfo +="&nbsp;&nbsp;&nbsp;";
			 areaFlightInfo +="剩余座位-";
			 areaFlightInfo +=getSeats(invSegInfoD.subclassInfos[0].lss);
			 areaFlightInfo +="</span>"; 
			 areaFlightInfo +="</div></div>";
			 areaFlightInfo +="<div id='thirdarea'>";
			 areaFlightInfo +="<div class='l'>";
			 areaFlightInfo +="<span class='f18 l'>";
			 areaFlightInfo +=invSegInfoO.carrier;
			 areaFlightInfo +=" ";
			 areaFlightInfo +=invSegInfoO.flightNo; 
			 areaFlightInfo +="</span>";
			 areaFlightInfo +="</div>";		 
			 areaFlightInfo +="<div class='pt rel tc flight-r'>";
			 areaFlightInfo +="<span class='l lh18'>";
			 areaFlightInfo +="<i class='db n f15' id='airportoriOarea'>";
			 areaFlightInfo +=airportoriO; 
			 areaFlightInfo +="</i>";
			 areaFlightInfo +="<i class='n f12 fblue'>";
			 areaFlightInfo +=new Date(invSegInfoO.depTime.time).formatDate("yyyy-MM-dd HH:mm ").substring(10);
			 areaFlightInfo +="</i>";
			 areaFlightInfo +="</span>";
			 areaFlightInfo +="<span class='n g9 dib p-bg tc'>";
			 areaFlightInfo +="<i class='n rel t10 mt5 dib '>";
			 areaFlightInfo +=invSegInfoO.aircraftType;
			 areaFlightInfo +="</i>";
			 areaFlightInfo +=	"</span>";
			 areaFlightInfo +="<span class='r lh18'>"; 
			 areaFlightInfo +="<i class='db n f15' id='airportdesOarea'>";
		     areaFlightInfo +=airportdesO; 
		     areaFlightInfo +="</i>";
			 areaFlightInfo +="<i class='n f12 fblue'>";
			 areaFlightInfo +=new Date(invSegInfoO.arrTime.time).formatDate("yyyy-MM-dd HH:mm ").substring(10); 
             areaFlightInfo +="</i>";
	         areaFlightInfo +="</span>";
			 areaFlightInfo +="</div></div>";	 
			 areaFlightInfo +="<div class='div-height'></div>";			 
			 areaFlightInfo +="<div id='fourarea'>";
			 areaFlightInfo +="<div class='l'>";
			 areaFlightInfo +="<span class='f18 l'>" ;
			 areaFlightInfo +=	invSegInfoD.carrier 
			 areaFlightInfo += "  ";
			 areaFlightInfo += invSegInfoD.flightNo 
			 areaFlightInfo +="</span>";
			 areaFlightInfo +="</div>";
			 
			 areaFlightInfo +="<div class='pt rel tc flight-r'>";
			 areaFlightInfo +="<span class='l lh18'>";
			 areaFlightInfo +="<i class='db n f15' id='airportoriDarea'>"; 
			 areaFlightInfo +=airportoriD 
			 areaFlightInfo +="</i>"
			 areaFlightInfo +="<i class='n f12 fblue'>" ;
			 areaFlightInfo += new Date(invSegInfoD.depTime.time).formatDate("yyyy-MM-dd HH:mm ").substring(10)
             areaFlightInfo +="</i>"
             areaFlightInfo +="</span>";
			 areaFlightInfo +="<span class='n g9 dib p-bg tc'>";
			 areaFlightInfo +="<i class='n rel t10 mt5 dib'>";
			 areaFlightInfo +=invSegInfoD.aircraftType
			 areaFlightInfo +="</i>";
			 areaFlightInfo +="</span>";
			 areaFlightInfo +="<span class='r lh18'>";
			 areaFlightInfo +="<i class='db n f15' id='airportdesDarea'>";
			 areaFlightInfo +=airportdesD;
			 areaFlightInfo +="</i>";
			 areaFlightInfo +="<i class='n f12 fblue'>";
			 areaFlightInfo +=new Date(invSegInfoD.arrTime.time).formatDate("yyyy-MM-dd HH:mm ").substring(10)
			 areaFlightInfo +="</i>";
			 areaFlightInfo +="</span>";
			 areaFlightInfo +="</div>";	
        	 areaFlightInfo +="<div class='cl'>";
			 areaFlightInfo +="</div></div>";
			 areaFlightInfo +="</div>";
			 areaFlightInfo +="<div class='line'>";
			 areaFlightInfo +="</div>";			 
//			 areaFlightInfo +="<a href='#'  onclick= 'buildFlightDetails();' >";
//			 areaFlightInfo +="更多航班";
//			 areaFlightInfo += "</a>";		 
			 areaFlightInfo +="</div>";		 
		}*/	
	}
	areaFlightInfo +="</div>";
	$("#flightsarea").html(areaFlightInfo);
	$("#flightsarea").css({overflow:'auto',display: 'block',position: 'absolute',left:'965px',top: '106px',width: '390px'});
	$("#flightsarea").show();	
//var content = $('#flightsarea')[0].innerHTML;	
//	var position =[];
//	position = getLngLatByCode(flights[0].desEng);
//	var point = new BMap.Point(position[0], position[1]);
//	var opts = {    
//			 width : 380,    
//			 height: 300,  
//			} 
//	
//	var marker = new BMap.Marker(point);
//	var infoWindow = new BMap.InfoWindow(content,opts);  
//	map.addOverlay(marker);	
//	marker.openInfoWindow(infoWindow);	
}


function  showAreaFloatFlight(flights){
	
	if (flights == null || flights.length == 0) {
		$('#flightsarea').html("");
		return;
	}
	$('#flightsarea').html("");
	var areaFlightInfo = "";
	
	areaFlightInfo += "<div style='background:#1B4EAC; color:#FFFFFF; height:50px;line-height: 50px;padding-left: 20px;'>";
	areaFlightInfo +="<span>";
	areaFlightInfo +=$('#depart-date').val();  
	areaFlightInfo +="</span>";
	areaFlightInfo += "<a id='resetArea' style='cursor:pointer,text-decoration:underline;padding-left: 180px;color:#FFFFFF !important' onclick='resetArea();' >";
	areaFlightInfo += "重新区域搜索"
	areaFlightInfo +=	"</a>";
	areaFlightInfo +="</div>";
			
	areaFlightInfo += "<div class='template templepad' id='templatearea' style='background:#EEEEEE;'> ";
	
	for(var i = 0; i < flights.length; i++){	
		if(flights[i].invSegInfo !=null && flights[i].invSegInfo !=""){
			
			var airportori = getNameByCode(flights[i].oriEng);
			var airportdes = getNameByCode(flights[i].desEng);
			
			 areaFlightInfo += "<div class='flight-info dib pb5 w100' id='flightarea' style='background:#EEEEEE;'>";
			 areaFlightInfo +="<div class='btm-9bb7ec'>";	 
			 areaFlightInfo +="<div  id='secondarea'>";		 
			 areaFlightInfo +="<div class='styler mr10 mrt10'>";
			 areaFlightInfo +="<span class='db lowest-price mt5'>";
			 areaFlightInfo +="</span>";
			 areaFlightInfo +="<span class='ce1525 f18'>" ;
			 areaFlightInfo += flights[i].price;
			 areaFlightInfo += "</span>";
			 areaFlightInfo +="</div>";		 
			 areaFlightInfo +="</div>";
			 
			 areaFlightInfo +="<div id='thirdarea'>";	 
			 areaFlightInfo +="<div class='ptl rel tc flight-r mrt12'>";
			 areaFlightInfo +="<span class='l lh18'>";
			 areaFlightInfo +="<i class='db n f16 fblue herfont ' id='airportoriarea'>";
			 areaFlightInfo +=airportori;
			 areaFlightInfo +="</i>";
			 areaFlightInfo +="<i class='n f14 g9 infont'>";
			 areaFlightInfo +=new Date(flights[i].depTime.time).formatDate("yyyy-MM-dd HH:mm ").substring(10);
			 areaFlightInfo +="</i>";
			 areaFlightInfo +="</span>"; 
			 areaFlightInfo +="<span class='n g9 dib p-bg tc'>";
			 areaFlightInfo +="<i class='n rel t10 mt5 dib f14 g9 infont'>";
			 areaFlightInfo +="直达" ;
			 areaFlightInfo +="</i>";
			 areaFlightInfo +="</span>"; 
			 areaFlightInfo +="<span class='r lh18'>";
			 areaFlightInfo +="<i class='db n f16 fblue herfont' id='airportdesarea'>";
			 areaFlightInfo +=airportdes;
			 areaFlightInfo +="</i>";
			 areaFlightInfo +="<i class='n f14 g9 infont'>";
			 areaFlightInfo +=new Date(flights[i].arrTime.time).formatDate("yyyy-MM-dd HH:mm ").substring(10);
			 areaFlightInfo +="</i>";
			 areaFlightInfo +="</span>";
			 areaFlightInfo +="</div>";
			 		 
			 areaFlightInfo +="<div class='cl'>";
			 areaFlightInfo +="</div>"; 
			 areaFlightInfo +="<a href='#'  onclick=purchaseAreaTickets('"+airportori+"','"+airportdes+"');>";
			 areaFlightInfo +="直接订票";
			 areaFlightInfo +="</a>";		
			 areaFlightInfo +="&nbsp;&nbsp;&nbsp;";
			 areaFlightInfo +="<a href='#'  onclick= 'purchaseFreeTickets();'>";
			 areaFlightInfo +="免优票";
			 areaFlightInfo += "</a>";	
			 areaFlightInfo +="&nbsp;&nbsp;&nbsp;";
			 areaFlightInfo +="<a href='#'  onclick=flightDetailsDis('"+airportori+"','"+airportdes+"');>";
			 areaFlightInfo +="航班详情";
			 areaFlightInfo += "</a>";
			 areaFlightInfo +="</div>"; 
			 		 
			 areaFlightInfo +="</div>";			 		
			 areaFlightInfo +="</div>";
		}
	}
	areaFlightInfo +="</div>";
	$("#flightsareahidden").html(areaFlightInfo);
	$("#flightsarea").html(areaFlightInfo);
	
	var heighteach = "";
	var totalheight = 0;
	if(flights.length !=null && flights.length !=""){
		if(flights.length !=0){
			heighteach = $("#flightsareahidden").height()/flights.length;
		}
	}
	for(var n=0; n<flights.length; n++){
		totalheight+=heighteach;
	}
	$("#flightsarea").css({overflow:'auto',display: 'block',position: 'absolute',left:'965px',top: '106px',width: '390px',"height":totalheight+2+"px"}); 
	$("#flightsarea").show();		
}

function  showRtnFloatFlight(flights, flightsRtn,transferAirportCode,flag) {
	
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
	if(flights !=null && flights !=""){
		if(flights[0].invSegInfo !=null && flights[0].invSegInfo !=""){
			$flightClone.find('.top-info').html('<span>' + '相隔距离：' + '<i>'+flights[0].invSegInfo.distance + '</i>'+'&nbsp;&nbsp;&nbsp;km'+ '</span>');
			$flightClone.find('.top-info').append('<div class="cl">'+ '</div>');
			
			var airportori = getNameByCode(flights[0].oriEng);
			var airportdes = getNameByCode(flights[0].desEng);
			$flightClone.find('#second > .stylel').html('<span class="dib f15 go-border mr10">' + '去程' + '</span>');
			$flightClone.find('#second > .stylel').append('<span class="dib f15 zhida-border">' + '直达' + '</span>');	
			$flightClone.find('#second > .stylel').append('<span class="dib f15 mr30 bottom-info" id="dateori">' + new Date(flights[0].depTime.time).formatDate("yyyy-MM-dd HH:mm ").substring(5,10) + '</span>');				
			//$flightClone.find('#second > .stylel').append('<span class="f15 mr10" >' +'舱位：'+flights[0].invSegInfo.subclassInfos[0].subclass +'&nbsp;&nbsp;&nbsp;'+'剩余座位：'+getSeats(flights[0].invSegInfo.subclassInfos[0].lss)+ '</span>');
	
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
		}
		
		/*免优票组不需要中转航班*/
/*		else {
			var invSegInfoO = flights[0].invSegInfoO;
			var invSegInfoD = flights[0].invSegInfoD;
			var totalprice = flights[0].totalPrice;
			var disInO = invSegInfoO.distance;
			var disInD = invSegInfoD.distance;
			var totalDis = disInO+disInD;
			
			var airportoriO = getNameByCode(invSegInfoO.oriEng);
			var airportdesO = getNameByCode(invSegInfoO.desEng);
			var airportoriD = getNameByCode(invSegInfoD.oriEng);
			var airportdesD = getNameByCode(invSegInfoD.desEng);
			
			$flightClone.find('.top-info').html('<span>' + '相隔距离：' + '<i>'+totalDis + '</i>'+'&nbsp;&nbsp;&nbsp;km'+ '</span>');
			$flightClone.find('.top-info').append('<div class="cl">'+ '</div>');
					
			$flightClone.find('#second > .stylel').html('<span class="dib f15 go-border mr10">' + '去程' + '</span>');
			$flightClone.find('#second > .stylel').append('<span class="dib f15 zhida-border">' + '中转' + '</span>');	
			$flightClone.find('#second > .stylel').append('<span class="dib f15 mr30 bottom-info" id="dateori">' + new Date(invSegInfoO.depTime.time).formatDate("yyyy-MM-dd HH:mm ").substring(5,10) + '</span>');	
			$flightClone.find('#second > .styler').html('<span class="db lowest-price mt5">' + '</span>');
			$flightClone.find('#second > .styler').append('<span class="ce1525 f18">' + totalprice + '</span>');
			//$flightClone.find('#second').append('<div class="cl">'+'<span class="f15 mr10" >' +'第1段舱位:'+invSegInfoO.subclassInfos[0].subclass +' '+'剩余座位数:'+invSegInfoO.subclassInfos[0].lss+ '</span>' +'  '+ '<span class="f15 mr10" >' +'第2段舱位:'+invSegInfoD.subclassInfos[0].subclass +' '+'剩余座位数:'+invSegInfoD.subclassInfos[0].lss+ '</span>'+'</div>');
			$flightClone.find('#second').append('<div class="cl">'+'<span class="f15 mr10" >' +'第1段舱位:'+invSegInfoO.subclassInfos[0].subclass +' '+'剩余座位:'+getSeats(invSegInfoO.subclassInfos[0].lss)+ '</span>' +'  '+ '<span class="f15 mr10" >' +'第2段舱位:'+invSegInfoD.subclassInfos[0].subclass +' '+'剩余座位:'+getSeats(invSegInfoD.subclassInfos[0].lss)+ '</span>'+'</div>');
			
			$flightClone.find('#third > .l').html('<span class="f18 l">' + invSegInfoO.carrier +'   ' + invSegInfoO.flightNo +'</span>');
			$flightClone.find('#third > .pt').html('<span class="l lh18">' + '<i class="db n f15" id="airportoriO">' + airportoriO +'</i>'+'<i class="n f12 fblue">' +new Date(invSegInfoO.depTime.time).formatDate("yyyy-MM-dd HH:mm ").substring(10)+'</i>'+'</span>');
			$flightClone.find('#third > .pt').append('<span class="n g9 dib p-bg tc">' +'<i class="n rel t10 mt5 dib ">'+invSegInfoO.aircraftType + '</i>'+'</span>');	
			$flightClone.find('#third > .pt').append('<span class="r lh18">' +'<i class="db n f15" id="airportdesO">'+airportdesO + '</i>'+'<i class="n f12 fblue">'+new Date(invSegInfoO.arrTime.time).formatDate("yyyy-MM-dd HH:mm ").substring(10) +'</i>'+'</span>');
					
			$flightClone.find('#four > .l').html('<span class="f18 l">' + invSegInfoD.carrier +'   ' + invSegInfoD.flightNo +'</span>');
			$flightClone.find('#four > .pt').html('<span class="l lh18">' + '<i class="db n f15" id="airportoriD">' + airportoriD +'</i>'+'<i class="n f12 fblue">' +new Date(invSegInfoD.depTime.time).formatDate("yyyy-MM-dd HH:mm ").substring(10)+'</i>'+'</span>');
			$flightClone.find('#four > .pt').append('<span class="n g9 dib p-bg tc">' +'<i class="n rel t10 mt5 dib ">'+invSegInfoD.aircraftType + '</i>'+'</span>');	
			$flightClone.find('#four > .pt').append('<span class="r lh18">' +'<i class="db n f15" id="airportdesD">'+airportdesD + '</i>'+'<i class="n f12 fblue">'+new Date(invSegInfoD.arrTime.time).formatDate("yyyy-MM-dd HH:mm ").substring(10) +'</i>'+'</span>');	
			$flightClone.find('#four').append('<div class="cl">'+ '</div>');				
		}*/
		
	}
	
    if(flightsRtn !=null && flightsRtn !=""){
         if(flightsRtn[0].invSegInfo !=null && flightsRtn[0].invSegInfo !=""){
        		var airportorirtn = getNameByCode(flightsRtn[0].oriEng);
        		var airportdesrtn = getNameByCode(flightsRtn[0].desEng);
        		$flightClone.find('#secondrtn > .stylel').html('<span class="dib f15 go-border mr10">' + '返程' + '</span>');
        		$flightClone.find('#secondrtn > .stylel').append('<span class="dib f15 zhida-border">' + '直达' + '</span>');	
        		$flightClone.find('#secondrtn > .stylel').append('<span class="dib f15 mr30 bottom-info" id="dateorirtn" name="dateori">' + new Date(flightsRtn[0].depTime.time).formatDate("yyyy-MM-dd HH:mm ").substring(5,10) + '</span>');	
        		//$flightClone.find('#secondrtn > .stylel').append('<span class="f15 mr10" >' +'舱位：'+flightsRtn[0].invSegInfo.subclassInfos[0].subclass +'&nbsp;&nbsp;&nbsp;'+'剩余座位：'+getSeats(flightsRtn[0].invSegInfo.subclassInfos[0].lss)+ '</span>');
        		
        		$flightClone.find('#secondrtn > .stylel').append('<span class="f15 mr10" >' +'舱位:'+'&nbsp;&nbsp;'+flightsRtn[0].invSegInfo.subclassInfos[0].subclass +'&nbsp;&nbsp;&nbsp;'+'剩余座位:');
        		if(flightsRtn[0].invSegInfo.subclassInfos[0].lss<0){
        			$flightClone.find('#secondrtn > .stylel').append('<span class="colored">' +getSeats(flightsRtn[0].invSegInfo.subclassInfos[0].lss)+ '</span>');
        		}else {
        			$flightClone.find('#secondrtn > .stylel').append('<span>' +getSeats(flightsRtn[0].invSegInfo.subclassInfos[0].lss) + '</span>');			
        		}
        		    $flightClone.find('#secondrtn > .stylel').append('</span>');       		
        		
        		$flightClone.find('#secondrtn > .styler').html('<span class="db lowest-price mt5">' + '</span>');
        		$flightClone.find('#secondrtn > .styler').append('<span class="ce1525 f18">' + flightsRtn[0].price + '</span>');
        		$flightClone.find('#secondrtn').append('<div class="cl">'+ '</div>');
        		
        		$flightClone.find('#thirdrtn > .l').html('<span class="f18 l">' + flightsRtn[0].invSegInfo.carrier +'   ' + flightsRtn[0].invSegInfo.flightNo +'</span>');
        		$flightClone.find('#thirdrtn > .pt').html('<span class="l lh18">' + '<i class="db n f15" id="airportori">' + airportorirtn +'</i>'+'<i class="n f12 fblue">' +new Date(flightsRtn[0].depTime.time).formatDate("yyyy-MM-dd HH:mm ").substring(10)+'</i>'+'</span>');
        		$flightClone.find('#thirdrtn > .pt').append('<span class="n g9 dib p-bg tc">' +'<i class="n rel t10 mt5 dib ">'+flightsRtn[0].invSegInfo.aircraftType + '</i>'+'</span>');	
        		$flightClone.find('#thirdrtn > .pt').append('<span class="r lh18">' +'<i class="db n f15" id="airportdes">'+airportdesrtn + '</i>'+'<i class="n f12 fblue">'+new Date(flightsRtn[0].arrTime.time).formatDate("yyyy-MM-dd HH:mm ").substring(10) +'</i>'+'</span>');
        		$flightClone.find('#thirdrtn').append('<div class="cl">'+ '</div>');	
			
		}
         /*免优票组不需要中转航班*/ 
/*         else {
				var invSegInfoOrtn = flightsRtn[0].invSegInfoO;
				var invSegInfoDrtn = flightsRtn[0].invSegInfoD;
				var totalpricertn = flightsRtn[0].totalPrice;
				var disInOrtn = invSegInfoOrtn.distance;
				var disInDrtn = invSegInfoDrtn.distance;
				var totalDisrtn = disInOrtn+disInDrtn;
				
				var airportoriOrtn = getNameByCode(invSegInfoOrtn.oriEng);
				var airportdesOrtn = getNameByCode(invSegInfoOrtn.desEng);	
				var airportoriDrtn = getNameByCode(invSegInfoDrtn.oriEng);
				var airportdesDrtn = getNameByCode(invSegInfoDrtn.desEng);
				
				$flightClone.find('#secondrtn > .stylel').html('<span class="dib f15 go-border mr10">' + '返程' + '</span>');
				$flightClone.find('#secondrtn > .stylel').append('<span class="dib f15 zhida-border">' + '中转' + '</span>');	
				$flightClone.find('#secondrtn > .stylel').append('<span class="dib f15 mr30 bottom-info" id="dateorirtn">' + new Date(invSegInfoOrtn.depTime.time).formatDate("yyyy-MM-dd HH:mm ").substring(5,10) + '</span>');	
				$flightClone.find('#secondrtn > .styler').html('<span class="db lowest-price mt5">' + '</span>');
				$flightClone.find('#secondrtn > .styler').append('<span class="ce1525 f18">' + totalpricertn + '</span>');
//				$flightClone.find('#secondrtn').append('<div class="cl">'+ '</div>');				
				//$flightClone.find('#secondrtn').append('<div class="cl">'+'<span class="f15 mr10" >' +'第1段舱位:'+invSegInfoOrtn.subclassInfos[0].subclass +' '+'剩余座位数:'+invSegInfoOrtn.subclassInfos[0].lss+ '</span>' +'  '+ '<span class="f15 mr10" >' +'第2段舱位:'+invSegInfoDrtn.subclassInfos[0].subclass +' '+'剩余座位数:'+invSegInfoDrtn.subclassInfos[0].lss+ '</span>'+'</div>');
				$flightClone.find('#secondrtn').append('<div class="cl">'+'<span class="f15 mr10" >' +'第1段舱位:'+invSegInfoOrtn.subclassInfos[0].subclass +' '+'剩余座位:'+getSeats(invSegInfoOrtn.subclassInfos[0].lss)+ '</span>' +'  '+ '<span class="f15 mr10" >' +'第2段舱位:'+invSegInfoDrtn.subclassInfos[0].subclass +' '+'剩余座位:'+getSeats(invSegInfoDrtn.subclassInfos[0].lss)+ '</span>'+'</div>');
				
				$flightClone.find('#thirdrtn > .l').html('<span class="f18 l">' + invSegInfoOrtn.carrier +'   ' + invSegInfoOrtn.flightNo +'</span>');
				$flightClone.find('#thirdrtn > .pt').html('<span class="l lh18">' + '<i class="db n f15" id="airportoriO">' + airportoriOrtn +'</i>'+'<i class="n f12 fblue">' +new Date(invSegInfoOrtn.depTime.time).formatDate("yyyy-MM-dd HH:mm ").substring(10)+'</i>'+'</span>');
				$flightClone.find('#thirdrtn > .pt').append('<span class="n g9 dib p-bg tc">' +'<i class="n rel t10 mt5 dib ">'+invSegInfoOrtn.aircraftType + '</i>'+'</span>');	
				$flightClone.find('#thirdrtn > .pt').append('<span class="r lh18">' +'<i class="db n f15" id="airportdesO">'+airportdesOrtn + '</i>'+'<i class="n f12 fblue">'+new Date(invSegInfoOrtn.arrTime.time).formatDate("yyyy-MM-dd HH:mm ").substring(10) +'</i>'+'</span>');
							
				$flightClone.find('#fourrtn > .l').html('<span class="f18 l">' + invSegInfoDrtn.carrier +'   ' + invSegInfoDrtn.flightNo +'</span>');
				$flightClone.find('#fourrtn > .pt').html('<span class="l lh18">' + '<i class="db n f15" id="airportoriD">' + airportoriDrtn +'</i>'+'<i class="n f12 fblue">' +new Date(invSegInfoDrtn.depTime.time).formatDate("yyyy-MM-dd HH:mm ").substring(10)+'</i>'+'</span>');
				$flightClone.find('#fourrtn > .pt').append('<span class="n g9 dib p-bg tc">' +'<i class="n rel t10 mt5 dib ">'+invSegInfoDrtn.aircraftType + '</i>'+'</span>');	
				$flightClone.find('#fourrtn > .pt').append('<span class="r lh18">' +'<i class="db n f15" id="airportdesD">'+airportdesDrtn + '</i>'+'<i class="n f12 fblue">'+new Date(invSegInfoDrtn.arrTime.time).formatDate("yyyy-MM-dd HH:mm ").substring(10) +'</i>'+'</span>');		
				$flightClone.find('#fourrtn').append('<div class="cl">'+ '</div>');				
		}*/
         
	}
    
    $flightClone.appendTo($('#flights'));	
	var content = $('#flights')[0].innerHTML;	
	
	var opts = "";
	if(flights !=null && flights !="" && flightsRtn !=null && flightsRtn !=""){
		if(flights[0].invSegInfo !=null && flights[0].invSegInfo !=""&&flightsRtn[0].invSegInfo !=null && flightsRtn[0].invSegInfo !=""){
			opts = {    
					 width : 410,    
					 height: 230,  
					} 
		}
		
		/*免优票组不需要中转航班*/
/*		else if(flights[0].invSegInfo ==null ||flights[0].invSegInfo ==""){
			     if(flightsRtn[0].invSegInfo !=null && flightsRtn[0].invSegInfo !=""){
			    	 opts = {    
							 width : 410,    
							 height: 300,  
							} 
			     }
		}else if(flightsRtn[0].invSegInfo ==null || flightsRtn[0].invSegInfo ==""){
			       if(flights[0].invSegInfo !=null && flights[0].invSegInfo !=""){
			    	   opts = {    
								 width : 410,    
								 height: 320,  
								} 
			       }
		}else{	
		}*/	
	}
	
	if(flag==1){
		var position =[];
		position = getLngLatByCode(flights[0].desEng);
		var point = new BMap.Point(position[0], position[1]);
		var marker = new BMap.Marker(point);
		var infoWindow = new BMap.InfoWindow(content,opts);  
		map.addOverlay(marker);	
		marker.openInfoWindow(infoWindow);	
	}else {
		//drawCurveLine(flights[0].oriEng, transferAirportCode, flights[0].desEng);
		drawRtnCurveLine(flightsRtn[0].oriEng, transferAirportCode, flightsRtn[0].desEng);
		var arrpoint = new BMap.Point(getPointByCode(flights[0].desEng).lng, getPointByCode(flights[0].desEng).lat);
		var depoint = new BMap.Point(getPointByCode(flights[0].oriEng).lng, getPointByCode(flights[0].oriEng).lat);
		var arrmarker = new BMap.Marker(arrpoint); 
	    setArrUnMoveMarkerIcon(arrmarker);
	    arrmarker.setTop(true);
		Map.addOverlay(arrmarker);
		
		var depmarker = new BMap.Marker(depoint); 
		setDepUnMoveMarkerIcon(depmarker);
		depmarker.setTop(true);
		map.addOverlay(depmarker);
		
		
		var position =[];
		position = getLngLatByCode(flights[0].desEng);
		var point = new BMap.Point(position[0], position[1]);
		var marker = new BMap.Marker(point);
		//var infoWindow = new BMap.InfoWindow(content);  
		var infoWindow = new BMap.InfoWindow(content,opts);  
		map.addOverlay(marker);	
		marker.openInfoWindow(infoWindow);	
	}
}

function getNameByCode(code) {
	var name = null;
	var airports = getAirports();
	for (var i = 0; i < airports.length; i++) {
		if (airports[i].code == code) {
			name = airports[i].name;
		}
	}
	return name;
}

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

function getSeats(num){
	//var desc = "无";
	var desc = num;
	
	/*if(num>0 && num<5){
		desc = '紧张';
	}
	if(num>=5 && num<10){
		desc = "少量";
	}*/
	if(num>7){
		desc ="充足";
	}
	return desc;
}

function loadExtentFile(filePath, fileType){

	 if(fileType == "js"){
			 var oJs = document.createElement('script'); 
			 oJs.setAttribute("type","text/javascript");
			 oJs.setAttribute("src", filePath);
			 document.getElementsByTagName("head")[0].appendChild(oJs);
	}else if(fileType == "css"){
			 var oCss = document.createElement("link"); 
			 oCss.setAttribute("rel", "stylesheet"); 
			 oCss.setAttribute("type", "text/css"); 
			 oCss.setAttribute("href", filePath);
			 document.getElementsByTagName("head")[0].appendChild(oCss);
	    }
	}

function resetArea() {
		initMarkers();
		//newMarkers();
		$("#left-control").show();
		showCanvas();
		hideDomElementsForDrawing();
		clearOverlays();
		closeInfoWin();
		
		$("#queryResultTable").hide();
		$("#flightsarea").hide();
		$(".flightSearch").css({"border-bottom":"none","color":"#AFC9FB","padding":"0px"});
		$(".openToNavigationSearch").css({"border-bottom":"none","color":"#AFC9FB","padding":"0px"});
		$(this).css({"border-bottom":"2px solid #ddd","color":"white","padding":"6px"})
		
		DepartPolygonPath = [];
		ReturnPolygonPath = [];
}
