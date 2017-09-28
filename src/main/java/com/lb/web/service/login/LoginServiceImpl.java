package com.lb.web.service.login;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lb.web.dao.LoginMapper;
import com.lb.web.dto.UserDto;

/**
 * 创建人: lb  日期:2017年4月10日 下午4:59:45
 */
@Service("loginServiceImpl")
public class LoginServiceImpl implements LoginService{
	
	@Autowired
    public LoginMapper mapperTest;
	@Override
	public UserDto Select() {
		return mapperTest.select();
	}
	
}
