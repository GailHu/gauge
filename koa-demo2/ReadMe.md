# 程序说明说明
这个是执行cmd或者shell脚本的KOA服务；  
请求方式POST，请求参数内容是一个json字符串：  
- name 必须为"execu"，表示执行命令
- cmd 是执行的命令

## 安装说明
```
npm install
```
## 运行说明
```
npm start
```
## 简单测试
http://127.0.0.1:3001/


## 执行gauge测试
方式：post  
地址：http://127.0.0.1:3001/exectest  
参数：
```
{"name":"execu","cmd":"start npm run gauge"}
```