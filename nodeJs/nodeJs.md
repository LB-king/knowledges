### NodeJs是什么

- nodeJs不是一门语言，不是库，也不是框架
- 是js的运行环境
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

### npm

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