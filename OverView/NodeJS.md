### NodeJs是什么

- Node.Js不是一门语言，不是库，也不是框架
- 是js的运行环境
- 没有浏览器安全级别的限制
- 解析和执行js的代码
- 特点：
  - 没有DOM和BOM
  - 在node这个运行环境中为`javascript`提供了服务器级别的操作API:
    - 文件读写
    - 网络服务的构建
    - 网络通信

1. event-driven 事件驱动
2. non-blocking  I/O model 非阻塞I/O模型
3. lightWeight and efficient 轻量级和高效

特点：错误优先的回调特性

### 配置环境变量

我的电脑(右键属性)->属性面板->高级系统设置->环境变量 -> 添加,编辑 环境变量

主要有三大模块：自身模块、第三方模块、自定义模块

### 核心模块

#### file-system(文件系统)

- readFile-读取文件(**异步**)

  ```javascript
  fs.readFile(url, 'utf8', function(err,data){
    // 文件存储的数据是二进制
    // 打印出来的是一串Buffer...16进制
    // 因此需要data.toString()转化为开发者能够识别的格式
  })
  ```

- readFileSync-读取文件(**同步**)

  ```javascript
  let res = fs.readFileSync(url) // 直接返回结果
  // 打印出来的是Buff，所以需要转化成能识别的格式
  res.toString()
  ```

- open(path, flags[, mode], callback)

  - `path` - 文件的路径

  - `flags` - 文件打开的行为

    - `r` 以读取模式打开文件，如果文件不存在，抛出异常
    - `r+` 读写
    - `rs` 同步读取文件
    - `w` 以写入模式打开文件，文件不存在则创建
    - `wx` 同w,但是如果文件路径存在，则文件写入失败
    - `w+` 以读写模式打开文件，如果文件不存在则创建
    - `wx+` 类似'`w+`,但是如果文件路径存在，则文件读写失败
    - `a` 以追加模式打开文件，如果文件不存在则创建
    - `ax` 类似a，----会报错
    - `a+` 
    - `ax+` 

  - `mode` - 设置文件模式(权限),文件创建默认权限为0666

  - `callback(err, fd)` - 回调 

    ```javascript
    fs.open(path.resolve(__dirname, 'output.txt'), 'r+', function (err, fd) {
      if (err) throw err
      console.log('文件打开成功')
    })
    ```

- read

- close

- ftruncate 截取文件

  ```javascript
  let buf = new Buffer.alloc(1024)
  fs.open(path.resolve(__dirname, 'test.txt'),'r+',function(err,fd){
    if(err) throw err
    console.log('截取5个字节')
    fs.ftruncate(fd, 5, function(err) {
      console.log('文件截取成功')
      fs.read(fd, buf, 0, buf.length, 0, function(err, bytes) {
        if(err) throw err
        if(bytes.length > 0) {
          console.log(buf.slice(0, bytes).toString())
        }
        fs.close(fd, function(err) {
          console.log('关闭文件')
        })
      })
    })
  })
  ```

- ftruncateSync 同步

- unlink(path, callback) 删除文件

- mkdir(path[, options], callback) 创建目录

  option的参数可以是:

  - recursive 是否以递归的方式创建目录，默认为false
  - mode 设置目录权限，默认为0777

  callback-回调函数，没有参数

- readdir(path, callback(err, files))

- rmdir(path,callback) 删除目录

- rename(oldPath, newPath, callback) 重命名

- chrown(path, uid, gid, callback)

- chrownSync 同步

  ...

- writeFile()

  ```javascript
  // callback 只包含一个参数err
  fs.writeFile('test.txt', 'hahaha酷玩1','utf-8', function(err) {
    if (err) throw err
    console.log('写入文件成功')
    fs.readFile(path.resolve(__dirname, 'test.txt'), function(err, data){
      if(err) throw err
      console.log(data.toString())
    })
  })
  ```

  

- lstat-fs.stats示例(**异步**)

  ```javascript
  fs.lstat(url, function(err, data){
    console.log(data)
    /*  {
    dev: 3561167395, 
    mode: 33206,
    nlink: 1,
    uid: 0,
    gid: 0,
    rdev: 0,
    blksize: undefined,
    ino: 562949953425884,
    size: 52,
    blocks: undefined,
    atimeMs: 1600241543387.5764,
    mtimeMs: 1600241543387.5764,
    ctimeMs: 1600241543387.5764,
    birthtimeMs: 1600241517082.5786,
    atime: 2020-09-16T07:32:23.388Z,
    mtime: 2020-09-16T07:32:23.388Z,
    ctime: 2020-09-16T07:32:23.388Z,
    birthtime: 2020-09-16T07:31:57.083Z 
  } */
  })
  ```

- lstatSync-获取fs.Stats示例-(**同步**)

  ```javascript
  fs.lstatSync(path)
  // 同步获取更详细的stats
  ```

