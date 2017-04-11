var JsonUtils = {
	// 定义换行符
	n : "\n",
	// 定义制表符
	t : "\t",
	// 转换String
	jsonFormat : function(obj) {
		return JsonUtils.writeObj(obj, 1);
	},
	// 写对象
	writeObj : function(obj // 对象
	, level // 层次（基数为1）
	, isInArray) { // 此对象是否在一个集合内
		
		// 如果为空，直接输出null
		if (obj == null) {
			return "null";
		}
		// 为普通类型，直接输出值
		if (obj.constructor == Number || obj.constructor == Date
				|| obj.constructor == String || obj.constructor == Boolean) {
			var v = obj.toString();
			var tab = isInArray ? JsonUtils.repeatStr(JsonUtils.t, level - 1)
					: "";
			if (obj.constructor == String || obj.constructor == Date) {
				// 时间格式化只是单纯输出字符串，而不是Date对象
				return tab + ("\"" + v + "\"");
			} else if (obj.constructor == Boolean) {
				return tab + v.toLowerCase();
			} else {
				return tab + (v);
			}
		}

		// 写Json对象，缓存字符串
		var currentObjStrings = [];
		// 遍历属性
		for ( var name in obj) {
			var temp = [];
			// 格式化Tab
			var paddingTab = JsonUtils.repeatStr(JsonUtils.t, level);
			temp.push(paddingTab);
			// 写出属性名
			temp.push(name + " : ");

			var val = obj[name];
			if (val == null) {
				temp.push("null");
			} else {
				var c = val.constructor;

				if (c == Array) { // 如果为集合，循环内部对象
					temp.push(JsonUtils.n + paddingTab + "[" + JsonUtils.n);
					var levelUp = level + 2; // 层级+2

					var tempArrValue = []; // 集合元素相关字符串缓存片段
					for (var i = 0; i < val.length; i++) {
						// 递归写对象
						tempArrValue.push(JsonUtils.writeObj(val[i], levelUp,
								true));
					}

					temp.push(tempArrValue.join("," + JsonUtils.n));
					temp.push(JsonUtils.n + paddingTab + "]");
				} else if (c == Function) {
					temp.push("[Function]");
				} else {
					// 递归写对象
					temp.push(JsonUtils.writeObj(val, level + 1));
				}
			}
			// 加入当前对象“属性”字符串
			currentObjStrings.push(temp.join(""));
		}
		return (level > 1 && !isInArray ? JsonUtils.n : "") // 如果Json对象是内部，就要换行格式化
				+ JsonUtils.repeatStr(JsonUtils.t, level - 1) + "{"
				+ JsonUtils.n // 加层次Tab格式化
				+ currentObjStrings.join("," + JsonUtils.n) // 串联所有属性值
				+ JsonUtils.n + JsonUtils.repeatStr(JsonUtils.t, level - 1)
				+ "}"; // 封闭对象
	},
	isArray : function(obj) {
		if (obj) {
			return obj.constructor == Array;
		}
		return false;
	},
	repeatStr : function(str, times) {
		var newStr = [];
		if (times > 0) {
			for (var i = 0; i < times; i++) {
				newStr.push(str);
			}
		}
		return newStr.join("");
	},
	jsonToStr : function(obj, exceptVar) {
		if (obj) {
			switch (obj.constructor) {
			case Object:
				var str = "{";
				for ( var o in obj) {
					if (o == exceptVar) {
						continue;
					}
					var tempstr = arguments.callee(obj[o], exceptVar);
					if ("0" == tempstr) {
						alert(o + ":" + tempstr);
					}
					if (tempstr != null && tempstr != "") {
						str += "\"" + o + "\":" + tempstr + ",";
					}
				}
				if (str.substr(str.length - 1) == ",")
					str = str.substr(0, str.length - 1);
				return str + "}";
				break;
			case Array:
				var str = "[";
				for ( var o in obj) {
					if (o == exceptVar) {
						continue;
					}
					var tempstr = arguments.callee(obj[o], exceptVar);
					if (tempstr != null && tempstr != "") {
						str += tempstr + ",";
					}
				}
				if (str.substr(str.length - 1) == ",")
					str = str.substr(0, str.length - 1);
				return str + "]";
				break;
			case Boolean:
				return "\"" + obj.toString() + "\"";
				break;
			case Date:
				return "\"" + obj.toString() + "\"";
				break;
			case Function:
				return "";
				break;
			case Number:
				return "\"" + obj.toString() + "\"";
				break;
			case String:
				return "\"" + obj.toString() + "\"";
				break;
			}
		} else {
			switch (typeof obj) {
			case 'number':
				return "\"" + obj.toString() + "\"";
			default:
				return "";
			}
		}
	}

};