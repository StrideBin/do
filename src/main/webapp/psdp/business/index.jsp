
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%-- <%@ taglib prefix="s" uri="/struts-tags"%>  --%>
	
<%@ include file="../common/jspi/path.jspi"%>
<%@ include file="../common/jspi/loading.jspi"%>	

	
<script type="text/javascript" src="<%=basePath%>/common/js/jquery/jquery.js"></script>
<script type="text/javascript" src="<%=basePath%>/common/css/bootstrap/js/bootstrap.js"></script>
<script type="text/javascript" src="<%=basePath%>/common/js/common.js"></script>
<script type="text/javascript" src="<%=basePath%>/common/js/jquery/jquery.validate.js"></script>
<script type="text/javascript" src="<%=basePath%>/common/js/datapicker/bootstrap-datepicker.js"></script>
<script type="text/javascript" src="<%=basePath%>/common/js/datapicker/bootstrap-datetimepicker.zh-CN.js" charset="UTF-8"></script>		
	
<link href="<%=basePath%>/common/css/bootstrap/css/bootstrap.css" rel="stylesheet" type="text/css">
<link rel="stylesheet" type="text/css" href="<%=basePath%>/common/css/common.css" />
<link rel="stylesheet" type="text/css" href="<%=basePath%>/common/css/datapicker/bootstrap-datetimepicker.css" />

			
			<div class="topPicutresBg">
			<div class="topPicutres"></div></div>
			
			<div class="row" >
		
			<div class="col-xs-3 col-sm-3 col-md-3" style="padding: 20px;">
			<%--  <span><s:property value="#session['server_session_user'].userName"/></span> --%>
                <ul id="main-nav" class="nav nav-tabs nav-stacked" style="">
                    <li class="active">
                        <a href="#">
                            <i class="glyphicon glyphicon-th-large"></i>
                            首页         
                        </a>
                    </li>
                    <li>
                        <a href="#psdpInfoList" class="nav-header" data-toggle="collapse" aria-expanded="true" aria-controls="psdpInfoList">
                            <i class="glyphicon glyphicon-globe"></i>
                          旅客维度查询
                               <span class="pull-right glyphicon glyphicon-chevron-down"></span>
                        </a>
                        <ul id="psdpInfoList" class="nav nav-list collapse in secondmenu">
                            <li id="psdp-realtime-search"><a href="#"><i class="glyphicon glyphicon-search"></i>&emsp;旅客行程查询</a></li>
                        </ul>
</li> 
                    <li>
                        <a href="#psdpSegInfoList" class="nav-header" data-toggle="collapse" aria-expanded="true" aria-controls="psdpSegInfoList">
                            <i class="glyphicon glyphicon-globe" ></i>
                            航班维度查询	
                            <span class="pull-right glyphicon glyphicon-chevron-down"></span>
                        </a>
                            <ul id="psdpSegInfoList" class="nav nav-list collapse in secondmenu">
                            <li id="psdp-realtime-seg"><a href="#"><i class="glyphicon glyphicon-search"></i>&emsp;旅客信息查询</a></li>
                        </ul>
                    </li>
 
                </ul>
            </div>
            <!-- 错误提示模态框start -->
			<div class="msgModal" id="msgModal">
			<div class="errorMsg">很抱歉,没有查询到相关信息。</div></div>
			<!-- 错误提示模态框end -->
			<div class="col-xs-9 col-sm-9 col-md-9">
			
