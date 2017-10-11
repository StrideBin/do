package com.lb.web.utils.cacheQueue;

import java.util.concurrent.BlockingQueue;
@SuppressWarnings("rawtypes")
public abstract class AbstractPutQueueStrategy {

	 
   /**
   
     * 希望有不同策略实现的算法 ，将消息放在哪个队列中
    
    * @param queueArray 消息对象数组
    * @param message 消息
    */
	public abstract void algorithm(BlockingQueue[] queueArray, Object message); 
    

}