- readdir- 读取文件夹内容-(**异步**)

  ```javascript
  fs.readdir(__dirname, function(err, data) {
    if(err)
      throw err
  })
  ```

- readdirSync-读取文件夹-(**同步**)

  ```javascript
  let res = fs.readdirSync(__dirname)
  ```

-  Stream(流) 

  Stream是一个抽象接口，Node中有很多对象实现了这个接口

  4种类型:

  - `Readable` - 可读操作
  - `Writable` - 可写操作
  - `Duplex` - 可读可写操作
  - Transform - 操作被写入数据，然后读出结果

  所有的Stream对象都是EventEmitter的示例。常用的事件有:

  - `data` - 当有数据可读时触发
  - `end` - 没有更多的数据可读时触发
  - `error` - 在接收和写入过程中发生错误时触发
  - `finish` - 所有数据已被写入到底层系统时触发

- fs.createReadStream-从流中读取数据

  ```javascript
  const fs = require('fs')
  const path = require('path')
  let readData = ''
  let filePath = path.resolve(__dirname, 'package.json')
  console.log(filePath)
  // 创建可读流
  let readerStream = fs.createReadStream(filePath)
  // 设置编码为utf8
  readerStream.setEncoding('UTF8')
  // 处理流事件-->data,end,error,end
  readerStream.on('data', function (data) {
    readData += data
  })
  readerStream.on('end', function(d) {
    console.log(readData)
  })
  readerStream.on('error', function(err) {
    console.log(err.stack)
  })
  ```

- 写入流

  ```javascript
  const fs = require('fs')
  const path = require('path')
  let res = 'Bayern Munich拜仁慕尼黑'
  // 创建一个可以写入的流，写到文件 output.txt中,如果test文件夹不存在则抛出错误
  let writeStream = fs.createWriteStream(path.resolve(__dirname, 'test/output.txt'))
  //使用utf8编码写入数据
  writeStream.write(res, 'UTF8')
  // 标记文件末尾
  writeStream.end()
  // 处理流事件 -->data, end, error
  writeStream.on('finish', () => {
    console.log('写入完成')
  })
  writeStream.on('error', (err) => {
    console.log(err.stack)
  })
  ```

- 管道流pipe

  管道流提供了一个输出流到输入流的机制，通常我们用于从一个流中获取数据传递到另一个流中

  ```javascript
  const fs = require('fs')
  const path = require('path')
  // 创建一个可读流
  let readerStream = fs.createReadStream(path.resolve(__dirname, 'package.json'))
  // 创建一个可写流
  let writeStream = fs.createWriteStream(path.resolve(__dirname, 'testFiles/output.txt'))
  //
  readerStream.pipe(writeStream)
  // 处理流事件 -->data, end, error
  writeStream.on('finish', () => {
    console.log('写入完成')
  })
  writeStream.on('error', (err) => {
    console.log(err.stack)
  })
  ```

- 链式流

  链式是通过连接输出流到另一个流并创建多个流操作链的机制，链式流一般用于管道操作。接下来我们就是用管道和链式来压缩和压缩文件。

  - 压缩

    ```javascript
    const fs = require('fs')
    const zlib = require('zlib')
    // 压缩
    fs.createReadStream('output.txt')
      .pipe(zlib.createGzip())
      .pipe(fs.createWriteStream('output.txt.gz'))
    console.log('压缩完成')
    ```

  - 解压

    ```javascript
    const fs = require('fs')
    const zlib = require('zlib')
    // 解压
    fs.createReadStream('output.txt.gz')
      .pipe(zlib.createGunzip())
      .pipe(fs.createWriteStream('output11.txt'))
    console.log('文件解压完成')
    ```

    

#### http

- http-服务

  ```javascript
  const http = require('http')
  http.createServer(function(req, res) {
    // res.setHeader('Content-type', 'text/plain;charset=utf-8')
    // res.setHeader('Content-length', Buffer.byteLength(json))
    res.write.writeHeader(200, {'content-type': 'application/json', 'content-length': Buffer.byteLength(json)})
    res.end('success!')
  }).listen(3000, function() {
    console.log('server running at 3000...')
  })
  // PS:setHeader&writeHeade 添加多个响应头写法区别如上述代码
  // writeHeader可定义响应头,可配置多个响应头
  // setHeader-allows you only to set a singular header
  ```
  
  get:
  
  ```js
  response.writeHead(200, {
  	'content-type': 'text/plain; charset=utf-8' //默认是text/html,在后面直接设置编码格式
  })
  ```
  
  insomnia-类似postman的工具
  
  下载地址：https://insomnia.rest/download

#### events-事件

