<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%-- <%@ include file="/imap/common/taglibs_tags.jsp"%> --%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
<%-- <%@ include file="/imap/common/taglibs_head.jsp"%>  --%>

<link rel="stylesheet" type="text/css" href="../../../common/css/map/share.css" />
<link rel="stylesheet" type="text/css" href="../../../common/css/map/imap/pcmap.css" />
<link rel="stylesheet" type="text/css" href="../../../common/css/map/imap/openToNavigation.css" />
<link rel="stylesheet" type="text/css" href="../bootstrap/css/bootstrap.css" />
<script type="text/javascript" src="../../../common/js/map/jquery.validate.js"></script>
<script type="text/javascript" src="../../../common/js/map/jquery-1.11.2.min.js"></script>
<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=uWaayPnZvWB4VGwmtDft4Hc0"></script>
<script type="text/javascript" src="http://api.map.baidu.com/library/CurveLine/1.5/src/CurveLine.min.js"></script>
<script type="text/javascript" src="../../../js/map/dragging-airports.js"></script>
<script type="text/javascript" src="../../../js/map/dragging-map.js"></script>
<script type="text/javascript" src="../../../js/map/drawing-canvas.js"></script>
<script type="text/javascript" src="../../../js/map/drawing-map.js"></script>
<script type="text/javascript" src="../../../js/map/checkPointPolygon.js"></script>
<script type="text/javascript" src="../../../js/map/outpcmap.js"></script>
<script type="text/javascript" src="../../../js/map/openToNavigation.js"></script>
<script type="text/javascript" src="../../../js/map/pcmap.js"></script>
<script type="text/javascript" src="../../../js/map/flight_search.js"></script>
<script type="text/javascript" src="../../../common/js/module/jsonUtils.js"></script>
<script type="text/javascript" src="../../../common/js/module/shopping-module.js"></script>

<title>中国东方航空-地图搜索</title>
</head>
<body>
	<div id="allmap"></div>
	<div id="logo" class="logo img2x vm effeckt-page-transition-button pageSwitch"><a href="http://www.ceair.com/"></a></div>
	
			<div class="map-head">                        
				 		     <div class="col-xs-4 col-sm-4 col-md-4"><span  class="flightSearch" style="cursor:pointer;">航班搜索</span></div>                       
				 		     <div class="col-xs-4 col-sm-4 col-md-4"><span  class="openToNavigationSearch" style="cursor:pointer;">通航搜索</span></div>  
				 		     <div class="col-xs-4 col-sm-4 col-md-4">
				 		     <span  class="areaSearch" id="find-flights" style="cursor:pointer;">区域搜索</span>
				 		     <div class="closeBox"><span class="glyphicon glyphicon-remove" id="close-hide"></span></div></div>                   

			 </div>	
	
		<div class="flight-panel" id="flight-panel">		  
				  <!--语义搜索 start-->                    	  
				  <div class="pure-u-1">
				      <form id="searchForm" class="pure-form pure-form-aligned">
				         <fieldset>
							<input id="question" class="pbutton-send"  name="question" type="text"  placeHolder="请告诉我您的出行计划，比如我明天去北京" requiredField="1"/>
							<input id="location" style="display:none" name="location"  type="text" />
							<div id="search" class="pure-button-large pbutton pbutton-primary">查询</div>
								</fieldset>
			           </form>
						</div>
				<!--语义搜索 end--> 
		<!-- 出发到达机场 start-->		 		
		<div class="flight-show">
		<div class="flight-show-dep"><div class="flight-show-dep-big">上海浦东</div><div class="flight-show-dep-small">上海</div></div>
		<div class="flight-show-mid"></div>
		<div class="flight-show-arr"><div class="flight-show-arr-big">北京首都</div><div class="flight-show-arr-small">北京</div></div>
		</div>
		<!-- end -->	
			 		
		<div class="one-way-round-trip box-set">
			<div class="one-way box one-way-round-trip-selected">
							<input id="single"  name="travelMode" type="radio"  value="1" checked /> 单程
            </div>
			<div class="round-trip box">
							<input id="roundTrip" name="travelMode" type="radio" value="2" /> 往返
               </div>
		</div>
		<div class="depart-date-return-date box-set" >
			<div class="depart-date box">
				<!-- <input type="date" id="depart-date" class="input-date" /> -->
				<input id="depart-date"  type="text"  placeHolder="yyyy-MM-dd" /> 
						<img onclick="WdatePicker({el:'depart-date',doubleCalendar:true,minDate:'%y-%M-%d',dchanging:setD,Mchanging:setM,ychanging:setY})"
							src="${ctx}/common/js/My97DatePicker/skin/datePicker.gif" width="20"
							height="26" >
			</div>

			<div class="return-date box display-none">
		<!-- 		<input type="date" id="return-date" class="input-date" disabled="disabled" /> -->
		             <input id="return-date"  type="text" placeHolder="yyyy-MM-dd" disabled="disabled" /> 
						<img onclick="WdatePicker({el:'return-date',doubleCalendar:true,minDate:'%y-%M-%d',dchanging:setD,Mchanging:setM,ychanging:setY})"
							src="${ctx}/common/js/My97DatePicker/skin/datePicker.gif" width="20"
							height="26" >
			</div>
		</div>
	</div>
	
