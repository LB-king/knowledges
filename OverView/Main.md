### CSS

#### 1.清除浮动

> 当所有的子元素浮动的时候,且父元素没有设置高度，这时候父元素就会产生高度坍塌

解决方案：

1. 给父元素定义高度

   > 不灵活

2. 父元素设置 overflow: hidden|auto|overlay等

3. 在浮动元素后面添加一个块级元素，并设置高度0

   ```css
   .empty {
     clear: both;
     height: 0;
     overflow: hidden;
   }
   ```

   简单快速、代码少

   增加了一个空标签，不利于页面优化

4. 给坍塌的元素添加伪类

   ```css
   .box:after {
     clear: both;
     content: '';
     display: block;
     height: 0;
     overflow: hidden;
     visibility: hidden;
   }
   ```

   最常用的方法

#### 2.滚动条对宽度的影响

​	页面内容增多，会出现滚动条，页面会有瞬时的闪动，导致体验很不好

​	解决：

1. 一直设置html overflow:scroll;  缺点是：滚动条占位，很不美观。

   ```css
   html {
     overflow-y: scroll;
   }
   ```

   通过计算chrome浏览器的滚动条宽度是17px

   在IE中试了一下，也是17px

2. overlay遮住了17px的空间

   ```css
   html {
     overflow-y: overlay;
   }
   ```

3. 结合vw和calc实现

   ```css
   .box {
     margin-right: calc(100% - 100vw);
   }
   ```

4. body绝对定位

   ```css
   :root {
     overflow-y: auto;
     overflow-x: hidden;
   }
   :root body {
     position: absolute;
   }
   body {
     width: 100vw;
     overflow: hidden;
   }
   ```

5. 经测试：直接设置body width=100vw也是可以的

   ```css
   body {
     width: 100vw;
   }
   ```

   

#### 3.选择器权重

​	!important(最高)

​	内联样式(1000)

​	ID选择器(100)

​	类选择器(10)	属性选择器(10)	伪类选择器(10)

> 伪类选择器：
>
> ​	:active
>
> ​	:focus
>
> ​	:hover
>
> ​	:link
>
> ​	:visited
>
> ​	:first-child
>
> ​	:lang
>
> 伪元素选择器(用**双冒号**表示p::after)
>
> ​	::first-letter
>
> ​	::first-line
>
> ​	::before
>
> ​	::after

```css
[data-type='hello'] {
   background-color: yellow;
   color: blue;
}
.app {
  background-color: green;
  color: yellow;
}
/*伪类选择器*/
div:first-child {
  background-color: aqua;
}
p:not(:last-child) {
  /* 除了最后一个元素，都是红色 */
  color: red;
}
```

元素选择器(1)	伪元素选择器(1)

通配符(0)

#### 4.定位的几种方式

​	position

- static-默认属性，指定元素使用正常的布局行为

- relative-相对定位

- absolute-绝对定位，不为元素预留空间，通过指定元素的相对于最近的非static定位祖先元素的偏移

- fixed-相对于屏幕视口来指定元素的位置

- sticky-粘性布局

  可以实现头部sticky布局

  ```css
  header {
    height: 40px;
    background-color: #eee;
    position: sticky;
    top: 0;
  }
  ```

- inherit-继承的属性



### H5

### Javascript

#### 1.类型检测

- typeof

  直接在计算机底层基于数据类型的值(二进制)进行检测

  null的二进制存的值是000，而对象都是以000开头的二进制存储，所以typeof在进行数据类型检测的时候会将null识别成object。可以理解为计算机的一个bug

  ```js
  typeof null // 'object'
  typeof undefined // 'undefined'
  typeof NaN // 'number'
  typeof [] // 'object'
  typeof /.?/ // 'object'
  typeof function(){} // 'function'
  typeof 普通对象/数组对象/日期对象/正则对象  返回的都是 'object'
  //不足之处
  ```

- instanceof

  检测当前实例是否属于这个类

  只要当前类出现在实例的原型链上，结果都是true 

   缺点： 1.我们可以任意修改原型的指向，会导致判断很不准确

  ​             2.不能检测基本类型

  ```js
  1 instanceof Number // false
  'ui' instanceof String // false
  function fn() {
    this.x = 9
  }
  fn.prototype = Object.create(Array.prototype)
  var f = new fn()
  console.log(f instanceof Array) // true 
  ```

