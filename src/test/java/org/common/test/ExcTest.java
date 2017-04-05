/**
 * 
 */
package org.common.test;

/**
 * 创建人: lb 日期:2017年3月30日 下午4:48:04
 */
public class ExcTest {
	public static void main(String[] args) {

		try {
			System.out.println(1 / 0);
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		System.out.println(1);
	}
}
