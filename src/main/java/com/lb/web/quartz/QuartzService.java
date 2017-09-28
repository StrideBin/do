package com.lb.web.quartz;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.lb.web.service.mail.MailSendProcess;


/**
 * @author liubin (it_liubin@163.com)
 * @date 2017年9月26日
 */
@Component("quartzService")
public class QuartzService {
	
	@Autowired
	private MailSendProcess mailSendProcess;
	/**
	 * 定时发送电子邮件
	 */
	public void sendEmail() {
		mailSendProcess.sendEmail();
	}

	
	
}