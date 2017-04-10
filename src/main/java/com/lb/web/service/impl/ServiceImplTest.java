package com.lb.web.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lb.web.dao.MapperTest;
import com.lb.web.dto.DtoTest;
import com.lb.web.service.ServiceTest;

/**
 * 创建人: lb  日期:2017年4月10日 下午4:59:45
 */
@Service 
public class ServiceImplTest implements ServiceTest{
	
	@Autowired
    public MapperTest mapperTest;
	@Override
	public DtoTest Select() {
		return mapperTest.select();
	}
	
}
