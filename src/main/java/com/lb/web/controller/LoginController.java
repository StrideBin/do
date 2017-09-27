/**
 * 
 */
package com.lb.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lb.web.dto.UserDto;
import com.lb.web.service.impl.LoginServiceImpl;

/**
 * 创建人: lb 日期:2017年4月6日 下午2:57:07
 */
@Controller
@RequestMapping("/hello")
public class LoginController {

	@Autowired
	private LoginServiceImpl test;
	@ResponseBody//如果不标注 前端ajax接收不到返回值
	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public Object toLogin(@RequestBody UserDto dtoTest) { // @RequestBody 将前端的值转为json对象接收
		System.out.println(dtoTest.getIds()+"---"+dtoTest.getNames());
		UserDto rs=new UserDto();
		rs.setIds(5);
		return rs;
	}
}
