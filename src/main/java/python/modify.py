#!/usr/bin/env  python
#coding:utf-8
import  os
import commands
import sys
import  re
import fileinput
import user_conf
import socket, fcntl, struct


net='eth0'
#net='eno16777736'

class public:
      def __init__(self):
          pass

      def shell(self,cmd):
          status,result=commands.getstatusoutput(cmd)
          return [status,result]

      def get_local_ip(self,ifname=net):
          s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
          inet = fcntl.ioctl(s.fileno(), 0x8915, struct.pack('256s', ifname[:15]))
          ret = socket.inet_ntoa(inet[20:24])
          hostname = socket.gethostname()
          return [ret,hostname]

      def config_file(self,path,oldtext,newtext):
          for line in fileinput.input(path,inplace=1):
              print   re.sub(oldtext,newtext,line),
          fileinput.close()

      def __del__(self):
           pass



class mspayfront_cn(public):
      def __init__(self):
          public.__init__(self)

      def modify(self):
          IP=self.get_local_ip()[0]
          print ("The IP is : ", IP)
          conf_dict=user_conf.cn_info.get(IP)

          k=conf_dict.get('jdbc.driverClassName')
          l=conf_dict.get('jdbc.url')
          m=conf_dict.get('jdbc.username')
          n=conf_dict.get('jdbc.password') 
          o=conf_dict.get('serviceid.bat.file.notice.pay') 
          p=conf_dict.get('sceneid.bat.file.notice.pay')
          q=conf_dict.get('serviceid.bat.file.notice.cut') 
          r=conf_dict.get('sceneid.bat.file.notice.cut') 
          s=conf_dict.get('dmb.file.notice.target.dfa')
          t=conf_dict.get('dmb.file.notice.target.systemId') 

          self.config_file(user_conf.cn_config_file,r'jdbc.driverClassName.*','jdbc.driverClassName=%s' % k )
          self.config_file(user_conf.cn_config_file,r'jdbc.url.*','jdbc.url=%s' % l )
          self.config_file(user_conf.cn_config_file,r'jdbc.username.*','jdbc.username=%s' % m )
          self.config_file(user_conf.cn_config_file,r'jdbc.password.*','jdbc.password=%s' % n )
          self.config_file(user_conf.cn_config_file,r'serviceid.bat.file.notice.pay.*','serviceid.bat.file.notice.pay=%s' % o )
          self.config_file(user_conf.cn_config_file,r'sceneid.bat.file.notice.pay.*','sceneid.bat.file.notice.pay=%s' % p )
          self.config_file(user_conf.cn_config_file,r'serviceid.bat.file.notice.cut.*','serviceid.bat.file.notice.cut=%s' % q )
          self.config_file(user_conf.cn_config_file,r'sceneid.bat.file.notice.cut.*','sceneid.bat.file.notice.cut=%s' % r )
          self.config_file(user_conf.cn_config_file,r'dmb.file.notice.target.dfa.*','dmb.file.notice.target.dfa=%s' % s )
          self.config_file(user_conf.cn_config_file,r'dmb.file.notice.target.systemId.*','dmb.file.notice.target.systemId=%s' % t )

      def __del__(self): 
          print  'modify   mspayfront_cn           \033[32m[OK]\033[0m.'



class mspayfront_dmb(public):
      def __init__(self):
          public.__init__(self)

      def modify(self):
          IP=self.get_local_ip()[0]
          conf_dict=user_conf.dmb_info.get(IP)

          a=conf_dict.get('dmb_user')
          b=conf_dict.get('dmb_pwd')
          c=conf_dict.get('dmb_dfa')
          e=conf_dict.get('dmb_ip')
          f=conf_dict.get('systemId')
          g=conf_dict.get('dmb_port')

          self.config_file(user_conf.dmb_config_file,r'<user>.*','<user>%s</user>' % a )
          self.config_file(user_conf.dmb_config_file,r'<pwd>.*','<pwd>%s</pwd>' % b )
          self.config_file(user_conf.dmb_config_file,r'<dfa>.*','<dfa>%s</dfa>' % c )
          self.config_file(user_conf.dmb_config_file,r'<ip>.*','<ip>%s</ip>' % e )
          self.config_file(user_conf.dmb_config_file,r'<systemId>.*','<systemId>%s</systemId>' % f )
          self.config_file(user_conf.dmb_config_file,r'<port>.*','<port>%s</port>' % g )
   
      def __del__(self): 
          print  'modify   mspayfront_dmb           \033[32m[OK]\033[0m.'



class mspayfront_fts(public):
      def __init__(self):
          public.__init__(self)

      def modify(self):
          IP=self.get_local_ip()[0]
          conf_dict=user_conf.fts_info.get(IP)

          a=conf_dict.get('userName')
          b=conf_dict.get('password')
          c=conf_dict.get('host')
          d=conf_dict.get('port')

          self.config_file(user_conf.fts_config_file,r'userName=.*','userName=%s' % a )
          self.config_file(user_conf.fts_config_file,r'password=.*','password=%s' % b )
          self.config_file(user_conf.fts_config_file,r'host=.*','host=%s' % c )
          self.config_file(user_conf.fts_config_file,r'port=.*','port=%s' % d )
   
      def __del__(self): 
          print  'modify   mspayfront_fts           \033[32m[OK]\033[0m.'

