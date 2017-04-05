package org.common.test;

import java.util.concurrent.BlockingQueue;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.LinkedBlockingQueue;

/**
 * 创建人: lb 日期:2017年3月30日 下午5:41:57 多线程模拟实现生产者／消费者模型
 */
public class BlockingQueueTest {
	
	public class Basket {
		BlockingQueue<String> basket = new LinkedBlockingQueue<String>(3);

		public void produce() throws InterruptedException {
			basket.put("one");
		}

		public String consume() throws InterruptedException {
			return basket.take();
		}
	}

	class Producer implements Runnable {
		private String instance;
		private Basket basket;

		public Producer(String instance, Basket basket) {
			this.instance = instance;
			this.basket = basket;
		}

		public void run() {
			try {
				while (true) {
					System.out.println("生产者准备生产苹果：" + instance);
					basket.produce();
					System.out.println("!生产者生产苹果完毕：" + instance);
					Thread.sleep(300);
				}
			} catch (InterruptedException ex) {
				System.out.println("Producer Interrupted");
			}
		}
	}

	class Consumer implements Runnable {
		@SuppressWarnings("unused")
		private String instance;
		private Basket basket;

		public Consumer(String instance, Basket basket) {
			this.instance = instance;
			this.basket = basket;
		}

		public void run() {
			try {
				while (true) {
					System.out.println(basket.consume());
					Thread.sleep(1000);
				}
			} catch (InterruptedException ex) {
				System.out.println("Consumer Interrupted");
			}
		}
	}

	public static void main(String[] args) throws InterruptedException {
		BlockingQueueTest test = new BlockingQueueTest();

		// 建立一个装苹果的篮子
		Basket basket = test.new Basket();

		ExecutorService service = Executors.newCachedThreadPool();
		Producer producer = test.new Producer("生产者001", basket);
		Producer producer2 = test.new Producer("生产者002", basket);
		Consumer consumer = test.new Consumer("消费者001", basket);
		service.submit(producer);
		service.submit(producer2);
		service.submit(consumer);
		
		
		// 程序运行5s后，所有任务停止
		// try {
		// Thread.sleep(1000 * 5);
		// } catch (InterruptedException e) {
		// e.printStackTrace();
		// }
		// service.shutdownNow();
	}

}