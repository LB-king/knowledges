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

#### 5.BFC

(block formate context) 块级格式化上下文

> + 它是一个独立的渲染区域，它规定了内部的block-level的盒子如何布局,并且与这个区域的外部不相干
> + 具体的布局规则有:
>   1. 内部的Box会在垂直方向一个接一个的放置
>   2. Box垂直方向的距离由margin决定。属于同一个BFC的相邻的两个Box margin会发生重叠(按照最大的margin计算)
>   3. 每个元素的margin box左边, 与包含块border box左边相接触
>   4. BFC的区域不会与float box重叠
>   5. BFC就是页面上的一个隔离的独立容器,容器里的子元素不会影响到外面的元素。

以下情形会触发BFC:

- float属性不为none
- position设置为fixed或者absolute
- display属性设置为inline-block/flex/inline-grid/inline-table/table...
- overflow不为visible



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
  
  > 1.对象 == 字符串 对象转换为字符串
  >
  > 2.null == undefined 其他都不相等
  >
  > 3.NaN和谁都不相等
  >
  > 4.剩下两边不同都是转换为数字
  
  题目：
  
  题1:
  
  > Str = 100 + true + 12.1 + null + undefined + 'haha' + [] + false + 9
  >
  > [] == false
  >
  > ![] == false   //把其他类型转为布尔类型的规则：只有0/null/undefined/NaN/'' 是false，其余都是 true
  >
  > {} + 0 ? alert('ok') : alert('no')
  >
  > 0 + {} ? alert('ok') : alert('no')
  
  ```
  {} 可以是一个对象、代码块(块级作用域)
  {} + 0:
  	浏览器端： 0   认为{}是一个代码块
  	node: [object Object]0
  0 + {}:
  	浏览器端： 0[object Object]
  	node: 0[object Object]
  	
  {} + 0 + {}   //[object Object]0[object Object]
  {}+0+[] // 0
  {}+0+'88' // "088"
  ```
  
  大括号在运算符前面：
  
  1. 在没有使用圆括号处理优先级的情况下，不认为是数学运算，认为是代码块
  2. 出现在运算符的后面，认为是数学运算 
  
  题2:
  
  ```js
  var a = {}, b = 0, b = '0'
  a[b] = 'BBB'
  a[c] = 'CCC'
  a[b] = ?
  ```
  
  JS中的属性名是什么格式的？(可以是基本数据类型，如果是对象，则需要将对象转化为字符串)
  
  普通对象：
  
  题3:
  
  ```js
  var a = { n: 1 }
  var b = a
  a.x = a = { n: 2 }
  console.log(a.x)
  console.log(b)
  ```
  
  ![](\img\引用类型赋值问题.png)

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

   - 服务器分离：web服务器、数据服务器、图片服务器......

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

#### 9.堆栈内存

![](img/堆栈内存.png)

- 堆栈内存

  > + 浏览器会在计算机内分配一块内存，专门用来供代码执行的=>栈内存(Excution Context Stack)执行环境栈
  > + 浏览器会提供很多供我们使用的方法，全局对象(GO)浏览器把 内置的属性方法放到一个单独的内存中，叫做堆内存(Heap)

- EC(Excution Context) 执行上下文：代码执行所在的环境

  - 全局执行上下文  EC(G)

  - 函数中的代码都会在一个单独的私有执行上下文

  - 块级执行上下文

    ```
    AST语法解析,词法解析
    变量提升
    作用域链
    ...
    ```

    

- ECstack(Execution Context Stack) 和 EC(Excution Context)

- GO(Global Object)全局对象

  >浏览器中是 window
  >
  >node中是global

- VO(Varibale Object)变量对象

  > 在当前的执行上下文中，用来存放创建的变量和值的地方，每一个执行上下文中都有一个自己的变量对象，只不过在函数私有上下文中叫AO(活动变量对象)，只是VO的一个分支

- AO(Activation Object)活动变量对象

对象转化为字符串：

先调用valueOf获取原始值(一般都是基本类型值)

则继续调用toString()

#### 10.成员访问的顺序

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence

```js
new Foo.getName()  // 无参数new 19，所以先执行成员访问20 new (Foo.getName())
new Foo().getName() // 有参数new20，所以先执行new  (new Foo()).getName()
/*
成员访问  20
有参数new 20
无参数new 19
...
*/
```

