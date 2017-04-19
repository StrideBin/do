#!/usr/bin/env  python
#coding:utf-8


#### app-config.properties ####
cn_install_path='/data/app/mspay-front'
cn_config_file='%s/conf/app-config.properties' % cn_install_path
cn_info={
#### dev####
  '10.0.101.229':{
      'jdbc.driverClassName':'com.mysql.jdbc.Driver',
      'jdbc.url':'jdbc:mysql://10.0.100.3:4001/db_mspay_front?useunicode=true&characterEncoding=utf8',
      'jdbc.username':'mspay_front_rw',
      'jdbc.password':'mspay_PWD',
      'serviceid.bat.file.notice.pay':'3044010004',
	  'sceneid.bat.file.notice.pay':'04',
	  'serviceid.bat.file.notice.cut':'3044010004',
	  'sceneid.bat.file.notice.cut':'03',
	  'dmb.file.notice.target.dfa':'aM0',
	  'dmb.file.notice.target.systemId':'30414',
  } ,
#### sit####
  '10.0.101.29':{
      'jdbc.driverClassName':'com.mysql.jdbc.Driver',
      'jdbc.url':'jdbc:mysql://10.0.100.5:4001/db_mspay_front?useunicode=true&characterEncoding=utf8',
      'jdbc.username':'mspay_front_rw',
      'jdbc.password':'mspay_PWD',
	  'serviceid.bat.file.notice.pay':'3044010004',
	  'sceneid.bat.file.notice.pay':'04',
	  'serviceid.bat.file.notice.cut':'3044010004',
	  'sceneid.bat.file.notice.cut':'03',
	  'dmb.file.notice.target.dfa':'EM0',
	  'dmb.file.notice.target.systemId':'30415',
  } ,
#### uat####
  '10.0.101.128':{
      'jdbc.driverClassName':'com.mysql.jdbc.Driver',
      'jdbc.url':'jdbc:mysql://10.0.100.18:4001/mspay_front?useunicode=true&characterEncoding=utf8',
      'jdbc.username':'mspay_front_rw',
      'jdbc.password':'mspay_PWD',
	  'serviceid.bat.file.notice.pay':'3044010004',
	  'sceneid.bat.file.notice.pay':'04',
	  'serviceid.bat.file.notice.cut':'3044010004',
	  'sceneid.bat.file.notice.cut':'03',
	  'dmb.file.notice.target.dfa':'HM0',
	  'dmb.file.notice.target.systemId':'30415',
  } ,
####SH-HTZP####
  '10.10.52.43':{
      'jdbc.driverClassName':'com.mysql.jdbc.Driver',
      'jdbc.url':'jdbc:mysql://10.10.148.20:12/db_mspay_cm?useunicode=true&characterEncoding=utf8',
      'jdbc.username':'mspay_cm_rw',
      'jdbc.password':'c1k3fKDvdz',
	  'serviceid.bat.file.notice.pay':'3044010004',
	  'sceneid.bat.file.notice.pay':'04',
	  'serviceid.bat.file.notice.cut':'3044010004',
	  'sceneid.bat.file.notice.cut':'03',
	  'dmb.file.notice.target.dfa':'1M0',
	  'dmb.file.notice.target.systemId':'30415',
  } ,
	  
####SH-HTZP####
  '10.10.24.45':{
      'jdbc.driverClassName':'com.mysql.jdbc.Driver',
      'jdbc.url':'jdbc:mysql://10.10.148.20:12/db_mspay_cm?useunicode=true&characterEncoding=utf8',
      'jdbc.username':'mspay_cm_rw',
      'jdbc.password':'c1k3fKDvdz',
	  'serviceid.bat.file.notice.pay':'3044010004',
	  'sceneid.bat.file.notice.pay':'04',
	  'serviceid.bat.file.notice.cut':'3044010004',
	  'sceneid.bat.file.notice.cut':'03',
	  'dmb.file.notice.target.dfa':'1M0',
	  'dmb.file.notice.target.systemId':'30415',
  } ,
	  
####SH-HTWGQ####
  '10.20.44.44':{
      'jdbc.driverClassName':'com.mysql.jdbc.Driver',
      'jdbc.url':'jdbc:mysql://10.20.148.20:12/db_mspay_cm?useunicode=true&characterEncoding=utf8',
      'jdbc.username':'mspay_cm_rw',
      'jdbc.password':'c1k3fKDvdz',
	  'serviceid.bat.file.notice.pay':'3044010004',
	  'sceneid.bat.file.notice.pay':'04',
	  'serviceid.bat.file.notice.cut':'3044010004',
	  'sceneid.bat.file.notice.cut':'03',
	  'dmb.file.notice.target.dfa':'1M0',
	  'dmb.file.notice.target.systemId':'30415',
  } ,
####SH-HTWGQ####
  '10.20.12.46':{
      'jdbc.driverClassName':'com.mysql.jdbc.Driver',
      'jdbc.url':'jdbc:mysql://10.20.148.20:12/db_mspay_cm?useunicode=true&characterEncoding=utf8',
      'jdbc.username':'mspay_cm_rw',
      'jdbc.password':'c1k3fKDvdz',
	  'serviceid.bat.file.notice.pay':'3044010004',
	  'sceneid.bat.file.notice.pay':'04',
	  'serviceid.bat.file.notice.cut':'3044010004',
	  'sceneid.bat.file.notice.cut':'03',
	  'dmb.file.notice.target.dfa':'1M0',
	  'dmb.file.notice.target.systemId':'30415',
  } ,	  
 }

