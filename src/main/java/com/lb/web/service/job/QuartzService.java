package com.lb.web.service.job;

import org.springframework.stereotype.Component;


/**
 * @author liubin (it_Liubin@ceair.com)
 * @date 2017年9月26日
 */
@Component("quartzService")
public class QuartzService {
	
	
	/**
	 * 定时发送电子邮件
	 */
	public void sendEmail() {
		System.out.println("test");
	}

	
	
}