#### 11.事件循环

1. 事件循环存在的意义是什么？
2. 事件循环的基本概念？
3. 浏览器和node环境的事件循环有什么区别？
4. 代码题

为什么有事件循环？

单线程：

​	JavaScript的主要用途是与用户互动，以及操作DOM。如果它是多线程的会有很多复杂的问题要处理，比如有2个线程同时操作DOM，一个线程删除了当前DOM节点,另一个线程要操作当前的DOM，最后以哪个线程为准？

​	为了避免上述情况，所以JS是单线程的。

​	非阻塞，通过event loop实现

**宏任务和微任务**

为什么引入微任务？

页面渲染事件，各种IO的完成事件等随时被添加到任务队列中，一直会保持先进先出的原则执行。如果有一个高优先级的任务需要尽快执行，那么一种类型的任务就不合适了，所以引入了微任务队列。

- 浏览器中的事件循环

  微任务和宏任务在浏览器中的执行顺序如下：

  1.  执⾏全局Script同步代码，这些同步代码有⼀些是同步语句，有⼀些是异步语句（⽐如setTimeout等）；
  2. 全局Script代码执⾏完毕后，调⽤栈Stack会清空；

  3. 从微队列microtask queue中取出位于队⾸的回调任务，放⼊调⽤栈Stack中执⾏，执⾏完后microtask queue⻓度减1； 

  4. 继续取出位于队⾸的任务，放⼊调⽤栈Stack中执⾏，以此类推，直到直到把microtask queue中的所有任务都执⾏完毕。注意，如果在执⾏microtask的过程中，⼜产⽣了microtask，那么会加⼊到队列的末尾，也会在这个周期被调⽤执⾏；

  5. microtask queue中的所有任务都执⾏完毕，此时microtask queue为空队列，调⽤栈Stack也为空；

  6. 取出宏队列macrotask queue中位于队⾸的任务，放⼊Stack中执⾏；

  7. 执⾏完毕后，调⽤栈Stack为空；

  8. 重复第3-7个步骤；

  9. 重复第3-7个步骤

     ......

     ![](\img\宏任务和微任务.png)

     常见的微任务： new Promise().then(回调)、MutationObserver(html5新特性) 

     常见的宏任务：setTimeout、setInterval、script（整体代码）、 I/O 操作、UI 

     渲染

  微任务队列里一次循环是要执行所有任务还是只执行一个？

  > 微任务队列中所有的任务都会一次取出来执行，直到microtask queue为空

- node中的事件循环

  ...需细细研究

#### 12.Promise

> promise对象用于表示一个异步操作的最终完成(或失败)及其结果值
>
> 一个promise必然处于以下几种状态之一：
>
> pending - 待定，初始状态
>
> fulfilled - 已兑现，意味着操作成功
>
> rejected - 已拒绝，意味着操作失败

**promise源码：**

```js
Promise.all
Promise.race
Promise.finally
```

```js
class myPromise {
  
}
var p1 = newPromise()
p1.then((resolve, reject) => {
  
})
```



#### 13.class

- 类中的构造器不是必须要写的，要对实例进行一些初始化的操作，如添加指定属性时才写
- 如果A类继承B类，且A类中写了构造器，那么A类中的**super**是必须调用的
- 类中所定义的方法，都放在了类的原型对象上，供实例去使用
- class中定义的方法，已经在局部开启了严格模式
- 类中可以直接写赋值语句
- 类自身添加属性

```js
class Car {
  //类中可以直接写赋值语句，下面代码的含义是：给Car的实例对象添加一个属性，名为wheel，值是4
  wheel = 4
//类自身添加属性
	static color = {
    bg: 'red'
  }
//自定义方法，使用箭头函数，可以找到this
	demo = () => {console.log(this)}
}
```



#### 14.节流&防抖

> 事件频繁触发可能造成的问题
>
> 	+ 一些浏览器的事件：onresize、mousemove、scroll触发的频率非常高，会造成页面卡顿
> 	+ 如果向后台服务器发送请求，会增加服务器的压力

解决方案：

- 节流-throttle

  > - 在函数需要频繁触发时: 函数执行一次后，只有大于设定的执行周期后才会执行第二次
  > - 适合多次事件按时间做平均分配触发
  >
  > 场景：
  >
  > ​	resize
  >
  > ​	scroll

  ```js
  //用法: window.addeventListener('scroll', throttle(fn, 500))
  function throttle(fn, wait) {
    var start = 0
    return function (e) {
      var now = Date.now()
      if(now - start > wait) {
        fn.call(this, wait)
        start = now
      }
    }
  }
  ```

