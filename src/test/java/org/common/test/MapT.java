package org.common.test;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class MapT {
	public static void main(String[] args) {
		Map<String, List<String>> m=new HashMap<String,List<String>>();
		m.put("a",new ArrayList<String>());
		m.get("a").add("a1");
		m.get("a").add("a2");
		m.put("b",new ArrayList<String>());
		m.get("b").add("b1");
		m.get("b").add("b2");
		System.out.println();
		Set<String> keySet=m.keySet();
		for (String key : keySet) {
			System.out.println(key+m.get(key));
			for (int i = 0; i < m.get(key).size(); i++) {
				System.out.println(m.get(key).get(i));
			}
		}
		
	}
}
