package org.common.test;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.InputStreamReader;
/**
 * key_one --> keyOne
 * keyOne  --> key_one
 * @author lb (it_liubin@163.com)
 * 时间:2017年6月12日 下午3:20:53
 */
public class Transfer_toEmp {
	
		public static void main(String[] args) {
	/*		String src = "tftPay";
			String target = getField(src);
			System.out.println(target);*/
			//transferKeyToValue();
			
			String src = "ab_defs_d";
			String rs=_trans(src);
			System.out.println(rs);
		}

		public static void transferKeyToValue() {
			try {
				/* 1.读入TXT文件 */
				String pathname = "keys.txt";
				File filename = new File(pathname);
				InputStreamReader reader = new InputStreamReader(new FileInputStream(filename)); // 建立一个输入流对象reader
				BufferedReader br = new BufferedReader(reader); // 建立一个对象，它把文件内容转成计算机能读懂的语言

				/* 2.写入TXT文件 */
				File writename = new File("values.txt"); // 相对路径，如果没有则要建立一个新的output文件
				writename.createNewFile(); // 创建新文件
				BufferedWriter out = new BufferedWriter(new FileWriter(writename));

				String line = "";
				while ((line = br.readLine()) != null) { // 一次读入一行数据

					String value = trans_(line);
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
		/**
		 * keyOne  --> key_one
		 * @param src
		 * @return
		 */
		public static String trans_(String src) {
			// A-Z：65-90
			String target = "";
			int[] b = new int[src.length()];
			for (int i = 0; i < src.length(); i++) {
				char c = src.charAt(i);
				b[i] = c;
				if (b[i] <= 90 && b[i] >= 65) {
					target += "_";
				}
				target += c;
			}
			target = target.toLowerCase();
			return target;

		}
		/**
		 * key_one  --> keyOne
		 * 1.记录原字符串_位置
		 * 2.将_+1位置的字符大写
		 * @param src
		 * @return
		 */
		public static String _trans(String src) {
			// A-Z：65-90
			String rs="";
			int[] n=new int[src.length()];
			int begin=0;//从此之后递归查_位置
			int j=0;
			//n[0]=-2;
			//1
			for (int i = 0; i < src.length(); i++) {
				j=src.indexOf("_",begin);
				if(j<0)break;
				n[i]=j;
				begin=j+1;
				System.out.println(n[i]);
			}
			//2
/*			for (int i = 1; i < n.length; i++) {
				if(n[i]==0) break;
				System.out.println(src.substring(n[i-1]+2, n[i]));
				System.out.println(src.substring(n[i]+1,n[i]+2).toUpperCase());
				rs+=src.substring(n[i-1]+2, n[i])+src.substring(n[i]+1,n[i]+2).toUpperCase();

			}
			*/
			src=src.replaceAll("_","");
			for (int i = 0; i < n.length; i++) {
				for (int k = 0; k < n.length; k++) {
					if(i!=n[k]){
						rs+=src.charAt(i);
						}else{
						rs+=String.valueOf(src.charAt(i)).toUpperCase();
				}
					if(src.length()==rs.length())return rs;
				}

				
			}
			return rs;

		}

	}

