/**
 * 用户登陆注册
 */
$(function(){
	var $form_modal = $('.cd-user-modal'),
		$form_login = $form_modal.find('#cd-login'),
		$form_signup = $form_modal.find('#cd-signup'),
		$form_modal_tab = $('.cd-switcher'),
		$tab_login = $form_modal_tab.children('li').eq(0).children('a'),
		$tab_signup = $form_modal_tab.children('li').eq(1).children('a'),
		$runoob_pop = $('.runoob-pop');
	
	// 判断是否登陆

	// 切换表单
	$form_modal_tab.on('click', function(event) {
		event.preventDefault();
		( $(event.target).is( $tab_login ) ) ? login_selected() : signup_selected();
	});

	function login_selected(){
		$form_login.addClass('is-selected');
		$form_signup.removeClass('is-selected');
		$tab_login.addClass('selected');
		$tab_signup.removeClass('selected');
	}

	function signup_selected(){
		$form_login.removeClass('is-selected');
		$form_signup.addClass('is-selected');
		$tab_login.removeClass('selected');
		$tab_signup.addClass('selected');
	}
	$('.full-width2').on('click', function(e){
       /* e.preventDefault();     
        var form = $(this).parent().parent();
        var action = form.find('input[name="action"]').val();
        var inputs = '';
        var isreg = (action == 'signup') ? true : false

        if( !action ){
            return
        }

        if( isreg ){ // 注册
        	verifycode = form.find('input[name="verifycode"]').val();
        	email = form.find('input[name="email"]').val();
        	name = form.find('input[name="name"]').val();
        	password = form.find('input[name="password"]').val();
        	password2 = form.find('input[name="password2"]').val();
        	inputs = {verifycode:verifycode,name:name,password:password,email:email,password2:password2,action:action};
        }else{ // 登陆
        	username = form.find('input[name="username"]').val();
        	password = form.find('input[name="password"]').val();
        	if($('#remember-me').prop('checked')) {
        		remember = 1;
        	} else {
        		remember = 0;
        	}
        	inputs = {username:username,password:password,action:action,remember:remember};
        }*/
        
    	var params= {
    		"ids":"1",
    		"names":"a",
    	};
    	$.ajax({
			type: "post",
			url:getRootPath()+"/hello/login",
			dataType : "json",
			contentType : "application/json",
			data : JSON.stringify(params), 
			timeout : 60000,
			global : false,
			error : function(data) {
				console.info(data);
			},
			success : function(data) {
    			console.info(data);
    		}
    	});
    });
	
});