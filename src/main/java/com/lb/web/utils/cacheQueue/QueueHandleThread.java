package com.lb.web.utils.cacheQueue;

import java.util.concurrent.BlockingQueue;
import java.util.concurrent.atomic.AtomicLong;

import org.apache.log4j.Logger;
/**
 * 对其中消息进行处理线程
 * @author liubin
 *
 */
@SuppressWarnings("rawtypes")
public  class QueueHandleThread implements Runnable {
	private static Logger logger = Logger.getLogger(QueueHandleThread.class);
	
	private BlockingQueue blockingQueue;
	
	private QueueMessageHandler queueMessageHandler;
	
	private AtomicLong handledNum=new AtomicLong(0);  //已经处理个数
	
	public QueueHandleThread(BlockingQueue blockingQueue,QueueMessageHandler queueMessageHandler) {
		super();
		this.blockingQueue = blockingQueue;
		this.queueMessageHandler=queueMessageHandler;
	}

	@Override
	public void run() {
		Object objectMessage = null;
		 
		while(true){           //保持线程一直监听队列
			try {
				//阻塞等待，直到取到数据
				objectMessage = blockingQueue.take(); 
				logger.debug("receive message = " + objectMessage);
				//处理消息
				if(objectMessage!=null){
					queueMessageHandler.handle(objectMessage);
					handledNum.incrementAndGet();
				}
			} catch (InterruptedException e) {
				logger.error("响应中断线程退出！",e);
				 
			}
		}

	}
	/**
	 * 返回已经处理的消息数
	 * @return
	 */
	public Long getHandledNum(){
		return handledNum.get();
	}
}
