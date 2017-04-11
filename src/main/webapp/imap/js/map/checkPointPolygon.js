//计算向量叉乘
var crossMul = function(v1, v2) {
	return v1.lng * v2.lat - v1.lat * v2.lng;
}
// 判断两条线段是否相交
var checkCross = function(p1, p2, p3, p4) {
	var v1 = {
		lng : p1.lng - p3.lng,
		lat : p1.lat - p3.lat
	}, v2 = {
		lng : p2.lng - p3.lng,
		lat : p2.lat - p3.lat
	}, v3 = {
		lng : p4.lng - p3.lng,
		lat : p4.lat - p3.lat
	}, v = crossMul(v1, v3) * crossMul(v2, v3)
	v1 = {
		lng : p3.lng - p1.lng,
		lat : p3.lat - p1.lat
	}
	v2 = {
		lng : p4.lng - p1.lng,
		lat : p4.lat - p1.lat
	}
	v3 = {
		lng : p2.lng - p1.lng,
		lat : p2.lat - p1.lat
	}
	return (v <= 0 && crossMul(v1, v3) * crossMul(v2, v3) <= 0) ? true : false
}
// 判断点是否在多边形内
var checkPP = function(point, polygon) {
	var p1, p2, p3, p4
	p1 = point
	p2 = {
		lng : -100,
		lat : point.lat
	}
	var count = 0
	// 对每条边都和射线作对比
	for ( var i = 0; i < polygon.length - 1; i++) {
		p3 = polygon[i]
		p4 = polygon[i + 1]
		if (checkCross(p1, p2, p3, p4) == true) {
			count++
		}
	}
	p3 = polygon[polygon.length - 1]
	p4 = polygon[0]
	if (checkCross(p1, p2, p3, p4) == true) {
		count++
	}
	// console.log(count)
	return (count % 2 == 0) ? false : true
}