```javascript
const events = require('events')
const eventEmitter = new events.EventEmitter()
// 创建事件处理程序
const connectHandler = function() {
  console.log('连接成功')
  eventEmitter.emit('data_received')
}
// 绑定 connection 事件处理程序
eventEmitter.on('connection', connectHandler)
eventEmitter.on('data_received', function() {
  console.log('数据接收成功')
})
eventEmitter.emit('connection')
console.log('执行完毕!')

eventEmitter.on('test',function() {
  console.log('测试事件触发了')
})

setTimeout(() => {
  eventEmitter.emit('test')
}, 2000)

```

方法：

- addListener(event, listener) // 为指定事件添加一个监听器数组的尾部
- on(event, listener) 为指定事件注册一个监听器
- once(event, listener) 注册一个单次监听器
- removeListener(event, listener) 移除指定事件的某个监听器
- removeAllListeners([]) 移除所有事件的的所有监听器，如果指定事件，则移除指定事件的所有监听器
- setMaxListeners(n) 默认情况，如果添加的监听器超过10个就会出现警告信息
- listeners(event) 返回指定事件的监听器数组
- emit(event,[ar1],[arg2],[...]) 按监听器的顺序执行每隔监听器，如果事件有注册监听返回true,否则返回false

#### util

util是Node.js核心模块，提供常用函数的集合，用于弥补核心JavaScript的功能过于精简的不足

- `util.callbackify(original)` 将aync异步函数(或者一个返回值为Promise的函数)

示例：

```javascript
const util = require('util')
async function fn() {
  return 'hi'
}
const callbackFunction = util.callbackify(fn)
callbackFunction((err, res) => {
  if(err) throw err
  console.log(res)
})

// 输出结果 ： hi
```

- `util.inherits(constructor, superConstructor)`是一个实现对象间原型继承的函数

- `util.inspect(object,[showHidden],[deepth],[colors])`是一个将任意对象转化为字符串的方法，通常用于调试和错误输出

  ```javascript
  const util = require('util')
  function Person() {
    this.name = 'kobe'
    this.toString = function() {
      return this.name
    }
  }
  let obj = new Person()
  console.log(util.inspect(obj))
  // Person { name: 'kobe', toString: [Function] }
  console.log(util.inspect(obj, true))
  /*
  Person {
    name: 'kobe',
    toString:
     { [Function]
       [length]: 0,
       [name]: '',
       [arguments]: null,
       [caller]: null,
       [prototype]: { [constructor]: [Circular] } } }
  */ 
  ```

  - `object` 要转化的对象
  - `showHidden` 是一个可选参数，如果值为true,将会输出更多隐藏信息
  - `deepth`表示最大递归层数，不指定deepth，默认递归2层，指定为null表示不限递归层数完整遍历对象。
  - `colors` 如其值为true，输出格式将会以ANSI颜色编码，通常用于在终端显示更漂亮的效果

- `util.isArray(object)` 如果给定的参数是一个数组返回true,否则返回false

  ```javascript
  const util = require('util')
  console.log(util.isArray([])) // true
  console.log(util.isArray({})) // false
  console.log(util.isArray('ko')) // false
  ```

- `util.isRegExp(object)` 如果给定的参数object是一个正则表达式返回true，否则返回false

  ```javascript
  const util = require('util')
  console.log(util.isRegExp(/some/)) // true
  console.log(util.isRegExp(new RegExp('another pppp'))) // true
  console.log(util.isRegExp([])) // false
  ```

- `util.isDate(object)`

  ```javascript
  const util = require('util')
  console.log(util.isDate(new Date())) // true
  console.log(util.isDate(Date())) // false
  console.log(util.isDate({})) // false
  console.log(util.isDate(Date.now())) // 1600671078057 false
  ```

#### process-进程

```shell
node index.js argv1 argv2
```

index.js

```js
console.log(process.argv.slice(2)) // ['argv1', 'argv2']
```

#### url

打印日志- log4js

- url.parse

```js
const url = require('url')
const log4js = require('log4js')
log4js.configure({
  appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
  categories: { default: { appenders: ['cheese'], level: 'error' } }
})
var logger = log4js.getLogger('cheese')
logger.level = 'debug'
const urlStr = 'http://www.qq.com?name=kb&id=3333'
logger.debug(url.parse(urlStr))
```

打印的结果：

```json
{
  protocol: 'http:',
  slashes: true,
  auth: null,
  host: 'www.qq.com',
  port: null,
  hostname: 'www.qq.com',
  hash: null,
  search: '?name=kb&id=3333',
  query: 'name=kb&id=3333',
  pathname: '/',
  path: '/?name=kb&id=3333',
  href: 'http://www.qq.com/?name=kb&id=3333'
}
```

- url.format(obj)

  ```js
  var obj = 「上面的打印结果」
  url.format(obj) // 结果： https://www.qq.com/?name=kb&id=3333
  ```

- url.resolve

  ```js
  url.resolve('https://www.bbbb.com/a', '/b')
  ```

