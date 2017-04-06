/**
 * 
 */
package com.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * 创建人: lb 日期:2017年4月6日 下午2:57:07
 */
@Controller
@RequestMapping("/hello")
public class ControllerTest {
	@RequestMapping(value = "/world", method = RequestMethod.GET)
	public String hello(Model model) {
		model.addAttribute("msg", "你好spring mvc");
		return "../index.jsp";
	}
}
