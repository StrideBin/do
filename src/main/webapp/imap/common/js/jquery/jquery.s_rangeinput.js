/**
 * @license 
 * jQuery Tools @VERSION Rangeinput - HTML5 <input type="range" /> for humans
 * 
 * NO COPYRIGHTS OR LICENSES. DO WHAT YOU LIKE.
 * 
 * http://flowplayer.org/tools/rangeinput/
 *
 * Since: Mar 2010
 * Date: @DATE 
 * 
 * 修改：汪晔  增加标尺
 */
(function($) {
	
	$.s_tools = $.s_tools || {
		version: '@VERSION'
	};
	
	var s_tool;
	
	s_tool = $.s_tools.rangeinput = {

		conf: {
			min: 0,
			max: 100,		// as defined in the standard
			step: 'any', 	// granularity of the value. a non-zero float or int (or "any") 
			ruler: undefined,
			value: 0,
			precision: undefined,
			vertical: 0,
			keyboard: true,
			progress: false,
			speed: 100,
			// set to null if not needed
			css: {
				input:			'range',
				slider: 		'slider',
				progress: 		'progress',
				handle: 		'handle',
				ruler:			'ruler',
				ruler_line:		'ruler_line',
				main:			'slider_main',
				tick:			'tick'
			}
		} 
	};

//{{{ fn.drag

	/* 
		FULL featured drag and drop. 0.7 kb minified, 0.3 gzipped. done.
		Who told d'n'd is rocket science? Usage:
		
		$(".myelement").drag({y: false}).on("drag", function(event, x, y) {
			// do your custom thing
		});
		 
		Configuration: 
			x: true, 		// enable horizontal drag
			y: true, 		// enable vertical drag 
			drag: true 		// true = perform drag, false = only fire events 
			
		Events: dragStart, drag, dragEnd. 
	*/
	var s_doc, s_draggable;

	$.fn.s_drag = function(conf) {
		
		// disable IE specialities
		document.ondragstart = function () { return false; };

		conf = $.extend({x: true, y: true, drag: true}, conf);
		
		s_doc = s_doc || $(document).bind("mousedown mouseup", function(e) {

			var el = $(e.target);  

			// start 
			if (e.type == "mousedown" && el.data("drag")) {

				var offset = el.position(),
					 x0 = e.pageX - offset.left, 
					 y0 = e.pageY - offset.top,
					 start = true;    

				s_doc.on("mousemove.drag", function(e) {  
					var x = e.pageX -x0, 
						 y = e.pageY -y0,
						 props = {};

					if (conf.x) { props.left = x; }
					if (conf.y) { props.top = y; } 

					if (start) {
						el.trigger("dragStart");
						start = false;
					}
					if (conf.drag) { el.css(props); }
					el.trigger("drag", [y, x]);
					s_draggable = el;
				}); 

				e.preventDefault();

			} else {

				try {
					if (s_draggable) {  
						s_draggable.trigger("dragEnd");  
					}
				} finally { 
					s_doc.off("mousemove.drag");
					s_draggable = null; 
				}
			} 

		});

		return this.data("drag", true); 
	};	

//}}}



	function round(value, precision) {
		var n = Math.pow(10, precision);
		return Math.round(value * n) / n;
	}

	// get hidden element's width or height even though it's hidden
	function dim(el, key) {
		var v = parseInt(el.css(key), 10);
		if (v) { return v; }
		var s = el[0].currentStyle; 
		return s && s.width && parseInt(s.width, 10);	
	}

	function hasEvent(el) {
		var e = el.data("events");
		return e && e.onSlide;
	}

	function s_RangeInput(input, conf) {

		// private variables
		var self = this,  
			 css = conf.css, 
			 ruler = conf.ruler,
			 root = $("<div><div/><a href='#'/></div>").data("rangeinput", self),	
			 main = $("<div></div>"),
			 rule,
			 vertical,		
			 value,			// current value
			 origo,			// handle's start point
			 len,				// length of the range
			 pos;				// current position of the handle		

		//
		main.addClass(css.main).append(root);
		
		//添加标尺
		if(ruler){
			rule = $("<div></div>")
			main.append(rule.addClass(css.ruler));
			
			for(var i = 0 ; i < ruler.segment+1 ; i++){
				var tick = $("<div></div>"),
					v_line = $("<div></div>"),
					text = $("<div></div>");
				tick.append(v_line.addClass(css.ruler_line)).append(text);
				rule.append(tick.addClass(css.tick));
				
				var value = ((conf.max-conf.min)*i/ruler.segment + conf.min);
				if(i > 0 && i < ruler.segment ){
					value = Math.round(value / 5) * 5;
					//tick.css('width',100/(ruler.segment+1)+'%');
				}
				//tick.css('width',100/(ruler.segment+1)+'%');
				
				text.text(value);
			}
		}
		
		// create range	 
		input.before(main);	

		var handle = root.addClass(css.slider).find("a").addClass(css.handle), 	
			 progress = root.find("div").addClass(css.progress);
		// get (HTML5) attributes into configuration
		$.each("min,max,step,value".split(","), function(i, key) {
			var val = input.attr(key);
			if (parseFloat(val)) {
				conf[key] = parseFloat(val, 10);
			}
		});			   

		var range = conf.max - conf.min, 
			 step = conf.step == 'any' ? 0 : conf.step,
			 precision = conf.precision;

		if (precision === undefined) {
			precision = step.toString().split(".");
			precision = precision.length === 2 ? precision[1].length : 0;
		}  

		// Replace built-in range input (type attribute cannot be changed)
		if (input.attr("type") == 'range') {			
			var def = input.clone().wrap("<div/>").parent().html(),
				 clone = $(def.replace(/type/i, "type=text data-orig-type"));

			clone.val(conf.value);
			input.replaceWith(clone);
			input = clone;
		}

		input.addClass(css.input);

		var fire = $(self).add(input), fireOnSlide = true;


		/**
		 	The flesh and bone of this tool. All sliding is routed trough this.
			
			@param evt types include: click, keydown, blur and api (setValue call)
			@param isSetValue when called trough setValue() call (keydown, blur, api)
			
			vertical configuration gives additional complexity. 
		 */
		function slide(evt, x, val, isSetValue) { 

			// calculate value based on slide position
			if (val === undefined) {
				val = x / len * range;  

			// x is calculated based on val. we need to strip off min during calculation	
			} else if (isSetValue) {
				val -= conf.min;	
			}
			// increment in steps
			if (step) {
				val = Math.round(val / step) * step;
			}

			// count x based on value or tweak x if stepping is done
			if (x === undefined || step) {
				x = val * len / range;	
			}  

			// crazy value?
			if (isNaN(val)) { return self; }       

			// stay within range
			x = Math.max(0, Math.min(x, len));  
			val = x / len * range;   

			if (isSetValue || !vertical) {
				val += conf.min;
			}

			// in vertical ranges value rises upwards
			if (vertical) {
				if (isSetValue) {
					x = len -x;
				} else {
					val = conf.max - val;	
				}
			}	

			// precision
			val = round(val, precision); 

			// onSlide
			var isClick = evt.type == "click";
			if (fireOnSlide && value !== undefined && !isClick) {
				evt.type = "onSlide";           
				fire.trigger(evt, [val, x]); 
				if (evt.isDefaultPrevented()) { return self; }  
			}				

			// speed & callback
			var speed = isClick ? conf.speed : 0,
				 callback = isClick ? function()  {
					evt.type = "change";
					fire.trigger(evt, [val]);
				 } : null;

			if (vertical) {
				handle.animate({top: x}, speed, callback);
				if (conf.progress) { 
					progress.animate({height: len - x + handle.height() / 2}, speed);	
				}				

			} else {
				handle.animate({left: x}, speed, callback);
				if (conf.progress) { 
					progress.animate({width: x + handle.width() / 2}, speed); 
				}
			}

			// store current value
			value = val; 
			pos = x;			 

			// se input field's value
			input.val(val);

			return self;
		} 


		$.extend(self, {  

			getValue: function() {
				return value;	
			},

			setValue: function(val, e) {
				init();
				return slide(e || $.Event("api"), undefined, val, true); 
			}, 			  

			getConf: function() {
				return conf;	
			},

			getProgress: function() {
				return progress;	
			},

			getHandle: function() {
				return handle;	
			},			

			getInput: function() {
				return input;	
			}, 

			step: function(am, e) {
				e = e || $.Event();
				var step = conf.step == 'any' ? 1 : conf.step;
				self.setValue(value + step * (am || 1), e);	
			},

			// HTML5 compatible name
			stepUp: function(am) { 
				return self.step(am || 1);
			},

			// HTML5 compatible name
			stepDown: function(am) { 
				return self.step(-am || -1);
			}

		});

		// callbacks
		$.each("onSlide,change".split(","), function(i, name) {

			// from configuration
			if ($.isFunction(conf[name]))  {
				$(self).on(name, conf[name]);	
			}

			// API methods
			self[name] = function(fn) {
				if (fn) { $(self).on(name, fn); }
				return self;	
			};
		}); 


		// dragging		                                  
		handle.s_drag({drag: false}).on("dragStart", function() {

			/* do some pre- calculations for seek() function. improves performance */			
			init();

			// avoid redundant event triggering (= heavy stuff)
			fireOnSlide = hasEvent($(self)) || hasEvent(input);


		}).on("drag", function(e, y, x) {        

			if (input.is(":disabled")) { return false; } 
			slide(e, vertical ? y : x); 

		}).on("dragEnd", function(e) {
			if (!e.isDefaultPrevented()) {
				e.type = "change";
				fire.trigger(e, [value]);	 
			}

		}).click(function(e) {
			return e.preventDefault();	 
		});		

		// clicking
		root.click(function(e) { 
			if (input.is(":disabled") || e.target == handle[0]) { 
				return e.preventDefault(); 
			}				  
			init(); 
			var fix = vertical ? handle.height() / 2 : handle.width() / 2;
			slide(e, vertical ? len-origo-fix + e.pageY  : e.pageX -origo -fix);  
		});

		if (conf.keyboard) {

			input.keydown(function(e) {

				if (input.attr("readonly")) { return; }

				var key = e.keyCode,
					 up = $([75, 76, 38, 33, 39]).index(key) != -1,
					 down = $([74, 72, 40, 34, 37]).index(key) != -1;					 

				if ((up || down) && !(e.shiftKey || e.altKey || e.ctrlKey)) {

					// UP: 	k=75, l=76, up=38, pageup=33, right=39			
					if (up) {
						self.step(key == 33 ? 10 : 1, e);

					// DOWN:	j=74, h=72, down=40, pagedown=34, left=37
					} else if (down) {
						self.step(key == 34 ? -10 : -1, e); 
					} 
					return e.preventDefault();
				} 
			});
		}


		input.blur(function(e) {	
			var val = $(this).val();
			if (val !== value) {
				self.setValue(val, e);
			}
		});    


		// HTML5 DOM methods
		$.extend(input[0], { stepUp: self.stepUp, stepDown: self.stepDown});


		var offset,
			range_len;
		
		
		// calculate all dimension related stuff
		function init() { 
		 	vertical = conf.vertical || dim(root, "height") > dim(root, "width");

			if (vertical) {
				range_len = dim(root, "height");
				offset = dim(handle, "height");
				len = range_len - offset;
				origo = root.offset().top + len; 
				
			} else {
				range_len = dim(root, "width");
				offset = dim(handle, "width");
				len = range_len - offset;
				origo = root.offset().left;
			} 	  
		}

		function begin() {
			init();	
			self.setValue(conf.value !== undefined ? conf.value : conf.min);
			
			//初始化标尺刻度位置
			var ruler_size = rule.find('.tick').length,
				distance = len/(2*(ruler_size-1));
			rule.find('.tick').each(function(){
				var index = $(this).index(),
					width;
				if(index == 0 || index == ruler_size-1){
					width = distance + 1; 
				}else{
					width = distance * 2 ;
				}

				$(this).css('width',width);
				
				if(index == 0){
					$(this).css({
						'text-align':'left',
						'padding-left':offset/2 
					});
					$(this).find('.ruler_line').css({
						'background-position':'left'	
					})
				}else if(index == ruler_size-1){
					$(this).css({
						'text-align':'right',
						'padding-right':offset/2
					});
					$(this).find('.ruler_line').css({
						'background-position':'right'	
					})
				}
			})
		} 
		begin();

		// some browsers cannot get dimensions upon initialization
		if (!len) {  
			$(window).load(begin);
		}
	}

	$.expr[':'].range = function(el) {
		var type = el.getAttribute("type");
		return type && type == 'range' || !!$(el).filter("input").data("rangeinput");
	};


	// jQuery plugin implementation
	$.fn.s_rangeinput = function(conf) {

		// already installed
		if (this.data("rangeinput")) { return this; } 

		// extend configuration with globals
		conf = $.extend(true, {}, s_tool.conf, conf);		
		var els;
		this.each(function() {				
			var el = new s_RangeInput($(this), $.extend(true, {}, conf));
			var input = el.getInput().data("rangeinput", el);
			els = els ? els.add(input) : input;	
		});		
		return els ? els : this; 
	};	

}) (jQuery);