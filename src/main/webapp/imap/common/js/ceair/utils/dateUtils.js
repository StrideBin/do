//---------------------------------------------------     
// 日期格式化     
// 格式 YYYY/yyyy/YY/yy 表示年份     
// MM/M 月份     
// W/w 星期     
// dd/DD/d/D 日期     
// hh/HH/h/H 时间     
// mm/m 分钟     
// ss/SS/s/S 秒     
//---------------------------------------------------     
Date.prototype.Format = function(formatStr)      
{      
    var str = formatStr;      
    var Week = ['日','一','二','三','四','五','六'];     
     
    str=str.replace(/yyyy|YYYY/,this.getFullYear());      
    str=str.replace(/yy|YY/,(this.getYear() % 100)>9?(this.getYear() % 100).toString():'0' + (this.getYear() % 100));      
    
    //由于date中的month值从0开始，month = 9 实际代表10月
    str=str.replace(/MM/,this.getMonth()>8?(this.getMonth()+1).toString():'0' + (this.getMonth()+1));      
    str=str.replace(/M/g,(this.getMonth()+1));      
     
    str=str.replace(/w|W/g,Week[this.getDay()]);      
     
    str=str.replace(/dd|DD/,this.getDate()>9?this.getDate().toString():'0' + this.getDate());      
    str=str.replace(/d|D/g,this.getDate());      
     
    str=str.replace(/hh|HH/,this.getHours()>9?this.getHours().toString():'0' + this.getHours());      
    str=str.replace(/h|H/g,this.getHours());      
    str=str.replace(/mm/,this.getMinutes()>9?this.getMinutes().toString():'0' + this.getMinutes());      
    str=str.replace(/m/g,this.getMinutes());      
     
    str=str.replace(/ss|SS/,this.getSeconds()>9?this.getSeconds().toString():'0' + this.getSeconds());      
    str=str.replace(/s|S/g,this.getSeconds());      
     
    return str;      
};

/**   
* 函数：把字符串转换为日期对象   
* 参数：yyyy-mm-dd或dd/mm/yyyy形式的字符串   
* 返回：Date对象   
* 注：IE下不支持直接实例化日期对象，如new Date("2011-04-06")   
*/   
Date.prototype.parseDate = function (dateStr) {
	if (typeof dateStr == 'string') {
		var flag = true;   
		var dateArray = dateStr.split("-");  
		if (dateArray.length != 3) {  
			dateArray = dateStr.split("/");  
			if (dateArray.length != 3) {  
				return null;  
			}  
			flag = false;  
		}  
		var newDate = new Date();  
		if (flag) {  
			newDate.setFullYear(dateArray[0], dateArray[1] - 1, dateArray[2]);  
		} else {  
			newDate.setFullYear(dateArray[2], dateArray[1] - 1, dateArray[0]);  
		}  
		newDate.setHours(0, 0, 0);  
		return newDate;  
	} else if (dateStr instanceof Date) {
		return dateStr;
	}
}; 


/**
 * 判断是否为闰年
 */
Date.prototype.isLeapYear = function() {
	 return (0==this.getYear()%4&&((this.getYear()%100!=0)||(this.getYear()%400==0)));
};

/**
 * 对Date的扩展，将 Date 转化为指定格式的String * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)
 * 可以用 1-2 个占位符 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
 * eg: 
 *  (newDate()).pattern("yyyy-MM-dd hh:mm:ss.S")==> 2006-07-02 08:09:04.423      
 *  (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04      
 *  (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04      
 *  (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04      
 *  (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18      
 */  
Date.prototype.formatDate = function(formatStr) {
	var o = {         
	    "M+" : this.getMonth()+1, //月份         
	    "d+" : this.getDate(), //日         
	    "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时         
	    "H+" : this.getHours(), //小时         
	    "m+" : this.getMinutes(), //分         
	    "s+" : this.getSeconds(), //秒         
	    "q+" : Math.floor((this.getMonth()+3)/3), //季度         
	    "S" : this.getMilliseconds() //毫秒         
	    }; 
	
    var week = {         
	    "0" : "/u65e5",         
	    "1" : "/u4e00",         
	    "2" : "/u4e8c",         
	    "3" : "/u4e09",         
	    "4" : "/u56db",         
	    "5" : "/u4e94",         
	    "6" : "/u516d"        
	    };  
    
    if(/(y+)/.test(formatStr)){         
        formatStr = formatStr.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));         
    }         
    if(/(E+)/.test(formatStr)){         
        formatStr = formatStr.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[this.getDay()+""]);         
    }         
    for(var k in o){         
        if(new RegExp("("+ k +")").test(formatStr)){         
            formatStr = formatStr.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));         
        }         
    }
    return formatStr;      
};

