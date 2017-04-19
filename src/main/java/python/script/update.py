#!/usr/bin/env  python
#coding:utf-8
import  os
import commands
import sys
import  re
import fileinput
import tarfile
import ConfigParser
import shutil


net='eth0'
#net='eno16777736'

bash_profile=os.environ.get('HOME') + '/.bash_profile'
install_path='/data/app/mspay-front'

package_path='/data/app/mspay-front'
script_path='/data/app/script'
jar_name='mspay-front/lib/mspay-front.jar'
target_path='/data/app'
version_file='/data/app/mspay-front/%s' % 'version.md'
version_path='mspay-front/version.md'#解压包内文件路径
install_package_name='/data/app/package/mspay_front/mspay-front'
install_package='%s.tar.gz' % install_package_name 

class public:
    def __init__(self):
        pass

    def shell(self,cmd):
        status,result=commands.getstatusoutput(cmd)
        return [status,result]

    def extract(self,path,target_path):
        print("正在进行解压操作...")
        tar = tarfile.open(path, "r:gz")
        file_names = tar.getnames()
        for file_name in file_names:
          tar.extract(file_name, target_path)
          if(file_name==version_path):
            tar.extract(file_name, target_path)
            cf = ConfigParser.ConfigParser()
            cf.read(version_file)
            version = cf.get("version", "new_version")
            os.rename(install_package, '%s_%s.tar.gz' % (install_package_name, version))
        tar.close()
        print("解压完毕...")
    def __del__(self):
           pass


class install(public):
      def __init__(self):
          public.__init__(self)
      def operation(self):
          shutil.rmtree("/data/app/mspay-front/lib")
          print("删除lib目录成功")
          self.extract(install_package,target_path) 
          print  'install                \033[32m[OK]\033[0m.'
      
      def __del__(self): 
          print  'install           \033[32m[OK]\033[0m.'


install=install()
install.operation()

