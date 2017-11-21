package com.lb.web.service.file;

import com.jcraft.jsch.JSchException;

/**
 * 在固定时间间隔调用一次downloadSftpFile(可以配合定时任务使用 )
 * 可以把文件新增的内容按自定的传输速率下载下来
 * 并把新增的内容增加到文件末尾
 */
public class FileDownload {
	
	public static String file1 = "pros-Tomcat-dc1odprdev11.log"; //需要下载的文件的文件名
	public static String path5r=""; 
	public static String pathdst5r = "E:\\app";
	public static String url5=""; 
	public static String username5="";
	public static String password5="";
	public static int port = 22;
		
	
	public static void main(String[] args) throws JSchException, Exception{
			//index为下载总量的大小,存入项目缓存,如需使用需要保证该线程不中断
			//模拟定时任务 每10秒进行一次下载操作
			while(true){
				Sftp.downloadSftpFile(url5, username5, password5, port, path5r, pathdst5r, file1);
				Thread.sleep(10000);
			}
	}
}
