var DepartureTransferArrivalMarkers = [];
var TransferAirportCodes = [];
var DepartPolygonPath = [];
var ReturnPolygonPath = [];

var DepartAirportCode = null;
var TransferAirportCode = null;
var ReturnAirportCode = null;

var DepartAirportMarker = null;
var TransferAirportMarker = null;
var ReturnAirportMarker = null;


function newMarkers() {
	DepartAirportCode = 'PVG';   //上海浦东Map
	ReturnAirportCode = 'PEK';
	
	var point = new BMap.Point(121.809, 31.156);
	var marker = new BMap.Marker(point);
	DepartAirportMarker = marker;
	marker.disableMassClear();  
	marker.setTitle('出发');
	var label = new BMap.Label("上海浦东", {offset:new BMap.Size(0, -20)});
	//label.setStyle({ borderColor:'black'});
	marker.setLabel(label);
	var icon = new BMap.Icon('../../../common/images/map/dragging/dep-mark.png', new BMap.Size(43, 48), 
			{anchor:new BMap.Size(18,36)});
	marker.setIcon(icon);
	marker.setTop(true);
	Map.addOverlay(marker);
	DepartureTransferArrivalMarkers.push(marker);
	addMarkerDraggingEffect(marker);
	
	var point = new BMap.Point(116.603, 40.088);
	var marker = new BMap.Marker(point);
	ReturnAirportMarker = marker;
	marker.disableMassClear();
	marker.setTitle('到达');
	var label = new BMap.Label('北京首都', {offset:new BMap.Size(0, -20)});
	marker.setLabel(label);
	var icon = new BMap.Icon('../../../common/images/map/dragging/arr-mark.png', new BMap.Size(43, 48), 
			{anchor:new BMap.Size(16, 32)});
	marker.setIcon(icon);
	marker.setTop(true);
	Map.addOverlay(marker);
	DepartureTransferArrivalMarkers.push(marker);
	addMarkerDraggingEffect(marker);
	
	var point = new BMap.Point(118.1420399134519, 34.4305324425806);
	var marker = new BMap.Marker(point);
	TransferAirportMarker = marker;
	marker.hide();
	marker.disableMassClear();
	marker.setTitle('中转');
	var label = new BMap.Label('中转', {offset:new BMap.Size(0, -20)});
	marker.setLabel(label);
	var icon = new BMap.Icon('../../../common/images/map/shoppingmap/transfer.png', new BMap.Size(43, 48), 
			{anchor:new BMap.Size(15, 32)});
	marker.setIcon(icon);
	marker.setTop(true);
	Map.addOverlay(marker);
	DepartureTransferArrivalMarkers.push(marker);
	addMarkerDraggingEffect(marker);
	
	drawCurveXLine(DepartAirportCode, ReturnAirportCode);
	//flightDetail($('#depart-date').val(),null,DepartAirportCode,ReturnAirportCode,null);	
	setViewportByMarkers(DepartureTransferArrivalMarkers);
}

function refreshDepartReturnAirportMarkers(departAirportCode, transferAirportCode, returnAirportCode) {
	var airports = getAirports();
	for (var i = 0; i < airports.length; i++) {
		if (airports[i].code == departAirportCode) {
			var point = new BMap.Point(airports[i].longitude, airports[i].latitude);
			DepartAirportMarker.setPosition(point);
			if(DepartAirportMarker.getLabel() !=null && DepartAirportMarker.getLabel() !=""){
				DepartAirportMarker.getLabel().setContent(airports[i].name);
			}
		}
		if (airports[i].code == returnAirportCode) {
			var point = new BMap.Point(airports[i].longitude, airports[i].latitude);
			ReturnAirportMarker.setPosition(point);
			if(ReturnAirportMarker.getLabel() !=null && ReturnAirportMarker.getLabel() !=""){
				ReturnAirportMarker.getLabel().setContent(airports[i].name);
			}		
		}
	}
	DepartAirportCode = departAirportCode;
	ReturnAirportCode = returnAirportCode;
}

//var isFirst=0;
function output(airport, marker) {
	setViewportByMarkers(DepartureTransferArrivalMarkers);
	var travelMode = $('input[name="travelMode"]:checked').val();
	if (marker.getTitle() == '出发') {
		DepartAirportCode = airport.code;
		if(travelMode == 1){
			flightDetail($('#depart-date').val(), $('#depart-date').val(),airport.code,ReturnAirportCode,null); 
		}else {
			flightDetail($('#depart-date').val(), $('#return-date').val(),airport.code,ReturnAirportCode,null); 
		}
		TransferAirportMarker.hide();
	} else if(marker.getTitle() == '到达') {
		ReturnAirportCode = airport.code;
		if(travelMode == 1){
			flightDetail($('#depart-date').val(), $('#depart-date').val(),DepartAirportCode,airport.code,null); 
		}else {
			flightDetail($('#depart-date').val(), $('#return-date').val(),DepartAirportCode,airport.code,null); 
		}
		TransferAirportMarker.hide();
	} else if (marker.getTitle() == '中转') {
		TransferAirportCode = airport.code;
		if(travelMode == 1){
			flightDetail($('#depart-date').val(), $('#depart-date').val(),DepartAirportCode,ReturnAirportCode,airport.code); 
		}else {
			flightDetail($('#depart-date').val(), $('#return-date').val(),DepartAirportCode,ReturnAirportCode,airport.code); 
		}		
	}
		clearOverlays();
	
}

