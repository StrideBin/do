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

import io.netty.bootstrap.ServerBootstrap;
import io.netty.channel.EventLoopGroup;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.nio.NioServerSocketChannel;
//import io.netty.example.telnet.TelnetServer;
import io.netty.handler.logging.LogLevel;
import io.netty.handler.logging.LoggingHandler;
import io.netty.handler.ssl.SslContext;
import io.netty.handler.ssl.util.SelfSignedCertificate;

/**服务端
 * Simple SSL chat server modified from {@link TelnetServer}.
 */
public final class SecureChatServer {

    static final int PORT = Integer.parseInt(System.getProperty("port", "8992")); 
    public static void main(String[] args) throws Exception {
    	//SelfSignedCertificate是一个用于管理可信消息的工厂管理者
        SelfSignedCertificate ssc = new SelfSignedCertificate();
        	//工厂；授权和发给私钥
        SslContext sslCtx = SslContext.newServerContext(ssc.certificate(), ssc.privateKey());       
        EventLoopGroup bossGroup = new NioEventLoopGroup(1);
        EventLoopGroup workerGroup = new NioEventLoopGroup();
        try {
            ServerBootstrap b = new ServerBootstrap();//服务引导程序，服务器端快速启动程序
            b.group(bossGroup, workerGroup)
             .channel(NioServerSocketChannel.class)
             .handler(new LoggingHandler(LogLevel.INFO))
             .childHandler(new SecureChatServerInitializer(sslCtx));

            b.bind(PORT).sync().channel().closeFuture().sync();
            	//bind绑定端口，创建一个channnel
            	//sync监听future 直到future消息送达，返回future
            	//channel 当future和io消息产生联系时返回一个channel。
            	//closefuture 当以上的消息接受完毕后重新获取future
            	//以上相当于一个循环？？？？
            
        } finally {
            bossGroup.shutdownGracefully();
            workerGroup.shutdownGracefully();
        }
    }
}