/**
 * 日期添加
 */
Date.prototype.addDate = function(strInterval, number) { 
	number = parseInt(number);
    var dateTemp = this; 
    switch (strInterval) {
    	case 'ms' :
    		return new Date(Date.parse(dateTemp) + (1000 * number)); 
        case 's' :
        	return new Date(Date.parse(dateTemp) + (1000 * number)); 
        case 'mi' :
        	return new Date(Date.parse(dateTemp) + (60000 * number)); 
        case 'h' :
        	return new Date(Date.parse(dateTemp) + (3600000 * number)); 
        case 'd' :
        case '40' :
        	return new Date(Date.parse(dateTemp) + (86400000 * number)); 
        case 'w' :
        	return new Date(Date.parse(dateTemp) + ((86400000 * 7) * number)); 
        case 'q' :
        	return new Date(dateTemp.getFullYear(), (dateTemp.getMonth()) + number*3, dateTemp.getDate(), dateTemp.getHours(), dateTemp.getMinutes(), dateTemp.getSeconds()); 
        case 'M' :
        case 'month' :
        case '41' :
        	return new Date(dateTemp.getFullYear(), (dateTemp.getMonth()) + number, dateTemp.getDate(), dateTemp.getHours(), dateTemp.getMinutes(), dateTemp.getSeconds()); 
        case 'y' :
        case 'Y' :
        case 'year' :
        case '42' :
        	return new Date((dateTemp.getFullYear() + number), dateTemp.getMonth(), dateTemp.getDate(), dateTemp.getHours(), dateTemp.getMinutes(), dateTemp.getSeconds()); 
    } 
};

/**
 * 日期添加
 */
Date.prototype.addDate = function(strInterval, number, hour, minute, second) { 
	number = parseInt(number);
    var dateTemp = this;
    
    var hours = dateTemp.getHours();
    if (StringUtils.isNotBlank(hour)) {
    	hours = hour;
    }
    
    var minutes = dateTemp.getMinutes();
    if (StringUtils.isNotBlank(minute)) {
    	minutes = minute;
    }
    
    var seconds = dateTemp.getSeconds();
    if (StringUtils.isNotBlank(second)) {
    	seconds = second;
    }
    
    switch (strInterval) {
    	case 'ms' :
    		return new Date(Date.parse(dateTemp) + (1000 * number)); 
        case 's' :
        	return new Date(Date.parse(dateTemp) + (1000 * number)); 
        case 'mi' :
        	return new Date(Date.parse(dateTemp) + (60000 * number)); 
        case 'h' :
        	return new Date(Date.parse(dateTemp) + (3600000 * number)); 
        case 'd' :
        case '40' :
        	return new Date(Date.parse(dateTemp) + (86400000 * number)); 
        case 'w' :
        	return new Date(Date.parse(dateTemp) + ((86400000 * 7) * number)); 
        case 'q' :
        	return new Date(dateTemp.getFullYear(), (dateTemp.getMonth()) + number*3, dateTemp.getDate(), hours, minutes, seconds); 
        case 'M' :
        case 'month' :
        case '41' :
        	return new Date(dateTemp.getFullYear(), (dateTemp.getMonth()) + number, dateTemp.getDate(), hours, minutes, seconds); 
        case 'y' :
        case 'Y' :
        case 'year' :
        case '42' :
        	return new Date((dateTemp.getFullYear() + number), dateTemp.getMonth(), dateTemp.getDate(), hours, minutes, seconds); 
    } 
};

/**   
 * 函数：计算两个日期之间的差值   
 * 参数：date是日期对象   
 * flag：ms-毫秒，ss-秒，mi-分，hh-小时，d-天，w-周，M-月，y-年   
 * 返回：当前日期和date两个日期相差的毫秒/秒/分/小时/天   
 */   
