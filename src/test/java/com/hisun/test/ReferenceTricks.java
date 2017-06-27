package com.hisun.test;

public class ReferenceTricks {
	public static void main(String[] args) {
		ReferenceTricks r = new ReferenceTricks();

		// reset integer
		System.out.println("Before changeReference:" + r.i);
		changeReference(r);
		System.out.println("After changeReference:" + r.i);
		System.out.println("After changeReference:" + r.j);
	}

	private static void changeReference(ReferenceTricks r) {
		r.i = 5;
		r = new ReferenceTricks();
		r.j = 5;
		System.out.println("In changeReference: " + r.i);
		System.out.println("In changeReference: " + r.j);
	}


	public int i;
	public int j;
}
