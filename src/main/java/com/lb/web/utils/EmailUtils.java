package com.lb.web.utils;

import java.io.File;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Properties;
import java.util.ResourceBundle;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.Address;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

import org.apache.commons.lang.BooleanUtils;
import org.apache.commons.lang.math.NumberUtils;

/**
 * 邮件发送工具
 */
public class EmailUtils {

	public static boolean sendMail(String subject, String content,String addresses)
			throws AddressException, MessagingException {
		Map<String, String> fileMap = new HashMap<String, String>();
		ResourceBundle rb = ResourceBundle.getBundle("mail",
				Locale.getDefault());
		Boolean isAutheticate = BooleanUtils.toBooleanObject(rb
				.getString("mail.smtp.auth"));
		String protocol = rb.getString("mail.transport.protocol");
		String host = rb.getString("mail.smtp.host");
		Integer port = NumberUtils.toInt(rb.getString("mail.smtp.port"), 25);
		String user = rb.getString("mail.host.user");
		String password = rb.getString("mail.host.user.password");
		String from = rb.getString("mail.host.user.from");
		//String recipient = rb.getString("mailReceiverAddress");
		return sendMail(isAutheticate, protocol, host, port, user, password,
				from, subject, content, fileMap, addresses);
	}

	/**
	 * @param isAutheticate
	 *            邮件务器是否验证用户
	 * @param protocol
	 *            协认
	 * @param host
	 *            邮件务器地址
	 * @param port
	 *            端口
	 * @param user
	 *            用户
	 * @param password
	 *            密码
	 * @param from
	 *            邮件发送地址
	 * @param recipient
	 *            邮件接收地址
	 * @param subject
	 *            标题
	 * @param content
	 *            内容
	 * @param filePathMap
	 *            附件，它是一个“文件名=全路径地址”的映射
	 * @return
	 * @throws AddressException
	 * @throws MessagingException
	 */
	public static boolean sendMail(Boolean isAutheticate, String protocol,
			String host, Integer port, String user, String password,
			String from, String subject, String content,
			Map<String, String> filePathMap, String recipient)
			throws AddressException, MessagingException {
		boolean bool = false;
		Properties p = new Properties();
		p.put("mail.smtp.auth", isAutheticate.toString());
		p.put("mail.transport.protocol", protocol);
		p.put("mail.smtp.host", host);
		p.put("mail.smtp.port", port);
		// 建立会话
		Session session = Session.getInstance(p);
		// 建立消息
		Message msg = new MimeMessage(session);
		// 设置发件人
		msg.setFrom(new InternetAddress(from));
		// 创建邮件的接收者地址，并设置到邮件消息中
		List<Address> addressList = new ArrayList<Address>();
		// 收件人
		String[] addressArr = recipient.split(";");
		for (String address : addressArr) {
			Address receiverAddress = new InternetAddress(address);
			addressList.add(receiverAddress);
		}
		Address[] addresses = new Address[addressList.size()];
		for (int i = 0; i < addressList.size(); i++) {
			addresses[i] = addressList.get(i);
		}
		msg.setRecipients(Message.RecipientType.TO, addresses);
		// 发送日期
		msg.setSentDate(new Date());
		// 主题
		msg.setSubject(subject);
		// 设置邮件内容，作为Multipart对象的一部分
		MimeBodyPart mbp = new MimeBodyPart();
		mbp.setText(content);
		Multipart mulp = new MimeMultipart();
		mulp.addBodyPart(mbp);
		// 文件件名
		String fileName = null;
		// 全路径
		String fileFullPath = null;
		DataSource source = null;
		if (filePathMap != null && filePathMap.size() > 0) {
			@SuppressWarnings("rawtypes")
			Iterator it = filePathMap.entrySet().iterator();
			while (it.hasNext()) {
				// 为每个附件做为Multipart对象的一部分
				mbp = new MimeBodyPart();
				@SuppressWarnings({ "unchecked", "rawtypes" })
				Map.Entry<String, String> entry = (Map.Entry) it.next();
				fileName = entry.getKey();
				fileFullPath = entry.getValue();
				if (fileName == null || fileName.equals("")
						|| fileFullPath == null || fileFullPath.equals("")) {
					continue;
				}
				File f = new File(fileFullPath);
				if (!f.exists()) {
					continue;
				}
				source = new FileDataSource(fileFullPath);
				mbp.setDataHandler(new DataHandler(source));
				mbp.setFileName(fileName);
				mulp.addBodyPart(mbp);
			}
		}
		// 设置信息内容，将Multipart 对象加入信息中
		msg.setContent(mulp);
		msg.setContent(content, "text/html;charset=gb2312");
		// 登陆邮件服务器进行用户验证
		Transport tran = session.getTransport(protocol);
		tran.connect(host, user, password);
		// 发送
		tran.sendMessage(msg, msg.getAllRecipients());
		bool = true;
		return bool;
	}
	
	
	/**
	 * @param args
	 * @throws MessagingException
	 * @throws AddressException
	 */
	public static void main(String[] args) throws AddressException,
			MessagingException {
		sendMail(
				"213",
				"<table border='1px' cellspacing='0' cellpadding='0' ><tr><td>错误出现的次数</td><td>错误具体类型</td></tr>","it_tanshijie@ceair.com");
	}
}
