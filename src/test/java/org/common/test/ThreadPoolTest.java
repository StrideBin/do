package org.common.test;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;

import org.apache.log4j.Logger;
import org.junit.Test;

/**
 * 创建人: lb 日期:2017年3月30日 上午11:27:44
 */
public class ThreadPoolTest {
	private static Logger log = Logger.getLogger(ThreadPoolTest.class); 
	/**
	 * newCachedThreadPool 创建一个可缓存线程池，如果线程池长度超过处理需要，可灵活回收空闲线程，若无可回收，则新建线程
	 * (如果能用一个线程处理就会一直使用同一个线程,如果不够,会自动增加线程)
	 */
	@Test
	public void newCachedThreadPool() {
		
		ExecutorService cachedThreadPool = Executors.newCachedThreadPool();
		final AtomicInteger ato = new AtomicInteger(0);
		for (int i = 0; i < 10; i++) {
			final int index = i;
			/*
			 * try { Thread.sleep(index * 1000); //如果让线程等待 则始终是同一线程执行任务 }
			 * catch(InterruptedException e) { e.printStackTrace(); }
			 */
			cachedThreadPool.execute(new Runnable() {
				@Override
				public void run() {
					ato.incrementAndGet();
					System.out.println("线程号:" + Thread.currentThread().getId() + "  index:" + index);// 子线程打印出结果																					// 如果主线程结束
																										// 则无法执行
				}
			});
		}
		log.info(ato);
		System.out.println(ato);// 在主线程关闭之前一共执行了几次子线程 (JVM)
	}

	/**
	 * newFixedThreadPool 创建一个定长线程池，可控制线程最大并发数，超出的线程会在队列中等待。 可以指定最大的并发线程数
	 */
	@Test
	public void newFixedThreadPool() {
		ExecutorService fixedThreadPool = Executors.newFixedThreadPool(3);
		for (int i = 0; i < 10; i++) {
			final int index = i;
			fixedThreadPool.execute(new Runnable() {
				@Override
				public void run() {
					System.out.println("线程号:" + Thread.currentThread().getId() + "  index:" + index);
				}
			});
		}
	}

	/**
	 * 创建一个定长线程池，支持定时及周期性任务执行。
	 */
	@Test
	public void newScheduledThreadPool() {
		ScheduledExecutorService scheduledThreadPool = Executors.newScheduledThreadPool(5);
		/*
		 * scheduledThreadPool.schedule(new Runnable() {
		 * 
		 * @Override public void run() { System.out.println("delay 3 seconds"
		 * );// 3s 以后执行 } }, 3, TimeUnit.SECONDS);
		 */
		scheduledThreadPool.scheduleAtFixedRate(new Runnable() {
			@Override
			public void run() {
				System.out.println("delay 1 seconds, and excute every 3 seconds");

				System.out.println("线程号:" + Thread.currentThread().getId());
			}
		}, 1, 3, TimeUnit.SECONDS);
		try {
			Thread.sleep(10000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 创建一个单线程化的线程池，它只会用唯一的工作线程来执行任务，保证所有任务按照指定顺序(FIFO, LIFO, 优先级)执行。 单线程 顺序执行
	 */
	@Test
	public void newSingleThreadExecutor() {
		ExecutorService singleThreadExecutor = Executors.newSingleThreadExecutor();
		for (int i = 0; i < 10; i++) {
			final int index = i;
			singleThreadExecutor.execute(new Runnable() {
				@Override
				public void run() {
					System.out.println("线程号:" + Thread.currentThread().getId() + "  index:" + index);
				}
			});
		}
	}
}
