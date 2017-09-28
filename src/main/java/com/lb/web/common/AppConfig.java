package com.lb.web.common;

import java.util.PropertyResourceBundle;

import org.apache.commons.lang3.StringUtils;

/**
 * 应用配置文件
 * @author 刘斌
 * @date 2017-09-28
 */
public class AppConfig {

	private final static PropertyResourceBundle config = (PropertyResourceBundle) PropertyResourceBundle.getBundle("appConfig");
	
	public final static String get(String property) {
		String value = null;
		if (config.containsKey(property)) {
			value =  config.getString(property);
		}
		return value;
	}
	
	public final static int getInt(String property) {
		String value = null;
		if (config.containsKey(property)) {
			value =  config.getString(property);
		}
		if (StringUtils.isNotBlank(value)) {
			return Integer.parseInt(value.trim());
		} else {
			return 0;
		}
	}
	
	//public static final int DOCALL_DAYS = AppConfig.getInt("DOCALL_DAYS");    // 清除日志的天数
	
	/** */
	public static final String RECEIVE_ADDRESS = AppConfig.get("RECEIVE_ADDRESS");
}