function outputFromDrawing(mapPolygonPath) {
	if (DepartPolygonPath.length == 0 ) {
		DepartPolygonPath = mapPolygonPath;
	} else {
		ReturnPolygonPath = mapPolygonPath;
		hideCanvas();
		$("#left-control").hide();
		showDomElementsForDrawing();
		var departPolygonAirportCodes = getPolygonAirportCodes(DepartPolygonPath);
		var returnPolygonAirportCodes = getPolygonAirportCodes(ReturnPolygonPath);
		
		showPoint(departPolygonAirportCodes);
		showPoint(returnPolygonAirportCodes);
		flightAreaDetail($('#depart-date').val(), $('#depart-date').val(),getAirportCodesString(departPolygonAirportCodes),
				getAirportCodesString(returnPolygonAirportCodes),null); 	
	}
}

function getAirportCodesString(airportCodes) {
	var airportsCodesString = '';
	for (var i = 0; i < airportCodes.length; i++) {
			airportsCodesString += airportCodes[i] + ',';	
	}
	return airportsCodesString.substring(0, airportsCodesString.length - 1);
}
		
function getPolygonAirportCodes(polygonPath) {
	var airportCodes = [];
	var airportPoints = AirportPoints;
	var airports = getAirports();
	for (var i = 0; i < airportPoints.length; i++) {
		if (checkPP(airportPoints[i], polygonPath)) {
			airportCodes.push(airports[i].code);
		}
	}
	return airportCodes;
}

function getPointByCode(code) {
	var point = null;
	var airports = getAirports();
	for (var i = 0; i < airports.length; i++) {
		if (airports[i].code == code) {
			point = new BMap.Point(airports[i].longitude, airports[i].latitude);
		}
	}
	return point;
}
//var isdrawCurveLineFirst=0;
function drawCurveLine(departAirportCode, transferAirportCode, returnAirportCode) {
		clearOverlays();
	//isdrawCurveLineFirst+=1;
/*	if(isdrawCurveLineFirst==0){
		DepartAirportMarker.disableMassClear();
		TransferAirportMarker.disableMassClear();
		ReturnAirportMarker.disableMassClear();
	}  
	if(isdrawCurveLineFirst!=0){
		DepartAirportMarker.enableMassClear();
		TransferAirportMarker.enableMassClear();
		ReturnAirportMarker.enableMassClear();
	}
	clearOverlays();
	isdrawCurveLineFirst+=1;*/
	if (transferAirportCode == null) {
		var points = [];
		points.push(getPointByCode(returnAirportCode));
		points.push(getPointByCode(departAirportCode));
		var curve = new BMapLib.CurveLine(points, {strokeColor:'rgb(17, 63, 149)', strokeWeight:1.5, strokeOpacity:1,strokeStyle:'solid'});
		Map.addOverlay(curve);
		curve.enableEditing(); 
		
	} else {
		var points = [];
		points.push(getPointByCode(transferAirportCode));
		points.push(getPointByCode(departAirportCode));
		var curve = new BMapLib.CurveLine(points, {strokeColor:'rgb(17, 63, 149)', strokeWeight:1.5, strokeOpacity:1,strokeStyle:'solid'});
		Map.addOverlay(curve);
		var points = [];
		points.push(getPointByCode(returnAirportCode));
		points.push(getPointByCode(transferAirportCode));
		var curve = new BMapLib.CurveLine(points, {strokeColor:'rgb(17, 63, 149)', strokeWeight:1.5, strokeOpacity:1,strokeStyle:'solid'});
		Map.addOverlay(curve);
		curve.enableEditing(); 
		
		TransferAirportMarker.setPosition(curve.getPath()[16]);
		TransferAirportMarker.getLabel().setContent('中转');
		TransferAirportMarker.show();
	}
}

