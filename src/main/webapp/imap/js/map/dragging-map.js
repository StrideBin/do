function initDragging() {
	initializeMap();
	
	buildAirportMarkers();
}

var Map = null;
var AirportMarkers = [];
var AirportPoints = [];

function initializeMap() {
	createMap();
    setMapEvent();
    //addMapControl();
    Map = map;
	return map;
}

function createMap(){
    var map = new BMap.Map("allmap");
    var point = new BMap.Point(117.911161,33.206756);
    map.centerAndZoom(point,6);
    map.setMinZoom(6);
	map.setMaxZoom(9);
	 var styleJson = [
	                  {
	                            "featureType": "road",
	                            "elementType": "all",
	                            "stylers": {
	                                      "visibility": "off"
	                            }
	                  }
	        ]
	map.setMapStyle({styleJson:styleJson});
	window.map = map
}

function setMapEvent(){
    map.enableDragging();
    map.enableScrollWheelZoom();
    map.disableDoubleClickZoom();
    map.disableKeyboard();
}

function addMapControl(){
	map.addControl(new BMap.MapTypeControl());
                    }

// add marker dragging effect
function addMarkerDraggingEffect(marker) {
	marker.enableDragging();
	addMarkerDraggingEvent(marker);
	addMarkerDragEndEvent(marker);
}

// build airport markers
function buildAirportMarkers() {
	var airports = getAirports();
	for (var i = 0; i < airports.length; i++) {
		var point = new BMap.Point(airports[i].longitude, airports[i].latitude);
		AirportPoints.push(point);
		var marker = new BMap.Marker(point); 
		setAirportMarkerIcon(marker);
		var shadow = new BMap.Icon('../../../common/images/map/dragging/c-mark-on.png', new BMap.Size(0, 0), {anchor:new BMap.Size(0, 0)});
		marker.setShadow(shadow);
		marker.disableMassClear();
		marker.hide();
	  	Map.addOverlay(marker);
	  	AirportMarkers.push(marker);
	}
}

// add marker dragging event listener
function addMarkerDraggingEvent(marker) {
	marker.addEventListener('dragging', markerDraggingEvent);
}

var Timer;
function markerDraggingEvent(e) {
	clearTimeout(Timer);
	clearTimeout(DragEndTimer);
	Timer = setTimeout(function() {
		showNearAirports(e);	
	}, 10);
}

function showNearAirports(e) {
	var marker = e.target;
	hideAiportMarkers(AirportMarkers);	
	var distances = calculateDraggingMarkerDistances(marker);	
	showNearAirportsByDistances(distances, marker);
}

var ClosestAirportIndex = null;
//var NearAirportMarkers = [];
function showNearAirportsByDistances(distances, marker) {
	var distanceCopys = distances.slice(0);
	distanceCopys.sort(sortNumber);
//	NearAirportMarkers = [];
	for (var i = 0; i < 8; i++) {
		for (var j = 0; j < distances.length; j++) {
			if (distances[j] == distanceCopys[i]) {
				if(distances[j] != 9999) AirportMarkers[j].show();
//				NearAirportMarkers.push(AirportMarkers[j]);
				if (i == 0) {
					if (ClosestAirportIndex != null) setAirportMarkerIcon(AirportMarkers[ClosestAirportIndex]);
					ClosestAirportIndex = j;
					setAirportMarkerIconSelected(AirportMarkers[j]);
					var airports = getAirports();
					syncMarkerLabelContent(marker, airports[ClosestAirportIndex].name);
				}
			}
		}
	}
}

function checkAirportArrayHasAirport(airportCode, airportCodes) {
	for (var i = 0; i < airportCodes.length; i++) {
		if (airportCodes[i] == airportCode) return true;
	}
	return false;
}

function calculateDraggingMarkerDistances(marker) {
	var position = marker.getPosition();
	var distances = []; 
	var airports = getAirports();
	for (var i = 0; i < airports.length; i++) {
		if (marker.getTitle() == '中转' && TransferAirportCodes.length > 0 
				&& !checkAirportArrayHasAirport(airports[i].code, TransferAirportCodes)) {
			distances.push(9999);
		} else {
			distances.push(Math.abs(airports[i].longitude - position.lng) + Math.abs(airports[i].latitude - position.lat));
		}
	}
	return distances;
}

function sortNumber(a, b) {
	return a - b
}

function syncMarkerLabelContent(marker, content) {
	marker.getLabel().setContent(content);
}

function hideAiportMarkers(airportMarkers) {
	for (var i = 0; i < airportMarkers.length; i++) {
		airportMarkers[i].hide();
	}
}

function setAirportMarkerIcon(marker) {
	var icon = new BMap.Icon('../../../common/images/map/dragging/c-mark-on.png', new BMap.Size(28, 28), {anchor:new BMap.Size(4, 4)});
	marker.setIcon(icon);
	return marker;
}

function setAirportMarkerIconSelected(marker) {
	var icon = new BMap.Icon('../../../common/images/map/dragging/c-mark-un.png', new BMap.Size(28, 28), {anchor:new BMap.Size(5, 5)});
	marker.setIcon(icon);
	return marker;
}

function setArrUnMoveMarkerIcon(marker) {
	var icon = new BMap.Icon('../../../common/images/map/dragging/arr-unmove-mark.png', new BMap.Size(33, 33), {anchor:new BMap.Size(19, 32)});
	marker.setIcon(icon);
	return marker;
}

function setDepUnMoveMarkerIcon(marker) {
	var icon = new BMap.Icon('../../../common/images/map/dragging/dep-unmove-mark.png', new BMap.Size(33, 33), {anchor:new BMap.Size(19, 32)});
	marker.setIcon(icon);
	return marker;
}

// add marker drag end event listener
function addMarkerDragEndEvent(marker) {
	marker.addEventListener('dragend', markerDragEndEvent);
}

var DragEndTimer = null;
function markerDragEndEvent(e) {
	var marker = e.target;
    marker.setPosition(AirportMarkers[ClosestAirportIndex].getPosition());
    
    var airports = getAirports();
    marker.getLabel().setContent(airports[ClosestAirportIndex].name);   
    setAirportMarkerIcon(AirportMarkers[ClosestAirportIndex]); 
 
    DragEndTimer = setTimeout(function() {
		hideAiportMarkers(AirportMarkers);
	}, 3000);
    
    output(airports[ClosestAirportIndex], marker);  
//    setViewportByMarkers(NearAirportMarkers);
}


function setViewportByMarkers(markers) {
	var points = [];
	for (var i = 0; i < markers.length; i++) {
		  points.push(markers[i].getPosition());
	}
	//Map.setViewport(points);
}