function loadSubscribe(){//生成页面内容方法-需要另外引入css定义页面样式
	var success = $('<div class="subscribe">'
			+ '<div class="success"></div>'
			+ '<div class="main_content"><p class="main_txt">订阅成功</p><p class="sub_txt">感谢您订阅信泰保险的电子函件服务。</p></div>'
			+ '</div>');
	return success;
}

var alert = new Ceair.InteractiveDialog({
	titleStr:'这里显示标题',//面板左上方标题-默认为空
	layout : loadSubscribe(),//添加入面板的页面
	okStr:'确认',//确定按钮显示文字
	cancelStr:'取消',//取消按钮显示文字
	width:510,//自定义面板宽度-根据设计来调整
	okBtnShow:false,//是否显示确定按钮
	cancelBtnShow:false,//是否显示关闭按钮
	closeIconShow:true,//是否显示关闭图标
	okFunc:function(){
		//点击确定按钮执行方法
		//当返回false时将会阻止面板关闭
	},
	cancelFunc:function(){
		//点击取消按钮执行方法
		//点击关闭图标执行方法
		//当返回false时将会阻止面板关闭
	}
});
alert.open();//打开自定义页面提示框
alert.close();//关闭自定义页面提示框

Ceair.alert({
	titleStr:'这里显示标题',//面板左上方标题-默认为空
	contentStr: '此邮箱的变更将更新您的保单信息',//主显示信息
	subContentStr:'您的基本信息不完整，',//副显示信息-如果为空，副信息框将隐藏
	width:510,//自定义面板宽度-根据设计来调整
	okStr: '确定',//确定按钮显示文字
	cancelStr: '取消',//取消按钮显示文字
	okBtnShow:false,//是否显示确定按钮
	cancelBtnShow:false,//是否显示关闭按钮
	closeIconShow:true,//是否显示关闭图标
	okFunc:function(){
		//点击确定按钮执行方法
		//当返回false时将会阻止面板关闭
	},
	cancelFunc:function(){
		//点击取消按钮执行方法
		//点击关闭图标执行方法
		//当返回false时将会阻止面板关闭
	}
});


var test;
var loading = new Ceair.LoadingDialog({
	contentStr: '请等待核保完成',
	titleStr:'test',
	okStr:'',
	noCancel: true,
	closeFunc:function(){
		
	},
	waitFunc:function(){
		return test;
	}
});
loading.open();

setTimeout(function(){//两种关闭方法
//	loading.close(); //手动调用close方法
	test = true;//在waitFunc方法中配置标志变量
}, 2000);