- 防抖-debounce

  > - 在函数需要频繁触发时，在规定时间内，只有最后一次生效
  >
  > - 适合多次事件一次响应的情况

  ```js
  function debounce(callback, delay) {
    let timer = null
    return function(e) {
      if(timer) clearTimeout(timer)
      setTimeout(() => {
        callback(this, e)
      }, delay)
    }
  }
  ```
  

#### 15.rAF

**requestAnimationFrame**

> window.requestAnimationFrame()-告诉浏览器，你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新该动画

特点：当requestAnimationFrame()运行在后台标签页或者隐藏的iframe里，requestAnimationFrame会被暂停调用，以提升性能和电池寿命

采用系统时间间隔，保持最佳绘制效率，不会过度绘制也不会因为间隔时间长导致动画卡顿

setTimeout:

- 执行时间不确定，一旦队列中有一个任务阻塞，其执行就会延迟

- 刷新频率受到分辨率和设备性能影响较大，而其只能设置固定的时间间隔，这个时间间隔可能与屏幕刷新间隔不一样

  以上会导致setTimeout的执行步调和屏幕的刷新步调不一致，从而引起丢帧的现象。

#### 16.变量提升

> 当浏览器开辟出供代码执行的栈内存后，代码并没有自上而下立即执行，而是继续做了一些事情：**把当前作用域中所有带var和function关键字的进行提前的声明和定义**,这就是变量提升机制。
>
> - 带var的只是提前声明(declare) `var a`，只声明没有赋值，默认值是undefined
> - 带function的，不仅声明，而且还定义了，就是让变量和某个值进行关联

![](\img\变量提升.png)

创建变量有6种方式：`var let const class function import`

##### 1.let/const/var的区别？

> 1. let和const不存在变量提升机制，只有var和function存在
>
>    (在全局作用域下)
>
>    带var：全局作用域下声明变量a,但是在全局下声明变量，也相当于给window增加了一个对应的属性(只有在全局作用域才具备这个特点)
>
>    不带var：相当于给全局对象window添加一个属性
>
>    a = 10 // window.a = 10
>
> 2. var可以重复声明变量,let和const不行
>
>    浏览器会校验当前作用域中是否已经存在这个变量了，如果存在了,则再次基于let重新声明就会报错
>    
> 3. let能解决typeof 出现的暂时性死区的问题

**在浏览器开辟栈内存供代码自上而下执行之前，不仅有变量提升的操作，还有很多其他的操作=>"词法解析"或者"词法检查"(就是检查当前即将要执行的代码是否会出现语法错误,如果出现错误，代码将不会再执行)**

说出以下代码的执行结果？？

```js
console.log(a)
let a = 12
console.log(a)
let a = 13
console.log(a)
//Uncaught SyntaxError: Identifier 'a' has already been declared
//直接报语法错误
```

SyntaxError===>语法错误

ReferenceError===>引用错误

```js
console.log(1) //1
console.log(a) //Uncaught ReferenceError: a is not defined
let a = 9
```



```js
console.log(a)
let a = 9 // Uncaught ReferenceError: Cannot access 'a' before 
var a = 9 // undefined
a = 9 // Uncaught ReferenceError: a is not defined
```

题目:

```js
fn()
function fn() {console.log(1)}
fn()
function fn() {console.log(2)}
var fn = function() {console.log(3)}
fn()
function fn() {console.log(4)}
fn()
function fn() {console.log(5)}
fn()
```

```js
fn() 
if('fn' in window) {
  function fn() {
    console.log('BLOCK')
  }
}
fn() 
```

```js
f = function () { return true } 
g = function () { return false }
~(function () {
  if (g() && [] == ![]) {
    f = function () {
      return false
    }
    function g() {
      return true
    }
  }
})()
console.log(f())
console.log(g())
```

##### 2.暂时性死区

```js
//console.log(a) //Uncaught ReferenceError: a is not defined
//console.log(typeof a) //undefined 浏览器的bug，暂时性死区，本应该是报错的
```

```js
console.log(typeof a) // Uncaught ReferenceError: Cannot access 'a' before initialization
let a
//通过词法解析，修改了这个bug
```

