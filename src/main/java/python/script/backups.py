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

backup_path='/data/app/mspay-front'

backup_package_path='/data/app/package/bak'
backup_package_name='/data/app/package/bak/%s' % 'mspay-front_bak'

version_file='/data/app/mspay-front/%s' % 'version.md'

class public:
      def __init__(self):
          pass

      def shell(self,cmd):
          status,result=commands.getstatusoutput(cmd)
          return [status,result]

      def tarfile(self,path,target_path):
          #创建压缩包名
          tar = tarfile.open(target_path,"w:gz")
          #创建压缩包
          for root,dir,files in os.walk(path):
              for file in files:
                  fullpath = os.path.join(root,file)
                  tar.add(fullpath)
          tar.close()

      def __del__(self):
           pass


class backup(public):
      def __init__(self):
          public.__init__(self)
      def operation(self):

          if os.path.exists('/data/app'):
             print  'check   /data/app                   \033[32m[OK]\033[0m.'
          else:
             os.makedirs('/data/app')

          if os.path.exists(backup_package_path):
             print  'check   %s        \033[32m[OK]\033[0m.' % backup_package_path
          else:
             os.makedirs(backup_package_path)

          if os.path.exists(backup_path):
              print  'check   %s        \033[32m[OK]\033[0m.' % backup_path
              
              cf = ConfigParser.ConfigParser()
              cf.read(version_file)
              version = cf.get("version", "new_version")
              print   'backup version %s' % version, 

              self.tarfile(backup_path ,'%s_%s.tar.gz' % (backup_package_name, version)) 
              print  'backup file                \033[32m[OK]\033[0m.'

          else:
             print  'no file need backup'

      def __del__(self): 
          print  'backup           \033[32m[OK]\033[0m.'



backup=backup()
backup.operation()

