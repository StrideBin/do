package com.lb.web.utils.cacheQueue;

import java.util.concurrent.BlockingQueue;

import org.apache.log4j.Logger;

/**
 * 根据队列的空闲状态，均衡放决定放在哪个队列里
 * 
 * @author liubin
 * 
 */
public class BalancedPutQueueConcreteStrategy extends AbstractPutQueueStrategy {
	private static Logger logger = Logger.getLogger(BalancedPutQueueConcreteStrategy.class);

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public void algorithm(BlockingQueue[] queueArray, Object message) {
		// 当前队列数为空
		if (queueArray == null || queueArray.length == 0) {
			return;
		}
		// 消息为空
		if (message == null) {
			return;
		}
		try {
			int minQueueId = 0;
			int minQueueSize = queueArray[0].size();
			// 循环查找出当前存放消息最少的队列
			for (int i = 1; i < queueArray.length; i++) {
				if (queueArray[i].size() < minQueueSize) {
					minQueueSize = queueArray[i].size();
					minQueueId = i;
				}
			}
			// 把消息放入
			queueArray[minQueueId].put(message);
		} catch (InterruptedException e) {
			logger.error("PUT MSG ERROR");
			for (StackTraceElement ele : e.getStackTrace()) {
				logger.error(ele.toString());
			}
		}
	}

}