function drawAreaCurveLine(departAirportCode, returnAirportCode) {
	//clearOverlays();
	var arrpoint = new BMap.Point(getPointByCode(returnAirportCode).lng, getPointByCode(returnAirportCode).lat);
	var depoint = new BMap.Point(getPointByCode(departAirportCode).lng, getPointByCode(departAirportCode).lat);
	
	var arrmarker = new BMap.Marker(arrpoint); 
    setArrUnMoveMarkerIcon(arrmarker);
    arrmarker.setTop(true);
	Map.addOverlay(arrmarker);
	
	var depmarker = new BMap.Marker(depoint); 
	setDepUnMoveMarkerIcon(depmarker);
	depmarker.setTop(true);
	map.addOverlay(depmarker);
	
	var points = [];
	points.push(getPointByCode(returnAirportCode));
	points.push(getPointByCode(departAirportCode));
	var curve = new BMapLib.CurveLine(points, {strokeColor:'rgb(17, 63, 149)', strokeWeight:1.5, strokeOpacity:1,strokeStyle:'solid'});
	Map.addOverlay(curve);
	curve.enableEditing(); 
}

//var isdrawRtnCurveLineFirst=0;
function drawRtnCurveLine(departAirportCode, transferAirportCode, returnAirportCode) {
		clearOverlays();
	//isdrawRtnCurveLineFirst+=1;
/*	if(isdrawRtnCurveLineFirst==0){
		DepartAirportMarker.disableMassClear();
		TransferAirportMarker.disableMassClear();
		ReturnAirportMarker.disableMassClear();
	}
	if(isdrawRtnCurveLineFirst!=0){
		DepartAirportMarker.enableMassClear();
		TransferAirportMarker.enableMassClear();
		ReturnAirportMarker.enableMassClear();
	}
	clearOverlays();
	isdrawRtnCurveLineFirst+=1;*/
	
	if (transferAirportCode == null) {
		var points = [];
		var points1 = [];
		var points2 = [];
		points.push(getPointByCode(departAirportCode));
		points.push(getPointByCode(returnAirportCode));
		//points.push(getPointByCode(departAirportCode));   //rgb(193, 191, 29)		
		var curve = new BMapLib.CurveLine(points, {strokeColor:'rgb(17, 63, 149)', strokeWeight:1.5, strokeOpacity:1,strokeStyle:'solid',enableClicking:false});
		Map.addOverlay(curve)
		curve.enableEditing(); 	
		points1.push(getPointByCode(returnAirportCode));
		points1.push(getPointByCode(departAirportCode));
		var curve = new BMapLib.CurveLine(points1, {strokeColor:'rgb(193, 191, 29)', strokeWeight:1.5, strokeOpacity:1,strokeStyle:'solid',enableClicking:false});	
        Map.addOverlay(curve);
		curve.enableEditing(); 	
	} else {
		var points = [];
		points.push(getPointByCode(transferAirportCode));
		points.push(getPointByCode(departAirportCode));
		var curve = new BMapLib.CurveLine(points, {strokeColor:'rgb(17, 63, 149)', strokeWeight:1.5, strokeOpacity:1,strokeStyle:'solid',enableClicking:false});
		Map.addOverlay(curve);
		var points = [];
		points.push(getPointByCode(returnAirportCode));
		points.push(getPointByCode(transferAirportCode));
		var curve = new BMapLib.CurveLine(points, {strokeColor:'rgb(17, 63, 149)', strokeWeight:1.5, strokeOpacity:1,strokeStyle:'solid',enableClicking:false});
		Map.addOverlay(curve);
		curve.enableEditing(); 
		
		TransferAirportMarker.setPosition(curve.getPath()[16]);
		TransferAirportMarker.getLabel().setContent('中转');
		TransferAirportMarker.show();
	}
}
//var isdrawCurveXLineFirst=0;
function drawCurveXLine(departAirportCode, returnAirportCode) {
	clearOverlays();
/*	if(isdrawCurveXLineFirst==0){
		DepartAirportMarker.disableMassClear();
		TransferAirportMarker.disableMassClear();
		ReturnAirportMarker.disableMassClear();
	}
	if(isdrawCurveXLineFirst!=0){
		DepartAirportMarker.enableMassClear();
		TransferAirportMarker.enableMassClear();
		ReturnAirportMarker.enableMassClear();
	}
	clearOverlays();
	isdrawCurveXLineFirst+=1;*/

		var points = [];
		points.push(getPointByCode(returnAirportCode));
		points.push(getPointByCode(departAirportCode));
		var curve = new BMapLib.CurveLine(points, {strokeColor:'rgb(17, 63, 149)', strokeWeight:1.5, strokeOpacity:1,strokeStyle:'dashed',enableClicking:false});
		Map.addOverlay(curve);
		curve.enableEditing(); 
}

function showPoint(PolygonAirportCodes){
	for(var i=0; i<PolygonAirportCodes.length;i++){
		var posi = getLngLatByCode(PolygonAirportCodes[i]);
		var point = new BMap.Point(posi[0], posi[1]);
		addMarker(point);
	         }
}

function addMarker(point){
	  var marker = new BMap.Marker(point);
	  map.addOverlay(marker);
	}