package com.lb.web.dto;

import java.io.Serializable;

/**
 * 创建人: lb 日期:2017年4月10日 下午5:22:45
 */
public class DtoTest implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -5465303343663044045L;
	private int ids;
	private String names;

	public int getIds() {
		return ids;
	}

	public void setIds(int ids) {
		this.ids = ids;
	}

	public String getNames() {
		return names;
	}

	public void setNames(String names) {
		this.names = names;
	}

	@Override
	public String toString() {
		return "DtoTest [ids=" + ids + ", names=" + names + "]";
	}

}