##### dmb.xml ###
dmb_install_path='/data/app/mspay-front'
dmb_config_file='%s/conf/dmb.xml' % dmb_install_path
dmb_info={
#### dev ####
'10.0.101.229':{
    'dmb_user':'u30409',
    'dmb_pwd':'pay',
	'systemId':'30414',
    'dmb_dfa':'aM0',
    'dmb_ip':'10.0.100.212',
    'dmb_port':'6601',
} ,
#### sit ####
'10.0.101.29':{
    'dmb_user':'u30409',
    'dmb_pwd':'pay',
	'systemId':'30414',
    'dmb_dfa':'EM0',
    'dmb_ip':'10.0.100.210',
    'dmb_port':'6601',
} ,
#### uat ####
'10.0.101.128':{
    'dmb_user':'u30409',
    'dmb_pwd':'pay',
	'systemId':'30414',
    'dmb_dfa':'HM0',
    'dmb_ip':'10.0.100.82',
    'dmb_port':'6601',
} ,
####SH-HTZP####
'10.10.52.43':{
    'dmb_user':'u30414',
    'dmb_pwd':'pay',
	'systemId':'30414',
    'dmb_dfa':'1M0',
    'dmb_ip':'10.10.148.70',
    'dmb_port':'6601',
} ,
####SH-HTZP####
'10.10.24.45':{
    'dmb_user':'u30414',
    'dmb_pwd':'pay',
	'systemId':'30414',
    'dmb_dfa':'1M0',
    'dmb_ip':'10.10.148.70',
    'dmb_port':'6601',
} ,
####SH-HTWGQ####
'10.20.44.44':{
    'dmb_user':'u30414',
    'dmb_pwd':'pay',
	'systemId':'30414',
    'dmb_dfa':'1M0',
    'dmb_ip':'10.20.148.70',
    'dmb_port':'6601',
} ,
####SH-HTWGQ####
'10.20.12.46':{
    'dmb_user':'u30414',
    'dmb_pwd':'pay',
	'systemId':'30414',
    'dmb_dfa':'1M0',
    'dmb_ip':'10.20.148.70',
    'dmb_port':'6601',
} ,
 }


