package com.lb.web.utils.cacheQueue;

/**
 * 队列消息处理接口
 * 
 * @author liubin
 *
 */
public interface QueueMessageHandler {
	/**
	 * 消息处理 
	 * @param message
	 */
	void handle(Object message);
}