Date.prototype.dateDiff = function(endDate, interval) {   
	//如果是字符串转换为日期型  
    if (typeof endDate == 'string' ) {   
        endDate = new Date().parseDate(endDate);  
    }  
    switch (interval) {
    	case 'ms' :return parseInt(endDate - startDate);
        case 'ss' :return parseInt((endDate - startDate) / 1000);  
        case 'mi' :return parseInt((endDate - startDate) / 60000); // 60 * 1000 
        case 'hh' :return parseInt((endDate - startDate) / 3600000);  // 60 * 60 * 1000
        case 'd' :return parseInt((endDate - startDate) / 86400000);  // 24 * 60 * 60 * 1000
        case 'w' :return parseInt((endDate - startDate) / 604800000); // 7 * 24 * 60 * 60 * 1000 
        case 'm' :return (endDate.getMonth() + 1) + ((endDate.getFullYear() - startDate.getFullYear()) * 12) - (startDate.getMonth() + 1);  
        case 'y' :return endDate.getFullYear() - startDate.getFullYear();  
    } 
};  

/**   
 * 函数：计算两个日期之间的差值   
 * 参数：date是日期对象   
 * flag：ms-毫秒，ss-秒，mi-分，hh-小时，d-天，w-周，M-月，y-年   
 * 返回：当前日期和date两个日期相差的毫秒/秒/分/小时/天   
 */   
function dateDiff(startDate, endDate, interval) {   
	//如果是字符串转换为日期型  
	if (typeof startDate == 'string' ) {   
		startDate = new Date().parseDate(startDate);  
    } 
	
    if (typeof endDate == 'string' ) {   
        endDate = new Date().parseDate(endDate);  
    }  
    switch (interval) {
    	case 'ms' :return parseInt(endDate - startDate);
        case 'ss' :return parseInt((endDate - startDate) / 1000);  
        case 'mi' :return parseInt((endDate - startDate) / 60000); // 60 * 1000 
        case 'hh' :return parseInt((endDate - startDate) / 3600000);  // 60 * 60 * 1000
        case 'd' :return parseInt((endDate - startDate) / 86400000);  // 24 * 60 * 60 * 1000
        case 'w' :return parseInt((endDate - startDate) / 604800000); // 7 * 24 * 60 * 60 * 1000 
        case 'm' :return (endDate.getMonth() + 1) + ((endDate.getFullYear() - startDate.getFullYear()) * 12) - (startDate.getMonth() + 1);  
        case 'y' :return endDate.getFullYear() - startDate.getFullYear();  
    } 
};  

//+---------------------------------------------------  
//| 求两个时间的天数差 日期格式为 YYYY-MM-dd   
//+---------------------------------------------------  
function dateDiffInDays(startDateStr, endDateStr) {
  return dateDiff(startDateStr, endDateStr, "d");
}  

/**
 * 获取日期，日期格式为yyyy-mm-dd
 * @param date 
 * @returns
 */
function getDate(date){
	var arrDate = date.split("-");  
	return new Date(parseInt(arrDate[0],10),parseInt(arrDate[1],10)-1,parseInt(arrDate[2],10));
}

Date.prototype.after = function(compareDate){
	var date = this,
		dateMills = Date.parse(date.Format('MM/dd/yyyy')),
		compMills = Date.parse(compareDate.Format('MM/dd/yyyy'));
	
	if(dateMills > compMills){
		return true;
	}else{
		return false;
	}
};

Date.prototype.before = function(compareDate){
	var date = this,
		dateMills = Date.parse(date.Format('MM/dd/yyyy')),
		compMills = Date.parse(compareDate.Format('MM/dd/yyyy'));
	
	if(dateMills < compMills){
		return true;
	}else{
		return false;
	}
};

/***
 * 当前日期的开始时间
 * @param date
 * @return
 */
function startTimeDate(dateStr) {
	var startTimeDate = new Date().parseDate(dateStr);
	startTimeDate.setHours(0, 0, 0);
	return startTimeDate;
};

/***
 * 当前日期的结束时间
 * @param date
 * @return
 */
function endTimeDate(dateStr) {
	var endTimeDate = new Date().parseDate(dateStr);
	endTimeDate.setHours(23, 59, 59);
	return endTimeDate;
};


