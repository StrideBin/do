package org.common.test.GC;

import java.lang.ref.SoftReference;
import java.util.ArrayList;
import java.util.List;

/**
 * 测试内存溢出的情况
 * -verbose:gc -Xms20M 堆区内存初始内存
 *  		   -Xmx20M 堆区内存可被分配的最大上限
 *             -Xmn10M
   -XX:SurvivorRatio=8
   -XX:+HeapDumpOnOutOfMemoryError
 */
public class OutOfMemoryGC {
	
	static class OOMOBject {
	}
	public static void main(String[] args) {
		List<OOMOBject> list = new ArrayList<OOMOBject>();
		while (true) {
			list.add(new OOMOBject());
		}
	}
}
