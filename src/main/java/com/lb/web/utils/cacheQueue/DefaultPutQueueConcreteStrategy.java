package com.lb.web.utils.cacheQueue;

import java.util.concurrent.BlockingQueue;

import org.apache.log4j.Logger;

/**
 * 根据hashcode来决定放在哪个队列里
 * 
 * @author liubin
 * 
 */
public class DefaultPutQueueConcreteStrategy extends AbstractPutQueueStrategy {
	private static Logger logger = Logger.getLogger(DefaultPutQueueConcreteStrategy.class);

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public void algorithm(BlockingQueue[] queueArray, Object message) {
		if(queueArray==null || queueArray.length==0){
			return ;
		}
		if(message==null){
			return;
		}
		try {
			int id = Math.abs(message.hashCode()) % queueArray.length;
			
			queueArray[id].put(message);
		} catch (InterruptedException e) {
			logger.error("put mesage error! ", e);
		}
	}

}
