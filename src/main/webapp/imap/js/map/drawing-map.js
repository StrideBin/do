var Map = null;

function drawMapPolygonByCanvasPolygonPath(canvasPolygonPath) {
	
	var mapPolygonPath = getMapPolygonPathByCanvasPolygonPath(canvasPolygonPath);
	
	drawMapPolygon(mapPolygonPath);
	//hideCanvas();
	//showDomElementsForDrawing();

	outputFromDrawing(mapPolygonPath);
}

function getMapPolygonPathByCanvasPolygonPath(canvasPolygonPath) {
	var mapPolygonPath = [];
	for (var i = 0; i < canvasPolygonPath.length; i++) {
		var pixel = new BMap.Pixel(canvasPolygonPath[i].x, canvasPolygonPath[i].y);
		var point = Map.pixelToPoint(pixel);
		mapPolygonPath.push(point);
	}
	return mapPolygonPath;
}

function drawMapPolygon(mapPolygonPath) {
	var polygon = new BMap.Polygon(mapPolygonPath, {
		fillColor:'#000000',
		fillOpacity:0.3,
		strokeWeight:2,
		strokeColor:'#ff6000', 
		strokeOpacity:0.9
	});
	Map.addOverlay(polygon);
}

function clearOverlays() {
	Map.clearOverlays();
}

function closeInfoWin() {
	Map.closeInfoWindow();
}

function hideElement($element) {
	$element.removeClass('display-block').addClass('display-none');
}

function showElement($element) {
	$element.removeClass('display-none').addClass('display-block');
}

function hideCanvas() {
	hideElement($('#drawing-circle-canvas-wrapper'));
}

function showCanvas() {
	showElement($('#drawing-circle-canvas-wrapper'));
}