##### 3.私有栈内存中的变量处理

```js
var a = 10,
    b = 20
//等价于
var a = 10;
var b = 20;
//=======================
var m = n = 10;
//等价于
var m = 10;
n = 10;//n不带var

```

题目：

```js
console.log(a, b)
var a = 12,
    b =12;
function fn() {
  console.log(a, b)
  var a = b = 13
  console.log(a, b)
}
fn()
console.log(a, b)
```

![](\img\JS_变量提升与作用域.png)

题目:

```js
console.log(a, b, c)
var a = 12,
    b = 13,
    c = 14;
function fn(a) {
  console.log(a, b, c)
  a = 100;
  c = 200
  console.log(a, b, c)
}
b = fn(10) 
console.log(a, b, c)
```

```js
var n = 8
function fn() {
  var n = 6
  function f() {
    n--
    console.log(n)
  }
  f()
  return f
}
var x = fn()
x()
console.log(n)

```



#### 17.引出闭包

函数执行形成的私有栈内存，会把内存中所有的私有变量保护起来，和外面没有任何的关系=>函数的这种保护机制就是闭包。

1. 创建函数：
   - 开辟一个堆内存
   - 把函数体中的代码当做字符串存储进去
   - 把堆内存的地址赋值给函数名
   - **函数在哪创建的，那么它执行时所需要查找到的上级作用域就是谁**
2. 函数执行
   - 形成一个全新的私有作用域、执行上下文、私有栈内存(执行一次形成一个，多个之间不会产生影响)
   - 形参赋值&变量提升
   - 代码执行(把所属堆内存中的代码字符串一行行执行)
   - **遇到一个变量，首先看他是否是私有变量(形参和在私有作用域中声明的变量是私有变量)，是私有的就用自己的，不是则向上级作用域查找，一直到全局作用域为止===>这就是作用域链查找机制**
   - 私有变量和外界的变量没有必然联系，可以理解为私有栈内存保护起来了，这种机制其实就是**闭包的保护机制**

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

#### Object.defineProperty

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

#### mustachhe模板引擎

数据变为视图最优雅的解决方案

#### 虚拟dom和diff算法

什么是虚拟dom？

就是把DOM数据化

> 家中的桌子重新摆一下，没有必要全屋推到重来，直接找到不同的地方，精准更新
>
> diff算法实现最小量更新



**真实dom：**

```html
<div class='box'>
  <h3>
    标题
  </h3>
  <ul>
    <li>牛奶</li>
    <li>咖啡</li>
  </ul>
</div>
```

**虚拟dom：**

```json
{
  "sel": "div",
  "data": {
    "class": { "box": true }
  },
  children: [
    { sel: "h3", data: {}, text: "标题" },
    {
      sel: "ul",
      data: {},
      children: [
        {sel:"li", data: {}, text: "牛奶"},
        {sel:"li", data: {}, text: "咖啡"}
      ]
    }
  ]
}
```

主流：snabdom和virtual dom

- snabbdom简介(瑞典语)

  > 单词原意是 速度
  >
  > snabbdom是著名的虚拟dom库，是diff算法的鼻祖，vue源码借鉴了snabbdom
  >
  > github官网：https://github.com/snabbdom/snabbdom

  ```shell
  yarn add snabbdom
  yarn add webpack webpack-cli webpack-dev-server
  ```

- snabbdom的h函数如何工作

- diff算法原理

- 手写diff算法

- h函数

  > h函数用来产生虚拟节点(vnode)
  >
  > 比如这样调用h函数:
  >
  > ```js
  > h('a', {
  >     props: {href: 'http://www.baidu.com'},
  >     class: {'demo': true}
  > }, '百度')
  > ```
  >
  > 将得到这样的虚拟节点:
  >
  > ```json
  > {
  >     sel: 'a',
  >     data: {
  >       props: {
  >         href: 'http://www.baidu.com'
  >       },
  >       class: {
  >         demo: true
  >       }
  >     },
  >     elm: a.demo,
  >     text: '百度'
  > }
  > ```
  >
  > 它标识真正的DOM节点：
  >
  > ```html
  > <a class="demo" href='http://www.baidu.com'>百度</a>
  > ```

  一个虚拟节点的属性：

  ```js
  {
    children: undefined, //子元素
    data:{}, //属性样式
    elm: undefined,
    key: undefined,
    sel: 'a',
    text: 'xxx'
  }
  ```

  h函数可以嵌套

  手写h函数：参考diff代码

