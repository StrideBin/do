<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
	<style type="text/css">
		body, html{width: 100%;height: 100%;margin:0;font-family:"微软雅黑";}
		#allmap{height:500px;width:100%;}
		#r-result{width:100%; font-size:14px;}
	</style>
	<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=uWaayPnZvWB4VGwmtDft4Hc0"></script>
	<title>地图展示</title>
</head>
<body>


	<div id="allmap"></div>
		<div id="r-result">
		城市名: <input id="cityName" type="text" style="width:100px; margin-right:10px;" />
		<input type="button" value="查询" onclick="theLocation()" />
	</div>
</body>
</html>
<script type="text/javascript">
	// 百度地图API功能
	var map = new BMap.Map("allmap");    // 创建Map实例
	map.centerAndZoom(new BMap.Point(116.404, 39.915),6);  // 初始化地图,设置中心点坐标和地图级别
	map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
	map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
	map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
    map.setMinZoom(6);//地图允许展示的最小级别。
	map.setMaxZoom(18);//地图允许展示的最大级别。
	/**http://developer.baidu.com/map/custom/    获取styleJson*/ 
	 var styleJson = [
	                  {
	                            "featureType": "road",
	                            "elementType": "all",
	                            "stylers": {
	                                      "visibility": "off"
	                            }
	                  }
	        ]
	map.setMapStyle({styleJson:styleJson});
    
    //在地图上增加图片
	var point = new BMap.Point(116.404, 39.915);    
 	var opts={
			imageOffset:new BMap.Size(1, 1)
	} 
 	/** 另一种调用格式 **/
    //var icon = new BMap.Icon("http://app.baidu.com/map/images/us_mk_icon.png",
    //new BMap.Size(json.w,json.h),{imageOffset: new BMap.Size(-json.l,-json.t),infoWindowOffset:new BMap.Size(json.lb+5,1),offset:new BMap.Size(json.x,json.h)})

	var myIcon = new BMap.Icon("../../../common/images/map/dragging/air-loadding.gif",new BMap.Size(50, 50),opts /* {    
			anchor: new BMap.Size(10, 25)	// 指定定位位置。   
											// 当标注显示在地图上时，其所指向的地理位置距离图标左上角
											// 各偏移10像素和25像素。您可以看到在本例中该位置即是   
		   									// 图标中央下端的尖角位置。    
		   
		  imageOffset: new BMap.Size(0, -25)  	// 设置图片偏移。   
			   									// 当您需要从一幅较大的图片中截取某部分作为标注图标时，您   
			  									 // 需要指定大图的偏移位置，此做法与css sprites技术类似。 
		     
		 } */);     
	var marker = new BMap.Marker(point, {icon: myIcon});  // 创建标注    
	map.addOverlay(marker);            // 将标注添加到地图中
	
	//浏览器定位示例
	var geolocation = new BMap.Geolocation();
	geolocation.getCurrentPosition(function(r){
		if(this.getStatus() == BMAP_STATUS_SUCCESS){
			var mk = new BMap.Marker(r.point);
			map.addOverlay(mk);
			map.panTo(r.point);
			alert('您的位置：'+r.point.lng+','+r.point.lat);
		}
		else {
			alert('failed'+this.getStatus());
		}        
	},{enableHighAccuracy: true})
	//关于状态码
	//BMAP_STATUS_SUCCESS	检索成功。对应数值“0”。
	//BMAP_STATUS_CITY_LIST	城市列表。对应数值“1”。
	//BMAP_STATUS_UNKNOWN_LOCATION	位置结果未知。对应数值“2”。
	//BMAP_STATUS_UNKNOWN_ROUTE	导航结果未知。对应数值“3”。
	//BMAP_STATUS_INVALID_KEY	非法密钥。对应数值“4”。
	//BMAP_STATUS_INVALID_REQUEST	非法请求。对应数值“5”。
	//BMAP_STATUS_PERMISSION_DENIED	没有权限。对应数值“6”。(自 1.1 新增)
	//BMAP_STATUS_SERVICE_UNAVAILABLE	服务不可用。对应数值“7”。(自 1.1 新增)
	//BMAP_STATUS_TIMEOUT	超时。对应数值“8”。(自 1.1 新增)
/* 		function theLocation(){
		var city = document.getElementById("cityName").value;
		if(city != ""){
			
           	map.setCenter(city);
          	console.info(map.getCenter());
		}
	} */
	function googleDistance(lat1,lng1,lat2,lng2) {
	    var lat = [lat1, lat2]
	    var lng = [lng1, lng2] 
	    var R = 6378137;
	    var dLat = (lat[1] - lat[0]) * Math.PI / 180;
	    var dLng = (lng[1] - lng[0]) * Math.PI / 180;
	    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat[0] * Math.PI / 180) * Math.cos(lat[1] * Math.PI / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
	    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	    var d = R * c;
	    return Math.round(d);
	} 
/* 	var distance=googleDistance(39.894834,116.32110999999998,39.908715,116.39738899999998);
	alert(distance); */
	var foreigns;
	for (var i = 0; i < foreigns.length; i++) {
		for (var j =0; j < foreigns.length; j++) {
			if(i==j){continue;};
			var distance=googleDistance(foreigns[i].lat,foreigns[i].lng,foreigns[j].lat,foreigns[j].lng)
			if(distance<=500000){
				foreigns[i].nearList.push(foreigns[j]);
			}
		}
	}
	
	
	
	
/* 	function getTheDistance(LatLng start,LatLng end){  
        double lat1 = (Math.PI/180)*start.latitude;  
        double lat2 = (Math.PI/180)*end .latitude;  
          
        double lon1 = (Math.PI/180)*start.longitude;  
        double lon2 = (Math.PI/180)*end.longitude;  
          
//      double Lat1r = (Math.PI/180)*(gp1.getLatitudeE6()/1E6);  
//      double Lat2r = (Math.PI/180)*(gp2.getLatitudeE6()/1E6);  
//      double Lon1r = (Math.PI/180)*(gp1.getLongitudeE6()/1E6);  
//      double Lon2r = (Math.PI/180)*(gp2.getLongitudeE6()/1E6);  
          
        //地球半径  
        double R = 6371;  
          
        //两点间距离 km，如果想要米的话，结果*1000就可以了  
        double d =  Math.acos(Math.sin(lat1)*Math.sin(lat2)+Math.cos(lat1)*Math.cos(lat2)*Math.cos(lon2-lon1))*R;  
          
        return d*1000;  
    }  */ 
</script>