- constructor

  ```js
  var arr = []
  arr.constructor === Array // true
  arr.constructor === Object // false
  //constructor可以自定义，因此判断也不准确
  Number.prototype.constructor = {a: 'XXX'}
  var num = 9
  num.constructor === Number //false
  ```

- Object.prototype.toString.call(target)

  最准确，最推荐的方法

  返回值是`[object Number]`

  ```js
  const types =  [
      'String',
      'Boolean',
      'Number',
      'Object',
      'Array',
      'Function',
      'Date',
      'RegExp',
      'Symbol',
      'Undefined',
      'Null',
      'Arguments',
      'HTMLCollection',
      'Error',
      'BigInt', //9007199254740991n
      'Window',
      'Set'
    ]
  function getType(target) {
    let typeObj = {}
    types.forEach(item => {
      typeObj[`[object ${item}]`] = item.toLowerCase()
    })
    return typeObj[Object.prototype.toString.call(target)]
  }
  ```
  
  补充：隐式转换规则
  
  > + 强转换(基于底层机制转换) Number([value])
  >   + 一些隐式转换都是基于Number完成的
  >     - isNaN('12px') 先把其他类型转换为数字再检测
  >     - 数学运算 '12px' + 20
  >     - 字符串==数字  两个等号比较，先把其转化为数字
  > + 弱转换(基于额外的方法)
  >   - parseInt([value])
  
  **parseInt **处理的值是字符串，从字符串的左侧开始查找有效数字字符(遇到非有效数字)  ->如果处理的值不是字符串，则要先转化为字符串然后开始查找
  
  ```js
  parseInt('') // NaN
  parseInt(null) // NaN  parseInt('null')
  parseInt(NaN) // NaN
  parseInt(undefined) // NaN 
  parseInt([]) // NaN
  parseInt({}) // NaN
  parseInt('KB001') // NaN 
  parseInt('100KB') // 100
  // 非字符串类型，或者转成字符串类型后左边开始第一位不是有效数字字符，都返回NaN
  ```
  
  **Number** 直接调用浏览器最底层的数据类型检测机制来完成
  
  ```js
  Number('') // 0
  Number(true) // 1
  Number(false) // 0
  Number(null) // 0
  Number(undefined) // NaN
  Number({}) // NaN
  Number([]) // 0
  Number([111]) // 111 先将数组转换成字符串 [111] => '111'
  Number([111, 222]) // NaN  [111, 222] => '111,222'
  Number('100px') // NaN
  Number(new Date()) // 1637917073791
  
  ```
  
  **isNaN** 判断不是一个有效数字 自身不等于自身  NaN == NaN   false
  
  ```js
  isNaN('') // false  先把''转换为数字 (隐式 Number('') = 0) isNaN(0)
  isNaN(null) // false null => Number(null) = 0  isNaN(0)
  isNaN(undefined) // true undefined => Number(undefined) = NaN  isNaN(NaN)
  isNaN([]) // false [] => Number([]) = 0 isNaN(0)
  !NaN // true
  ```
  
  两个==比较的时候
  
  > 对象 == 字符串 对象转换为字符串
  >
  > null == undefined
  >
  > 剩下两边不同都是转换为数字

#### 2.几种循环

1. for

   > for循环自己控制循环过程
   >
   > 1.基于var声明的时候，for循环和while循环的性能差不多【不确定循环次数的情况可以用while】
   >
   > 2.基于let声明的时候，for循环的性能更好【没有造成全局不释放的变量】

   ```js
   var arr = new Array(999999).fill(0)
   for(let i = 0; i < arr.length; i++) {} //10ms
   for(let i = 0,len = arr.length; i < len; i++){} //3ms
   ```

   for循环中 break和continue的区别：

   > break - 直接跳出循环
   >
   > continue - 满足条件的那一项做其他事情，循环会继续进行

   函数式编程：forEach,map,reduce...直接交给函数处理，只关注结果，自己无法管控过程

   命令式编程：for循环，面向过程，可以随时操作

2. while

   ```js
   let i = 0
   while(i < 10) {
     i++
     //do sth
   }
   ```

