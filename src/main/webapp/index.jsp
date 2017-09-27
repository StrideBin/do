<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path;
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<link rel="shortcut icon" href="<%=basePath%>/common/images/bitbug_favicon_16x16.ico" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="stylesheet" type="text/css" href="<%=basePath%>/common/css/bootstrap.min.css" />
<link rel="stylesheet" type="text/css" href="<%=basePath%>/common/css/index.css" />

<script type="text/javascript" src="<%=basePath%>/common/js/jquery.min.js"></script>
<script type="text/javascript" src="<%=basePath%>/common/js/bootstrap.min.js"></script>
<script type="text/javascript" src="<%=basePath%>/common/js/canvas.js"></script>
<script type="text/javascript" src="<%=basePath%>/common/js/common.js"></script>
<link rel="stylesheet" type="text/css" href="<%=basePath%>/stridebin/css/index.css" />
<script type="text/javascript" src="<%=basePath%>/stridebin/js/index.js"></script>
<title>首页</title>
</head>
<body>

<div style="position:absolute;z-index:1">
<canvas id="canvas" style="width:97%;height:97%" width="1920" height="974"></canvas>
<div class="cd-user-modal is-visible">
	<!-- <div class="cd-user-modal-container">
		<ul class="cd-switcher">
			<li><a href="javascript:;" class="selected">用户登录</a></li>
			<li><a href="javascript:;">注册新用户</a></li>
		</ul>

		<div id="cd-login" class="is-selected"> 登录表单
			<div class="cd-form">
				<p class="fieldset">
					<label class="image-replace cd-username" for="signin-username">用户名</label>
					<input class="full-width has-padding has-border" id="signin-username" name=username type="text" placeholder="输入用户名">
				</p>

				<p class="fieldset">
					<label class="image-replace cd-password" for="signin-password">密码</label>
					<input class="full-width has-padding has-border" id="signin-password" name="password" type="password"  placeholder="输入密码">
				</p>
				
				<p class="fieldset">
					<input type="checkbox" id="remember-me" checked>
					<label for="remember-me">记住登录状态</label>
				</p>
 				<input type="hidden" name="action" value="signin">
				<p class="fieldset">
					<input class="full-width2" type="submit" value="登 录">
				</p>
        <div class="err-msg"></div>
			</div>
		</div>

		<div id="cd-signup"> 注册表单
			<div class="cd-form">
				<p class="fieldset">
					<label class="image-replace cd-username" for="signup-username">用户名</label>
					<input class="full-width has-padding has-border" id="signup-username" name="name" type="text" placeholder="输入用户名">
				</p>

				<p class="fieldset">
					<label class="image-replace cd-email" for="signup-email">邮箱</label>
					<input class="full-width has-padding has-border" name="email" id="signup-email" type="email" placeholder="输入mail">
				</p>

				<p class="fieldset">
					<label class="image-replace cd-password" for="signup-password">密码</label>
					<input class="full-width has-padding has-border" id="signup-password" name="password" type="password"  placeholder="输入密码">
				</p>
				<p class="fieldset">
					<label class="image-replace cd-password" for="signup-password">重复输入密码</label>
					<input class="full-width has-padding has-border" id="signup-password" name="password2" type="password"  placeholder="重复输入密码">
				</p>
				
				<input type="hidden" name="action" value="signup">
				<p class="fieldset">
					<input class="full-width2" type="submit" value="注册新用户">
				</p>
				<div class="err-msg"></div>
			</div>

		</div> -->
	</div>
	</div>
</div> 

</body>
<script>
			//定义画布宽高和生成点的个数
			var WIDTH = window.innerWidth, HEIGHT = window.innerHeight, POINT = 24;
			
			var canvas = document.getElementById('canvas');
			canvas.width = WIDTH,
			canvas.height = HEIGHT;
			var context = canvas.getContext('2d');
			context.strokeStyle = 'rgba(0,0,0,0.02)',
			context.strokeWidth = 1,
			context.fillStyle = 'rgba(255,255,255,0.08)';
			var circleArr = [];
	
			//调用执行
			window.onload = function () {
				
				init();
				setInterval(function () {
					for (var i = 0; i < POINT; i++) {
						var cir = circleArr[i];
						cir.x += cir.moveX;
						cir.y += cir.moveY;
						if (cir.x > WIDTH) cir.x = 0;
						else if (cir.x < 0) cir.x = WIDTH;
						if (cir.y > HEIGHT) cir.y = 0;
						else if (cir.y < 0) cir.y = HEIGHT;
						
					}
					draw();
				}, 16);
			}
		
			
</script>	
</html>