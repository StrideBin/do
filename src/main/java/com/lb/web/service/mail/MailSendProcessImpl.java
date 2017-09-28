package com.lb.web.service.mail;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;

import com.lb.web.common.AppConfig;
import com.lb.web.quartz.QuartzService;
import com.lb.web.utils.EmailUtils;

/**
 * 邮件发送服务实现
 * @author liubin
 * @date 2017/09/28
 */
@Service("mailSendProcess")
public class MailSendProcessImpl implements MailSendProcess {

	private Logger log = LogManager.getLogger(QuartzService.class);

	// public static Map<String, List<String>> mapErr =
	// Collections.synchronizedMap(new HashMap<String, List<String>>());

	private String RECEIVE_ADDRESS = AppConfig.RECEIVE_ADDRESS;

	@Override
	public void sendEmail() {
		log.info("SEND");
		StringBuffer sendMsg = new StringBuffer();
		sendMsg.append(
				"<html><head><title>邮件信息</title></head><body><table border='1px' cellspacing='0' cellpadding='0' >"
				+ "<p>test!!!</p></body></html>");
		try {
			EmailUtils.sendMail("sendEmail", sendMsg.toString(), RECEIVE_ADDRESS);
		} catch (Exception e) {
			for (StackTraceElement ele : e.getStackTrace()) {
				log.error(ele.toString());
			}
		}
	}

}