3. forEach

   > 第二个参数表示循环体内this的指向，注意：写成ES5的形式才会生效，ES6的写法，this始终指向window

   ```js
   [11,22,33].forEach(item=>{})
   ```

4. for in 性能最差

   > 迭代当前对象中可枚举属性【私有属性大部分是可枚举的，公有属性(原型链上的属性)部分是可枚举的】
   >
   > 性能差的原因：会查找原型链

   问题：

   问题1：遍历的数据顺序会变，会以数字优先

   问题2：Symbol属性无法遍历

   ​	解决：

   ​	Object.keys(obj) // ["0", "1", "name", "age"]

   ​	Object.getOwnPropertySymbols(obj) // [Symbol(99)]

   问题3：可以遍历到公有的可枚举的属性

   ​	解决：`if(!obj.hasOwnProperty(i)) break`

   ```js
   Object.prototype.test = function() {}
   var obj = {
     name:'DB',
     age: 18,
     [Symbol(99)]: 99,
     0:'000',
     1:'111'
   }
   for(let i in obj) {
     if(!obj.hasOwnProperty(i)) break
     console.log(i)
   }
   //0 1 name age test
   
   var keys = Object.keys(obj)
   if(typeof Symbol !== 'undefined') keys=keys.concat(Object.getOwnPropertySymbols(obj))
   keys.forEach(item =>{
     console.log('属性：', item)
     console.log('属性值：', obj[item])
   })
   ```

5. for of

   性能稍微比for in好一点

   > for of 的原理是按照迭代器规范遍历的，支持 数组/部分类数组/Set/Map 【对象目前没有实现】
   >
   > ES6中引入了Iterator，只有提供了Iterator接口的数据类型才可以使用for of来遍历，可以向一些数据类型添加Symbol.iterator属性，只要数据结构有这个属性，就会被视为有Iterator接口

   ```js
   var obj = {
     0: 'KB',
     [Symbol(9)]: 'symbol属性1',
     1: 44,
     name: 'kb',
     length: 2,
     [Symbol(0)]: 'symbol属性2'
   }
   //Reflect.ownKeys(obj) => ["0", "1", "name", "length", Symbol(9), Symbol(0)]
   obj[Symbol.iterator] = function* () {
     let keys = Object.keys(this)
     let symbolKeys = Object.getOwnPropertySymbols(this)
     symbolKeys.pop()
     keys = keys.concat(symbolKeys)
     console.log(keys)
     for(let i = 0, len = keys.length; i < len; i++) {
       yield {
         // key: keys[i],
         // value: this[keys[i]]
         [keys[i]]: this[keys[i]]
       }
     }
   }
    for(let i of obj) {
      console.log(i)
    }
   ```

   > 两种方法获取symbol属性
   >
   > 1.Reflect.ownKeys(obj)
   >
   > 2.Object.getOwnPropertySymbols(this)
   >
   > 问题：会把symbol属性排到后面

6. Symbol

   Symbol.for()

   > 会被登记在全局环境中供搜索，不会每次调用都返回一个新的Symbol类型的值，而是会先检查给定的key，不存在才会新建。如Symbol.for('foo')调用30次，每次返回同一个Symbol值

   Symbol()

   > 如Symbol.for('foo')调用30次，会返回30个不同的Symbol值

   Symbol.keyFor()

   > 返回一个已经登记的Symbol类型值的key

   ```js
   var s1 = Symbol.for('foo')
   console.log(Symbol.keyFor(s1)) // foo
   ```


#### 3.this的理解

​	-- this执行主体，谁把它执行的「和在哪创建&在哪执行都没有必然的联系」

Q1: 函数执行，看方法前面有没有点，没有点this是window「严格模式下是undefined」，有点，点前面是谁this就是谁

Q2:给当前元素的某个事件行为绑定方法，当事件行为触发，方法中的this是当前元素本身「排除attachEvent」，使用箭头函数则指向window

Q3:构造函数的this是当前类的实例

Q4:箭头函数中没有执行主体，所用到的this是其执行上下文的this

Q5:可以基于Function.prototype上的call&apply&bind去改变this的指向

- call内部执行

  1. fn函数基于`__proto__`找到Function.prototype.call方法，并执行call方法,其内部过程：

     call(context, ...params)

  2. 把fn函数中的this改为context

  3. 并且把params接收的值当做实参传递给fn函数

  4. fn立即执行

  ```js
  function fn() {
    console.log(this)
  }
  var obj = {name: 'OBJ'}
  document.body.addEventListener('click', fn.bind(obj, 11, 22))
  ```

