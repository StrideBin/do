(function(){
	
	var alertIdStr = 'alert_ceair',
		alertId = '#' + alertIdStr,
		maskIdStr = alertIdStr+'_mask';
		maskId = '#'+maskIdStr,
		emptyFn = function(){},
		jsPath = Sinosoft.loader.scriptPath("alert.js");
	
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
			ONLY_BTN : 'alert_only_btn'
	};
	
	function initPanel(){
		var alert = $(alertId),
			content_container,
			button_container,
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
			
			content_container.empty();
			button_container.empty();
			title.empty();
		}
		
		return alert;
	}
	
	function closeAlert(){
		$(alertId).css('display','none');
		$(maskId).css('display','none');
	}

	function openAlert(){
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
		//�����ֿ�ȴ����ı�����ʱ������벢����
		if(textWidth > content.width()){
			content.addClass(CLASS.CONTENT_LEFT);
		}
		//�����ֿ��С���ı�����ʱ��ȡ���������־���
		else{
			content.addClass(CLASS.CONTENT_MID);
		}
	}
	
	Sinosoft.apply(Sinosoft,{
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
				width:460,
				okStr: 'ȷ��',
				cancelStr: 'ȡ��',
				okBtnShow:true,
				cancelBtnShow:true,
				closeIconShow:true,
			    callback:emptyFn,
				//function
				okFunc : emptyFn,
				cancelFunc : emptyFn
			}, option);
			
			var alert = initPanel(),
				content_container = alert.find('.'+CLASS.C_CONTAINER),
				button_container = alert.find('.'+CLASS.B_CONTAINER),
				close_icon = alert.find('.'+CLASS.CLOSE_ICON);
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
				
				ok_button.click(closeAlert);
				ok_button.bind('click',config.okFunc);	
			}
			
			if(config.cancelBtnShow){
				if(!config.okBtnShow){
					close_button.addClass(CLASS.ONLY_BTN);						
				}
				button_container.append($('<div>').addClass(CLASS.BTN_BOX).append(close_button));
				
				close_button.click(closeAlert);
				close_button.bind('click',config.cancelFunc);
			}
			
			content_container.append(content).append(sub_content);
			
			if(config.closeIconShow){
				close_icon.click(closeAlert);
				close_icon.bind('click',config.cancelFunc);
			}else{
				close_icon.hide();
			}
			
			openAlert();
			
			fixTextAlign(content,getTextWidth(config.contentStr, content));
			
			fixPanelPosition();
		},
		LoadingDialog : function(option){
			
			var timeseed,
				refreshTime = 400;
			
			var config = $.extend({
				contentStr: '',
				titleStr:'',
				okStr: 'ȷ��',
				noCancel: false,
				closeFunc:emptyFn,
				waitFunc:emptyFn
			}, option);
			
			var closeDialog = function(){
				clearInterval(timeseed);
				closeAlert();
				config.closeFunc();
			};
			Sinosoft.apply(this,{
				open : function(){
					var alert = initPanel(),
						content_container = alert.find('.'+CLASS.C_CONTAINER),
						button_container = alert.find('.'+CLASS.B_CONTAINER),
						close_icon = alert.find('.'+CLASS.CLOSE_ICON);
						title = alert.find('.'+CLASS.TITLE).html(config.titleStr),
						content = $('<p>').addClass(CLASS.CONTENT).addClass(CLASS.CONTENT_LOADING).html(config.contentStr),
						button = $('<div>').addClass(CLASS.BTN_OK).text(config.okStr),
						img = $('<img>').addClass(CLASS.LOAD_IMG).attr('src',jsPath+'loading.gif');
					
					
					content_container.append(img).append(content);
					
					if(!config.noCancel){
						button.click(closeDialog);
						button_container.append($('<div>').addClass(CLASS.BTN_BOX).addClass(CLASS.BOX_SINGLE).append(button));
					}
					
					openAlert();
					
					fixTextAlign(content,getTextWidth(config.contentStr, content));
					
					fixPanelPosition();
					
					timeseed = setInterval(function(){
						if(config.waitFunc()){
							closeDialog();
						}
					}, refreshTime);
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
				okStr : 'ȷ��',
				cancelStr : 'ȡ��',
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
					
					ok_button.click(closeAlert);
					ok_button.bind('click',config.okFunc);	
				}
				
				if(config.cancelBtnShow){
					if(!config.okBtnShow){
						close_button.addClass(CLASS.ONLY_BTN);						
					}
					button_container.append($('<div>').addClass(CLASS.BTN_BOX).append(close_button));
					
					close_button.click(closeAlert);
					close_button.bind('click',config.cancelFunc);
				}
				
				if(config.closeIconShow){
					close_icon.click(closeAlert);
					close_icon.bind('click',config.cancelFunc);
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
	
	window.a_alert = Sinosoft.alert;
	window.LoadingDialog = Sinosoft.LoadingDialog;
	window.InteractiveDialog = Sinosoft.InteractiveDialog;
	
	Sinosoft.loader.css(jsPath+"alert.css");
})();