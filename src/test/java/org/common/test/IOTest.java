/**
 * 
 */
package org.common.test;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;

/**
 * 创建人: lb 日期:2017年3月30日 下午3:50:21
 */
public class IOTest {

	@SuppressWarnings("resource")
	public static void main(String[] args) throws FileNotFoundException {
		String t = "test";
		final FileOutputStream file = new FileOutputStream("D:\\test.txt");
		OutputStream output = new OutputStream() {
			@Override
			public void write(int paramInt) throws IOException {
				System.out.println((char) paramInt);// ASCII码转字节
				file.write(paramInt);// 分多次写入
			}
		};
		try {
			output.write(t.getBytes());// ASCII码一个一个读 多次调用write
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