- apply「基本与call一直，区别就是接收的参数形式不同,以数组的形式传参数」

- fn函数基于`__proto__`找到Function.prototype.bind方法，并执行bind方法,其内部过程：

  1. 和call和apply的区别：并没有立即执行
  2. 把传进来的obj，params等信息存储起来「闭包」
  3. 把bind方法**执行的结果**返回给当前元素绑定
  4. 执行bind返回一个新的函数，例如proxy，把proxy绑定给元素的事件，当事件触发执行的是返回的proxy，在proxy内部，再去把fn执行，把this和params改变为之前存储的内容「预处理」

#### 4.从输入URL到页面呈现

##### 第一步：URL解析

http://user:pass@www.qq.com:80/index.html?name=ok&age=18#video

- 地址解析：

  协议：http、https、ftp   (ftp传输一些大文件) 

  > http - 80
  >
  > https - 443
  >
  > ftp - 21

  登录信息：user:pass

  域名：www.qq.com

  端口号：80「0-65535」

  请求资源的文件路径：index.html

  查询字符串：问号参数：?name=ok&age=18

  片段标识符： HASH值

  TCP/IP

  TCP 传输通道  路

  HTTP 传输信息 快递员

- 编码：

  ```js
  //对整个URL的编码：处理空格/中文
  //encodeURI | decodeURI
  
  //主要针对传递的参数信息编码
  //encodeURIComponent | decodeURIComponent
   var url = `http://www.baidu.com/?name=${encodeURI('一段中文')}&from=${encodeURIComponent('http://www.qq.com')}`
   
  //http://www.baidu.com/?name=%E4%B8%80%E6%AE%B5%E4%B8%AD%E6%96%87&from=http%3A%2F%2Fwww.qq.com
  ```

- URI/URL/URN的区别？

  URI - (Uniform Resource Identifier) 统一资源标识符

  URL - (Uniform Resource Location) 统一资源定位符，不仅标识了资源，还指定了操作或者获取方式，同时指出了主要访问机制和网络位置

  URN - (Uniform Resource Name) 统一资源名称

##### 第二步 缓存检查

缓存位置：

- Memory Cache：内存缓存
- Disk Cache：硬盘缓存

打开网页：查找disk cache中是否有匹配，如有则使用，没有则发送网络请求

- 普通刷新(F5): 因为TAB没有关闭，因此Memory Cache是可用的，会被优先使用，其次才是disk cache

- 强制刷新(Ctrl + F5): 浏览器不使用缓存，因此发送的请求头均带有Cache-control: no-cache,服务器直接返回200和最新内容

**强缓存：Expires / Cache-Control**

> 浏览器对于强缓存的处理：根据第一次请求资源时返回的响应头来确定的
>
> - Expires: 缓存过期时间，用来指定资源到期的时间(HTTP/1.0)
>
> - Cache-Control: cache-control: max-age=2592000第一次拿到资源后的2592000秒内(30天)，再次发送请求的话，会读取缓存中的信息(HTTP1.1)
>
> - Cache-Control的值：
>
>   - max-age: 过期时间
>
>   - no-cache: 不进行缓存
>
>   - no-store: 报文中存在机密信息，不可以保存缓存
>
>   - no-transform: 不得对资源进行转换或转变
>
>   - immutable: 表示响应正文不会随时间而改变。资源在服务器上不发生改变，因此客户端不应发送重新严重请求头
>
>     ......
>
> - 两者同时存在的话，Cache-Control的优先级高于Expires

如果服务器文件更新了，本地也是有缓存的，这样就拿不到最新文件？

解决方案：- HTML页面不做强缓存

1)服务器更新资源的时候，资源名称和之前不一样

2)当文件更新后，我们在html导入的时候。设置一个后缀(时间戳)

```html
<script src="index.js/?=39183918319"></script>
```

3)通过协商缓存来解决

**协商缓存**

总会和服务器协商的

![](\img\协商缓存.png)

last-modified 只能精确到秒

etag 更精确

不需要写代码，但是需要理解内部机制

##### 第三步 DNS解析

- 递归查询
- 迭代查询

DNS也是有缓存的

客户端 ->浏览器缓存->本地的hosts文件->本地DNS解析器缓存->本地DNS服务器

> 每一次的dns解析时间预计是20-120ms
>
> 优化：
>
> 1.减少dns请求
>
> 2.dns预获取(DNS Prefetch)
>
> 3.服务器拆分：
>
> - 资源的合理利用 (例如：图片服务器就需要性能好点的服务器)
>
> - 抗压能力加强
>
> - 提高HTTP并发
>
>   ......

```html
<link rel="dns-prefetch" href="//d.3.cn">
```

##### 第四步 TCP三次握手

> 建立连接通道
>
> - seq序号(Sequence number)：用来标识从TCP端向服务器端发送的字节流，发起方发送数据时对此进行标记
> - ack确认序号(Acknowledge number)：只有ACK标志为1时，确认序号字段才有效，ack=seq+1
> - 标志位
>   - ACK:确认序号有效
>   - RST:重置连接
>   - SYN:发起一个新连接
>   - FIN:释放一个连接

![](\img\TCP的三次握手.png)

三次握手为什么不用2次或者4次？

> TCP作为一种可靠传输控制协议，其核心思想：既要保证数据可靠传输，又要提高传输的效率
>
> UDP非可靠的

##### 第五步 数据传输

- HTTP报文

  - 请求报文
  - 响应报文

- 响应状态码

  - 200 ok

  - 202 Accepted 服务器已接受请求，但是尚未处理(异步)

  - 304 Not Modified

  - 404

  - 500 Internet Server Error

    ......

##### 第六次 TCP四次挥手

多了一次传输数据，及时反馈的问题

为什么连接的时候是3次握手，关闭的时候却是4次？

> - 服务器端收到客户端的SYN连接请求报文之后，可以直接发送SYN+ACK报文
>
> - 但是关闭连接时，当服务器端收到FIN报文时，很可能并不会立即关闭连接，所以只能先回复一个ACK报文，告诉客户端：“你发的FIN报文收到了”，只有等服务器所有的文件都发完了，客户端才能发送FIN报文，因此不能一起发送，故需要四步挥手

**Connection: keep-alive** 保证TCP通道建立连接后,可以不关闭

http1.0需要手动配置

http1.1 默认规范就是这样

##### 第七步 页面渲染

http1.0和http1.1的区别

- 缓存处理：1.0使用的是 Last-Modified，Expires；1.1使用的是Etag，Cache-Control
- 带宽优化及网络连接的使用：1.1支持断点续传，即返回码是206(Partial Control)
- 错误通知的管理：新增24个错误状态码，如409(Conflict)表示请求的资源与资源当前的状态冲突
- Host头处理：1.0中认为每台服务器都绑定一个唯一的IP地址，但是随着虚拟机等技术的发展，一台物理机上可以存在多个虚拟主机(Multii-homes Web Server),且它们共享一个IP地址，请求消息中没有Host头域会报告一个错误(400 Bad Request)
- 长连接：1.1中默认开启Connection: keep-alive,一定程度上弥补1.0每次请求都要创建连接

http2.0和http1.x的区别

- 新的二进制格式：
- header压缩
- 服务端推送(server push):  例如网页请求一个index.css文件，在客户端收到index.css的同时，服务器端会将index.js推送到客户端，当客户端尝试获取index.js的时候，就可以直接从缓存中获取到，不用再发请求了



#### 5.数组扁平化

``` js
var arr = [00, [11], [22, 33, [44, 55, [66, 77, [88, 99]]]]]
//1.ES6的方法直接实现
arr = arr.flat(Infinity)
//2.转化为字符串
arr = arr.toString().split(',').map(i => parseFloat(i))
//2.1 转化为json格式的字符串
arr = JSON.stringify(arr).replace(/(\[|\])/g, '').split(',').map(i => +i)
//3.some
while(arr.some(item => Array.isArray(arr))) {
  arr = [].concat(...arr)
}
//4.递归
function myFlat(arr = []) {
  if (!arr.length) return arr
  let res = []
  function fn(arr) {
    for (let i = 0, len = arr.length; i < len; i++) {
      if (Array.isArray(arr[i])) {
        fn(arr[i])
        continue
      }
      res.push(arr[i])
    }
  }
  fn(arr)
  return res
}
```

#### 6.浅拷贝

- 数组浅拷贝

  ```js
  var arr = [11, 22, [33, 44], [55, 66]]
  // 1.es6展开运算符
  var newArr = [...arr]
  // 2.concat
  newArr = arr.concat([])
  // 3.slice
  newArr = arr.slice()
  // 4.Array.of
  newArr = Array.of(...arr)
  // 5.new Array
  newArr = new Array(...arr)
  ```

- 对象浅拷贝

  ```js
  var obj = {
    name: 'DEMO',
    arr: [11, 22, [33, 44]],
    person: {
      name: 'zhangsan',
      age: 18
    },
    [Symbol()]:'s1',
    reg: /^op$/,
    date: new Date(),
    func: function() {}
  }
  
  // 1.es6扩展运算符
  var newObj = {...obj}
  // 2.Object.assign
  newObj = Object.assign({}, obj)
  // 3.for in 循环
  for(let i in obj) {
    if(Object.hasOwnProperty(i)) {
      newObj[i] = obj[i]
    }
  }
  // 3.1优化版本，可以识别Symbol
  /*
    var keys = [
    ...Object.keys(o1),
    ...Object.getOwnPropertySymbols(o1)
  
    ]
    for(let i = 0; i<keys.length;i++) {
      o2[keys[i]] = o1[keys[i]]
    }
  */
  // 注意：第三种方法无法获取Symbol属性
  ```

  封装一个浅克隆的方法
  
  ```js
  function shallowClone(obj) {
    var type = getType(obj),
        oConstructor = obj.constructor
    // Symmbol | BigInt
    if(/^(symbol|bigint)$/i.test(type)) return Object(obj)
    // RegExp | Date
    if(/^(regexp|date)$/i.test(type)) return new oConstructor(obj)
    // Error
    if(/^error$/i.test(type)) return new oConstructor(obj.message)
    // Function
    if(/^function/i.test(type)) {
      return function() {
        return obj.call(this, ...arguments)
      }
    }
    // Object | Array
    if(/^(object|array)$/i.test(type)) {
      var keys = [
        ...Object.keys(obj),
        ...Object.getOwnPropertySymbols(obj)
      ]
      var res = new oConstructor()
      myEach(keys, key => {
        res[key] = obj[key]
      })
      return res
    }
    // 其他类型，直接返回
    return obj
  }
  ```
  
  封装一个**深克隆**的方法
  
  ```js
  function deepClone(obj, cache = new Set()) {
    var type = getType(obj),
        oConstructor = obj.constructor
    if (!/^(object|array)$/i.test(type)) return shallowClone(obj)
    if(cache.has(obj)) return obj
    cache.add(obj)
     var keys = [
       ...Object.keys(obj),
       ...Object.getOwnPropertySymbols(obj)
     ]
     var res = new oConstructor()
     myEach(keys, (key) => {
       res[key] = deepClone(obj[key], cache)
     })
    return res
  }
  
  // 注意无限套娃
  obj.xx = {
    a: obj
  }
  ```
  

#### 7.同源/跨域

阶段1：服务器渲染

阶段2：客户端渲染(同源策略)

阶段3：客户端渲染(跨域方案)

阶段4：半服务器渲染SSR

问题1：你认为ajax的意义是啥？

> 局部刷新->相对于全局刷新
>
> 一个页面只有局部小部分会更新，不需要全局更新

问题2：ajax、$.ajax、axios、fetch

> - ajax的核心操作
> - $ajax的封装
> - axios的封装(基于promise封装)
> - axios的二次配置
> - fetch的处理和封装

原生写法：

```js
var xhr = new XMLHttpRequest
xhr.open('get', 'http://127.0.0.1:3000')
xhr.onreadystatechange = function() {
  if(/^2\d{2}$/.test(xhr.status) && xhr.readyState === 4) {
    console.log(xhr.responseText)
  }
}
xhr.send()
```

fetch:

```js
//get 
fetch('http://127.0.0.1:5000/users')
  .then((res) => {
  return res.json()
})
  .then((res) => {
  console.log(res)
})
  .catch((err) => {
  console.log(err)
})
//post
fetch('http://127.0.0.1:5000/users', {
  method: 'post',
  body: qs.stringify({name:'admin', pass: '123'})
})
  .then((res) => {
  return res.json()
})
  .then((res) => {
  console.log(res)
})
  .catch((err) => {
  console.log(err)
})
```

问题3：谈谈你对跨域的理解

1. 跨域产生的原因和意义

   - 服务器分离：web服务器、数据服务器、图谱服务器......

   - 云信息共享：第三方API接口

   - 有助于分离开发: 开发跨域、部署同源

2. 修改本地HOST

   > 修改本地host，DNS处理：先找本地->再找网络
   >
   > 服务器地址： xxx.api.cn:3000
   >
   > hosts文件修改为: 试一下没反应。。。待验证，原理就是：欺骗浏览器
   >
   > ```shell
   > xxx.api.cn:3000   127.0.0.1:8000
   > ```

3. JSONP

   > 利用js不存在跨域限制
   >
   > 需要前后端配合
   >
   > 缺点：只能GET请求

   客户端代码：

   ```js
   window.fn = function (param) {
     console.log(param)
   }
   // 5.JSONP实现跨域
   function createJSONP() {
     var script = document.createElement('script')
     script.src = 'http://127.0.0.1:5000/users/jsonp?callback=fn'
     document.body.appendChild(script)
   }
   ```

   服务端代码：

   ```js
   router.get('/jsonp', function (req, res, next) {
     let { callback } = req.query
     let data = [{ id: 'jsonp', name: 'jsonp' }]
     let senData = callback + '(' + JSON.stringify(data) + ')'
     console.log(senData)
     res.send(senData)
   })
   ```

4. CORS-跨域资源共享

   服务器端设置头部信息

   ```js
   res.header('Access-Control-Allow-Origin', ALLOW_ORIGIN)
   ```

   问题：很多源向同一个服务器发送请求

   设置为星号，所有的请求都没法携带资源凭证token

5. Proxy

   原理：中层转换

   ![](\img\Proxy_跨域.png)

   基于node封装的，只要保证客户端和node服务处于同源，就能实现中间层数据代理

   ```js
   proxy: {
     '/': {
       	target: 'http://127.0.0.1:5000',
         changeOrigin: true
     }
   }
   ```

   开发中使用webpack-dev-server,配置devServer proxy

   生产使用nginx  appach node

   nginx

   ```
   server {
   	listen   80;
   	server_name  192.168.1.1;
   	
   	location / {
   		proxy_pass http://192.168.1.1:8888;
   		root html;
   		index index.html index.htm;
   	}
   }
   ```

6. postMessage   h5和app通信的时候

#### 8.ajax并行的问题

**串行：**请求是异步的，需要等待上一个请求成功，才能执行下一个请求

**并行：**同时发送多个请求「HTTP请求可以同时进行，但是JS的操作都是一步步来的，因为JS是单线程的,等待所有请求都成功，再去做某一件事情」

```shell
npm i asyncpool
```

并发限制，一般管控ajax请求

#### 9.闭包

> - 堆栈内存
> - ECstack(Execution Context Stack) 和 EC(Excution Context)
> - GO(Global Object)
> - VO(Varibale Object)
> - AO(Activation Object)





















#### 手写系列

##### 1.forEach

```js
Array.prototype.forEach = function(cb, context) {
  //this指向=>arr
  let _this = this,
      i = 0,
      len = _this.length
  context = context == null ? window : context
  for(; i < len; i++) {
    typeof cb === 'function' ? cb.call(context, _this[i], i) : null
  }
}
```

##### 2.instanceof

```js
function myInstance(target, classObj) {
  let classPrototype = classObj.prototype
  // target.__proto__某些浏览器不支持
  let proto = Object.getPrototypeOf(target)
  while(true) {
    // 直到找到Object也没有找到Object->null
    if(proto === null) return false
    if(proto === classPrototype) return true
    // 循环赋值
    proto = Object.getPrototypeOf(proto)
  }
}
```

##### 3.call

```js
Function.prototype.myCall = function(context, ...params) {
  // 改变this为context 
  context == null ? window : context
  //不是对象或者函数，要转成对象，以便在其身上添加属性
  !/^(function|object)$/.test(typeof context) ? context = Object(context) : context
  let self = this,
      key = Symbol() //唯一的属性值
  //利用点判断this的机制来实现
  //context.xxx = self  "obj.xxx=fn" obj.xxx():this就指向obj 
  context[key] = self
  let res = context[key](...params)
  delete context[key]
  return res
}
```

##### 4.bind

```js
Function.prototype.myBind = function(obj, ...params) {
  let _this = this
  return function(ev) {
    _this.call(obj, [ev].concat(...params))
  }
}
```



**性能比较**

> for 和 while 相当
>
> for 优于 forEach
>
> for of > for in
>
> for in 最差

### 算法

时间维度：是指执行当前算法所消耗的时间，通常用「时间复杂度」来描述

> 通常使用「大O符号表示法」，常见的复杂度量级有：
>
> - 常数阶 O(1)
>
>   无论代码执行了多少行，只要没有循环等复杂结构，那这个代码的时间复杂度就是 O(1)
>
> - 对数阶 O(logN)
>
> - 线性阶 O(n)
>
> - 线性对数阶 O(nlogN)
>
> - 平方阶 O(n²)
>
> - 立方阶 O(n³)
>
> - K次方阶 O(n^k)
>
> - 指数阶 O(2^n)
>
> 从上到下时间复杂度越来越大，执行的效率越来越低

空间维度：是指执行当前算法需要占用多少内存空间，通常用「空间复杂度」来描述

### TypeScript

### Vue2

#### 1.Object.defineProperty

```js
Object.defineProperty(obj, 'name', {
  // writable: true, //是否可写
  // enumerable: true, //是否可以枚举,默认是false
  // configurable: true, //可以被配置delete
  get() {
    console.log('正在访问obj的name属性')
    return temp
  },
  set(value) {
    console.log('你正在设置name的属性值为： ' + value)
    temp = value
  }
})
//getter和setter需要一个变量周转才能正常赋值和读取

