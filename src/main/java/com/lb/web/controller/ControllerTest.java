/**
 * 
 */
package com.lb.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.lb.web.service.impl.ServiceImplTest;

/**
 * 创建人: lb 日期:2017年4月6日 下午2:57:07
 */
@Controller
@RequestMapping("/hello")
public class ControllerTest {
	
	@Autowired
	private ServiceImplTest test;
	
	@RequestMapping(value = "/world", method = RequestMethod.GET)
	public String hello(Model model) {
		model.addAttribute("msg", test.Select().getName());
		return "../../index.jsp";
	}
}