- URLSearchParams

  ```js
  var urlParam = new URLSearchParams(url.parse(urlStr).search)
  console.log('UI_LOG: ', urlParam.get('id'))
  ```

  浏览器端也有这个方法：

  ```js
  var a = new URLSearchParams('http://ww.cc.com/?name=kb&id=9999')
  a.get('id') //'9999'
  ```

nodejs的浏览器端调试

```
node --inspect-brk app.js
```

node进程管理工具：

- supervisor
- nodemon
- forever
- pm2

#### querystring

```js
var querystring = require('querystring')
var obj = {
  name: '一段中文',
  id: '1'
}
querystring.stringify(obj, null, null, {
  encodeURIComponent(string) {
    // return querystring.unescape(string) // name=一段中文&id=1
    return querystring.escape(string) //name=%E4%B8%80%E6%AE%B5%E4%B8%AD%E6%96%87&id=1
  }
})
//好像此模块已经弃用
```

#### http-proxy-middleware

中间件代理实现跨域

```js
const http = require('http')
const { createProxyMiddleware } = require('http-proxy-middleware')
const server = http.createServer((req, res) => {
  const proxy = createProxyMiddleware('/api', {
    target: 'http://www.xxx.com',
    changeOrigin: true,
    pathRewrite: {
      '^/api': ''
    }
  })
  proxy(req, res)
})
```

#### 爬虫

```js
const http = require('http')
const https = require('https')
const cheerio = require('cheerio')
function parseHtml(htmlData) {
  let res = ''
  const $ = cheerio.load(htmlData)
  const lis = $('li')
  lis.each((i, el) => {
    res += $(el).text() + (i + 1 < lis.length ? '---' : '')
  })
  return res
}

const server = http.createServer((req, res) => {
  const resStr = `<ul id="fruits">
    <li class="apple">Apple</li>
    <li class="orange">Orange</li>
    <li class="pear">Pear</li>
  </ul>`
  res.writeHead(200, {
    'content-type': 'text/plain;charset=utf-8'
  })
  res.end(parseHtml(resStr))
})
server.listen('3000', () => {
  console.log('UI_LOG: localhost:3000')
})

```

#### crypto

#### zlib

```js
const fs = require('fs')
const zlib = require('zlib')
const GZIP = zlib.createGzip()

const rs = fs.createReadStream('./note.txt')
const ws = fs.createWriteStream('./note.txt.gz')

rs.pipe(GZIP).pipe(ws)

```



#### 路由-第三方库`mime`



### supervisor

用于热更新js文件的修改

```powershell
npm install supervisor -g
```

### nodemon

热更新

#### pm2

热更新

### nvm

版本管理工具-windows环境需要下载安装(nvm-windows)

```
nvm list #查看node版本，以供开发者选择
nvm use 16.8.0
nvm alias default 14.15.0 #设置默认版本
npm view vue
```

### nrm

(node registry manager)手工切换源

查看当前源：

```
npm config get registry
```

切换淘宝源：

```
npm config set registry https://registry.npm.taobao.orag
```

nrm是npm的镜像资源管理工具，有时候国外资源太慢，使用nrm就可以快速的在npm源之间切换

安装:npm i nrm -g

使用：

```
nrm list
nrm use npm | yarn | cnpm
```

### npx

(node package extention)-是npm5.2版本开始引入的,自带的，如果不能使用，那就安装一下

npx想要解决的主要问题，就是调用项目内部安装的模块。比如，项目内部安装了测试工具Mocha。

一般来说，调用Mocha，只能在项目脚本和package.json的`scripts`字段里，如果想在命令行下调用。必须像下面这样：

```shell
node-modules/.bin/mocha --vesion
```

npx就是想解决这个问题，让项目内部安装的模块用起来更方便，只要像下面调用就行：

```shell
npx mocha --version
```

npx将包下载到一个临时目录，使用后再删除。所以以后再执行上面的命令，会重新下载某个包。

--no-install参数和--ignore-existing

- 如果想让npx强制使用本地模块，不下载远程模块，可以使用**--no-install**。如果本地不存在该模块，就会报错。

  ```shell
  npx http-server
  npx --no-install http-server
  ```

- 如果想让npx强制使用远程模块，可以使用**--ignore-existing**

  ```shell
  npx --ignore-existing http-server
  ```

全局安装有个致命的问题：类似以下脚本，就会让代码在不同的代码环境运行不起来

```
{
	"start": "gulp -v" 
}
```





### npm

- `npm i gulp -D`

  > 在当前目录查看不到`gulp -v`的命令
  >
  > 需要`.\node_modules\.bin\gulp -v`

  解决方案：

  ```json
  {
    "scripts": {
      "gulp:v": "./node_modules/.bin/gulp -v",
      "gp": "gulp -v"
    }
  }
  ```

  `npm run gulp:v` 即可执行该命令

  脚本执行：`npm run gp` 也能正确执行该命令

  但是命令行直接输入 `gulp -v` 就会报错，找不到这个命令