##### fts.properties ###
fts_install_path='/data/app/mspay-front'
fts_config_file='%s/conf/fts.properties' % fts_install_path
fts_info={
#### dev ####
'10.0.101.229':{
    'userName':'sys_30414',
    'sysId':'30414',
    'host':'10.105.57.222',
    'port':'6688',
	'password':'93964B6C8EEA1DC796DD568EB2ADAEDF5CB63E419EECE7228B6B8F34A23EF1A5',
} ,
#### sit ####
'10.0.101.29':{
    'userName':'sys_30409',
    'sysId':'30409',
    'host':'10.0.100.166',
    'port':'6688',
	'password':'93964B6C8EEA1DC796DD568EB2ADAEDF5CB63E419EECE7228B6B8F34A23EF1A5',
} ,
#### uat ####
'10.0.101.128':{
    'userName':'sys_30409',
    'sysId':'30409',
    'host':'10.0.100.87',
    'port':'6688',
	'password':'93964B6C8EEA1DC796DD568EB2ADAEDF5CB63E419EECE7228B6B8F34A23EF1A5',
} ,
#### SH-HTZP ####
'10.10.52.43':{
    'userName':'sys_30414',
    'sysId':'30414',
    'host':'10.10.148.43',
    'port':'6688',
	'password':'93964B6C8EEA1DC796DD568EB2ADAEDF5CB63E419EECE7228B6B8F34A23EF1A5',
} ,
#### SH-HTZP ####
'10.10.24.45':{
    'userName':'sys_30414',
    'sysId':'30414',
    'host':'10.10.148.43',
    'port':'6688',
	'password':'93964B6C8EEA1DC796DD568EB2ADAEDF5CB63E419EECE7228B6B8F34A23EF1A5',
} ,
#### SH-HTWGQ ####
'10.20.44.44':{
    'userName':'sys_30414',
    'sysId':'30414',
    'host':'10.20.148.43',
    'port':'6688',
	'password':'93964B6C8EEA1DC796DD568EB2ADAEDF5CB63E419EECE7228B6B8F34A23EF1A5',
} ,
#### SH-HTWGQ ####
	'10.20.12.46':{
    'userName':'sys_30414',
    'sysId':'30414',
    'host':'10.20.148.43',
    'port':'6688',
	'password':'93964B6C8EEA1DC796DD568EB2ADAEDF5CB63E419EECE7228B6B8F34A23EF1A5',
    } ,
 }
 
##### transcfg.properties ###
transcfg_install_path='/data/app/mspay-front'
transcfg_config_file='%s/conf/trans-config.properties' % transcfg_install_path
transcfg_info={
#### dev ####
'10.0.101.229':{
    'inner.getments.host.address':'10.0.101.8',
    'outer.getments.host.address':'10.0.101.8',
    'single.payments.host.address':'10.0.101.8',
} ,
#### sit ####
'10.0.101.29':{
    'inner.getments.host.address':'10.0.101.8',
    'outer.getments.host.address':'10.0.101.8',
    'single.payments.host.address':'10.0.101.8',
} ,
#### uat ####
'10.0.101.128':{
    'inner.getments.host.address':'10.0.101.8',
    'outer.getments.host.address':'10.0.101.8',
    'single.payments.host.address':'10.0.101.8',
} ,
#### SH-HTZP ####
'10.10.52.43':{
    'inner.getments.host.address':'10.20.148.140',
    'outer.getments.host.address':'10.20.148.140',
    'single.payments.host.address':'10.20.148.140',
} ,
#### SH-HTZP ####
'10.10.24.45':{
    'inner.getments.host.address':'10.20.148.140',
    'outer.getments.host.address':'10.20.148.140',
    'single.payments.host.address':'10.20.148.140',
} ,
#### SH-HTWGQ ####
'10.20.44.44':{
    'inner.getments.host.address':'10.20.148.140',
    'outer.getments.host.address':'10.20.148.140',
    'single.payments.host.address':'10.20.148.140',
} ,
#### SH-HTWGQ ####
'10.20.12.46':{
    'inner.getments.host.address':'10.20.148.140',
    'outer.getments.host.address':'10.20.148.140',
    'single.payments.host.address':'10.20.148.140',
} ,
 }
