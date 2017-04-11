(function(){
	
	var global = this;
	
	if (typeof Ceair === 'undefined') {
        global.Ceair = {};
    }
	
	Ceair.global = global;
	
	Ceair.apply = function(object, config, defaults) {
        if (defaults) {
        	Ceair.apply(object, defaults);
        }

        if (object && config && typeof config === 'object') {
            for (var i in config) {
                object[i] = config[i];
            }
        }
        return object;
    };
	
    //基础功能
    Ceair.apply(Ceair,{
    	emptyFn: function(){},
    	namespaceRewrites: [{
            from: 'Ceair.',
            to: Ceair
        }],
    	parseNamespace: function(namespace) {
            if (typeof namespace != 'string') {
                throw new Error("[Ceair] Invalid namespace, must be a string");
            }

            var parts = [],
            	rewrites = this.namespaceRewrites,
                root = global,
                name = namespace,
                rewrite, from, to, i, ln;

            for (i = 0, ln = rewrites.length; i < ln; i++) {
                rewrite = rewrites[i];
                from = rewrite.from;
                to = rewrite.to;

                if (name === from || name.substring(0, from.length) === from) {
                    name = name.substring(from.length);
                    
                    if (typeof to != 'string') {
                        root = to;
                    } else {
                        parts = parts.concat(to.split('.'));
                    }
                    
                    break;
                }
            }

            parts.push(root);

            parts = parts.concat(name.split('.'));
            return parts;
        },
        namespace: function(){
    		var root = global,
    		    parts, part, i, j, ln, subLn;
    		
    		for (i = 0, ln = arguments.length; i < ln; i++) {
    		    parts = this.parseNamespace(arguments[i]);
    		
    		    for (j = 0, subLn = parts.length; j < subLn; j++) {
    		        part = parts[j];
    		
    		        if (typeof part != 'string') {
    		            root = part;
    		        } else {
    		            if (!root[part]) {
    		                root[part] = {};
    		            }
    		
    		            root = root[part];
    		        }
    		    }
    		}
    		return root;
    	},
    	RunTime : function(){
    		var beg = null,
    			end = null,
    			step = 0;
    		
    		this.start = function(){
    			beg = new Date().getTime();
    			step = 0;
    		};
    		
    		this.printTime = function(str){
    			end = new Date().getTime();
    			step ++;
    			var extraStr = '';
    			if(str){
    				extraStr = str + ' ';
    			}else{
    				extraStr = 'step' + step + ' : ';
    			}
    			if(console){
    				console.log(extraStr +(end-beg));
    			}
    		};
    	},
    	loader: {
			ver:1,
			w_i: function(s,o){
				o.onload = null;
				window.setTimeout(function(){
					o.src=s;
				},100);
			},
			w_s:function(s,o,writeSelf){
				if (!writeSelf){
					o = o.parentNode;
				}
				if (s.indexOf(':')==-1){
					if (s.charAt(0)==' ')
						window.setTimeout(function(){
							o.className=o.className+s;
						},100);
					else
						window.setTimeout(function(){
							o.className=s;
						},100);
					}
				else{
					if (s.charAt(0)==';'){
						window.setTimeout(function(){
							o.style.cssText=o.style.cssText+s;
						},100);
					}
					else{
						window.setTimeout(function(){
							o.style.cssText=s;
						},100);
					}
				}
			},
			scriptPath : function(name){
				var path = '';
				
				var el=document.getElementsByTagName("script");
				for(var i=el.length;i>0;i--){
					if(el[i-1].src.indexOf(name)>-1){
						path=el[i-1].src.substring(0,el[i-1].src.lastIndexOf("/")+1);
					}
				}
				return path;
			},
			css:function (src,sync){
				if(sync){
					sync = "<link rel='stylesheet' href='"+src+"' type='text/css'/>";
					if(document._documentWirteBak){
						document._documentWirteBak(sync);
					}
					else{
						document.write(sync);
					}
					return;
				}
				var x = document.createElement('link');
				x.href = src;
				x.rel = 'stylesheet';
				x.type = 'text/css';
				var h = document.getElementsByTagName('head')[0];
				h.insertBefore(x,h.firstChild);
			},
			
			scriptTpl:null,
			script:function(src,callback,charset,sync){
				if(typeof(arguments[0])=='object'){
					var o = arguments[0];
					if(o.src){
						src = o.src;
					}else{
						return;
					}
					
					if(o.callback){
						callback = o.callback;
					}
					
					if(o.charset){
						charset = o.charset;
					}
					
					if(o.sync){
						sync = o.sync;
					}
				}
				if(!this.scriptTpl){
					this.scriptTpl = document.createElement('script');
				}
				if(sync){
					if(callback){
						var k='call'+Math.random().toString().substr(2);
						this.callback[k]=callback;
						if(this.scriptTpl.readyState)
							var c=" onreadystatechange='if(this.readyState && this.readyState != \"loaded\" && this.readyState != \"complete\")return;window.loader.callback."+k+".call(this)' ";
						else
							var c=" onload='window.loader.callback."+k+".call(this)' ";
						}
					else{
						c='';
					}
					sync = "<scr"+"ipt src='"+src+"' "+(charset ? "charset='"+charset+"'" : '')+" "+c+" type='text/javasc"+"ript'></scr"+"ipt>";
					if(document._documentWirteBak){
						document._documentWirteBak(sync);
					}
					else{ 
						document.write(sync);
					}
					return;
				}
				var x = this.scriptTpl.cloneNode(0);
				x.src=src;
				if(charset){
					x.charset = charset;
				}
				if (callback) {
					if(x.readyState){
						x.onreadystatechange = function() {
							if (this.readyState && this.readyState != 'loaded' && this.readyState != 'complete'){
								return;
							}
							callback.call(this);
						};
					}
					else{
						x.onload = function(){
							callback.call(this);
						};
					}
				}
				
				var h = document.getElementsByTagName('head')[0];
				h.insertBefore(x,h.firstChild);
			},
			callback:{}
		}
    });
})();
