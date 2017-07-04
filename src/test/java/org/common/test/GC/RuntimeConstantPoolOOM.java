package org.common.test.GC;

import java.util.ArrayList;
import java.util.List;

/**
 * VM Args：-XX:PermSize=2M 非堆区初始内存 -XX:MaxPermSize=2M 非堆区分配的内存的最大上限
 * 
 * @author lb (it_liubin@163.com) 时间:2017年7月4日 上午9:50:24
 * PermGen 方法区/永久代 
 */
public class RuntimeConstantPoolOOM {
	public static void main(String[] args) {
		
		// 使用List保持着常量池引用，避免Full GC回收常量池行为
		List<String> list = new ArrayList<String>();
		int i = 0;
		while (true) {
			list.add(String.valueOf(i++).intern());
		}
	}
	
	// 运行时常量池溢出，在OutOfMemoryError后面跟随的提示信息
	// 是“PermGen space”，说明运行时常量池属于方法区（HotSpot虚拟机中的永久代）的一部分。
}