- `npm`安装-(淘宝镜像)

  ```javascript
  npm install -g cnpm --registry=https://registry.npm.taobao.org
  npm err! Error: connect ECONNREFUSED 127.0.0.1:8087 // 出现此情况的解决办法
  npm config set proxy null
  npm ls // 查看包安装目录列表
  ```

  版本号：语义版本号分为X,Y,Z三位，分别代表主版本号，次版本号，补丁版本号。

  - 如果只是修复bug，需要修改Z位
  - 如果是新增了功能，但是向下兼容，需要更新Y位
  - 如果有大变动，向下不兼容，需要更新X位

  常用的一些命令：

  ```powershell
  # npm help <command> 可以查看某条命令的详细帮助
  # npm update <package> 可以把当前目录下`node_modules`子目录里对应的模块更新至最新版本
  # npm update <package> -g 全局更新
  # npm cache clear 可以清空npm本地缓存
  npm publish # 发布？(未曾使用)
  npm list grep gulp #过滤查看安装的包信息
  ```
  
  ```
  npm list grep gulp
  npm list | findstr gulp #grep是linux命令；findstr是windows命令
  ```
  
  安装依赖注意：
  
  开发模式：放在 `devDependencies`中
  
  ```
  npm i xxx --save-dev || -D
  ```
  
  生产模式：放在`dependencies`中
  
  ```
  npm i xxx || npm i xxx --save | -S
  ```
  
  分包很有必要，在打包生产依赖的时候`npm install --production`就只会安装`dependencies`字段的依赖包
  
- 版本查询与安装

  ```
  npm view vue versions #versions-全部版本 version-最新版本
  npm install vue@2.6.14 -S
  npm i vue@1 #安装1的最高版本
  npm outdated #查看当前版本和期望版本的信息
  ```

  ^14.8.1

  - major: 主版本号 - 14
  - minor: 次版本号 - 8
  - patch: 补丁 - 1 一般偶数是稳定的patch，奇数是不稳定的patch
  - ^:只锁定主版本号，8 和 1会更新
  - ~：锁定14和8 ，1会更新
  - 空：锁定版本号
  - *: 最新版本

- 上传自己的包

  > npm adduser
  >
  > https://www.npmjs.com
  >
  > npm publish #发布自己的包
  >
  > npm uninstall --force #卸载自己的包

- 查看镜像的配置结果

  > npm config get registry # 默认是：https://registry.npmjs.org/ 因此可以设置成淘宝镜像
  > npm config set registry https://registry.npm.taobao.org # 设置淘宝镜像
  > npm config set registry https://registry.npmjs.org # 回退初始化设置

- 设置缓存目录

  > npm config get cache # 获取缓存目录
  > npm config set cache "d:/cache" # 设置
  > npm config get prefix # 包安装目录
  > npm config set prefix "d:/cache"

- npm 脚本

  一、npm 允许在package.json文件里，使用scripts字段定义脚本命令

  ```json
  {
    "scripts": {
      "build": "node build.js",
      "runjs": "node 1.js & node 2.js",
      "runjs": "node 1.js && node 2.js",
      "show": "echo %npm_package_config_env%"
    },
    "config": {
      "env": "TEST"
    }
  }
  ```
  
  二、执行顺序
  
  如果npm脚本里面需要执行多个任务，那么需要明确它们的执行顺序
  
  ```
  npm run runjs #使用&符号，表示并行执行 | &&表示串行
  ```
  
  可以简写的脚本命令：
  
  ```
  npm start
  npm test
  npm run show # linux中变量使用$，在windows中使用 %%
  ```
  
  获取`package.json`中字段的值 
  
  ```
  process.env.npm_package_config_env
  ```
  
  三、安装线上的代码库
  
  ```
  npm install git-ssh://git@github.com/xxxx
  ```
  

### cross-env

> 运行跨平台设置和使用环境变量的脚本

出现的原因：

> 当你使用NODE_ENV=production来设置变量环境时，大多数windows命令提示将会阻塞，（是因为windows上的Bash，它使用的是本机Bash），换言之就是windows不支持NODE_ENV=production的设置方式
>
> cross-env可以使用单个命令，不必担心因为平台正确设置环境变量。这个迷你的包能够提供一个设置环境变量的scripts，让你能够以Unix的方式设置环境变量，在windows上也是兼容运行。。。

```json
{
  "start": "cross-env NODE_ENV=production node 1.js"
}
```



### REPL(交互式解释器)

- **Read**-**读取**

- **Eval****-**执行**

- **Print****-**打印**

- **Loop****-**循环**

  ```shell
  $node
  >var x = 10
  >var y = 20
  >x + y
  # 可用_接收上面的计算结果
  var s = _
  s # 30
  ```

  命令：

  - `ctrl+c` 退出当前终端
  - `ctrl+c按2次`退出Node REPL
  - `ctrl+d`退出NodeREPL
  - `.help`
  - `.break`
  - `.clear`
  - `.save filename` - 保存当前的Node REPL会话到指定文件
  - `.load filename`- 载入当前Node REPL会话的文件内容