##### ftp.properties ###
ftp_install_path='/data/app/mspay-front'
ftp_config_file='%s/conf/ftp.properties' % ftp_install_path
ftp_info={
#### dev ####
'10.0.101.229':{
    'ftp.host':'10.0.101.8',
    'ftp.port':'22',
    'ftp.user':'app',
    'ftp.password':'app123!',
    'ftp.encrytKey':'1234567887654321',
    'innerBatchBackScanSeconds':'10',
    'outerBatchBackScanSeconds':'20',
    'sinpayCompareFileScanSeconds':'30',
    'innerSincutCompareFileScanSeconds':'40',
    'outerSincutCompareFileScanSeconds':'50',
    'date.directory.flag':'true',
    'inner.batchpay.ftp.root.path':'/home/batchpay/req',
    'inner.batchback.ftp.root.path':'/home/batchpay/res',
    'outer.batchpay.ftp.root.path':'/home/batchpay/reqouter',
    'outer.batchback.ftp.root.path':'/home/batchpay/resouter',
    'inner.sincut.comparefile.ftp.root.path':'/home/innercut',
    'outer.sincut.comparefile.ftp.root.path':'/home/outercut',
    'sinpay.comparefile.ftp.root.path':'/home/sinpay',
} ,
#### sit ####
'10.0.101.29':{
    'ftp.host':'10.0.101.8',
    'ftp.port':'22',
    'ftp.user':'app',
    'ftp.password':'app123!',
    'ftp.encrytKey':'1234567887654321',
    'innerBatchBackScanSeconds':'10',
    'outerBatchBackScanSeconds':'20',
    'sinpayCompareFileScanSeconds':'30',
    'innerSincutCompareFileScanSeconds':'40',
    'outerSincutCompareFileScanSeconds':'50',
    'date.directory.flag':'true',
    'inner.batchpay.ftp.root.path':'/home/batchpay/req',
    'inner.batchback.ftp.root.path':'/home/batchpay/res',
    'outer.batchpay.ftp.root.path':'/home/batchpay/reqouter',
    'outer.batchback.ftp.root.path':'/home/batchpay/resouter',
    'inner.sincut.comparefile.ftp.root.path':'/home/innercut',
    'outer.sincut.comparefile.ftp.root.path':'/home/outercut',
    'sinpay.comparefile.ftp.root.path':'/home/sinpay',
} ,
#### uat ####
'10.0.101.128':{
    'ftp.host':'10.0.101.8',
    'ftp.port':'22',
    'ftp.user':'app',
    'ftp.password':'app123!',
    'ftp.encrytKey':'1234567887654321',
    'innerBatchBackScanSeconds':'10',
    'outerBatchBackScanSeconds':'20',
    'sinpayCompareFileScanSeconds':'30',
    'innerSincutCompareFileScanSeconds':'40',
    'outerSincutCompareFileScanSeconds':'50',
    'date.directory.flag':'true',
    'inner.batchpay.ftp.root.path':'/home/batchpay/req',
    'inner.batchback.ftp.root.path':'/home/batchpay/res',
    'outer.batchpay.ftp.root.path':'/home/batchpay/reqouter',
    'outer.batchback.ftp.root.path':'/home/batchpay/resouter',
    'inner.sincut.comparefile.ftp.root.path':'/home/innercut',
    'outer.sincut.comparefile.ftp.root.path':'/home/outercut',
    'sinpay.comparefile.ftp.root.path':'/home/sinpay',
} ,
#### SH-HTZP ####
'10.10.52.43':{
    'ftp.host':'10.22.4.15',
    'ftp.port':'22',
    'ftp.user':'minsheng',
    'ftp.password':'M1nSh3n!g!',
    'ftp.encrytKey':'4ABC91E35BC9003A',
    'innerBatchBackScanSeconds':'30',
    'outerBatchBackScanSeconds':'30',
    'sinpayCompareFileScanSeconds':'60',
    'innerSincutCompareFileScanSeconds':'60',
    'outerSincutCompareFileScanSeconds':'60',
    'date.directory.flag':'false',
    'inner.batchpay.ftp.root.path':'/minsheng/batchpay/req',
    'inner.batchback.ftp.root.path':'/minsheng/batchpay/res',
    'outer.batchpay.ftp.root.path':'/minsheng/batchpay/reqouter',
    'outer.batchback.ftp.root.path':'/minsheng/batchpay/resouter',
    'inner.sincut.comparefile.ftp.root.path':'/minsheng/innercut',
    'outer.sincut.comparefile.ftp.root.path':'/minsheng/outercut',
    'sinpay.comparefile.ftp.root.path':'/minsheng/sinpay',
} ,
#### SH-HTZP ####
'10.10.24.45':{
    'ftp.host':'10.22.4.15',
    'ftp.port':'22',
    'ftp.user':'minsheng',
    'ftp.password':'M1nSh3n!g!',
    'ftp.encrytKey':'4ABC91E35BC9003A',
    'innerBatchBackScanSeconds':'60',
    'outerBatchBackScanSeconds':'60',
    'sinpayCompareFileScanSeconds':'120',
    'innerSincutCompareFileScanSeconds':'120',
    'outerSincutCompareFileScanSeconds':'120',
    'date.directory.flag':'false',
    'inner.batchpay.ftp.root.path':'/minsheng/batchpay/req',
    'inner.batchback.ftp.root.path':'/minsheng/batchpay/res',
    'outer.batchpay.ftp.root.path':'/minsheng/batchpay/reqouter',
    'outer.batchback.ftp.root.path':'/minsheng/batchpay/resouter',
    'inner.sincut.comparefile.ftp.root.path':'/minsheng/innercut',
    'outer.sincut.comparefile.ftp.root.path':'/minsheng/outercut',
    'sinpay.comparefile.ftp.root.path':'/minsheng/sinpay',
} ,
#### SH-HTWGQ ####
'10.20.44.44':{
    'ftp.host':'10.22.4.15',
    'ftp.port':'22',
    'ftp.user':'minsheng',
    'ftp.password':'M1nSh3n!g!',
    'ftp.encrytKey':'4ABC91E35BC9003A',
    'innerBatchBackScanSeconds':'30',
    'outerBatchBackScanSeconds':'30',
    'sinpayCompareFileScanSeconds':'60',
    'innerSincutCompareFileScanSeconds':'60',
    'outerSincutCompareFileScanSeconds':'60',
    'date.directory.flag':'false',
    'inner.batchpay.ftp.root.path':'/minsheng/batchpay/req',
    'inner.batchback.ftp.root.path':'/minsheng/batchpay/res',
    'outer.batchpay.ftp.root.path':'/minsheng/batchpay/reqouter',
    'outer.batchback.ftp.root.path':'/minsheng/batchpay/resouter',
    'inner.sincut.comparefile.ftp.root.path':'/minsheng/innercut',
    'outer.sincut.comparefile.ftp.root.path':'/minsheng/outercut',
    'sinpay.comparefile.ftp.root.path':'/minsheng/sinpay',
} ,
#### SH-HTWGQ ####
'10.20.12.46':{
    'ftp.host':'10.22.4.15',
    'ftp.port':'22',
    'ftp.user':'minsheng',
    'ftp.password':'M1nSh3n!g!',
    'ftp.encrytKey':'4ABC91E35BC9003A',
    'innerBatchBackScanSeconds':'60',
    'outerBatchBackScanSeconds':'60',
    'sinpayCompareFileScanSeconds':'120',
    'innerSincutCompareFileScanSeconds':'120',
    'outerSincutCompareFileScanSeconds':'120',
    'date.directory.flag':'false',
    'inner.batchpay.ftp.root.path':'/minsheng/batchpay/req',
    'inner.batchback.ftp.root.path':'/minsheng/batchpay/res',
    'outer.batchpay.ftp.root.path':'/minsheng/batchpay/reqouter',
    'outer.batchback.ftp.root.path':'/minsheng/batchpay/resouter',
    'inner.sincut.comparefile.ftp.root.path':'/minsheng/innercut',
    'outer.sincut.comparefile.ftp.root.path':'/minsheng/outercut',
    'sinpay.comparefile.ftp.root.path':'/minsheng/sinpay',
} ,
 }
 



