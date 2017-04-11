<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file='../../index.jsp'%>
<div class="psdp-common-title">航班维度类>>旅客信息查询</div>
<div>
	<form id="searchForm" class="form-horizontal" role="form">
	<div class="form-group">
	<div style="padding-left:60px;">
        <div class="radio" name="carrierFlag" value="carrier"><ins class="checked"></ins><span>市场承运</span></div>
        <div class="radio" name="carrierFlag" value="opCarrier"><ins></ins><span>实际承运</span></div>
    </div>
    </div>
		<div class="form-group">
		<div style="height:40px;float: left;">
			<label for="carrier" class="control-label width-100-left"><span style="color:red;">*</span>航班承运:</label>
				<input id="carrier" class="form-control width-200-left" type="text" name="carrier"
					placeHolder="请输入航班承运"/>
				<span style="float: left;width:100px;line-height:30px">(MU/FM/KN)</span>
				<!-- <em id="carrier-error" class="error">?</em> -->
		</div>
		<div style="height:40px;float: left;">
			<label for="flightNumber"
				class="control-label width-100-left"><span style="color:red;">*</span>航班号:</label>
				<input id="flightNumber" class="form-control width-200-left" name="flightNumber"
					type="text" placeHolder="请输入航班号"/>
				<span style="float: left;width:100px;line-height:30px">(5101/5747/537)</span>
			
		</div>
