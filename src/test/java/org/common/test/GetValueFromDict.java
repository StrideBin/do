package org.common.test;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.InputStreamReader;
import jxl.Sheet;
import jxl.Workbook;

public class GetValueFromDict {

	public static void main(String[] args) {
		/** 1、根据数据库字段英语简称-查找中文 */
		transferKeyToValue("key_type");

		/** 2、根据java字段英语简称-查找中文 */
		// transferKeyToValue("keyType");
	}

	public static void transferKeyToValue(String keyType) {
		try {
			/* 1.读入TXT文件 */
			String pathname = GetValueFromDict.class.getClassLoader().getResource("keys.txt").getPath();
			File filename = new File(pathname);
			InputStreamReader reader = new InputStreamReader(new FileInputStream(filename)); // 建立一个输入流对象reader
			BufferedReader br = new BufferedReader(reader); // 建立一个对象，它把文件内容转成计算机能读懂的语言

			/* 2.写入TXT文件 */
			File writename = new File(GetValueFromDict.class.getClassLoader().getResource("values.txt").getPath()); // 相对路径，如果没有则要建立一个新的output文件
			writename.createNewFile(); // 创建新文件
			BufferedWriter out = new BufferedWriter(new FileWriter(writename));

			String line = "";
			while ((line = br.readLine()) != null) { // 一次读入一行数据
				String value = getValueFromDictByKey(line, keyType);// 获得中文名称
				System.out.println(value);
				out.write(value + "\r\n"); // 一次读一行 \r\n即为换行
			}
			out.flush(); // 把缓存区内容压入文件
			out.close();
			br.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static String getValueFromDictByKey(String queryKey, String keyType) {
		String result = null;
		try {
			String filepath = GetValueFromDict.class.getClassLoader().getResource("paymentDict.xlsx").getPath();
			Workbook readwb = Workbook.getWorkbook(new FileInputStream(filepath));
			Sheet sheet = readwb.getSheet(0);
			int row = sheet.getRows();
			int keyColumn = 1;
			if ("key_type".equals(keyType)) {
				keyColumn = 1;
			} else {
				keyColumn = 2;
			}
			for (int i = 1; i < row; i++) {
				String key = sheet.getCell(keyColumn, i).getContents();// 根据英文简称得到中文
				if (null != key && key.equalsIgnoreCase(queryKey.replace(" ", ""))) {
					result = sheet.getCell(0, i).getContents();
					return result;
				}
			}

		} catch (Exception e) {
			System.out.println(e);
		}
		return result;
	}
}
