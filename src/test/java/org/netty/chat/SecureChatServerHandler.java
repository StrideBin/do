/*
 * Copyright 2012 The Netty Project
 *
 * The Netty Project licenses this file to you under the Apache License,
 * version 2.0 (the "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at:
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */
package org.netty.chat;

import io.netty.channel.Channel;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.SimpleChannelInboundHandler;
import io.netty.channel.group.ChannelGroup;
import io.netty.channel.group.DefaultChannelGroup;
import io.netty.handler.ssl.SslHandler;
import io.netty.util.concurrent.Future;
import io.netty.util.concurrent.GenericFutureListener;
import io.netty.util.concurrent.GlobalEventExecutor;

import java.net.InetAddress;

/**
 * Handles a server-side channel.
 */
public class SecureChatServerHandler extends SimpleChannelInboundHandler<String> {

    static final ChannelGroup channels = new DefaultChannelGroup(GlobalEventExecutor.INSTANCE);

    @Override
    public void channelActive(final ChannelHandlerContext ctx) {//客户端启动时调用该方法
    	
//    	System.out.println("channelactive!");
    	
        // Once session is secured, send a greeting and register the channel to the global channel
        // list so the channel received the messages from others.
    	//生成系统消息
        ctx.pipeline().get(SslHandler.class).handshakeFuture().addListener(
                new GenericFutureListener<Future<Channel>>() {
                    @Override
                    public void operationComplete(Future<Channel> future) throws Exception {
                        ctx.writeAndFlush(
                                "Welcome to " + InetAddress.getLocalHost().getHostName() + " secure chat service!\n");
                        ctx.writeAndFlush(
                                "Your session is protected by " +
                                        ctx.pipeline().get(SslHandler.class).engine().getSession().getCipherSuite() +
                                        " cipher suite.\n");

                        channels.add(ctx.channel());
                    }
        });
    }
    
    @Override
    public void channelRead0(ChannelHandlerContext ctx, String msg) throws Exception {//每次发送消息时 调用该方法
        // Send the received message to all channels but the current one.
    	boolean boo=false;
//    	System.out.println("channelread0!");
    	String [] strArr=null;
    	if(msg.startsWith("[")){//区分是系统生成的消息还是用户发送的消息
    		boo=true;
    		strArr=processMsg(msg);
    	}
        for (Channel c: channels) {		//对通道中的消息进行遍历
            if (c != ctx.channel()) {	//发送给其他用户
            	if(boo==true)			//有昵称的情况
            	c.writeAndFlush( msg + '\n');	
            	else c.writeAndFlush("[" + ctx.channel().remoteAddress() + "] " + msg + '\n');//没有昵称
            } else {					//发送给该用户
            	if(boo==true){			//有昵称的情况
            		c.writeAndFlush("[我] " + strArr[2] + '\n');
            	}else {					//没有昵称
            		c.writeAndFlush(msg + '\n');
				}
            }
        }
        
        // Close the connection if the client has sent 'bye'.
        if ("bye".equals(msg.toLowerCase())) {
            ctx.close();
        }
    }

    public String[] processMsg(String msg){
    	String [] strArr=msg.split("\\[|\\]");//返回由[、]分割的字符串，是解释协议的过程
    	
    	return strArr;
    }
    
    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) {
        cause.printStackTrace();
        ctx.close();
    }
}