<table id="queryResultTable" class="queryResultTable  queryResultTable-bordered"></table>
 <div class="flights display-none"  id="flights" ></div>
 <div class="display-none " id="flightsdetail" ></div>
 <div class="flights display-none"  id="flightsarea" ></div>
 <div class="flights display-none"  id="flightsareahidden" ></div>
	
	<div class="template display-none" id="template">
    <div class="flight-info dib pb5 w100" id="flight">
            <div class="top-info" id="first"></div>
            <div class="btm-9bb7ec" >
              <div  id="second">
                    <div class="stylel rel t15"></div>       
                    <div class="styler mr10"></div>
                </div>
                <div id="third">
                    <div class="l"></div>
                    <div class="pt rel tc flight-r"></div>
                </div>
                <div class='div-height  display-none'></div>
                <div id="four">
                    <div class="l"></div>
                    <div class="pt rel tc flight-r"></div>
                </div>
            </div>
            <div class="line"></div>
            <div class="btm-9bb7ec" >
              <div  id="secondrtn">
                    <div class="stylel rel t15"></div>       
                    <div class="styler mr10"></div>
                </div>         
                <div id="thirdrtn">
                    <div class="l"></div>
                    <div class="pt rel tc flight-r"></div>
                </div>
                <div class='div-height  display-none'></div>
                <div id="fourrtn">
                    <div class="l"></div>
                    <div class="pt rel tc flight-r"></div>
                </div>
            </div>
               
            <a href="#"  onclick= "buildFlightDetails();" >更多航班</a> 
            <a href="#"  onclick= "purchaseTickets();" >直接订票</a>
            <a href="#"  onclick= "purchaseFreeTickets();" >免优票</a>
        </div>
 </div>
 
 	<div class="template display-none" id="template2">
    <div class="flight-info dib pb5 w100" id="flight">
            <div class="top-info" id="first"></div>
            
            <div class="btm-9bb7ec" >
              <div  id="second">
                    <div class="stylel rel t15"></div>       
                    <div class="styler mr10"></div>
                </div>   
                <div id="third">
                    <div class="l"></div>
                    <div class="pt rel tc flight-r"></div>
                </div>
            </div>       
        </div>
 </div>
 
  	<div class="templatertn display-none" id="templatertn2">
    <div class="flight-info dib pb5 w100" id="flightrtn">
            <div class="top-info" id="firstrtn"></div>
            <div class="btm-9bb7ec" >
              <div  id="secondrtn">
                    <div class="stylel rel t15"></div>       
                    <div class="styler mr10"></div>
                </div>  
                <div id="thirdtrn">
                    <div class="l"></div>
                    <div class="pt rel tc flight-r"></div>
                </div>
            </div>       
        </div>
 </div>
 <!-- 通航搜索 start-->
	<div class="flight-navigable" style="display: none;">
		<div class="flight-navigable-orig">
		<div class="selectAirport"></div>
		<div class="flight-navigable-orig-name">出发机场:</div>
		<div class="flight-navigable-orig-code"> <input type="text" class="form-control input-navigable" id="origCode"
         placeholder="出发机场"></div>
		<div class="flight-navigable-orig-search"><button type="button" class="btn btn-primary flight-navigable-btn" id="origSearch">
		搜索可以到哪里去</button></div>
		</div>
		<div class="flight-navigable-dest">
		<div class="flight-navigable-dest-name">到达机场:</div>
		<div class="flight-navigable-dest-code"> <input type="text" class="form-control input-navigable"  id="destCode"
         placeholder="到达机场"></div>
		<div class="flight-navigable-dest-search"><button type="button" class="btn btn-primary flight-navigable-btn" id="destSearch">搜索可以从哪出发</button></div>
		</div>
		<div class="msg"></div>
		<div class="orig-date">
		<div class="orig-left">
		出发日期: 
		</div>
		<div class="search-date">
		<input id="search-date"  type="text"  placeHolder="yyyy-MM-dd" class="form-control"/>
		</div>
		<div style="float:left;margin-left: 10px;"> 
			<img onclick="WdatePicker({el:'search-date',doubleCalendar:true,minDate:'%y-%M-%d',dchanging:setD,Mchanging:setM,ychanging:setY})" src="${ctx}/common/js/My97DatePicker/skin/datePicker.gif" width="20" height="26"  >
			</div>
<!-- 		<div class="search-date">
				<input type="date" id="search-date" class="form-control" />
			</div>
		<div class="search-date-fixed"></div> -->
		
	</div>
	</div>
<!-- end -->
<!-- 错误提示模态框start -->
<div class="msgModal" id="msgModal">
<div class="errorImage"></div>
<div class="errorMsg">很抱歉,没有查询到合适的航班。</div></div>
<!-- 错误提示模态框end -->

	<div id="drawing-circle-canvas-wrapper"
		class="drawing-circle-canvas-wrapper display-none">
		<canvas id="drawing-circle-canvas" width="2000px" height="2000px">Sorry, your browser is not supported.</canvas>
	</div>

	<div class="loading" id="loading"></div>
	<div class="left-control" id="left-control">
	<div class="left-control-top control-border-top-left-radius"></div>
	<div class="left-control-down rz180"></div>
	<div class="left-control-left rz_90"></div>
	<div class="left-control-right rz90 control-border-right-radius"></div>
	<div class="left-control-zoomIn control-border-top-left-radius"></div>
	<div class="left-control-zoomOut control-border-bottom-left-radius"></div>
	
	</div>
</body>
</html>
