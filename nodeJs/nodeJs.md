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

file-system(文件系统)

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

- http-服务

  ```javascript
  const http = require('http')
  http.createServer(function(req, res) {
    res.setHeader('Content-type', 'text/plain;charset=utf-8')
    res.end('success!')
  }).listen(3000, function() {
    console.log('server running at 3000...')
  })
  ```

  

### 安装`mysql`

```powershell
cnpm install mysql -g
```