<!-- 			<label for="carrier" class="control-label width-100-left">实际承运:</label>
				<input id="carrier" class="form-control width-200-left" type="text" name="carrier"
					placeHolder="实际承运"/>
				<span style="float: left;width:100px;line-height:30px">(MU/FM/KN)</span>	
				
			<label for="flightNumber"
				class="control-label width-100-left"><span style="color:red;">*</span>实际航班号:</label>
				<input id="flightNumber" class="form-control width-200-left" name="flightNumber"
					type="text" placeHolder="请输入实际航班号"/>
				<span style="float: left;width:100px;line-height:30px">(5101/5747/537)</span>	 -->
					
		</div>
		
		<div class="form-group">
			<label for="originLocation"
				class="control-label width-100-left">出发机场:</label>

				<input id="originLocation" class="form-control width-200-left" type="text"
					name="originLocation" placeHolder="请输入出发机场"/>
			<span style="float: left;width:100px;line-height:30px">(SHA/PEK/KMG)</span>	
			<label for="destinationLocation"
				class="control-label width-100-left">到达机场:</label>

				<input id="destinationLocation" class="form-control width-200-left" type="text"
					name="destinationLocation" placeHolder="请输入到达机场"/>
			<span style="float: left;width:100px;line-height:30px">(SHA/PEK/KMG)</span>	
		</div>
		
		<div class="form-group">
		<label for="state" class="control-label width-100-left">旅客状态:</label>
		<div style="margin-left:20px;float: left; ">	
        <div class="checkbox" name="state" value="all" id="allChose"><ins></ins><span>全选</span></div>
        <div class="checkbox" name="state" value="checkin"><ins class="insCss" id="checkin"></ins><span>已值机</span></div>
        <div class="checkbox" name="state" value="UnCheckin"><ins class="insCss" id="uncheckin"></ins><span>未值机</span></div>
		</div>
		</div>
		
		<div class="form-group">	
			<label for="departureDate"
				class="control-label width-100-left"><span style="color:red;">*</span>出发日期:</label>
			<div
				class="input-group date departureDate"
				style="float: left;"
				data-date-format="yyyy-mm-dd">
				<input class="form-control" id="departureDate" name="departureDate"
					style="width: 161px;margin-left: 20px;" type="text" /> 
				<span class="input-group-addon" style="float:left;width:39px;height:34px;">
				<span class="glyphicon glyphicon-calendar" ></span>
				</span>
			</div>
		</div>
		
		<div class="form-group">
			<div
				class="col-xs-4 col-sm-4 col-md-4 col-xs-offset-4 col-sm-offset-4 col-md-offset-4">
				<input type="submit" class="btn btn-default" id="search" value="搜索"></input>
				<button type="button" class="btn btn-default" id="clear">清空</button>
			</div>
		</div>

	</form>
	
	<div style="margin-top: 50px;">
		<div>

			<div class="titles" style="display: none">航班信息</div>
			<table class="table table-hover table-bordered tablePart"
				style="display: none">
				<thead>
					<tr>
						<th>航班承运</th>
						<th>出发日期</th>
						<th>出发机场</th>
						<th>到达机场</th>
						<th>出发时间</th>
						<th>到达时间</th>
					</tr>
				</thead>
				<tbody></tbody>
			</table>

			<!-- 证件信息 -->
			<div class="titles title-id" style="display: none"></div>
			<table class="table table-hover table-bordered idDetail"
				style="display: none">
				<thead>
					<tr>
						<th style="width: 5%">序号</th>
						<th style="width: 7%">英文姓</th>
						<th style="width: 7%">英文名</th>
						<th style="width: 7%">中文名</th>
						<th style="width: 5%">证件</th>
						<th style="width: 12%">证件号</th>
						<th style="width: 9%">旅客类型</th>
						<th style="width: 9%">状态</th>
						<th style="width: 10%">操作</th>
					</tr>
				</thead>
				<tbody></tbody>
			</table>

			<div class="btn-list tableDetail" style="display: none;">
				<button class="btn btn-details" type="button" id="segDetail">航段信息</button>
				<button class="btn btn-details" type="button" id="bookDetail">预定相关</button>
				<button class="btn btn-details" type="button" id="tktDetail">客票相关</button>
				<button class="btn btn-details" type="button" id="ckiDetail">值机信息</button>
				<button class="btn btn-details" type="button" id="cctDetail">联系方式</button>
				<button class="btn btn-details" type="button" id="freTraveler">常客信息</button>
				<button class="btn btn-details" type="button" id="ssrDetail">服务信息</button>
				<button class="btn btn-details backs" type="button">返回上一级</button>
			</div>
			<!-- 航段信息 -->
			<table class="table table-hover table-bordered segDetail details"
				style="display: none">
				<thead>
					<tr>
						<th>行动代码</th>
						<th>电子客票</th>
						<th>实际承运</th>
						<th>实际航班</th>
						<th>航班后缀</th>
						<th>离港航站楼</th>
						<th>到港航站楼</th>
						<th>主舱位</th>
						<th>子舱位</th>
					</tr>
				</thead>
				<tbody></tbody>
			</table>
			<!-- 预定相关信息 -->
			<table class="table table-hover table-bordered bookDetail details"
				style="display: none">
				<thead>
					<tr>
						<th>预定office</th>
						<th>IATA号</th>
						<th>GDS代码</th>
						<th>CRS编号</th>
						<th>ICS编号</th>
						<th>PNR创建时间</th>
						<th>是否团队</th>
						<th>团队名</th>
					</tr>
				</thead>
				<tbody></tbody>
			</table>

			<!-- 客票相关信息-->
			<table class="table table-hover table-bordered tktDetail details"
				style="display: none">
				<thead>
					<tr>
						<th>票号</th>
						<th>出票office</th>
						<th>IataCode</th>
						<th>出票日期</th>
						<th>总票价</th>
						<th>机票价</th>
						<th>金额</th>
						<th>税类</th>
						<th>进制</th>
						<th>货币</th>
					</tr>
				</thead>
				<tbody></tbody>
			</table>
			<!-- 值机信息-->
			<table class="table table-hover table-bordered ckiDetail details"
				style="display: none">
				<thead>
					<tr>
						<th>值机状态</th>
						<th>值机日期</th>
						<th>是有携带行李</th>
						<th>座位位置</th>
						<th>登机口信息</th>
					</tr>
				</thead>
				<tbody></tbody>
			</table>
			<!-- 联系方式-->
			<table class="table table-hover table-bordered cctDetail details"
				style="display: none">
				<thead>
					<tr>
						<th>类型</th>
						<th>号码</th>
					</tr>
				</thead>
				<tbody></tbody>
			</table>
					<!--常客信息- -->
		<table class="table table-hover table-bordered freTraveler details"
			style="display: none">
			<thead>
				<tr>
					<th>航空公司代码</th>
					<th>常旅客号码</th>
					<th>常旅客等级</th>
					<th>联盟等级</th>
				</tr>
			</thead>
			<tbody></tbody>
		</table>
			<!-- 特殊服务信息-->
			<table class="table table-hover table-bordered ssrDetail details"
				style="display: none">
				<thead>
					<tr>
						<th>特殊服务代码</th>
						<th>行动代码</th>
						<th>航空公司二字代码</th>
						<th>特殊服务文本信息</th>
					</tr>
				</thead>
				<tbody>
					<tr></tr>
				</tbody>
			</table>
		</div>
	</div>
</div>
</div>
</div>
<link rel="stylesheet" type="text/css"
	href="<%=basePath%>/business/psdpRealTime/psdp-realtime-seg/css/psdp.css" />
<script type="text/javascript"
	src="<%=basePath%>/business/psdpRealTime/psdp-realtime-seg/js/search.js"></script>
