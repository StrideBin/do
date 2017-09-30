package com.lb.web.utils;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Iterator;
import java.util.Vector;

import org.junit.Test;

import com.jcraft.jsch.Channel;
import com.jcraft.jsch.ChannelExec;
import com.jcraft.jsch.ChannelSftp;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.JSchException;
import com.jcraft.jsch.Session;
import com.lb.web.common.AppConfig;

/**
 * @date 2017/09/28
 * @author liubin
 * @Description:远程服务器连接
 */

public class ShellUtils {
	private static JSch jsch;
	private static Session session;
	private static ChannelSftp channel = null;
	private static final String original_dirname="/od_prod_ftp/uploadback/od_prod_ftp/tp/test/";
	private static final String target_dirname="/od_prod_ftp/uploadback/od_prod_ftp/tp/test1/";
	/**
	 * 连接到指定的IP
	 * 
	 * @throws JSchException
	 */
	public static void connect(String user, String passwd, String host) throws JSchException {
		jsch = new JSch();
		session = jsch.getSession(user, host, 22);
		session.setPassword(passwd);

		java.util.Properties config = new java.util.Properties();
		config.put("StrictHostKeyChecking", "no");
		session.setConfig(config);

		session.connect();
	}

	/**
	 * 执行相关的命令
	 * 
	 * @throws JSchException
	 */
	public static void execCmd(String command, String user, String passwd, String host) throws JSchException {
		connect(user, passwd, host);

		BufferedReader reader = null;
		Channel channel = null;

		try {
			if(command != null) {
				channel = session.openChannel("exec");
				((ChannelExec) channel).setCommand(command);

				channel.setInputStream(null);
				((ChannelExec) channel).setErrStream(System.err);

				channel.connect();
				InputStream in = channel.getInputStream();
				reader = new BufferedReader(new InputStreamReader(in));
				String buf = null;
				buf = reader.readLine();
				System.out.println(buf);
				
			}
		} catch (IOException e) {
			e.printStackTrace();
		} catch (JSchException e) {
			e.printStackTrace();
		} finally {
			try {
				reader.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
			channel.disconnect();
			session.disconnect();
		}
	}

	/**
	 * 把original_dirname路径下的txt文件 含有hello的挪到target_dirname
	 */
	@Test
	@SuppressWarnings("unchecked")
	public void moveFiles(){
		ShellUtils util=new ShellUtils();
		try {
			
			long startTime=System.currentTimeMillis();   //获取开始时间  
	    	connect(AppConfig.OD_31_USR,AppConfig.OD_31_PWD,AppConfig.OD_31_ADDRESS);
	        String fname=null;
	        try {
	                channel =(ChannelSftp)session.openChannel("sftp");
	                channel.connect();
	                channel.cd(original_dirname);
	                Vector<ChannelSftp.LsEntry> v=channel.ls(original_dirname);
	                Iterator<ChannelSftp.LsEntry> is=v.iterator();
	                while(is.hasNext()){
						fname=is.next().getFilename();
						if(!fname.endsWith(".txt")){
							continue;
						}	
						util.choose(channel,fname);
	            }   
	        } catch (Exception e) {
				e.printStackTrace();
			} finally {
	            channel.disconnect();
	            session.disconnect();
	        }
			long endTime=System.currentTimeMillis(); //获取结束时间  
			System.out.println("程序运行时间： "+(endTime-startTime)+"ms");  
		} catch (JSchException e) {
			e.printStackTrace();
		}
		
		
	}
	/**
	 * 过滤并执行重命名 (move)
	 * @param cs
	 * @param fname
	 */
	public  void choose(ChannelSftp cs,String fname){
		String line=null;
		InputStream in=null;
		BufferedReader br=null;
		try {
			in=cs.get(fname);
			br=new BufferedReader(new InputStreamReader(in));
			while((line=br.readLine())!=null) {
				if(line.contains("hello")){
					br.close();
					cs.rename(fname, target_dirname+fname);
					break;
				}
			 }

		}catch (Exception e) {
			e.printStackTrace();
		} 
	}
	
}