class mspayfront_transcfg(public):
      def __init__(self):
          public.__init__(self)

      def modify(self):
          IP=self.get_local_ip()[0]
          conf_dict=user_conf.transcfg_info.get(IP)

          a=conf_dict.get('inner.getments.host.address')
          b=conf_dict.get('outer.getments.host.address')
          c=conf_dict.get('single.payments.host.address')

          self.config_file(user_conf.transcfg_config_file,r'inner.getments.host.address=.*','inner.getments.host.address=%s' % a )
          self.config_file(user_conf.transcfg_config_file,r'outer.getments.host.address=.*','outer.getments.host.address=%s' % b )
          self.config_file(user_conf.transcfg_config_file,r'single.payments.host.address=.*','single.payments.host.address=%s' % c )

      def __del__(self): 
          print  'modify   mspayfront_transcfg           \033[32m[OK]\033[0m.'

class mspayfront_ftp(public):
      def __init__(self):
          public.__init__(self)

      def modify(self):
          IP=self.get_local_ip()[0]
          conf_dict=user_conf.ftp_info.get(IP)

          a=conf_dict.get('ftp.host')
          b=conf_dict.get('ftp.port')
          c=conf_dict.get('ftp.user')
          d=conf_dict.get('ftp.password')
          e=conf_dict.get('ftp.encrytKey')
          f=conf_dict.get('innerBatchBackScanSeconds')
          g=conf_dict.get('outerBatchBackScanSeconds')
          h=conf_dict.get('sinpayCompareFileScanSeconds')
          i=conf_dict.get('innerSincutCompareFileScanSeconds')
          j=conf_dict.get('outerSincutCompareFileScanSeconds')
          k=conf_dict.get('date.directory.flag')
          l=conf_dict.get('inner.batchpay.ftp.root.path')
          m=conf_dict.get('inner.batchback.ftp.root.path')
          n=conf_dict.get('outer.batchpay.ftp.root.path')
          o=conf_dict.get('outer.batchback.ftp.root.path')
          p=conf_dict.get('inner.sincut.comparefile.ftp.root.path')
          q=conf_dict.get('outer.sincut.comparefile.ftp.root.path')
          r=conf_dict.get('sinpay.comparefile.ftp.root.path')


          self.config_file(user_conf.ftp_config_file,r'ftp.host=.*','ftp.host=%s' % a )
          self.config_file(user_conf.ftp_config_file,r'ftp.port=.*','ftp.port=%s' % b )
          self.config_file(user_conf.ftp_config_file,r'ftp.user=.*','ftp.user=%s' % c )
          self.config_file(user_conf.ftp_config_file,r'ftp.password=.*','ftp.password=%s' % d )
          self.config_file(user_conf.ftp_config_file,r'ftp.encrytKey=.*','ftp.encrytKey=%s' % e )
          self.config_file(user_conf.ftp_config_file,r'innerBatchBackScanSeconds=.*','innerBatchBackScanSeconds=%s' % f )
          self.config_file(user_conf.ftp_config_file,r'outerBatchBackScanSeconds=.*','outerBatchBackScanSeconds=%s' % g )
          self.config_file(user_conf.ftp_config_file,r'sinpayCompareFileScanSeconds=.*','sinpayCompareFileScanSeconds=%s' % h )
          self.config_file(user_conf.ftp_config_file,r'innerSincutCompareFileScanSeconds=.*','innerSincutCompareFileScanSeconds=%s' % i )
          self.config_file(user_conf.ftp_config_file,r'outerSincutCompareFileScanSeconds=.*','outerSincutCompareFileScanSeconds=%s' % j )
          self.config_file(user_conf.ftp_config_file,r'date.directory.flag=.*','date.directory.flag=%s' % k )
          self.config_file(user_conf.ftp_config_file,r'inner.batchpay.ftp.root.path=.*','inner.batchpay.ftp.root.path=%s' % l )
          self.config_file(user_conf.ftp_config_file,r'inner.batchback.ftp.root.path=.*','inner.batchback.ftp.root.path=%s' % m )
          self.config_file(user_conf.ftp_config_file,r'outer.batchpay.ftp.root.path=.*','outer.batchpay.ftp.root.path=%s' % n )
          self.config_file(user_conf.ftp_config_file,r'outer.batchback.ftp.root.path=.*','outer.batchback.ftp.root.path=%s' % o )
          self.config_file(user_conf.ftp_config_file,r'inner.sincut.comparefile.ftp.root.path=.*','inner.sincut.comparefile.ftp.root.path=%s' % p )
          self.config_file(user_conf.ftp_config_file,r'outer.sincut.comparefile.ftp.root.path=.*','outer.sincut.comparefile.ftp.root.path=%s' % q )
          self.config_file(user_conf.ftp_config_file,r'sinpay.comparefile.ftp.root.path=.*','sinpay.comparefile.ftp.root.path=%s' % r )


      def __del__(self): 
          print  'modify   mspayfront_ftp           \033[32m[OK]\033[0m.'

mspayfront_cn=mspayfront_cn()
mspayfront_cn.modify()

mspayfront_dmb=mspayfront_dmb()
mspayfront_dmb.modify()

mspayfront_fts=mspayfront_fts()
mspayfront_fts.modify()

mspayfront_transcfg=mspayfront_transcfg()
mspayfront_transcfg.modify()

mspayfront_ftp=mspayfront_ftp()
mspayfront_ftp.modify()
