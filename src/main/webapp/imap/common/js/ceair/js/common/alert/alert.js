(function(){
	
	var alertIdStr = 'alert_ceair',
		alertId = '#' + alertIdStr,
		maskIdStr = alertIdStr+'_mask';
		maskId = '#'+maskIdStr,
		emptyFn = function(){},
		nextOpen = false,
		opened = false,
		jsPath = Ceair.loader.scriptPath("alert.js");
	
	var CLASS = {
			PANEL : 'alert_panel',
			TITLE : 'alert_title',
			C_CONTAINER : 'content_container',
			B_CONTAINER : 'button_container',
			BTN_BOX : 'btn_box',
			BOX_SINGLE : 'box_single',
			CONTENT : 'alert_content',
			SUB_CONTENT : 'alert_sub_content',
			NO_SUB_CONTENT : 'alert_no_sub_content',
			CONTENT_LOADING : 'alert_content_loading',
			LOAD_IMG : 'alert_loading',
			BTN_OK : 'alert_confirm',
			BTN_CANCEL : 'alert_close',
			MASK : 'alert_mask',
			CONTENT_LEFT : 'content_left',
			CONTENT_MID : 'content_mid',
			CLOSE_ICON : 'alert_close_icon',
			ONLY_BTN : 'alert_only_btn',
			LOGIN_BTN : 'alert_login_btn',
			LOGIN_C_CONTAINER : 'content_container_login',
			LOGIN_B_CONTAINER : 'button_container_login',
			LOGIN_LINK : 'alert_login_link',
			LOGIN_LINK_L : 'alert_login_link_l',
			LOGIN_LINK_R : 'alert_login_link_r',
			LOGIN_LINK_UN : 'alert_login_link_un'
			
	};
	
	function initPanel(){
		var alert = $(alertId),
			content_container,
			button_container,
			close_icon,
			title;
		
		if(alert.length == 0){
			
			alert = $('<div>').addClass(CLASS.PANEL).attr('id',alertIdStr);
			
			var mask = $('<div>').addClass(CLASS.MASK).attr('id',maskIdStr);
			
			title = $('<div>').addClass(CLASS.TITLE);
			close_icon = $('<div>').addClass(CLASS.CLOSE_ICON);
			content_container = $('<div>').addClass(CLASS.C_CONTAINER);
			button_container = $('<div>').addClass(CLASS.B_CONTAINER);
			
			alert.append(close_icon);
			alert.append(title).append(content_container).append(button_container);
			$('body').append(mask).append(alert);
			
			$(window).resize(function(){
				fixPanelPosition();
			});
			
			window.onorientationchange = function(){
				fixPanelPosition();
			};
			
			$(window).load(function(){
				fixPanelPosition();
				$(maskId).css({'height':document.body.scrollHeight});
			});
			
		}else{
			content_container = alert.find('.'+CLASS.C_CONTAINER);
			button_container = alert.find('.'+CLASS.B_CONTAINER);
			title = alert.find('.'+CLASS.TITLE);
			close_icon = alert.find('.'+CLASS.CLOSE_ICON);
			
			content_container.empty();
			button_container.empty();
			title.empty();
			close_icon.show();
		}
		
		return alert;
	}
	
	function closeAlert(){
		
		if(nextOpen){
			nextOpen = false;
			return;
		}
		
		opened = false;
		
		$(alertId).css('display','none');
		$(maskId).css('display','none');
	}

	function openAlert(){
		
		if(opened){
			nextOpen = true;
			return;
		}
		opened = true;
		
		$(alertId).css('display','block');
		$(maskId).css('display','block');
	}
	
	function fixPanelPosition(){
		var body_width = $('body').width(),
			body_height = document.documentElement.clientHeight,
			s_height = document.body.scrollHeight,
			alert = $(alertId),
			height = alert.height(),
			width = alert.width();
		$(maskId).css({'width':body_width,'height':s_height});
		
		alert.css('top',(body_height - height)/2);
		alert.css('left',(body_width - width)/2);
	}
	
	function fixTextAlign(content,textWidth){
		//当文字宽度大于文本框宽度时，左对齐并缩进
		if(textWidth > content.width()){
			content.addClass(CLASS.CONTENT_LEFT);
		}
		//当文字宽度小于文本框宽度时，取消缩进文字居中
		else{
			content.addClass(CLASS.CONTENT_MID);
		}
	}
	
	Ceair.apply(Ceair,{
		alert : function(option){
			
			if(typeof(option)=='string'){
				var str = option;
				option = {
					contentStr : str
				};
			}
			
			var config = $.extend({
				contentStr: '',
				subContentStr:'',
				titleStr:'',
				width:400,
				okStr: '确定',
				cancelStr: '取消',
				okBtnShow:true,
				cancelBtnShow:false,
				closeIconShow:true,
				timeout:0,
				//function
				okFunc : function(){return true;},
				cancelFunc : function(){return true;}
			}, option);
			
			var alert = initPanel(),
				content_container = alert.find('.'+CLASS.C_CONTAINER),
				button_container = alert.find('.'+CLASS.B_CONTAINER),
				close_icon = alert.find('.'+CLASS.CLOSE_ICON),
				title = alert.find('.'+CLASS.TITLE).html(config.titleStr),
				content = $('<p>').addClass(CLASS.CONTENT).html(config.contentStr),
				sub_content = $('<p>').addClass(CLASS.SUB_CONTENT).html(config.subContentStr),
				ok_button = $('<div>').addClass(CLASS.BTN_OK).text(config.okStr),
				close_button = $('<div>').addClass(CLASS.BTN_CANCEL).text(config.cancelStr);
			
				
			if(config.width){
				alert.css('width',config.width);
			}
			
			if(config.subContentStr == ''){
				content.addClass(CLASS.NO_SUB_CONTENT);
			}
			
			if(config.okBtnShow){
				if(!config.cancelBtnShow){
					ok_button.addClass(CLASS.ONLY_BTN);						
				}
				button_container.append($('<div>').addClass(CLASS.BTN_BOX).append(ok_button));
				
				ok_button.bind('click',function(){
					var re = config.okFunc();
					if(typeof re == 'undefined' || re == true){
						closeAlert();
					}
				});	
			}
			
			if(config.cancelBtnShow){
				if(!config.okBtnShow){
					close_button.addClass(CLASS.ONLY_BTN);						
				}
				button_container.append($('<div>').addClass(CLASS.BTN_BOX).append(close_button));
				
				close_button.bind('click',function(){
					var re = config.cancelFunc();
					if(typeof re == 'undefined' || re == true){
						closeAlert();
					}
				});	
			}
			
			content_container.append(content).append(sub_content);
			
			if(config.closeIconShow){
				close_icon.click(closeAlert);
			}else{
				close_icon.hide();
			}
			
			openAlert();
			
			fixTextAlign(content,getTextWidth(config.contentStr, content));
			
			fixPanelPosition();
			
			if(config.timeout > 0){
				setTimeout(function(){
					closeAlert();
				},config.timeout);
			}
		},
		LoadingDialog : function(option){
			
			var timeseed=0,
				refreshTime = 400;
			
			var config = $.extend({
				contentStr: '',
				subContentStr : '',
				titleStr:'',
				width:460,
				okStr: '确定',
				timeout:0,
				noCancel: false,
				closeFunc:emptyFn,
				waitFunc:emptyFn
			}, option);
			
			var closeDialog = function(){
				clearInterval(timeseed);
				closeAlert();
				config.closeFunc();
			};
			
			Ceair.apply(this,{
				open : function(str){
					var alert = initPanel(),
						content_container = alert.find('.'+CLASS.C_CONTAINER),
						button_container = alert.find('.'+CLASS.B_CONTAINER),
						close_icon = alert.find('.'+CLASS.CLOSE_ICON);
						title = alert.find('.'+CLASS.TITLE).html(config.titleStr),
						contentStr =  str ? str : config.contentStr;
						content = $('<p>').addClass(CLASS.CONTENT).addClass(CLASS.CONTENT_LOADING).html(contentStr),
						button = $('<div>').addClass(CLASS.BTN_OK).text(config.okStr),
						img = $('<img>').addClass(CLASS.LOAD_IMG).attr('src',jsPath+'st_loading.gif');
					
					content_container.append(img).append(content);
					
					if(config.width){
						alert.css('width',config.width);
					}
					
					if(config.subContentStr == ''){
						content.addClass(CLASS.NO_SUB_CONTENT);
					}
					
					if(!config.noCancel){
						button.click(closeDialog);
						button_container.append($('<div>').addClass(CLASS.BTN_BOX).addClass(CLASS.BOX_SINGLE).append(button));
						close_icon.click(closeAlert);
					}else{
						close_icon.hide();
					}
					openAlert();
					
					fixTextAlign(content,getTextWidth(config.contentStr, content));
					
					fixPanelPosition();
					
					timeseed = setInterval(function(){
						if(config.waitFunc()){
							closeDialog();
						}
					}, refreshTime);
					
					if(config.timeout > 0){
						setTimeout(function(){
							closeAlert();
						},config.timeout);
					}
				},
				close : function(){
					closeDialog();
				}
			});
		},
		InteractiveDialog : function(options){
			var config = $.extend({
				//options
				titleStr : '',
				okStr : '确定',
				cancelStr : '取消',
				layout:null,
				okBtnShow:true,
				cancelBtnShow:true,
				closeIconShow:true,
				width:460,
				//function
				okFunc : emptyFn,
				cancelFunc : emptyFn
			}, options);
			
			this.open = function(){
				var alert = initPanel(),
					content_container = alert.find('.'+CLASS.C_CONTAINER),
					button_container = alert.find('.'+CLASS.B_CONTAINER),
					close_icon = alert.find('.'+CLASS.CLOSE_ICON);
					title = alert.find('.'+CLASS.TITLE).html(config.titleStr),
					ok_button = $('<div>').addClass(CLASS.BTN_OK).text(config.okStr),
					close_button = $('<div>').addClass(CLASS.BTN_CANCEL).text(config.cancelStr);
				
				if(config.okBtnShow){
					if(!config.cancelBtnShow){
						ok_button.addClass(CLASS.ONLY_BTN);						
					}
					button_container.append($('<div>').addClass(CLASS.BTN_BOX).append(ok_button));
					
					ok_button.bind('click',function(){
						var re = config.okFunc();
						if(typeof re == 'undefined' || re == true){
							closeAlert();
						}
					});	
				}
				
				if(config.cancelBtnShow){
					if(!config.okBtnShow){
						close_button.addClass(CLASS.ONLY_BTN);						
					}
					button_container.append($('<div>').addClass(CLASS.BTN_BOX).append(close_button));
					
					close_button.bind('click',function(){
						var re = config.cancelFunc();
						if(typeof re == 'undefined' || re == true){
							closeAlert();
						}
					});	
				}
				
				if(config.closeIconShow){
					close_icon.click(closeAlert);
				}else{
					close_icon.hide();
				}
				
				if(config.width){
					alert.css('width',config.width);
				}
				
				if(config.layout){
					content_container.append(config.layout);
				}
	
				openAlert();
				fixPanelPosition();
			};
			this.close = function(){
				closeAlert();
			};
		},
		LoginDialog : function(options){
			var config = $.extend({
				//options
				titleStr : '会员登陆',
				okStr : '确定',
				layout:null,
				width:330,
				leftLink:'',
				rightLink:'',
				closeIconShow:true,
				//function
				okFunc : emptyFn
			}, options);
			
			this.open = function(){
				var alert = initPanel(),
					content_container = alert.find('.'+CLASS.C_CONTAINER),
					button_container = alert.find('.'+CLASS.B_CONTAINER),
					close_icon = alert.find('.'+CLASS.CLOSE_ICON);
					ok_button = $('<div>').addClass(CLASS.LOGIN_BTN).text(config.okStr),
					login_link = $('<div>').addClass(CLASS.LOGIN_LINK);
				
				button_container.append($('<div>').addClass(CLASS.ONLY_BTN).append(ok_button));
				
				if(config.leftLink){
					var left_link = $('<a>').addClass(CLASS.LOGIN_LINK_L).text(config.leftLink.name).attr('href',config.leftLink.link);
					if(config.leftLink.unimportant){
						left_link.addClass(CLASS.LOGIN_LINK_UN);
					}
					login_link.append(left_link);
				}
				
				if(config.rightLink){
					var right_link = $('<a>').addClass(CLASS.LOGIN_LINK_R).text(config.rightLink.name).attr('href',config.rightLink.link);
					if(config.rightLink.unimportant){
						right_link.addClass(CLASS.LOGIN_LINK_UN);
					}
					login_link.append(right_link);
				}
				
				button_container.append($('<div>').addClass(CLASS.LOGIN_LINK).append(login_link));
				ok_button.bind('click',function(){
					var re = config.okFunc();
					if(typeof re == 'undefined' || re == true){
						closeAlert();
					}
				});	
				
				if(config.closeIconShow){
					close_icon.click(closeAlert);
				}else{
					close_icon.hide();
				}
				
				if(config.width){
					alert.css('width',config.width);
				}
				
				if(config.layout){
					content_container.append(config.layout);
				}
	
				openAlert();
				fixPanelPosition();
			};
			this.close = function(){
				closeAlert();
			};
		}
	});
	
	window.a_alert = Ceair.alert;
	window.LoadingDialog = Ceair.LoadingDialog;
	window.InteractiveDialog = Ceair.InteractiveDialog;
	
	Ceair.loader.css(jsPath+"alert.css");
})();