阻塞是按顺序执行的，非阻塞是不需要按顺序的

### Node.js事件循环

- nodejs是单进程单线程应用程序，但是因为V8引擎提供的异步执行回调接口，通过这些接口可以处理大量的并发，所以性能非常高。
- nodejs几乎每一个API都是支持回调函数的
- nodejs基本上所有的事件机制都是用设计模式中观察者模式实现
- nodejs单线程类似进入一个while(true)的事件循环，直到没有事件观察者退出，每个异步事件都生成一个事件观察者，如果有事件发生就调用该回调函数

### 事件驱动程序

### Buffer与字符编码

js语言自身只有字符串数据类型，没有二进制数据类型。但是有用到的场景，定义了一个Buffer类，该类用来创建一个专门存放二进制数据的缓存区

Buffer示例一般用于表示编码字符的序列，比如UTF-8、UCS2、Base64、或十六进制编码的数据。通过使用显示的字符编码，就可以在Buffer示例与普通的JS字符串之间进行相互转换。

```javascript
const buf = Buffer.from('hello', 'ascii')
console.log(buf.toString('ascii')) // helloH=
console.log(buf.toString('base64')) // aGVsbG/IvQ==
```

Node.js目前支持的字符编码包括：

- ascii - 仅支持7位ASCII数据。如果设置去掉高位的话，这种编码是非常快的。
- utf8 - 多字节编码Unicode字符。许多网页和其他文档格式都使用UTF-8。
- utf16le - 2 或 4 个字节，小字节序编码的 Unicode 字符。支持代理对（U+10000 至 U+10FFFF）
- ucs2 - utf16le的别名
- base64 - Base64编码
- Latin1 - 一种把Buffer编码成一字节编码的字符串的方式
- binary - latin1的别名
- hex - 将每个字节编码为两个十六进制字符

#### 创建Buffer类

```javascript
const buf1 = Buffer.alloc(10) // <Buffer 00 00 00 00 00 00 00 00 00 00>
const buf2 = Buffer.alloc(10, 1) // <Buffer 01 01 01 01 01 01 01 01 01 01>
const buf3 = Buffer.allocUnsafe(10) // <Buffer 00 e9 91 46 ff ff ff ff 00 00>
const buf4 = Buffer.from([1,2,3]) // <Buffer 01 02 03>
const buf5 = Buffer.from('test') // <Buffer 74 65 73 74>
const buf6 = Buffer.from('test', 'latin1') // <Buffer 74 65 73 74>
```

#### 将buff转化为json对象

```javascript
buf.toJSON()
```

### 模块系统

为了让Node.js的文件可以相互调用，Node.js提供了一个简单的模块系统

main.js

```javascript
let {say} = require('./hello')
say()
```

hello.js

```javascript
exports.say = () => {
  console.log('say someThing')
}
console.log(exports === module.exports) // true
```

其中： **exports === module.exports** 结果为true

js通过`exports`对象作为模块的接口

require的过程

![](E:\codeSpace\knowledges\OverView\img\nodejs-require.jpg)

### 函数

我们可以把函数当做变量传递

#### 匿名函数

```javascript
function say(fn, value) {
  fn(value)
}
say(function(){console.log('匿名函数')}, 'param')
```

例如http

```javascript
// charset=utf8 && charset=utf-8 都可以
const htpp = require('http')
function onRequest(req, res) {
  res.writeHead(200, {'Content-Type': 'text/palin;charset=utf-8'})
  res.write('new text!')
  res.end()
}
http.createServer(onRequest).listen(8888)
```

### Node.js路由

```javascript
 function onRequest(request, response) {
    console.log(request.url) // 根据这个url可以映射到不同的程序
    response.writeHead(200, { 'Content-Type': 'text/plain;charset=utf8' });
    response.write('Hello World你好世界');
    response.end();
  }
```

### Node.js全局对象

Global Object

在浏览器JavaScript中，通常window是全局对象，而Node.js中的全局对象是global，所有全局变量(除了global本身以外)都是global对象的属性

#### 全局对象与全局变量

