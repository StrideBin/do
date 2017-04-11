<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file='../../index.jsp'%>
<div class="psdp-common-title">旅客维度类>>旅客行程搜索</div>
<div>
	<form class="form-horizontal" id="searchForm" role="form">
		<div class="form-group">
			<label for="psdpName"
				class="control-label col-xs-2 col-sm-2 col-md-2">姓名:</label>
			<div class="col-xs-3 col-sm-3 col-md-3">
				<input type="text" class="form-control" id="psdpName"
					name="psdpName"  placeholder="请输入姓名">
			</div>
		</div>
		<div class="form-group">
			<label for="psdpIdtype"
				class="control-label col-xs-2 col-sm-2 col-md-2"><span style="color:red;">*</span>证件类型:</label>
			<div class="col-xs-3 col-sm-3 col-md-3">
			  <select class="form-control" name="psdpIdtype" id="psdpIdtype" required>
			    <option>身份证</option>
			    <option>护照号</option>
			  </select>
<!-- 				<input type="text" class="form-control" id="psdpIdtype"
					name="psdpIdtype" required placeholder="请输入证件类型"> -->
			</div>
		</div>
		<div class="form-group">
			<label for="psdpNumber"
				class="control-label col-xs-2 col-sm-2 col-md-2"><span style="color:red;">*</span>证件号码:</label>
			<div class="col-xs-3 col-sm-3 col-md-3">
				<input type="text" class="form-control" id="psdpNumber"
					name="psdpNumber" required placeholder="请输入证件号码">
			</div>
		</div>
		<div class="form-group">
			<div
				class="col-xs-4 col-sm-4 col-md-4 col-xs-offset-2 col-sm-offset-2 col-md-offset-2">
				<input type="submit" class="btn btn-default" id="search" value="搜索"></input>
				<button type="button" class="btn btn-default" id="clear">清空</button>
			</div>
		</div>
	</form>
	<div style="margin-top: 50px; margin-bottom: 50px">
		<!-- 证件信息 -->
		<div class="titles" style="display: none">旅客证件信息</div>
		<table class="table table-hover table-bordered idDetail"
			style="display: none">
			<thead>
				<tr>
					<th>英文姓</th>
					<th>英文名</th>
					<th>中文名</th>
					<th>证件类型</th>
					<th>证件号</th>
					<th>国籍</th>
					<th>生日</th>
					<th>性别</th>
					<th>证件有效期</th>
				</tr>
			</thead>
			<tbody></tbody>
		</table>

		<div class="titles" style="display: none">航班信息</div>
		<table class="tablePart table table-hover table-bordered"
			style="display: none">
			<thead>
				<tr>
					<th>航班承运</th>
					<th>出发日期</th>
					<th>出发机场</th>
					<th>到达机场</th>
					<th>出发时间</th>
					<th>到达时间</th>
					<th>状态</th>
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

		<!--联系方式-->
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
<link rel="stylesheet" type="text/css"
	href="<%=basePath%>/business/psdpRealTime/psdp-realtime-search/css/psdp.css" />
<script type="text/javascript"
	src="<%=basePath%>/business/psdpRealTime/psdp-realtime-search/js/search.js"></script>
