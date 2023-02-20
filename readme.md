# Typescript
 
 ## ts是什么

 ## 安装ts
 ```
 npm i -D typescript
 ```

 ## 检验是否安装成功
 ```
 npx tsc -v
 ```

 ## 修改配置文件
 ```
  "target":"es5",
  "rootDir":"./src",
  "outDir":"./dist"
 ```

 ## 执行编译命令
 ```

 npx tsc
 ```

 ## 安装第三方库的ts与法宝
 npm i -D @types/express

 ## 手动编译方式

 ```
  "script":{
    “build":"tsc",
    "start":"node ./dist/main.js"
  },
 ```

 - 通过 npm run duild 将ts 转成js
 - 通过 npm run start 运行后台的启动文件


 ## 自动热部署编译方式

- 因为nodemon 只能运行JS文件

- 所以我们需要在使用nodemon 时将TS转成JS文件
 ```
npm i -D ts-node
 ```

 - 修改package.json 文件

 ```
"scripts": {
    "build":"tsc",
    "start": "node ./dist/main.js",
    "dev":"nodemon --watch src/*.ts --exec ts-node src/main.ts"
  },
 ```


 # 如何解决跨域问题
 ## 跨域和跨站不同 跨域和浏览器的安全校验相关

 - 1.绕开浏览器，简单的说访问网站本身的服务器 然后在网站服务器后台通过代码在请求接口
 - 2.反向代理 一般用nginx处理比较多
 - 3.手动修改后台代码  推荐
 - 4jsonp 有长度限制，兼容性不好



 ## mongo数据库
 ## 启动 
 - windows系统 从服务的窗口，找到安装的mongo启动
 - 打开cmd，执行mongo

 ## 选中或创建一个数据库

 - 创建数据库
   use twelve_weeks;
   
- 创建一张测试表 并插入一条记录
db.表明.insert({name:"小张张"})
db.test.insert({name:"小张张"})

- 验证这几步是否成功

查看数据库是否创建
 show databases;

 use twelve_weeks;
查看表是否创建
 show tables;
查看记录是否创建
 db.test.find() 

 # Grapql 1
   它实际上将多个HTTP请求合成了一个请求
   他只是将多个RESTful 请求的资源变成了一个从跟资源 post 访问变成了一个请求的不同字段 从原有的分散式请求变成了集中式的请求


  # nodemon 
  "dev": "nodemon --watch src --exec ts-node src/main.ts" 


  # 有状态token场景 (将会话凭证存放到服务端 ，客户端不存在)
  - 代表场景“老式”的session 缓存和利用缓存式数据库radis方案
  # 无状态token场景 (将会话凭证存放到客户端 ，服务端不存在)


 # (回调函数)callback 一般在“所在函数”的偏后的位置执行 回调函数还有一个特性可以拿到所在函数上下文(this)

 # hook钩子函数 一般在所在函数最前执行，目的是“所在函数”的核心业务之前拦截一下