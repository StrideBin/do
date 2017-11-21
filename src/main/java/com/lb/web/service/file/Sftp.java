package com.lb.web.service.file;

import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Properties;

import com.jcraft.jsch.Channel;
import com.jcraft.jsch.ChannelSftp;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.JSchException;
import com.jcraft.jsch.Session;
import com.jcraft.jsch.SftpException;

public class Sftp {
	private static long index=0;
	public static Session getSession(String host,String user,String psw,int port){
	    Session session =null;
	    try {
	        JSch jsch=new JSch();
	        session = jsch.getSession(user, host, port);
	        Properties config = new Properties();
	        config.put("StrictHostKeyChecking", "no");
	        session.setConfig(config);
	        session.setPassword(psw);
	        session.connect();
	        System.out.println("Session connected. session has connected");
	    } catch (JSchException e) {
	        e.printStackTrace();
	    }finally{
	    }
	    return session;
	}
	
	public static void downloadSftpFile(String ftpHost, String ftpUserName,  
            String ftpPassword, int ftpPort, String ftpPath, String localPath, String file1) throws JSchException, Exception {  
        Session session = null;  
        Channel channel = null;  
        JSch jsch = new JSch();  
        session = jsch.getSession(ftpUserName, ftpHost, ftpPort);  
        session.setPassword(ftpPassword);  
        session.setTimeout(100000);  
        Properties config = new Properties();  
        config.put("StrictHostKeyChecking", "no");  
        session.setConfig(config);  
        session.connect();  
        channel = session.openChannel("sftp");  
        channel.connect();  
        ChannelSftp chSftp = (ChannelSftp) channel;  
              
        OutputStream  out=  new FileOutputStream(localPath+"/"+file1, true);     
        
        try {
        	InputStream is =chSftp.get(ftpPath+"/"+file1,new ProgressMonitor(),index);
        	 byte[] buff = new byte[1024 * 2];//按指定速率下载
             int read;
             if (is != null) {
                 System.out.println("Start to read input stream");
                // is.skip(30000);
                 do {
                     read = is.read(buff, 0, buff.length);
                     if (read > 0) {
                         out.write(buff, 00, read);
                     }
                     out.flush();
                 } while (read >= 0);
                 System.out.println("input stream read done.");
                 index=ProgressMonitor.transfered;
             }

        } catch (Exception e) {  
            e.printStackTrace();  
            	try {
					chSftp.get(ftpPath+"/"+file1, localPath);
				} catch (SftpException e1) {
					e1.printStackTrace();
				}
        } finally {  
            chSftp.quit();  
            channel.disconnect();  
            session.disconnect();
            out.close();
        }  
    } 
}
