package org.common.test;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;

/**
 * 创建人: lb 日期: 2017年3月28日
 */
public class FileTest {
	@SuppressWarnings("resource")
	public static void main(String[] args) {
		File file = new File("D:/Test.txt");
		try {
			file.createNewFile();
		} catch (IOException e) {
			e.printStackTrace();
		}
		String str = "测试";
		byte bt[] = new byte[1024];
		bt = str.getBytes();
		try {
			FileOutputStream in = new FileOutputStream(file);
			try {
				in.write(bt, 0, bt.length);
				in.close();
				System.out.println("写入文件成功");
			} catch (IOException e) {
				e.printStackTrace();
			}
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
		try {
			FileInputStream out = new FileInputStream(file);
			InputStreamReader isr = new InputStreamReader(out);
			int ch = 0;
			while ((ch = isr.read()) != -1) {
				System.out.print((char) ch);
			}
		} catch (Exception e) {
		}
	}
}
