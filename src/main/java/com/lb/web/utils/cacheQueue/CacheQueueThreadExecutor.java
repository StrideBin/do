package com.lb.web.utils.cacheQueue;

import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.atomic.AtomicLong;

import org.apache.log4j.Logger;



/**
 * 带有缓冲的多线程消息处理
 * 
 * @author liubin
 * 
 */
@SuppressWarnings({"rawtypes"}) 
public class CacheQueueThreadExecutor {
	private static Logger logger = Logger.getLogger(CacheQueueThreadExecutor.class);
	
	private Integer queueCapacity; // 队列容量

	private Integer threadNum; // 默认一个队列，用一个线程处理
	
	public AtomicLong receivedNum=new AtomicLong(0);  //接收的消息个数

	public boolean isBlock = false;

	private QueueMessageHandler queueMessageHandler;

	private BlockingQueue[] queueArray;

	private QueueHandleThread[] threadArray;

	private ExecutorService executor;
	
    private AbstractPutQueueStrategy putQueueStrategy =new DefaultPutQueueConcreteStrategy();


	public CacheQueueThreadExecutor(Integer threadNum, Integer queueCapacity, QueueMessageHandler queueMessageHandler) {
		this(threadNum,queueCapacity,queueMessageHandler,new DefaultPutQueueConcreteStrategy());
	}

	public CacheQueueThreadExecutor(Integer threadNum, Integer queueCapacity, QueueMessageHandler queueMessageHandler,
			AbstractPutQueueStrategy putQueueStrategy) {
		super();
		this.threadNum = threadNum;
		this.queueCapacity = queueCapacity;
		this.queueMessageHandler = queueMessageHandler;
		this.putQueueStrategy = putQueueStrategy;
		
		init();
	}

	public void init() {
		queueArray = new BlockingQueue[threadNum];
		threadArray = new QueueHandleThread[threadNum];
		executor = Executors.newFixedThreadPool(threadNum);
		for (int i = 0; i < threadNum; i++) { // 初始化 
			queueArray[i] = new ArrayBlockingQueue(queueCapacity);
			threadArray[i] = new QueueHandleThread(queueArray[i], queueMessageHandler);
			executor.submit(threadArray[i]);
		}

	}

	public void destory(){
        executor.shutdown();
        queueArray=new ArrayBlockingQueue[0];
        threadArray = new QueueHandleThread[0];
    }
	

	public void setPutQueueStrategy(AbstractPutQueueStrategy putQueueStrategy) {
		this.putQueueStrategy = putQueueStrategy;
	}

	public void putObject2Queue(Object message ){
		receivedNum.getAndIncrement();
		try {
			putQueueStrategy.algorithm(queueArray, message);;
		} catch (Exception e) {
		 logger.error("put message error!",e);
		}
	}
	
}