- `__filename`表示当前正在执行的脚本的文件名。它将输出文件所在位置的绝对路径`

  ```javascript
  console.log(__filename) // E:\knowledges\nodeJs\codes\module\main.js
  ```

- `__dirname_` 表示当前正在执行的脚本所在的目录

  ```javascript
  console.log(__dirname)
  E:\knowledges\nodeJs\codes
  ```

- `setTimeout(cb, ms)` 全局函数在指定的毫秒(ms)数后执行指定函数(cb)

  ```javascript
  function say() {
    console.log('hi')
  }
  let t = setTimeout(say, 5000)
  clearTimeout(t) // 不会执行	
  ```

- `clearTimeout(t)` 全局函数用于停止一个之前通过 setTimeout() 创建的定时器

- `setInterval(cb,ms)` 全局函数在指定的毫秒(ms)数后执行指定函数(cb)

- `clearIntelval`

- `console.log(),info,error,warn,dir,time,timeEnd,trace`

  ```javascript
  console.time('获取数据')
  let s = 0
  for(let i = 0;i < 100000000; i++) {
    s += i
  }
  console.timeEnd('获取数据')
  // 能够打印出程序执行的时间
  ```

- `process` 是一个全局变量，即global对象的属性

  1. `exit` 当进程准备退出时触发

  2. `beforeExit` 当node清空事件循环，并且没有其他安排时触发这个事件。

  3. `uncaughtException` 当一个异常冒泡回到事件循环，触发这个事件

  4. `Signal` 当进程接收到信号时就触发

     ```javascript
     process.on('exit', function(code) {
     	// 执行操作
       console.log(code) // 0
     })
     ```

     - `stdout` 标准输出流

     - `stderr` 标准错误流

     - `stdin` 标准输入流

     - `argv` 返回一个数组

       ```javascript
       console.log(process.argv)
       /*
       [ 
         'C:\\Program Files\\nodejs\\node.exe',
         'E:\\knowledges\\nodeJs\\codes\\global.js' 
       ]
       */
       ```

     - `execPath` 返回执行当前脚本的Node二进制文件的绝对路径

     - `env` 返回一个对象，成员为当前shell的环境变量

     - `exitCode` 进程退出时的代码，如果进程通过`process.exit()`退出，不需要指定退出码

     - `version` Node的版本

     - `config` 一个包含用来编译当前node执行文件的javascript配置选项的对象

     - `pid` 当前进程的进程号

     - `title` 进程名,默认值是node

     - `arch` 当前 CPU 的架构：'arm'、'ia32' 或者 'x64'

     - `platform` 运行程序所在的平台系统 'darwin', 'freebsd', 'linux', 'sunos' 或 'win32'

     - `mainModule` require.main的备选方法

       方法

     - `abort()` 导致node触发abort事件，会让node退出并生成一个核心文件

     - `chdir(directory)` 改变当前工作进程的目录，如果操作失败抛出异常

     - `cwd()` 返回当前进程的工作目录

     - `exit([code])` 使用指定的code结束进程，如果忽略，将会使用code 0

       ...

### GET/POST

### 工具模块

1. os 模块

   详细信息参见：https://www.runoob.com/nodejs/nodejs-os-module.html

2. Path模块

   - `normalize` 规范化路径

   - `join` 

   - `resolve`

   - `isAbsolute` 判断是否是绝对路径

   - `extname` 扩展名

     ```javascript
     path.join('http://www.aaa.com', 'hk') // http://www.aaa.com/hk 
     // resolve([from ...], to)-将 to 参数解析为绝对路径,给定的路径的序列是从右往左被处理的
     console.log(path.resolve('/foo/ko', '/www', './joke/')) // E:\www\joke
     console.log(path.resolve('/foo/ko', './www', './joke')) // E:\foo\ko\www\joke
     console.log(path.resolve('/foo/bar', '/tem/hell')) // E:\tem\hell
     console.log(path.dirname('/haha')) // /
     console.log(path.basename('/ji')) // ji
     console.log(path.extname('test.txt')) // .txt
     ```

   见：https://www.runoob.com/nodejs/nodejs-path-module.html

3. Net模块

4. DNS模块

5. Domain模块

### Express框架

express是一个简介而灵活的node.jsWeb应用框架

该框架的核心特性：

- 可以设置中间件来响应HTTP请求
- 定义了路由表用于执行不同的HTTP请求动作
- 可以通过向模板传递参数来动态渲染HTML页面

安装Express

```powershell
cnpm install express --save
```

全局安装：

```powershell
cnpm install express -g
cnpm install express-generator -g
#4.x版本把generator分离出来了，所以需要单独安装
```

与该框架一起安装的插件：

- **body-parser**-nodejs中间件，用于处理JSON，Raw，Text，和URL编码的数据

- **cookie-parse**-一个解析Cookie的工具，通过req.cookies可以取到传过来的cookie，并把它们转换成对象

- **multer**-中间件，用于处理entype="mulipart/form-data"(设置表单的MIME编码)的编码数据

  ```powershell
  cnpm install body-parse cookie-parse multer --save
  ```

  请求和响应：

  ```javascript
  const app = require('express')()
  app.get('/', function(request, response){
    
  })
  ```

  request对象：

  - req.app

  - req.baseUrl

  - req.body 获得请求主体

    ...

    详见：https://www.runoob.com/nodejs/nodejs-express-framework.html

  response对象：

  - res.append() 追加指定HTTP头

  - res.set()在res.append()后将重置之前设置的头

  - res.redirect():设置响应的Location HTTP头，并且设置状态码为302

  - res.send() 传送http响应

    ...

    详见：https://www.runoob.com/nodejs/nodejs-express-framework.html

  路由

  ```javascript
  const app = require('express')()
  app.get('/', function (req, res) {
    res.send('hi express 首页面')
  })
  app.get('/del', function (req, res) {
    res.send('删除页面')
  })
  app.get('*', function (req, res) {
    res.send('404 not found')
  })
  app.listen(3000, function () {
    console.log('3000端口已被监听')
  })
  ```

#### 静态文件

express提供了内置的中间件express.static来设置静态文件如：图片、css。javascript。

可使用express.static中间件来设置静态文件路径。如，如果你将图片放在public目录下，可以这么写

```javascript
app.use('/ding', express.static('public'))
```

http://localhost:3000/ding/bg.png // 可直接访问图片
  // 备注：静态文件的路径是相对于被标记的文件夹的，因此，在引用静态文件的路径中不能包含被标记的文件夹名称
  app.set('title', 'myTitle')
  app.get('title')
  console.log(app.get('title')) // myTitle

更多详见: http://expressjs.jser.us/3x_zh-cn/api.html

#### 2种请求

```javascript
app.get('/process_get', function(req, res) {
  let fullNmae = {
    first_name: req.query.first_name,
    last_name: req.query.last_name
  }
  res.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8' })
  res.end(JSON.stringify(fullNmae))
})
app.post(
  '/process_post',
  bodyParser.urlencoded({ extended: false }),
  (req, res) => {
    let fullNmae = {
      first_name: req.body.first_name,
      last_name: req.body.last_name
    }
    res.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8' })
    res.end(JSON.stringify(fullNmae))
  }
)
```

#### 文件上传

```html
<html>
<head>
<title>文件上传表单</title>
</head>
<body>
<h3>文件上传：</h3>
选择一个文件上传: <br />
<form action="/file_upload" method="post" enctype="multipart/form-data">
<input type="file" name="image" size="50" />
<br />
<input type="submit" value="上传文件" />
</form>
</body>
</html>
```

```javascript
const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const app = express()
let dirName = 'tmp'
// app.use('/public', express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(multer({ dest: `/${dirName}/` }).array('image'))
app.get('/index.html', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})
app.post('/file_upload', (req, res) => {
  let exists = fs.existsSync(path.join(__dirname, dirName)) // 判断文件夹是否存在
  if (exists) {
    // 文件夹存在，则直接存入该文件夹
    fs.readFile(req.files[0].path, function(err, data) {
      if (err) throw err
      copyFile(req, res, data)
    })
  } else {
    // 文件夹不存在，则先创建
    fs.mkdir(path.join(__dirname, dirName), function(err) {
      if (err) throw err
      copyFile(req, res, data)
    })
  }
})
function copyFile(req, res, data) {
  let des_file = path.join(__dirname, dirName) + '/' + req.files[0].originalname
  fs.writeFile(des_file, data, function(err) {
    if (err) throw err
    res.writeHead(200, { 'Content-Type': 'text/plain;charset=utf8' })
    res.end(
      JSON.stringify({
        msg: 'success!',
        filename: req.files[0].originalname
      })
    )
  })
}
app.listen(3000, () => {
  console.log('running at:' + 3000)
})
```

#### RESTFUL API

Representational State Transfer,rest(表述性状态传递)

get put delete post

具体参考：https://www.runoob.com/nodejs/nodejs-restful-api.html

#### 创建项目

```powershell
express appName # 创建项目
cd appName # 进到项目目录
cnpm install # 安装依赖
npm start # 启动项目
```

宝塔管理软件：

127.0.0.1:8888

用户名: adminroot

密码: admin

### 多进程

nodejs是以单线程的模式运动的，但它使用的是事件驱动来处理并发，这样有助于我们在多核cpu的系统上创建多个子进程，从而提高性能。

每个子进程总是带有3个流对象：child.stdin,child.stdout,child.stderr。它们可能会共享父进程的stdio流，或者也可以是独立的被导流的流对象。

Node提供了child_process模块来创建子进程，方法有：

- **exec**-child_process.exec 使用子进程执行命令，缓存子进程的输出
- **spawn**(产卵、酿成、造成) -child_process.spawn使用指定的命令行参数创建新进程
- **fork**-child_process.fork 是 spawn()的特殊形式，用于在子进程中运行的模块，如 fork('./son.js') 相当于 spawn('node', ['./son.js']) 。与spawn方法不同的是，fork会在父进程与子进程之间，建立一个通信管道，用于进程之间的通信

https://www.runoob.com/nodejs/nodejs-process.html

### mysql

安装`mysql` 本机安装密码：admin123456

官网下载安装包，下载地址：https://dev.mysql.com/downloads/mysql/

关系数据库管理系统RDBMS(Relational Database Management System)

```web-idl
Before I met you, I had really little life.
```

