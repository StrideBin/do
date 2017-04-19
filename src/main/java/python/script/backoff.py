#!/usr/bin/env  python
#coding:utf-8
import  os
import commands
import sys
import  re
import fileinput
import tarfile
import ConfigParser


net='eth0'
#net='eno16777736'

install_path='/data/app/mspay-front'

log_path='/data/app/log/mspay-front'
dmb_log_path='/data/app/log/dmb'
package_path='/data/app/mspay-front'
script_path='/data/app/script'

version_file='/data/app/mspay-front/%s' % 'version.md'

install_package_name='/data/app/package/bak/mspay-front_bak'

class public:
      def __init__(self):
          pass

      def shell(self,cmd):
          status,result=commands.getstatusoutput(cmd)
          return [status,result]

      def extract(self,path,target_path):
          tar = tarfile.open(path, "r:gz")
          file_names = tar.getnames()
          for file_name in file_names:
             tar.extract(file_name, target_path)
          tar.close()

      def __del__(self):
           pass


class backoff(public):
      def __init__(self):
          public.__init__(self)
      def operation(self):

          cf = ConfigParser.ConfigParser()
          cf.read(version_file)
          version = cf.get("version", "old_version")
          print   'backoff version %s' % version, 

          self.extract('%s_%s.tar.gz' % (install_package_name, version) ,'/') 


      def __del__(self): 
          print  'backoff           \033[32m[OK]\033[0m.'


backoff=backoff()
backoff.operation()

