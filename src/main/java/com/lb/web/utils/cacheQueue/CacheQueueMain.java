package com.lb.web.utils.cacheQueue;

public class CacheQueueMain {
	public static void main(String[] args) {
		CacheQueueThreadExecutor cacheQueueThreadExecutor;
		AbstractPutQueueStrategy putQueueStrategy =new DefaultPutQueueConcreteStrategy();
		QueueMessageHandler handler=new QueueMessageHandler() {
			@Override
			public void handle(Object message) {
				//System.out.println(message);
			}
		};
		
		cacheQueueThreadExecutor=new CacheQueueThreadExecutor(10, 10000000, handler, putQueueStrategy);
		
		//消息进入时会触发handle
		Long start = System.currentTimeMillis();
		for (int i = 0; i < 30000000; i++) {
			cacheQueueThreadExecutor.putObject2Queue(i);
		}
		Long end = System.currentTimeMillis();
		System.out.println("time is :"+(end-start));
		
	}
}
