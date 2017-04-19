# encoding:UTF-8
# import urllib
# import urllib.request
#
# data = {}
# data['word'] = 'Jecvay Notes'
#
# url_values = urllib.parse.urlencode(data)
# url = "http://www.baidu.com/s?"
# full_url = url + url_values
#
# data = urllib.request.urlopen(full_url).read()
# data = data.decode('UTF-8')
# print(data)


#----发送请求的同时用post发送表单数据
# import urllib
# import urllib.request
# url="http://baidu.com"
# values={"name":"Why",
#         "location":"SDU",
#         "language":"python"
#             }
# data=urllib.parse.urlencode(values).encode(encoding='utf_8', errors='strict')#编码工作
# req=urllib.request.Request(url,data)#发送请求同时传data表单
# response=urllib.request.urlopen(req)#接受反馈的信息
# the_page=response.read()#读取反馈的内容
# print(the_page)

#------get方式发送数据请求
# import urllib
# import urllib.request
# url="http://www.imooc.com/"
# data = {}
#
# data['name'] = 'WHY'
# data['location'] = 'SDU'
# data['language'] = 'Python'
# data1=urllib.parse.urlencode(data)
# print(data1)
# full_url=url+"?"+data1
# print(full_url)
# response=urllib.request.urlopen(full_url)
# the_page=response.read()
# print(the_page)
#-----url error
# import urllib
# import urllib.request
# from _testcapi import exception_print
# req=urllib.request.Request("http://www.baibai.com")
# print(req)
# try:urllib.request.urlopen(req)
# except urllib.error.URLError as e:
#     print(e.reason)


#--------爬取百度贴吧的小demo
# import urllib.request as request
# import urllib.parse as parse
# import string
# def baidu_tieba(url, begin_page, end_page):
#     for i in range(begin_page, end_page + 1):
#         sName = 'd:/test/'+str(i).zfill(5)+'.html'
#         print('正在下载第'+str(i)+'个页面, 并保存为'+sName)
#         m = request.urlopen(url+str(i)).read()
#         with open(sName,'wb') as file:
#             file.write(m)
#         file.close()
# if __name__ == "__main__":
#     url = "http://tieba.baidu.com/p/"
#     begin_page = 1
#     end_page = 3
#     baidu_tieba(url, begin_page, end_page)




#---------------
# import re
# #将正则表达式编译成为Pattren对象，注意hello前面的r的意思是“原生字符串"
# pattern=re.compile(r'hello')
# #使用Pattren匹配文本，获得匹配结果，无法匹配时将返回none
# match1=pattern.match('hello world!')
# match2=pattern.match('helloo world!')
# match3=pattern.match("helllo world!")
#
# #如果match1匹配成功
# if match1:
#     print(match1.group())
# else:
#     print("match1匹配失败")
# if match2:
#     print(match2.group())
# else:
#      print("match2匹配失败")
# if match3:
#     print(match3.group())
# else:
#      print("match3匹配失败")



#--------------
# import re
# # 匹配如下内容：单词+空格+单词+任意字符
# m = re.match(r'(\w+) (\w+)(?P<sign>.*)', 'hello world!')
#
# print ("m.string:", m.string)
# print ("m.re:", m.re)
# print ("m.pos:", m.pos)
# print ("m.endpos:", m.endpos)
# print ("m.lastindex:", m.lastindex)
# print ("m.lastgroup:", m.lastgroup)
#
# print ("m.group():", m.group())
# print ("m.group(1,2):", m.group(1, 2))
# print ("m.groups():", m.groups())
# print ("m.groupdict():", m.groupdict())
# print ("m.start(2):", m.start(2))
# print ("m.end(2):", m.end(2))
# print ("m.span(2):", m.span(2))
# print (r"m.expand(r'\g<2> \g<1>\g<3>'):", m.expand(r'\2 \1\3'))

# -*- coding: utf-8 -*-------------------------------

import urllib.request
import urllib
import re
import time
import threading
import _thread



class Spider_Model:

    def __init__(self):
        self.page = 3
        self.pages = []
        self.enable = True
        self.end =10

    def GetPage(self,page):
        print("GetPage.....")
        myUrl = "http://m.qiushibaike.com/hot/page/" + page
        user_agent = 'Mozilla/4.0 (compatible; MSIE 5.5; Windows NT)'
        headers = { 'User-Agent' : user_agent }
        req = urllib.request.Request(myUrl, headers = headers)

        #req = urllib.request.Request(myUrl)
        myResponse = urllib.request.urlopen(req)
        myPage = myResponse.read()
        #encode的作用是将unicode编码转换成其他编码的字符串
        #decode的作用是将其他编码的字符串转换成unicode编码
        unicodePage = myPage.decode("utf-8")
        # 找出所有class="content"的div标记
        #re.S是任意匹配模式，也就是.可以匹配换行符
        #myItems = re.findall('<.*?',unicodePage,re.S)
        myItems = re.findall('<div.*?class="content">.*?<span>(.*?)</span>.*?</div>',unicodePage,re.S)
        #file_object = open('d:/text.txt', 'w')
        #file_object.write(item)
        #file_object.write(unicodePage)
        #file_object.close()
        # print(item.replace("<br>","").replace("</br>",""))
        items = []
        for item in myItems:
            items.append(item.replace("<br>","").replace("<br/>","")+"\n")
        return items

    # 用于加载新的页面
    def LoadPage(self):
        print("loadPage.....")
        while self.enable:
                try:
                    # 获取新的页面中的内容
                    myPage = self.GetPage(str(self.page))
                    self.page += 1
                    self.pages.append(myPage)
                except:
                    print( '无法链接！' )

    def ShowPage(self,nowPage,page,file_object):
        for items in nowPage:
            print( u'第%d页' % page , items)
            file_object.write(items)
            if page==self.end:
                self.enable=False
                break

    def Start(self):
        self.enable = True
        page = self.page
        print (u'正在加载中请稍候......')
        # 新建一个线程在后台加载内容并存储
        _thread.start_new_thread(self.LoadPage,())
        file_object = open('d:/text.txt', 'a+', encoding='utf-8')
        while self.enable:
            # 如果self的page数组中存有元素
            if self.pages:
                nowPage = self.pages[0]
                del self.pages[0]
                self.ShowPage(nowPage,page,file_object)
                page += 1
        file_object.close()

#----------- 程序的入口处 -----------

#print (u'请按下回车浏览今日的内容：')
#input(' ')
myModel = Spider_Model()
myModel.Start()



''''' 
Created on Dec 18, 2012 
写入文件 ---------------------------
@author: liury_lab 
'''
# 最简单的方法
#all_the_text = 'hello python2'
# open('d:/text.txt', 'w').write(all_the_text)
# all_the_data = b'abcd1234'
# open('d:/data.txt', 'wb').write(all_the_data)
# # 更好的办法
# file_object = open('d:/text.txt', 'w')
# file_object.write(all_the_text)
# file_object.close()
# # 分段写入
# list_of_text_strings = ['hello', 'python', 'hello', 'world']
# file_object = open('d:/text.txt', 'w')
# for string in list_of_text_strings:
#   file_object.writelines(string)
# list_of_text_strings = ['hello', 'python', 'hello', 'world']
# file_object = open('d:/text.txt', 'w')
# file_object.writelines(list_of_text_strings)

# import re
# unicodePage="<div class='content'><span>123</span></div>"
# myItems = re.findall("<div.*?class='content'><span>(.*?)</span></div>", unicodePage, re.S)
# print(myItems[0])