- key是节点的唯一标识，告诉diff算法，在更改前后它们是同一个DOM节点

- 只有是同一个虚拟节点，才进行精细化比较，否则就会暴力删除旧的，添加新的。

  如何确定是同一个虚拟节点？  选择器相同且key相同。

- 只会同层比较，不会跨层比较

![](img/diff_patch函数.png)

如何定义同一个节点:

旧节点的key和新节点的key相同，

旧节点的选择器和新节点的选择器相同

```JS
vnode1.key === vnode2.key && vnode1.sel === vnode2.sel
```

新老节点替换的规则：

> - 如果新老节点不是同一个节点名称，那么暴力删除旧的节点，创建插入新的节点
> - 只能同级比较，不能跨层比较

**经典diff算法优化策略**

> 四种命中查找：
>
> 1. 新前与旧前
>
>    如果匹配：新前++  旧前++
>
> 2. 新后与旧后
>
>    匹配：新后--  旧后--
>
> 3. 新后与旧前
>
>    匹配：新后--   旧前++,此时还要移动节点
>
> 4. 新前与旧后
>
>    匹配：新前++  旧后--
>
> 5. 以上都不满足->查找
>
> 4. 创建或者删除

![](\img\diff_4种比较.png)

4种都查不到：

![](\img\diff_4种都没找到.png)





#### AST语法解析

> ATS(abstract syntax code) 抽象的语法code
> 模板语法-> 抽象语法树AST(通过抽象语法树进行过渡，让编译工作变得简单) -> 正常的HTML语法
>
> 抽象语法树本质上就是JS对象

```html
<div class="box">
  <h3 class='title'>
    标题
  </h3>
  <ul>
    <li v-for="item in arr" :key="item.id">{{item.name}}</li>
  </ul>
</div>
```

上面的代码会被解析为以下JS对象

```js
{
  tag: 'div',
  attrs: [{name: 'class', value: 'box'}],
  type: 1,
  chilren: [
    {
      tag: 'h3',
      attrs: [{name: 'class', value: 'title'}],   
      children: [{text: '标题',type: 3}]
    },
    {
      tag: 'ul',
      attrs: [],
      type: 1,
      children: [
        {
          tag: 'li',
          for: 'arr',
          key: 'item.id',
          alias: 'item.name',
          type: 1,
          children: []
        }
      ]
    }
  ]
}
```

抽象语法树和虚拟dom的区别：

![](\img\VUE_抽象语法树.png)

知识储备：

指针思想：下标位置

```js
var str = 'aaaaaaabbccccccddddd'
```

判断连续出现次数最多的字符？



#### render

```js
import Vue from 'vue' //这种方式引入的是dist/vue.runtime.esm.js，在vue源码根目录的package.json配置的module字段
```

页面生效的条件：

1.不使用render函数,引入完整版的vue 

```js
import Vue from 'vue/dist/vue'
new Vue({
  template: `<h1>你好</h1>`
}).$mount('#app')
```

2.使用render函数

```js
//h就是createElement函数
render(h) {  
  return h('h2', '你好')
}
```

Vue.js与vue.runtime.xxx.js区别？

> 1. **vue.runtime.xxx.js**是精简版的vue 不包含模板解析器
> 2. vue.js是是完整版vue。包含核心功能+模板解析器
>
> vue: 344KB
>
> vue.runtime.esm.js:  229KB
>
> 由于vue.runtime.xx.js没有模板解析器，所以不能使用template配置项，需要使用render函数接收到的createElement函数去指定具体内容
>
> 模板语法->抽象语法树AST->渲染函数(h函数)->虚拟dom->UI

#### this.$set和Vue.set的理解

背景: 

1.对象动态添加的属性并不会立即和视图关联

```js
this.$set(this.obj, 'name', 'xxxx')
```

2.数组通过下标改变数组内容，

```js
this.$set(this.arr, [0], 'xxxx')
```

原因：对象新增的属性或者数组下标修改的数据，并没有响应式处理



















































### Vue3

### V2和V3区别

#### 1.环境变量

`.env.development`

V2:

定义：

```
#要以VUE_APP开头
VUE_APP_MY_TITLE=PLUS-DEVELOPMENT
```

