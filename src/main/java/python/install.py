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

bash_profile=os.environ.get('HOME') + '/.bash_profile'
install_path='/data/app/mspay-front'

log_path='/data/app/log/mspay-front'
dmb_log_path='/data/app/log/dmb'
package_path='/data/app/mspay-front'
script_path='/data/app/script'

version_file='/data/app/mspay-front/%s' % 'version.md'

install_package_name='/data/app/package/mspay_front/mspay-front'
install_package='%s.tar.gz' % install_package_name 

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

    def str_code(self):          
        env_file=file(bash_profile,'r+')
        lines=env_file.readlines()
        env_file.close()
        print lines
        env_file=file(bash_profile,'w+')
        for l in lines:
            if re.findall('LANG=',l) or re.findall('MSPAY_CONF=',l) or re.findall('MSPAY_LOG=',l):
                print 'skip write value : ' + l
            else:
                env_file.write(l)
                print 'write profile: ' + l
        
        env_file.writelines('export LANG=zh_CN.UTF-8\n')
        print 'write profile: export LANG=zh_CN.UTF-8'
        
        env_file.writelines('export MSPAY_CONF=/data/app/mspay-front\n')
        print 'write profile: export MSPAY_CONF=/data/app/mspay-front'
        
        env_file.writelines('export MSPAY_LOG=/data/app/log/mspay-front\n')
        print 'write profile: export MSPAY_LOG=/data/app/log/mspay-front'
        env_file.close()

        self.shell('source %s ' % bash_profile)
        print 'source %s ' % bash_profile
    def __del__(self):
           pass


class install(public):
      def __init__(self):
          public.__init__(self)
      def operation(self):

          self.str_code()

          if os.path.exists('/data/app'):
             print  'check   /data/app                   \033[32m[OK]\033[0m.'
          else:
             os.makedirs('/data/app')

          if os.path.exists(install_path):
             print  'check   %s        \033[32m[OK]\033[0m.' % install_path
          else:
             os.makedirs(install_path)

          if os.path.exists(log_path):
             print  'check   %s        \033[32m[OK]\033[0m.' % log_path
          else:
             os.makedirs(log_path)

          if os.path.exists(dmb_log_path):
             print  'check   %s        \033[32m[OK]\033[0m.' % dmb_log_path
          else:
             os.makedirs(dmb_log_path)

          if os.path.exists(package_path):
             print  'check   %s        \033[32m[OK]\033[0m.' % package_path
          else:
             os.makedirs(package_path)

          if os.path.exists(script_path):
             print  'check   %s        \033[32m[OK]\033[0m.' % script_path
          else:
             os.makedirs(script_path)

          self.extract(install_package ,'/data/app') 
          print  'install                \033[32m[OK]\033[0m.'

          cf = ConfigParser.ConfigParser()
          cf.read(version_file)
          version = cf.get("version", "new_version")
          print   'install version %s' % version, 
          os.rename(install_package, '%s_%s.tar.gz' % (install_package_name, version))
          print   'mv package name version    \033[32m[OK]\033[0m.', 


      def __del__(self): 
          print  'install           \033[32m[OK]\033[0m.'


install=install()
install.operation()