//所以定义一个监听函数,利用闭包使用value存值
export default function defineReactive(obj, key, value) {
  if(arguments.length === 2) value = obj[key]
}
Object.defineProperty(obj, key) {
  enumarable: true,
  configurable: true,
  get() {
    return value
  },
  set(newValue) {
    if(value === newValue) return 
    value = newValue
  }
}
```



### Vue3

### React

### Webpack

### 优化

#### 1.http层面

1. 利用缓存

   - 对于静态文件实现强缓存和协商缓存(question: 文件有更新，如何保证及时刷新？)
   - 对于不经常更新的接口数据采用本地化存储做数据缓存(question: cookie / localStorage / vuex / redux)

2. DNS优化

   - 分服务器部署，增加http并发性(导致DNS解析变慢)

   - DNS Prefetch

     ```html
     <link rel="dns-prefetch" href="//d.3.cn">
     ```

3. TCP的三次握手和四次挥手

   - Connection: keep-alive

4. 数据传输

   - 减少数据传输的大小

     - 内容或者数据压缩(webpack)
     - 服务器端一定要开启GZIP压缩(一般能压缩60%左右)
     - 大批量数据分批次请求(例如：下拉刷新或者分页，保证首次加载的数据少)

   - 减少HTTP请求的次数

     - 资源文件合并处理

     - 字体图标

     - 雪碧图 CSS-Sprite

     - 图片base64压缩

       ......

5. CDN服务器"地域分布式"

6. 采用HTTP2.0

### 问题记录

1. 登陆之后的接口中添加token会报错

   > 主要原因是自定义了request header中的参数
   >
   > 解决方案：
   >
   > ​	在后台代码配置：`res.header("Access-Control-Allow-Headers", "*");`

### 项目亮点/问题

避免功能和也业务问题，如：

单点登录

权限的多维度管控

多组件信息的复杂共享类问题

数据埋点&性能监控

产品安全解决策略

。。。

性能优化方案：

- webpack层面

- http层面

- 页面渲染层面「包含代码渲染」

- 骨架屏

- 延迟/异步加载

- 大数据渲染优化

- 大文件传输处理

  。。。

插件组件封装：

- 公共方法库

- 插件/组件封装 二次封装 & 开源级插件组件的打造

- Vue自定义指令

  。。。

  突出强调一下结果:如半个月的开发周期只需要7天

也可以说一些新技术：

- hybrid

- uni-app

- ts

- node

  。。。