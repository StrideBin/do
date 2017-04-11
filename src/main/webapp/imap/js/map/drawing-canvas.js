
//var WindowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var WindowWidth = $(window).width();
//var WindowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
var WindowHeight = $(window).height();

var PolygonPath = [];

var Canvas = null;
var Context = null;
window.addEventListener('load', function() {
	
	window.handler = handler;
	//hideElement($('#flights'));
	// get the Canvas element and its context
	Canvas = document.getElementById('drawing-circle-canvas');
	Context = Canvas.getContext('2d');
	
	// Create gradient
	var gradient = Context.createLinearGradient(0, 0, 600,0);
	gradient.addColorStop('0', 'magenta');
	gradient.addColorStop('0.5', 'blue');
	gradient.addColorStop('1.0', 'red');
	Context.fillStyle = gradient;
	
//	context.fillStyle = '#7FFF00';
	Context.strokeStyle = '#7FFF00';
	Context.lineWidth = 2;
	Context.font = '40px Arial';
	Context.textAlign='center';
	
	Context.fillText('请在屏幕上按下鼠标左键画出起飞区域', WindowWidth / 3, 8 * WindowHeight / 10);	
	// create a drawer which tracks touch movements
	var drawer = {
		isDrawing : false,
		touchstart : function(coors) {
			document.body.addEventListener('touchmove', handler, false); 
			PolygonPath = [];
			Context.beginPath();
			Context.moveTo(coors.x, coors.y);
			this.isDrawing = true;
		},
		touchmove : function(coors) {
			if (this.isDrawing) {
				Context.lineTo(coors.x, coors.y);
				Context.stroke();
			}
		},
		touchend : function() {
			document.body.removeEventListener('touchmove', handler); 
			if (this.isDrawing) {
//				this.touchmove(coors);
				this.isDrawing = false;
				drawMapPolygonByCanvasPolygonPath(PolygonPath);
				Context.clearRect(0, 0, Canvas.width, Canvas.height);
				fillCanvasText();
			}
		},
		mousedown : function(coors) {
			PolygonPath = [];
			Context.beginPath();
			Context.moveTo(coors.x, coors.y);
			this.isDrawing = true;
		},
		mousemove : function(coors) {
			if (this.isDrawing) {
				Context.lineTo(coors.x, coors.y);
				Context.stroke();
			}
		},
		mouseup : function() {
			if (this.isDrawing) {
//				this.touchmove(coors);
				this.isDrawing = false;
				drawMapPolygonByCanvasPolygonPath(PolygonPath);
				Context.clearRect(0, 0, Canvas.width, Canvas.height);
				fillCanvasText();
			}
		}
	};
	
	// create a function to pass touch events and coordinates to drawer
	function draw(event) {
		// get the touch coordinates
		var coors = {
			x : event.targetTouches[0].pageX,
			y : event.targetTouches[0].pageY
		};
		PolygonPath.push(coors);
		// pass the coordinates to the appropriate handler
		drawer[event.type](coors);
	}
	
	// create a function to pass touch events and coordinates to drawer
	function drawPC(event) {
		var coors = {
			x : event.clientX,
			y : event.clientY
		};
		PolygonPath.push(coors);
		// pass the coordinates to the appropriate handler
		drawer[event.type](coors);
	}
	
	function drawEnd(event) {
		drawer[event.type]();
	}

	// attach the touchstart, touchmove, touchend event listeners.
	Canvas.addEventListener('touchstart', draw, false);
	Canvas.addEventListener('touchmove', draw, false);
	Canvas.addEventListener('touchend', drawEnd, false);
	
	Canvas.addEventListener('mousedown', drawPC, false);
	Canvas.addEventListener('mousemove', drawPC, false);
	Canvas.addEventListener('mouseup', drawEnd, false);
	
	var handler = function preventElasticScrolling(e) {
		e.preventDefault();
	}

	// prevent elastic scrolling
	document.body.addEventListener('touchmove', handler, false); // end body.onTouchMove
//	
//	// prevent elastic scrolling
//	document.body.addEventListener('mousemove', function(event) {
//		event.preventDefault();
//	}, false); // end body.onTouchMove

}, false); // end window.onLoad

function fillCanvasText() {
	Context.fillText('请在屏幕上按下鼠标左键画出到达区域', WindowWidth / 3, 8 * WindowHeight / 10);
}

function clearCanvas() {
	Context.clearRect(0, 0, Canvas.width, Canvas.height);
}