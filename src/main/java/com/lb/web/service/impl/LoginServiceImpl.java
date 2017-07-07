package com.lb.web.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lb.web.dao.LoginMapper;
import com.lb.web.dto.UserDto;
import com.lb.web.service.LoginService;

/**
 * 创建人: lb  日期:2017年4月10日 下午4:59:45
 */
@Service 
public class LoginServiceImpl implements LoginService{
	
	@Autowired
    public LoginMapper mapperTest;
	@Override
	public UserDto Select() {
		return mapperTest.select();
	}
	
}
