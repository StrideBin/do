<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%> 
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<%--<c:set var="shoppingApiContextPath" value="http://172.31.3.194:7700/shoppingcs" />--%>
<%--<c:set var="shoppingApiContextPath" value="http://172.31.3.197:7001/shopping-cs-dubbo" />--%>
<c:set var="shoppingApiContextPath" value="http://172.20.29.160:7602/shopping-cs-dubbo" />
<%--<c:set var="shoppingApiContextPath" value="http://172.20.29.160:8002/shopping-cs-dubbo" />--%>
 <%--<c:set var="shoppingApiContextPath" value="http://localhost:9010/shopping-cs-dubbo" /> --%>

<c:set var="appKey" value="shopping-demo"/>
<c:set var="secret" value="db16adf193f2448ba0ec0260e0c968f3"/>
<c:set var="custInfo" value="${sessionScope.custInfo}"/>
