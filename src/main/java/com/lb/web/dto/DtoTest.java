package com.lb.web.dto;

import java.io.Serializable;

/**
 * 创建人: lb 日期:2017年4月10日 下午5:22:45
 */
public class DtoTest implements Serializable {
	private static final long serialVersionUID = -3926380112500677449L;
	private int id;
	private String name;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public String toString() {
		return "DtoTest [id=" + id + ", name=" + name + "]";
	}

}
