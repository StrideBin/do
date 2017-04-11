/*******************************************************************************
 * 交易报文
 */
function TransReqPkg() {
}

TransReqPkg.prototype = {

	// 属性业务数据
	busData : null,

	// 属性业务数据set方法
	setBusData : function(busData) {
		this.busData = busData;
	},
	// 属性业务数据get方法
	getBusData : function() {
		return this.busData;
	},
	// 属性交易渠道信息
	transChan : null,
	// 属性交易渠道信息的set方法
	setTransChan : function(transChan) {
		this.transChan = transChan;
	},

	// 属性交易渠道信息的get方法
	getTransChan : function() {
		return this.transChan;
	}
	
};

/**
 * 航班路线查询参数
 */
function TransChan() {

}

TransChan.prototype = {
		/** chanCode: 属性渠道代码 **/
	   chanCode: null,
	   getChanCode: function() {
	        return chanCode;
	    },
	    setChanCode: function(chanCode) {
	        this.chanCode = chanCode;
	    }
};
/**
 * 航班路线查询参数
 */
function FltRteQry() {
	
}

FltRteQry.prototype = {
	// 属性承运人
	carrier : null,
	// 属性承运人set方法
	setCarrier : function(carrier) {
		this.carrier = carrier;
	},
	// 属性承运人的get方法
	getCarrier : function() {
		return this.carrier;
	},
		
    // 属性航班号
	flightNo : null,
	// 属性航班号set方法
	setFlightNo : function(flightNo) {
		this.flightNo = flightNo;
	},
	// 属性航班号的get方法
	getFlightNo : function() {
		return this.flightNo;
	},
	    // 属性出发机场
	oriEng : null,
	// 属性出发机场set方法
	setOriEng : function(oriEng) {
		this.oriEng = oriEng;
	},
	// 属性出发机场的get方法
	getOriEng : function() {
		return this.oriEng;
	},
	    // 属性目的机场
	desEng : null,
	// 属性目的机场set方法
	setDesEng : function(desEng) {
		this.desEng = desEng;
	},
	// 属性目的机场的get方法
	getDesEng : function() {
		return this.desEng;
	},
	    // 属性中转机场
	transferEng : null,
	// 属性中转机场set方法
	setTransferEng : function(transferEng) {
		this.transferEng = transferEng;
	},
	// 属性中转机场的get方法
	getTransferEng : function() {
		return this.transferEng;
	},
	    // 属性出发临近机场
	oriIncNearby : null,
	// 属性出发临近机场set方法
	setOriIncNearby : function(oriIncNearby) {
		this.oriIncNearby = oriIncNearby;
	},
	// 属性出发临近机场的get方法
	getOriIncNearby : function() {
		return this.oriIncNearby;
	},
	    // 属性到达临近机场
	desIncNearby : null,
	// 属性到达临近机场set方法
	setDesIncNearby : function(desIncNearby) {
		this.desIncNearby = desIncNearby;
	},
	// 属性到达临近机场的get方法
	getDesIncNearby : function() {
		return this.desIncNearby;
	},
	    // 属性航班类型
	travelMode : null,
	// 属性航班类型set方法
	setTravelMode : function(travelMode) {
		this.travelMode = travelMode;
	},
	// 属性航班类型的get方法
	getTravelMode : function() {
		return this.travelMode;
	},   
	// 属性航班路线类型
	odType : null,
	// 属性航班路线类型set方法
	setOdType : function(odType) {
		this.odType = odType;
	},
	// 属性航班路线类型的get方法
	getOdType : function() {
		return this.odType;
	},    
	// 属性最早出发时间
	strStartFltDt : null,
	// 属性最早出发时间set方法
	setStrStartFltDt : function(strStartFltDt) {
		this.strStartFltDt = strStartFltDt;
	},
	// 属性最早出发时间的get方法
	getStrStartFltDt : function() {
		return this.strStartFltDt;
	},    
	// 属性最晚出发时间
	strEndFltDt : null,
	// 属性最晚出发set方法
	setStrEndFltDt : function(strEndFltDt) {
		this.strEndFltDt = strEndFltDt;
	},
	// 属性最晚出发的get方法
	getstrEndFltDt : function() {
		return this.strEndFltDt;
	},    
	// 属性最早出发时间
	strStartFltTime : null,
	// 属性最早出发时间set方法
	setStrStartFltTime : function(strStartFltTime) {
		this.strStartFltTime = strStartFltTime;
	},
	// 属性最早出发时间的get方法
	getStrStartFltTime : function() {
		return this.strStartFltTime;
	},    
	// 属性最晚出发时间
	strEndFltTime : null,
	// 属性最晚出发时间set方法
	setStrEndFltTime : function(strEndFltTime) {
		this.strEndFltTime = strEndFltTime;
	},
	// 属性最晚出发时间的get方法
	getStrEndFltTime : function() {
		return this.strEndFltTime;
	},
	// 属性最早回程日期
	strStartRtnFltDt : null,
	// 属性最早回程日期set方法
	setStartRtnFltDt : function(strStartRtnFltDt) {
		this.strStartRtnFltDt = strStartRtnFltDt;
	},
	// 属性最早回程日期的get方法
	getStrStartRtnFltDt : function() {
		return this.strStartRtnFltDt;
	},

	// 属性最晚回程时间
	strEndRtnFltDt : null,
	// 属性最晚回程时间set方法
	setStrEndRtnFltDt : function(strEndRtnFltDt) {
		this.strEndRtnFltDt = strEndRtnFltDt;
	},
	// 属性最晚回程时间的get方法
	getStrEndRtnFltDt : function() {
		return this.strEndRtnFltDt;
	},
	
  // 属性舱位等级
	subclassLv : null,
	// 属性舱位等级set方法
	setSubclassLv : function(subclassLv) {
		this.subclassLv = subclassLv;
	},
	// 属性舱位等级get方法
	getSubclassLv : function() {
		return this.subclassLv;
	},
   
   // 属性成人座位数
	adultCnt : null,
	// 属性成人座位数set方法
	setAdultCnt : function(adultCnt) {
		this.adultCnt = adultCnt;
	},
	// 属性成人座位数get方法
	getAdultCnt : function() {
		return this.adultCnt;
	},
  
   // 属性小孩座位数
	childrenCnt : null,
	// 属性小孩座位数set方法
	setChildrenCnt : function(childrenCnt) {
		this.childrenCnt = childrenCnt;
	},
	// 属性小孩座位数get方法
	getChildrenCnt : function() {
		return this.childrenCnt;
	},
  
  // 属性婴儿座位数
	infantCnt : null,
	// 属性婴儿座位数set方法
	setInfantCnt : function(infantCnt) {
		this.infantCnt = infantCnt;
	},
	// 属性婴儿座位数get方法
	getInfantCnt : function() {
		return this.infantCnt;
	},
  
  // 属性最大预算
	maxBudget : null,
	// 属性最大预算set方法
	setMaxBudget : function(maxBudget) {
		this.maxBudget = maxBudget;
	},
	// 属性最大预算get方法
	getMaxBudget : function() {
		return this.maxBudget;
	},
 
 // 属性最小预算
	minBudget : null,
	// 属性最小预算set方法
	setMinBudget : function(minBudget) {
		this.minBudget = minBudget;
	},
	// 属性最小预算get方法
	getMinBudget : function() {
		return this.minBudget;
	},

 // 属性停留时间
	durdays : null,
	// 属性停留时间set方法
	setDurdays : function(durdays) {
		this.durdays = durdays;
	},
	// 属性停留时间get方法
	getDurdays : function() {
		return this.durdays;
	},
 
  // 属性查询航段序号 默认为一段
	segSerNo : null,
	// 属性查询航段序号set方法   默认为一段
	setSegSerNo : function(segSerNo) {
		this.segSerNo = segSerNo;
	},
	// 属性查询航段序号 get方法   默认为一段
	getSegSerNo : function() {
		return this.segSerNo;
	},
	
	 // 属性主题编号
	themeCode : null,
	// 属性主题编号set方法
	setThemeCode : function(themeCode) {
		this.themeCode = themeCode;
	},
	// 属性主题编号get方法
	getThemeCode : function() {
		return this.themeCode;
	},
	
	// 属性国际/国内类型
	diType : null,
	// 属性国际/国内类型set方法
	setDiType : function(diType) {
		this.diType = diType;
	},
	// 属性国际/国内类型的get方法
	getDiType : function() {
		return this.diType;
	},    
};


/**
 * 基础数据查询参数
 */
function BaseDataQry() {
	
}

BaseDataQry.prototype = {
	// 属性flag
		flag : null,
	// 属性flag set方法
	setFlag : function(flag) {
		this.flag = flag;
	},
	// 属性flag get方法
	getFlag : function() {
		return this.flag;
	}	
};