获取：

```js
console.log(process.env)
```

V3:

定义:

```
#必须要用VITE_开头
VITE_SOME_KEY=开发环境
```

获取：

```js
console.log(import.meta.env)
```

































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

#### 2.webpack层面

1. 写工具库的时候，采用分别暴露的形式，而不是把所有方法挂载到一个对象，然后把对象暴露出去

   ```js
   //好味道-只使用a方法，就只会引进a方法
   export const a = 'AAA'
   export const b = 'BBB'
   //坏味道-会把对象引入，并打包，会增加代码体积
   var a = 'AAA',b='BBB'
   export default {a , b}
   ```

   注意：`export default`和`export`的区别

   ```js
   export const utils = () => {}
   //接收的时候要以对象解构的形式,可以加别名 {as}
   import {utils as myName} from 'utils.js'
   //````````````````````````````````````````
   export default function utils() {}
   //接收的时候以随意变量接收，因为他暴露出来的是一个整体
   import anyName from 'utils.js'
   ```


### 安全问题

#### 1.浏览器相关

- XSS(Cross Site Scripting,跨站脚本)
- CSRF(Cross-site request forgery，跨站请求伪造)
- HTTPS
- CSP(内容安全策略，可以禁止加载外域代码，禁止外域提交等等)
- HSTS(强制客户端使用HTTPS与服务器端建立连接)
- X-Frame-Options(控制当前页面是否可以被嵌入到iframe中)
- SRI(subresource intergrity)子资源完整性，前端可以用webpack-subresource-integrity插件，在每个script上添加hash值，校验加载的资源是否和当时打包时生成的一致
- Referrer-Policy(控制referer的携带策略)

#### 2.服务端相关的安全问题

- 本地文件操作相关
- ReDOS
- 时序攻击
- ip origin referrer等request headers的校验(在做爬虫应用的)

1.聊一聊XSS？

**Cross-site scripting,跨站脚本，通常称为XSS**

> 为什么叫XSS而不是CSS，因为CSS被认为是样式的称呼，cross意味着交叉，X正好符合这个含义，故简称为XSS

就是攻击者想尽一切办法将可执行代码注入到网页中，而恶意代码未经过过滤，与网站的正常代码混在一起，浏览器无法区分哪些脚本是可信的，从而导致恶意脚本被执行

攻击场景？

1. 评论区植入js代码(可输入的地方植入js代码)

2. url拼接js代码

   不要认为url输入长度有限，攻击者可以通过引入外部脚本来实现复杂攻击的

攻击类型？

1. 存储型Server

   场景：常见于带有用户保存数据的网站功能，攻击者通过可输入区域来注入恶意代码，如论坛发帖、商品评价、用户私信等

   攻击步骤：

   1. 攻击者将恶意代码提交到网站的数据库中
   2. 用户打开目标网站时，服务端将恶意代码从数据库中提取出来，返回给前端页面(用户之间可以互相看到帖子、评论)
   3. 用户浏览器在收到响应后解析执行，混在其中的恶意代码也同时被执行
   4. 恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户行为，调用目标网站的接口执行一些指定的操作

2. 反射型Server

   与存储型的区别：反射型的恶意代码拼接在URL上

   由于需要用户主动打开恶意的url才能生效，攻击者往往会结合多种手段诱导用户点击

   场景：通过URL传递参数的功能，如网站搜索、跳转等

   攻击步骤：

   1. 攻击者构造出特殊的URL，其中包含恶意代码
   2. 用户打开该URL，网站服务端将恶意代码从URL中取出，拼接在html中返回给浏览器
   3. 用户浏览器接收到响应后解析执行，混在其中的恶意代码也会被执行
   4. 恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户行为，调用目标网站的接口执行一些指定的操作

3. Dom型 Browser

   Dom型XSS攻击中，取出和执行恶意代码由浏览器端完成，属于前端JS自身的安全漏洞，而其他2种XSS都属于服务端的安全漏洞

   攻击步骤：

2.简单模拟一下Dom型XSS？

```js
var a = document.getElementsByTagName('a')[0]
var queryObj = {}
var search = window.location.search
search.replace(
  /([^&=?]+)=([^&]+)/g,
  (m, $1, $2) => (queryObj[$1] = decodeURIComponent($2))
)
a.href = queryObj.redirectUrl
```

