	
function getCodeByName(name) {
	var airports = getAirports();
	for (var i = 0; i < airports.length; i++) {
		if (airports[i].name == name) return airports[i].code;
	}
	return null;
}

	function getAirports() {
		var airports = [{
		   'longitude':117.058,
		   'latitude':30.589,
		   'code':'AQG',
		   'name':'安庆'
		}, {
		   'longitude':117.695,
		   'latitude':30.743,
		   'code':'JUH',
		   'name':'池州'
		}, {
		   'longitude':115.752,
		   'latitude':32.883,
		   'code':'FUG',
		   'name':'阜阳'
		}, {
		   'longitude':116.976,
		   'latitude':31.995,
		   'code':'HFE',
		   'name':'合肥'
		}, {
		   'longitude':118.264,
		   'latitude':29.733,
		   'code':'TXN',
		   'name':'黄山'
		}, {
		   'longitude':116.404,
		   'latitude':39.798,
		   'code':'NAY',
		   'name':'北京南苑'
		}, {
		   'longitude':116.603,
		   'latitude':40.088,
		   'code':'PEK',
		   'name':'北京首都'
		}, {
		   'longitude':119.681,
		   'latitude':25.935,
		   'code':'FOC',
		   'name':'福州'
		}, {
		   'longitude':118.599,
		   'latitude':24.807,
		   'code':'JJN',
		   'name':'晋江'
		}, {
		   'longitude':116.766,
		   'latitude':25.685,
		   'code':'LCX',
		   'name':'连城'
		}, {
		   'longitude':118.012,
		   'latitude':27.711,
		   'code':'WUS',
		   'name':'武夷山'
		}, {
		   'longitude':118.141,
		   'latitude':24.54,
		   'code':'XMN',
		   'name':'厦门'
		}, {
		   'longitude':94.811,
		   'latitude':40.173,
		   'code':'DNH',
		   'name':'敦煌'
		}, {
		   'longitude':107.617,
		   'latitude':35.807,
		   'code':'IQN',
		   'name':'庆阳'
		}, {
		   'longitude':98.349,
		   'latitude':39.869,
		   'code':'JGN',
		   'name':'嘉峪关'
		}, {
		   'longitude':103.623,
		   'latitude':36.512,
		   'code':'LHW',
		   'name':'兰州'
		}, {
		   'longitude':113.31,
		   'latitude':23.393,
		   'code':'CAN',
		   'name':'广州'
		}, {
		   'longitude':113.077,
		   'latitude':23.074,
		   'code':'FUO',
		   'name':'佛山'
		}, {
		   'longitude':116.116,
		   'latitude':24.269,
		   'code':'MXZ',
		   'name':'梅县'
		}, {
		   'longitude':116.519,
		   'latitude':23.555,
		   'code':'SWA',
		   'name':'揭阳/汕头'
		}, {
		   'longitude':113.821,
		   'latitude':22.63,
		   'code':'SZX',
		   'name':'深圳'
		}, {
		   'longitude':110.488,
		   'latitude':21.247,
		   'code':'ZHA',
		   'name':'湛江'
		}, {
		   'longitude':113.382,
		   'latitude':22.015,
		   'code':'ZUH',
		   'name':'珠海'
		}, {
		   'longitude':109.299,
		   'latitude':21.547,
		   'code':'BHY',
		   'name':'北海'
		}, {
		   'longitude':110.06,
		   'latitude':25.222,
		   'code':'KWL',
		   'name':'桂林'
		}, {
		   'longitude':109.41,
		   'latitude':24.209,
		   'code':'LZH',
		   'name':'柳州'
		}, {
		   'longitude':108.178,
		   'latitude':22.615,
		   'code':'NNG',
		   'name':'南宁'
		}, {
		   'longitude':111.263,
		   'latitude':23.46,
		   'code':'WUZ',
		   'name':'梧州'
		}, {
		   'longitude':104.965,
		   'latitude':25.086,
		   'code':'ACX',
		   'name':'兴义'
		}, {
		   'longitude':106.979,
		   'latitude':23.721,
		   'code':'AEB',
		   'name':'百色'
		}, {
		   'longitude':106.807,
		   'latitude':26.547,
		   'code':'KWE',
		   'name':'贵阳'
		}, {
		   'longitude':109.317,
		   'latitude':27.889,
		   'code':'TEN',
		   'name':'铜仁'
		}, {
		   'longitude':107.26,
		   'latitude':27.806,
		   'code':'ZYI',
		   'name':'遵义'
		}, {
		   'longitude':109.165,
		   'latitude':26.323,
		   'code':'HZH',
		   'name':'黎平'
		}, {
		   'longitude':105.883,
		   'latitude':26.259,
		   'code':'AVA',
		   'name':'安顺'
		}, {
		   'longitude':110.466,
		   'latitude':19.946,
		   'code':'HAK',
		   'name':'海口'
		}, {
		   'longitude':109.415,
		   'latitude':18.313,
		   'code':'SYX',
		   'name':'三亚'
		}, {
		   'longitude':114.442,
		   'latitude':36.53,
		   'code':'HDG',
		   'name':'邯郸'
		}, {
		   'longitude':119.728,
		   'latitude':39.972,
		   'code':'SHP',
		   'name':'秦皇岛'
		}, {
		   'longitude':114.705,
		   'latitude':38.283,
		   'code':'SJW',
		   'name':'石家庄'
		}, {
		   'longitude':114.359,
		   'latitude':36.134,
		   'code':'AYN',
		   'name':'安阳'
		}, {
		   'longitude':113.853,
		   'latitude':34.531,
		   'code':'CGO',
		   'name':'郑州'
		}, {
		   'longitude':112.399,
		   'latitude':34.741,
		   'code':'LYA',
		   'name':'洛阳'
		}, {
		   'longitude':112.626,
		   'latitude':32.987,
		   'code':'NNY',
		   'name':'南阳'
		}, {
		   'longitude':125.146,
		   'latitude':46.755,
		   'code':'DQA',
		   'name':'大庆'
		}, {
		   'longitude':127.326,
		   'latitude':50.187,
		   'code':'HEK',
		   'name':'黑河'
		}, {
		   'longitude':126.246,
		   'latitude':45.63,
		   'code':'HRB',
		   'name':'哈尔滨'
		}, {
		   'longitude':130.47,
		   'latitude':46.853,
		   'code':'JMU',
		   'name':'佳木斯'
		}, {
		   'longitude':129.596,
		   'latitude':44.543,
		   'code':'MDG',
		   'name':'牡丹江'
		}, {
		   'longitude':123.931,
		   'latitude':47.26,
		   'code':'NDG',
		   'name':'齐齐哈尔'
		}, {
		   'longitude':109.493,
		   'latitude':30.326,
		   'code':'ENH',
		   'name':'恩施'
		}, {
		   'longitude':114.214,
		   'latitude':30.773,
		   'code':'WUH',
		   'name':'武汉'
		}, {
		   'longitude':112.302,
		   'latitude':32.156,
		   'code':'XFN',
		   'name':'襄樊'
		}, {
		   'longitude':111.492,
		   'latitude':30.553,
		   'code':'YIH',
		   'name':'宜昌'
		}, {
		   'longitude':111.65,
		   'latitude':28.927,
		   'code':'CGD',
		   'name':'常德'
		}, {
		   'longitude':113.227,
		   'latitude':28.193,
		   'code':'CSX',
		   'name':'长沙'
		}, {
		   'longitude':110.459,
		   'latitude':29.111,
		   'code':'DYG',
		   'name':'张家界'
		}, {
		   'longitude':109.712,
		   'latitude':27.448,
		   'code':'HJJ',
		   'name':'芷江'
		}, {
		   'longitude':111.624,
		   'latitude':26.347,
		   'code':'LLF',
		   'name':'永州'
		}, {
		   'longitude':125.707,
		   'latitude':44,
		   'code':'CGQ',
		   'name':'长春'
		}, {
		   'longitude':125.754,
		   'latitude':42.06,
		   'code':'TNH',
		   'name':'通化'
		}, {
		   'longitude':119.791,
		   'latitude':31.918,
		   'code':'CZX',
		   'name':'常州'
		}, {
		   'longitude':118.888,
		   'latitude':34.57,
		   'code':'LYG',
		   'name':'连云港'
		}, {
		   'longitude':118.876,
		   'latitude':31.738,
		   'code':'NKG',
		   'name':'南京'
		}, {
		   'longitude':120.986,
		   'latitude':32.077,
		   'code':'NTG',
		   'name':'南通'
		}, {
		   'longitude':120.44,
		   'latitude':31.509,
		   'code':'WUX',
		   'name':'无锡'
		}, {
		   'longitude':117.567,
		   'latitude':34.058,
		   'code':'XUZ',
		   'name':'徐州'
		}, {
		   'longitude':119.726,
		   'latitude':32.565,
		   'code':'YTY',
		   'name':'扬州泰州'
		}, {
		   'longitude':120.215,
		   'latitude':33.437,
		   'code':'YNZ',
		   'name':'盐城'
		}, {
		   'longitude':117.19,
		   'latitude':29.338,
		   'code':'JDZ',
		   'name':'景德镇'
		}, {
		   'longitude':114.754,
		   'latitude':26.857,
		   'code':'JGS',
		   'name':'井冈山'
		}, {
		   'longitude':115.814,
		   'latitude':29.489,
		   'code':'JIU',
		   'name':'九江'
		}, {
		   'longitude':115.922,
		   'latitude':28.863,
		   'code':'KHN',
		   'name':'南昌'
		}, {
		   'longitude':114.791,
		   'latitude':25.851,
		   'code':'KOW',
		   'name':'赣州'
		}, {
		   'longitude':122.869,
		   'latitude':41.108,
		   'code':'AOG',
		   'name':'鞍山'
		}, {
		   'longitude':120.449,
		   'latitude':41.553,
		   'code':'CHG',
		   'name':'朝阳'
		}, {
		   'longitude':122.676,
		   'latitude':39.274,
		   'code':'CNI',
		   'name':'长海'
		}, {
		   'longitude':124.293,
		   'latitude':40.04,
		   'code':'DDG',
		   'name':'丹东'
		}, {
		   'longitude':121.55,
		   'latitude':38.969,
		   'code':'DLC',
		   'name':'大连'
		}, {
		   'longitude':121.079,
		   'latitude':41.103,
		   'code':'JNZ',
		   'name':'锦州'
		}, {
		   'longitude':123.5,
		   'latitude':41.645,
		   'code':'SHE',
		   'name':'沈阳'
		}, {
		   'longitude':129.455,
		   'latitude':42.895,
		   'code':'YNJ',
		   'name':'延吉'
		}, {
		   'longitude':110.011,
		   'latitude':40.572,
		   'code':'BAV',
		   'name':'包头'
		}, {
		   'longitude':118.845,
		   'latitude':42.162,
		   'code':'CIF',
		   'name':'赤峰'
		}, {
		   'longitude':109.877,
		   'latitude':39.502,
		   'code':'DSN',
		   'name':'鄂尔多斯'
		}, {
		   'longitude':111.827,
		   'latitude':40.862,
		   'code':'HET',
		   'name':'呼和浩特'
		}, {
		   'longitude':119.833,
		   'latitude':49.218,
		   'code':'HLD',
		   'name':'海拉尔'
		}, {
		   'longitude':122.014,
		   'latitude':46.201,
		   'code':'HLH',
		   'name':'乌兰浩特'
		}, {
		   'longitude':117.346,
		   'latitude':49.579,
		   'code':'NZH',
		   'name':'满洲里'
		}, {
		   'longitude':122.217,
		   'latitude':43.565,
		   'code':'TGO',
		   'name':'通辽'
		}, {
		   'longitude':106.815,
		   'latitude':39.799,
		   'code':'WUA',
		   'name':'乌海'
		}, {
		   'longitude':115.972,
		   'latitude':43.925,
		   'code':'XIL',
		   'name':'锡林浩特'
		}, {
		   'longitude':106.397,
		   'latitude':38.33,
		   'code':'INC',
		   'name':'银川'
		}, {
		   'longitude':94.797,
		   'latitude':36.408,
		   'code':'GOQ',
		   'name':'格尔木'
		}, {
		   'longitude':102.047,
		   'latitude':36.531,
		   'code':'XNN',
		   'name':'西宁'
		}, {
		   'longitude':118.796,
		   'latitude':37.512,
		   'code':'DOY',
		   'name':'东营'
		}, {
		   'longitude':116.363,
		   'latitude':35.303,
		   'code':'JNG',
		   'name':'济宁'
		}, {
		   'longitude':120.393,
		   'latitude':36.273,
		   'code':'TAO',
		   'name':'青岛'
		}, {
		   'longitude':117.217,
		   'latitude':36.856,
		   'code':'TNA',
		   'name':'济南'
		}, {
		   'longitude':119.127,
		   'latitude':36.647,
		   'code':'WEF',
		   'name':'潍坊'
		}, {
		   'longitude':122.248,
		   'latitude':37.195,
		   'code':'WEH',
		   'name':'威海'
		}, {
		   'longitude':121.381,
		   'latitude':37.414,
		   'code':'YNT',
		   'name':'烟台'
		}, {
		   'longitude':113.134,
		   'latitude':36.252,
		   'code':'CIH',
		   'name':'长治'
		}, {
		   'longitude':113.494,
		   'latitude':40.064,
		   'code':'DAT',
		   'name':'大同'
		}, {
		   'longitude':118.42,
		   'latitude':35.054,
		   'code':'LYI',
		   'name':'临沂'
		}, {
		   'longitude':112.642,
		   'latitude':37.76,
		   'code':'TYN',
		   'name':'太原'
		}, {
		   'longitude':111.049,
		   'latitude':35.119,
		   'code':'YCU',
		   'name':'运城'
		}, {
		   'longitude':108.946,
		   'latitude':32.714,
		   'code':'AKA',
		   'name':'安康'
		}, {
		   'longitude':109.563,
		   'latitude':36.645,
		   'code':'ENY',
		   'name':'延安'
		}, {
		   'longitude':107.021,
		   'latitude':33.07,
		   'code':'HZG',
		   'name':'汉中'
		}, {
		   'longitude':109.61,
		   'latitude':38.369,
		   'code':'UYN',
		   'name':'榆林'
		}, {
		   'longitude':108.767,
		   'latitude':34.446,
		   'code':'XIY',
		   'name':'西安'
		}, {
		   'longitude':121.809,
		   'latitude':31.156,
		   'code':'PVG',
		   'name':'上海浦东'
		}, {
		   'longitude':121.353,
		   'latitude':31.2,
		   'code':'SHA',
		   'name':'上海虹桥'
		}, {
		   'longitude':103.965,
		   'latitude':30.585,
		   'code':'CTU',
		   'name':'成都'
		}, {
		   'longitude':107.438,
		   'latitude':31.137,
		   'code':'DAX',
		   'name':'达县'
		}, {
		   'longitude':105.712,
		   'latitude':32.4,
		   'code':'GNY',
		   'name':'广元'
		}, {
		   'longitude':103.695,
		   'latitude':32.858,
		   'code':'JZH',
		   'name':'九寨沟'
		}, {
		   'longitude':105.389,
		   'latitude':28.848,
		   'code':'LZO',
		   'name':'泸州'
		}, {
		   'longitude':104.757,
		   'latitude':31.432,
		   'code':'MIG',
		   'name':'绵阳'
		}, {
		   'longitude':106.173,
		   'latitude':30.794,
		   'code':'NAO',
		   'name':'南充'
		}, {
		   'longitude':101.802,
		   'latitude':26.541,
		   'code':'PZI',
		   'name':'攀枝花'
		}, {
		   'longitude':108.439,
		   'latitude':30.804,
		   'code':'WXN',
		   'name':'万州'
		}, {
		   'longitude':102.196,
		   'latitude':27.985,
		   'code':'XIC',
		   'name':'西昌'
		}, {
		   'longitude':104.562,
		   'latitude':28.801,
		   'code':'YBP',
		   'name':'宜宾'
		}, {
		   'longitude':117.365,
		   'latitude':39.136,
		   'code':'TSN',
		   'name':'天津'
		}, {
		   'longitude':97.113,
		   'latitude':30.554,
		   'code':'BPX',
		   'name':'昌都'
		}, {
		   'longitude':90.908,
		   'latitude':29.295,
		   'code':'LXA',
		   'name':'拉萨'
		}, {
		   'longitude':80.302,
		   'latitude':41.267,
		   'code':'AKU',
		   'name':'阿克苏'
		}, {
		   'longitude':93.664,
		   'latitude':42.847,
		   'code':'HMI',
		   'name':'哈密'
		}, {
		   'longitude':79.881,
		   'latitude':37.047,
		   'code':'HTN',
		   'name':'和田'
		}, {
		   'longitude':83,
		   'latitude':41.722,
		   'code':'KCA',
		   'name':'库车'
		}, {
		   'longitude':76.021,
		   'latitude':39.542,
		   'code':'KHG',
		   'name':'喀什'
		}, {
		   'longitude':86.149,
		   'latitude':41.629,
		   'code':'KRL',
		   'name':'库尔勒'
		}, {
		   'longitude':84.966,
		   'latitude':45.475,
		   'code':'KRY',
		   'name':'克拉玛依'
		}, {
		   'longitude':83.349,
		   'latitude':46.676,
		   'code':'TCG',
		   'name':'塔城'
		}, {
		   'longitude':87.485,
		   'latitude':43.91,
		   'code':'URC',
		   'name':'乌鲁木齐'
		}, {
		   'longitude':81.34,
		   'latitude':43.959,
		   'code':'YIN',
		   'name':'伊宁'
		}, {
		   'longitude':99.172,
		   'latitude':25.058,
		   'code':'BSD',
		   'name':'保山'
		}, {
		   'longitude':99.691,
		   'latitude':27.799,
		   'code':'DIG',
		   'name':'迪庆香格里拉'
		}, {
		   'longitude':100.33,
		   'latitude':25.654,
		   'code':'DLU',
		   'name':'大理'
		}, {
		   'longitude':100.774,
		   'latitude':21.977,
		   'code':'JHG',
		   'name':'西双版纳'
		}, {
		   'longitude':102.75,
		   'latitude':25.003,
		   'code':'KMG',
		   'name':'昆明'
		}, {
		   'longitude':100.255,
		   'latitude':26.675,
		   'code':'LJG',
		   'name':'丽江'
		}, {
		   'longitude':100.034,
		   'latitude':23.748,
		   'code':'LNJ',
		   'name':'临沧'
		}, {
		   'longitude':98.536,
		   'latitude':24.408,
		   'code':'LUM',
		   'name':'德宏芒市'
		}, {
		   'longitude':100.971,
		   'latitude':22.799,
		   'code':'SYM',
		   'name':'思茅'
		}, {
		   'longitude':103.761,
		   'latitude':27.33,
		   'code':'ZAT',
		   'name':'昭通'
		}, {
		   'longitude':120.441,
		   'latitude':30.239,
		   'code':'HGH',
		   'name':'杭州'
		}, {
		   'longitude':122.368,
		   'latitude':29.938,
		   'code':'HSN',
		   'name':'舟山'
		}, {
		   'longitude':121.428,
		   'latitude':28.561,
		   'code':'HYN',
		   'name':'台州/黄岩'
		}, {
		   'longitude':118.908,
		   'latitude':28.974,
		   'code':'JUZ',
		   'name':'衢州'
		}, {
		   'longitude':121.473,
		   'latitude':29.825,
		   'code':'NGB',
		   'name':'宁波'
		}, {
		   'longitude':120.858,
		   'latitude':27.919,
		   'code':'WNZ',
		   'name':'温州'
		}, {
		   'longitude':120.038,
		   'latitude':29.349,
		   'code':'YIW',
		   'name':'义乌'
		}, {
		   'longitude':106.645,
		   'latitude':29.724,
		   'code':'CKG',
		   'name':'重庆'
		}, {
		   'longitude':113.944,
		   'latitude':22.317,
		   'code':'HKG',
		   'name':'香港'
		}, {
		   'longitude':113.586,
		   'latitude':22.161,
		   'code':'MFM',
		   'name':'澳门'
		}];
		return airports;
	}