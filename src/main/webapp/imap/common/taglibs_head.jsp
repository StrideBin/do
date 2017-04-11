<script src="${ctx}/common/js/ceair/utils/commonUtils.js"></script>
<script src="${ctx}/common/js/jquery/jquery-2.1.1.js"></script>
<script src="${ctx}/common/js/jquery/jquery.browser.min.js"></script>
<script src="${ctx}/common/js/jquery/jquery.tools.min.js"></script>
<script src="${ctx}/common/js/jquery/jquery.tools.toolbox.expose.js"></script>
<script src="${ctx}/common/js/jquery/jquery.tools.overlay.js"></script>
<script src="${ctx}/common/js/ceair/js/common/main.js"></script>
<script src="${ctx}/common/js/ceair/js/common/alert/alert.js"></script>
<link href="${ctx}/common/js/jquery/jquery-ui-1.11.2/jquery-ui.css" rel="stylesheet" type="text/css"/>
<script src="${ctx}/common/js/jquery/jquery-ui-1.11.2/jquery-ui.js"></script>
<link href="${ctx}/common/css/pure/base/css/base.css" rel="stylesheet" type="text/css"/>
<link href="${ctx}/common/css/pure/css/pure-min.css" rel="stylesheet" type="text/css"/>
<link href="${ctx}/common/css/pure/tables/css/tables.css" rel="stylesheet" type="text/css"/>
<link href="${ctx}/common/css/pure/grids/css/grids-min.css" rel="stylesheet" type="text/css"/>
<link href="${ctx}/common/css/pure/forms/css/forms.css" rel="stylesheet" type="text/css" />
<link href="${ctx}/common/css/app.css" rel="stylesheet" type="text/css"/>
<link href="${ctx}/common/js/My97DatePicker/skin/WdatePicker.css" rel="stylesheet" type="text/css"/>
<script src="${ctx}/common/js/My97DatePicker/WdatePicker.js"></script>
<link href="${ctx}/common/js/jquery/jquery.qtip.custom/jquery.qtip.css" rel="stylesheet" type="text/css"/>
<script src="${ctx}/common/js/jquery/jquery.qtip.custom/jquery.qtip.js"></script>

<script type="text/javascript" src="${ctx}/common/js/ceair/utils/stringUtils.js"></script>
<script type="text/javascript" src="${ctx}/common/js/ceair/utils/jsonUtils.js"></script>
<script type="text/javascript" src="${ctx}/common/js/ceair/utils/dateUtils.js"></script>
<script src="${ctx}/common/js/jquery/jquery.sha1.js" defer="defer"></script>
<script src="${ctx}/common/js/more_flight.js"></script>
<script src="${ctx}/common/js/app/airports.js" defer="defer"></script>
<script src="${ctx}/common/js/shopping-common.js" defer="defer"></script>
<script type="text/javascript" src="${ctx}/common/cust/js/login.js"></script>
<script>
	var contextRootPath = "${ctx}";
	var shoppingApiContextPath = "${shoppingApiContextPath}";
	var appKey = "${appKey}";
	var secret = "${secret}";
	var custInfoJsonStr = '${custInfo}';
	var custInfoJson = null;
	if (StringUtils.isNotBlank(custInfoJsonStr)) {
		eval('custInfoJson =' + custInfoJsonStr);
	}
	$.ajaxSetup({contentType: "application/x-www-form-urlencoded"});
</script>