在浏览器端输入url

/index.html?redirectUrl=javascript:alert(%27恭喜，你被攻击了%27)

案例2：

浏览器输入`index.html?name=window.alert(1)`

```js
window.eval(queryObj.name)
```



给重要的cookie设置了http-only，从而避免dom-xss攻击

https://alf.nu/alert1

如何防止XSS攻击：

1. 对数据进行严格的输出编码:HTML,JS,CSS,URL编码

   避免拼接HTML；Vue/React技术栈；避免使用v-html/dangerousSetInnerHTML

2. CSP HTTP Header

   1. 增加攻击难度，配置CSP(本质是建立白名单，由浏览器进行拦截)
   2. Content-Security-Policy: default-src-'self'-所有内容均来自站点的同一个源
   3. Content-Security-Policy: default-src-'self' `.*`.trusted.com 允许内容来自信任的域名
   4. Content-Security-Policy: default-src https://xxx.cn 该服务器仅允许通过https方式，并仅从xxx.cn域名来访问文档

3. 输入验证：常见的数字，电话，邮箱判断...

4. 开启浏览器的XSS防御: Http Only Cookie,禁止js读取某些敏感Cookie

5. 验证码

3.说一下CSRF？

**Cross-site request forgery，跨站请求伪造**

> 攻击者诱导受害者进入恶意网站，在第三方网站中，向被攻击网站发送跨站请求。利用受害者在被攻击网站已经获取的注册凭证，绕过后台的用户验证，达到冒充用户对被攻击的网站执行某项操作的目的。

攻击步骤：

1. 受害者登录a.cn，并保留了登录凭证(Cookie)

2. 攻击者引诱受害者访问了b.cn

3. b.cn 向 a.cn发送了一个请求: a.cn/act=xx 浏览器会默认携带a.cn

   的Cookie

4. a.cn接收到请求以后，对请求进行验证，并确认是受害者的凭证，误以为是受害者自己发送的请求

5. a.cn以受害者的名义执行了act=xx

6. 攻击完成，攻击者让受害者不知情的情况下，冒充受害者，让a.cn执行了自己的操作

攻击类型：

- GET型：如在⻚⾯的某个 img 中发起⼀个 get 请求

  ```html
  <img src="http://bk.example/withdraw?name=xx&age=xxx"/>
  ```

- POST型：通过⾃动提交表单到恶意⽹站

  ```html
  <form action="http://bank.example/withdraw" method=POST> 
    <input type="hidden" name="account" value="lubai" />
    <input type="hidden" name="amount" value="10000" />
    <input type="hidden" name="for" value="hacker" />
  </form> 
  <script> document.forms[0].submit(); </script>
  <a href="http://bank.example/withdraw?name=xxx&amount=xxxx" taget="_blank">
  错过再等⼀年！！！快来看看
  </a>
  ```

如何防范CSRF的攻击？

⾸先咱们通过上⾯的举例可以知道, CSRF⼀般都是发⽣在第三⽅域名, 攻击者也⽆法获取到

Cookie信息, 只是可以利⽤浏览器机制去使⽤Cookie.

所以咱们可以针对这两点来看防范策略：

1. Cookie SameSite

   Cookie SameSite有3个值：

   - Strict：浏览器会完全禁⽌第三⽅cookie。⽐如a.com的⻚⾯中访问 b.com 的资源，那么a.com中的cookie不会被发送到 b.com服务器，只有从b.com的站点去请求b.com的资源，才会带上这些Cookie,会导致体验不好，例如跳到b.com每次都是未登录的状态

   - Lax：在跨站点的情况下，从第三⽅站点链接打开和从第三⽅站点提交 Get⽅式的表单这两种⽅式都会携带Cookie。但如果在第三⽅站点中使⽤POST⽅法或者通过 img、Iframe等标签加载的URL，这些场景都不会携带Cookie

   - None：任何情况下都会发送 Cookie数据。生效的前提是要设置Secure属性(Cookie只能通过HTTPS协议发送)

     ```shell
     #以下设置无效
     Set-Cookie: widget_session=abc123; SameSite=None
     #以下设置有效
     Set-Cookie: widget_session=abc123; SameSite=None; Secure
     ```

2. 同源检测

   通过检测request header中的origin referer等, 来确定发送请求的站点是否是⾃⼰期望中站点.
   
   - 同源的链接和引用，会发送Referer,referer值为Host不带Path
   - 跨域则不带Referer
   
   https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Referrer-Policy
   
   ```js
   Referrer-Policy: no-referrer  //整个referer首部会被移除
   Referrer-Policy: no-referrer-when-downgrade //(默认值)
   Referrer-Policy: origin //在任何情况下，仅发送文件的源作为引用地址
   Referrer-Policy: origin-when-cross-origin //
   Referrer-Policy: same-origin
   Referrer-Policy: strict-origin
   Referrer-Policy: strict-origin-when-cross-origin
   Referrer-Policy: unsafe-url
   ```
   
   HTML中使用：
   
   ```html
   <meta name="referrer" content="origin">
   <a href="http://example.com" referrerpolicy="origin">
   <a href="http://example.com" rel="noreferrer">
   ```

CSRF Token

双重Cookie(没有token安全)

服务端相关的安全问题了解过吗？大概举几个例子？

- 本地文件操作：

  ⽐如我们提供⼀个静态服务, 通过请求的参数url来返回给⽤户或者前端想要的资源

  node起一个本地服务：

  代码：略

  在服务文件夹新建文件`unsafe.md`

  http://localhost:8080/?/../../unsafe.md

  攻击者可以拼接相对路径，猜测你的项目目录，访问服务器资源

  ......

  解决办法：

  框架限制：express.static  koa-static   

  第三方包：resolve-path

- 截图服务puppeteer-chromium-resolver

  ......

- 

- ReDoS(Regular expression Denial of Service)，正则表达式拒绝服务攻击

  ACCCX

  会组合判断是否符合条件？

  1. CCC
  2. CC+C
  3. C+CC
  4. C+C+C+

- 时序攻击

  ```js
  function compareArray(realArray, userInputArrary) {
     for (let i = 0; i < realArray.length; i++) {
     if (realArray[i] !== userInputArray[i]) {
       return false;
       }
     }
   return true
  }
  ```

  这给攻击者提供了⼀种⽅式, 就是根据服务器的响应时间来碰撞出realArray的值

  



































### 问题记录

1. 登陆之后的接口中添加token会报错

   > 主要原因是自定义了request header中的参数
   >
   > 解决方案：
   >
   > ​	在后台代码配置：`res.header("Access-Control-Allow-Headers", "*");`
   
2. 展开运算符

   ```js
   var obj = {a:'aaa', b: 'bbb'}
   var b = ...obj //报错
   var b = {...obj} //表示浅克隆
   var b = {...obj, a: 'xxx',p: 9} //表示合并对象
   ```

   

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



### 常问题目

#### 说一下dns 预解析的过程？

- DNS(Domain Name System) 域名系统,是域名和IP相互映射的一个分布式数据库。DNS查询就是把对应的域名转换为IP的过程

- 当浏览器访问一个域名的时候，需要解析一次DNS,获得对应的IP。在解析过程中按照:

  浏览器缓存->系统缓存->路由器缓存->运营商缓存->根域名服务器、顶级域名服务器、主域名服务器的顺序，逐步读取缓存，直到拿到IP地址

前端优化：

> DNS Prefetch,即DNS解析就是根据浏览器的规则，提前解析之后可能会用到的域名，使解析结果缓存到系统缓存中,缩短DNS解析时间，提高网站访问速度
>
> DNS的优化有2点：
>
> 1.减少DNS请求次数
>
> 2.DNS预解析
>
> - 隐式DNS Prefetch
>
>   > 当前页面中不在当前域名的其他域进行预获取，并且缓存结果
>   >
>   > 如下是https开启隐式DNS Prefetch
>   >
>   > ```html
>   > <meta http-equiv="x-dns-prefetch-control" content="on">
>   > <!-- 关闭
>   > <meta http-equiv="x-dns-prefetch-control" content="off">
>   > -->
>   > ```
>   >
>   > 
>
> - 显式DNS Prefetch
>
>   > 当前页面没有出现的其他域，如下
>   
>   ```html
>   <link rel="dns-prefetch" href="//img.xxxx.com">
>   ```
>

#### WeakMap 和 Map 了解吗? 说下他们的区别？

#### Lighthouse用过吗？



#### http1.0&1.1&2区别？



#### 谈谈闭包？

#### AMD和CMD和UMD？

应用加壳



