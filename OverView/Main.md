### VSCODE

插件系列

- `Auto Rename Tag` 自动闭合标签
- `Code Runner`
- `Live Server` 热启动
- `open in browser` 浏览器打开文件

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

​	优先级是由ABCD的值来确定的：优先级的计算规则如下

- 如果存在内联样式，那么A=1,否则A=0
- B的值等于`ID选择器(#id)`出现的次数
- C的值等于`类选择器(.class)`和`属性选择器(a[href="http.xx.com"])`和`伪类(:first-child)`出现的总次数
- D的值等于`标签选择器(div,a,p)`和`伪元素(::before, ::after)`出现的总次数

`内联样式中写important是要杜绝的`

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

#### 6.重排和重绘

reflow：重排

repaint：重绘

https://juejin.cn/post/7061588533214969892

浏览器渲染过程：

1. 解析`HTML`,生成`DOM树`，解析`CSS`，生成`CSSOM树`
2. 将DOM树和CSSOM树结合，生成`渲染树(Render Tree)`
3. `Layout(回流)`：根据生成的渲染树，进行回流(layout)，得到节点的几何信息(位置，大小)
4. `Painting(重绘)`：根据渲染树以及回流得到的几何信息，得到节点的绝对像素
5. `Display`：将像素发送给GPU,展示在页面上

为了构建渲染树，浏览器主要完成了以下工作：

1. 从DOM树的根节点开始遍历每个可见节点

   > 不可见节点：
   >
   > 一些不会渲染输出的节点：如 script meta link
   >
   > 一些通过css进行隐藏的点。如display：none。但是用visibility和opacity隐藏的点，还是会显示在渲染树上的

2. 对于每个可见的节点，找到CSSOM树中对应的规则，并应用它们

3. 根据每个可见节点以及其对应的样式，组合生成渲染树

**回流/重排：** 将可见dom节点以及它们对应的样式结合起来，可是我们还需要计算它们在设备视口(viewport)内的确切位置和大小，这个计算的阶段就是回流

**重绘：**我们通过构造渲染树和回流阶段，知道了哪些节点是可见的，以及可见节点的样式和具体的几何信息(位置、大小)，那么我们就可以将渲染树的每个节点都转换为屏幕上的实际像素，这个阶段就叫做重绘节点

何时会发生重排/回流？

> 添加或者删除可见的DOM元素
>
> 元素的位置发生变化
>
> 元素的尺寸发生变化(包括外边距、内边框、边框大小、高度和宽度等)
>
> 内容发生变化，比如文本变化或者图片被其他不同尺寸的图片代替
>
> 页面开始渲染的时候
>
> 浏览器窗口尺寸改变(回流是根据视口的大小来计算元素的位置和大小的)

**注意：回流一定会触发重绘，而重绘不一定会回流。**

如何减少回流和重绘？

> - 最小化重绘和重排，比如样式集中改变，使用添加新样式类名
>
>   ```js
>   //1.修改cssText
>   el.style.width='1px'
>   el.style.color='#ccc'
>   //good
>   el.style.cssText += 'width: 1px; color: #ccc;'
>   
>   //2.修改CSS的class
>   el.className += ' active'
>   ```
>
> - 批量操作dom，比如用临时变量存储某个元素的`offsetWidth`;使用文档碎片来添加要被添加的节点，处理完成再插入到实际的dom中
>
> - 使用`absolute`和`fixed`使元素脱离文档流
>
> - 开启GPU加速，利用CSS的transform,opacity,fiters会触发

https://juejin.cn/post/6844903779700047885











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
  console.log('a', a) //{n:2}
  console.log('a.x', a.x)//undefined
  console.log('b', b) // {n:1,x:{n:2}}
  //1.a.x 有点的优先级高,所以在a指向的内存001中添加属性x:{n:2}该对象的内存地址是002,即此时001为 {n:1,x:{n:2}}
  //2.再执行a={n=2} 此对象的内存地址是002
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
   >2.Object.getOwnPropertySymbols(this)
   > 
   >问题：会把symbol属性排到后面
   
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

> promise对象用于表示一个异步操作的最终完成(或失败)及其结果值-承诺模式-遗嘱模式
>
> new Promise([executor]):第一个执行函数必须传递，
>
> 1.new promise的时候就会把executor执行，创建一个promise实例。(executor是promise的一个回调函数，promise内部会把它执行)
>
> 2.不仅执行，还给executor传递2个参数(2个参数也是函数)
>
> 	+ resolve :它执行代表promise处理异步事件是成功的，把promise状态改成fulfilled
> 	+ reject :它执行代表promise处理异步事件是失败的，把promise状态改成rejected
>
> 3.executor执行异步操作，任务成功执行resolve，任务失败执行reject
>
> 一个promise必然处于以下几种状态之一：
>
> pending - 待定，初始状态
>
> fulfilled - 已兑现，意味着操作成功
>
> rejected - 已拒绝，意味着操作失败

**promise的三个方法：**

1. then：向事件池中设置执行成功或者失败的方法

   ```
   p.then([success], [rejected])
   p.then([success])
   p.then(null,  [rejected])
   ```

2. catch：设置失败后执行的方法

3. finally：设置不论成功还是失败都会执行的方法

   参考try catch finally

   ```js
   try {
     console.log(a)
   } catch (e) {
     console.log(e)
   } finally {
     console.log('try catch 中的finally')
   }
   ```

执行THEN/CATCH/FINALLY返回的结果是一个全新的PROMISE实例，所以可以链式写下去，下一个THEN中哪个方法会执行，由上一个then中某个方法执行的结果来决定

上一个THEN的返回值会传给下一个THEN的某个方法中

```js
let p2 = p1.then(
  (res) => {
    console.log('p2', res)
    return res //THEN中return的结果相当于把这个新的PROMISE的VALUE值改为这个res
  },
  (err) => {
    console.log('p2', err)
    return err
  }
)
let p3 = p2.then(
  (res) => {
    console.log('p3', res)
  },
  (err) => {
    console.log('p3', err)
  }
)
```

如果当前PROMISE实例的状态确定后，都会到对应的THEN中找方法，如果THEN中没有对应的这个方法，则会向下顺延

```js
new Promise((resolve, reject) => {
    reject(-100)
  }).then(res => {
    console.log(res)
  }).catch(err => {
    console.log(err)
  })
```

如果THEN中方法报错，catch也会捕获这个错误:执行报错，让.THEN创建的PROMISE实例变为失败状态，并且把报错信息修改为此PROMISE的VALUE值。

```js
.then(res => {
    console.log(res1111)
  }).catch(err => {
    console.log(err) //ReferenceError: res1111 is not defined
  })

```

手写：

> 1. 定义三个状态PENDING/FULFILLED/REJECTED
>
> 2. new Promise的时候执行executor函数，其中里面有2个参数(都是函数resolve, reject)
>
> 3. 定义resolve reject函数，只有在PROMISE状态是PENDING的时候才能走到这里，此时，将PROMISE的status改为 FULFILLED 或者 REJECTED
>
> 4. 定义THEN方法，里面接收2个函数，向事件池中添加处理成功或者失败的方法，当PROMISE的状态是FULFILLED => onFulfilled
>
>    REJECTED => onRejected
>
> 5. 考虑PROMISE中的异步，不会立即执行resolve或者reject，此时在then中也不闲着，定义两个事件池，收集事件：
>
>    onFulfilledCallbacks.push(() => onFulfilled(this.value))
>
>    onRejectedCallbacks.push(() => onRejectd(this.reason))
>
> 6. 等异步时机到了，触发resolve或者reject，此时调用事件池收集的方法
>
>    this.onFulfilledCallbacks.forEach((fn) => fn())
>
>    this.onRejectedCallbacks.forEach((fn) => fn())
>
> 7. **THEN可以链式调用，说明THEN返回的也是一个PROMISE,因此需要判断THEN里面2个方法执行的返回结果的类型，如果是PROMISE则返回，是普通值则需要把其包装成PROMISE**







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

  ```js
  class A extends B {
    constructor(...p) {
      super(...p)
    }
  }
  ```

  

- 类中所定义的方法，都放在了类的原型对象上，供实例去使用

- class中定义的方法，已经在局部开启了严格模式

- 类中可以直接写赋值语句

- 类自身添加属性

```js
class Car {
  constructor() {
    //1.定义在类上的方法
    this.t1 = () => {}
  }
  //1.定义在类上的方法
  t2 = () => {}
  //2.定义在类的原型上
  t3() {}
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
   
   题目：
   
   ![](\img\JS_内存释放机制.png)
   
   ```js
   var i = 5
   function fn(i) {
     return function (n) {
       console.log(n + (++i))
     }
   }
   var f = fn(1)
   f(2)
   fn(3)(4)
   fn(5)(6)
   f(7)
   console.log(i)
   ```
   
3. 关于堆栈内存释放的问题

   > 函数执行就会形成栈内存(从内存中分配的一块空间)，如果内存都不销毁，很容易就会导致栈内存溢出。

   - 堆内存释放的问题

     > =>创建一个引用类型值，就会产生一个堆内存
     >
     > 如果当前创建的堆内存不被其他东西占用了(浏览器会在空闲的时候，查找每一个内存的引用状况，不被占用的都会给回收释放掉)
     >
     > ```js
     > let obj = {
     >   name: 'xxx'
     > }
     > let op = obj
     > //此时obj和op都占用着对象的堆内存
     > obj = null//空对象指针，会触发垃圾回收
     > ```

   - 栈内存释放

     > 1.打开浏览器形成的全局作用域是栈内存
     >
     > 2.手动执行函数形成的私有作用域是栈内存
     >
     > 3.基于ES6中的let形成的块级作用域也是栈内存
     >
     > ...
     >
     > 全局栈内存 -> 关掉页面才会销毁
     >
     > 私有栈内存 ->
     >
     > ​		1.一般情况下，函数执行完，形成的私有栈内存就会被销毁释放（排除死递归和无限循环）
     >
     > ​		2.一旦栈内存中的某个地址(一般是堆地址)被私有作用域以外的事物给占用了，则当前栈内存不能立即被释放销毁(特点：私有作用域中的私有变量等信息也被保留下来了)
     >
     > ```js
     > function x() {
     >   return function(){
     >     //...
     >   }
     > }
     > let f = x() // f占用了x执行形成的栈内存中的引用地址(返回的函数对应的堆)，则x执行形成的栈内存不能被释放
     > f = null //则不占用，就会被销毁
     > ```
     >
     > 市场话语：函数执行形成的不能被释放的私有栈内存就叫闭包

   闭包的2大作用：

   1. 保护-(私有变量和外界没有必然联系)
   2. 保存-(形成不销毁的栈内存，里面的私有变量等信息保存下来了)

   应用：

   1. jQuery-经典的类库
   
      为了防止全局变量污染(导入jq后，它里面有大量的方法，如果这些方法不保护起来，很容易和用户编写的方法产生冲突)
   
      ```js
      $(function() {
        //...为了减少全局的变量
      })
      ~function() {
        //...
        //window.xxx = xxx
        return xxx 
      }()
      ```
   
      

   题目：
   
   ```js
   var i = 20
   function fn() {
     i -= 2
     return function (n) {
        console.log((++i) - n)
     }
   }
   var f = fn()
   f(1)
   f(2)
   fn()(3)
   fn()(4)
   f(5)
   console.log(i)
   ```
   
   画图解题

#### 18.标签

- `script`

  > 浏览器在解析html的时候，如果遇到没有任何属性的script标签，就会暂停解析，先发送网络请求获取该JS脚本的代码内容，然后让JS引擎执行该代码
  >
  > 阻塞html解析

- `async script`

  > 当浏览器遇到带有async属性的script标签时，该脚本的网络请求是异步的，不会阻塞浏览器解析HTML，一旦网络请求回来之后，如果此时HTML还没有解析完，浏览器会暂停解析，先让js代码执行
  >
  > 如果遇到多个带有async属性的script标签，它们之间的执行顺序是不确定的

- `defer script`

  > defer表示延迟，当浏览器遇到带有defer属性的script时，获取该脚本的网络请求也是异步的，不会阻塞浏览器解析HTML,一旦网络请求回来之后，如果此时HTML还没有解析完，浏览器不会暂停解析并执行JS代码，而是等待HTML解析完毕后再执行js代码
  >
  > 如果出现多个带有defer属性的script，浏览器会保证它们按照在HTML中出现的顺序执行，不会破坏JS脚本之间的依赖关系

#### 19.0.1+0.2

`0.1 + 0.2 !== 0.3`

2.22 + 0.1

2.22 * 100

https://juejin.cn/post/6844903680362151950

js使用Number类型表示数字，遵循`IEEE 754`标准 通过64位来表示一个数字

![](img\JS_数值表达式_IEEE_754.png)

- 第0位：符号位，0表示正数，1表示负数(s)
- 第1位到第11位：存储指数部分(e)
- 第12位到第63位：存储小数部分(即有效数字) f

> 计算机无法无法直接对十进制的数字进行计算，这是硬件物理特性已经决定的，因此运算就分成了2个部分：
>
> **先按照IEEE754转换成相应的二进制**，**然后对接运算**

0.1+0.2的过程：

1. 进制转换

   0.1和0.2转换成二进制后会无限循环

   https://babbage.cs.qc.cuny.edu/IEEE-754.old/Decimal.html

   由于**IEEE754**尾数位数限制，需要将多余的位截掉(参考以上网站)，这样在进制之间的转换中精度已经丢失

   标准中规定尾数f的固定长度是52位，再加上省略的一位，这53位是JS精度范围。他最大可以表示2^53(9007199254740992)。长度是16，所以可以使用toPrecision

2. 对阶运算

   由于指数位数不同，运算时需要对接运算 这部分也可能产生精度丢失

   因此

   **精度丢失可能出现在进制转换和对阶运算**

   **精度丢失可能出现在进制转换和对阶运算**

   **精度丢失可能出现在进制转换和对阶运算**

3. 解决方案

   > 1.将数字转换成整数
   >
   > 2.三方库
   >
   > ​	math.js  https://mathjs.org
   >
   > ​	big.js http://mikemcl.github.io/big.js/

#### 20.new

> 1. 首先创建一个新的空对象
> 2. 根据原型链，设置空对象的`__proto__`为构造函数的`prototype`
> 3. 构造函数的this指向这个对象，执行构造函数的代码(为这个新对象添加属性)
> 4. 判断函数的返回值类型，如果是引用类型，就返回这个引用类型的对象

```js
function myNew(context) {
  //首先创建一个新的空对象
  var newObj = new Object()
  //设置空对象的__proto__为构造函数的prototype
  Object.setPrototypeOf(newObj, context.prototype)
  //执行这个函数
  // let res = context.call(newObj, ...[...arguments].slice(1))
  let res = context.apply(newObj, [...arguments].slice(1))
  //如果执行结果是对象，则返回这个对象，否则返回新建的这个对象newObj
  return typeof res === 'object' ? res : newObj
}

function Person(name, age) {
  this.name = name
  this.age = age
}
var n1 = myNew(Person, 'xx', 12)
```



#### 21.Reflect

> **Reflect**是一个内置的对象，它提供拦截js操作的方法，它不是一个构造函数，因此不能用 new 运算符进行调用
>
> 它的所有属性和方法都是静态的(就像 `Math` 对象)



#### 22.WeakMap

> 引用MDN的话术：map可以通过4个API共用2个数组(一个存放键，一个存放值)来实现。给map设置值时，会同时将键和值添加到这2个数组的末尾。从而使得键和值的索引在两个数组中一一对应。当从该map取值的时候，需要遍历所有的键，然后使用索引从存储值的数组中检索出响应的值。
>
> 这样的实现会有巨大的缺陷：
>
> ​    1.首先赋值和搜索操作都是O(n)的时间复杂度(这里n是键值对的个数)，因为这两个操作都需要遍历全部整个数组来进行匹配
>
> ​    2.可能会导致内存泄露，因为数组会一直引用着每个键和值，这种引用使得垃圾回收算法不能回收处理它们。即不能被垃圾回收，一直占用内存
>
>    WeakMap是弱引用，WeakMap的key必须是对象类型，value可以是任何类型
>
>    问题：什么是弱引用类型？
>
>    解答：弱引用的定义-如果是作为key的对象没有任何地方引用它的话，垃圾收集器GC会将其标记为目标并且进行垃圾回收。由于WeakMap的key是不可枚举的，所以没有地方能引用它，那就触发了垃圾回收器。
>
>    常用方法：delete get set has 见名知意





















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

### 模块化

1. COMMONJS

   > 主要运行于服务器端，该规范指出，一个单独的文件就是一个模块。NodeJS为主要的实践者，它有4个重要的环境变量为模块化的实现提供支持：
   >
   > module  exports  require  global
   >
   > 其中module.exports === exports

   ```js
   module.exports = obj
   // exports.obj1 = obj
   // 两种写法都能暴露模块js中的内容，
   // 前者默认暴露obj，
   // 后者把暴露的obj要挂载到obj1对象上
   ```

   > 1.COMMONJS模块中require引入模块的位置不同会对输出结果产生影响，并且会生成值的拷贝
   >
   > 2.模块重复引入并不会重复执行，再次获取模块只会获得之前取到的模块的缓存

2. AMD-(Asynchoronous Module Define)

   > 异步模块定义，采用异步方式加载模块，不影响后面同步代码的运行。所以依赖这个模块的语句，都定义在一个回调函数中。**requirejs**是最佳实践者
   >
   > 主要有4个命令：
   >
   > define(id?, dependencies? factory) - 全局函数，用来定义模块
   >
   > require - 用来输入其他模块提供的功能
   >
   > return - 用来规范模块对外的接口
   >
   > define-amd - 有这个属性则表示函数遵循AMD规范

   ```js
   //module1.js
   define(function () {
     console.log('module1 文件')
     return {
       say: function () {
         return 'module1'
       }
     }
   });
   //module2.js
   define(function () {
     console.log('module2 文件')
     return {
       say: function () {
         return 'module2'
       }
     }
   });
   
   //index.js
   define(function (require) {
     var m1 = require('./module1')
     console.log(m1.say())
     var m2 = require('./module2')
     console.log(m2.say())
   });
   //结果:
   //module1 文件
   //module2 文件
   //module1
   //module2
   ```

3. CMD - (Common Module Define) 通用模块定义，一个文件就是一个模块，可以像Node.js一般书写模块代码。主要在浏览器中运行，当然也可以在Node.js中运行。

   是在**sea.js**的推广中行成的

   它与AMD最大的区别是：

   ​	AMD-依赖前置、提前执行

   ​	CMD-依赖就近、延迟执行

   总结：CMD虽然凉了。但是CMD更加接近于CommonJS的写法，AMD更加接近于浏览器的异步执行方式

4. UMD - (Universal Module Define) 通用模块定义.该模式主要解决Commonjs模式和AMD模式代码不能通用的问题，并且支持老式的全局变量规范。

   ```js
   !(function (global, factory) {
     /* 
       1.判断是否是commonjs规范
       2.判断define是不是函数,是否存在define.amd，判断是不是AMD规范
       3.都不满足，则设置为原始的代码规范
     */
     typeof exports === 'object' && typeof module !== 'undefined'
       ? (module.exports = factory())
       : typeof define === 'function' && define.amd
       ? define(factory)
       : ((global = global || self), (global.myFunc = factory()))
   })(this, function () {
     'use strict'
     var main = () => {
       return 'UMD'
     }
     return main
   })
   ```

5. ES Modules - 是js官方的标准化模块系统

   ```js
   //main.js
   export function name() {
     return 'NAME';
   }
   export const FOO = 'FOO'
   ```

   `index.html`,注意需要使用http协议打开html文件才生效

   ```html
   <h2 id="box"></h2>
   <script type="module">
     import {name} from './main.js'
     var box = document.getElementById('box')
     box.innerText = name()
   </script>
   ```

   https://zhuanlan.zhihu.com/p/108217164

   ESModule和commonjs的区别？

   ESModule -> 值的引用

   commonjs -> 值的拷贝

   **import优先执行**

   ```js
   console.log('index.js中的内容')
   //这里a.js中的内容会优先执行
   import {age} from './a.js'
   ```

   **注意：export会有变量提升的效果**

   ESModule之所以能**tree-shaking**，主要原因是：

   1. `import` 只能作为模块顶层的语句出现，不能出现在function或者if里面
   2. `import`的模块名只能是字符串常量
   3. `import`在模块初始化的时候所有`import`都必须已经导入完成
   4. `import binding`是`immutable`的，类似const

   **Tree-Shaking**的副作用

   ```js
   // effect.js
   console.log(demo())
   export function demo() {
     console.log(1)
   }
   // index.js
   import { demo } from './effect'
   console.log('index')
   ```

   运行命令:`npx rollup index.js --file bundle.js`

   打包的结果：

   ```js
   console.log(demo());
   function demo() {
     console.log(1);
   }
   
   console.log('index');
   ```

   运行命令(指定没有副作用)：`npx rollup index.js --file bundle-no-effect.js --no-treeshake.moduleSideEffects`

   结果:

   ```js
   console.log('index');
   ```

   

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

#### 项目配置

`tsconfig.json`

```json
{
  "compilerOptions": {
    /* Basic Options */
    // "incremental": true,                   /* Enable incremental compilation */
    "target": "es5",                          /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019', 'ES2020', or 'ESNEXT'. */
    "module": "commonjs",                     /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', 'es2020', or 'ESNext'. */
    "outDir": "./js",                        /* Redirect output structure to the directory. */
    /* Strict Type-Checking Options */
    "strict": true,                           /* Enable all strict type-checking options. */
  
    "esModuleInterop": true,                  /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */
    /* Experimental Options */
     "experimentalDecorators": true,        /* 支持装饰器 Enables experimental support for ES7 decorators. */
   
    "forceConsistentCasingInFileNames": true  /* Disallow inconsistently-cased references to the same file. */
  }
}

```



#### 1.安装

```shell
npm install typescript -g
tsc -v #查看是否安装成功
tsc --init #生成配置文件
```

在vscode中自动编译生成js

`终端`->`运行任务`->`typescript`

**vscode报错无法执行的问题**

```
无法加载文件 D:\nodejs\node_global\tsc.ps1，因为在此系统上禁止运行脚本…
```

> 1.以管理员身份运行vscode
>
> 2.`get-ExecutionPolicy`,显示`Restricted`，表示状态是禁止的
>
> 3.再执行：`set-ExecutionPolicy RemoteSigned`，就显示`RemoteSigned`
>
> 4.执行1，会发现状态已改变，此时可以了

#### 2.数组的定义

第一种

```ts
let arr: number[] = [1, 2, 3]
let arr: [number, string] = [11, 'ui']
```

第二种

```ts
let arr: Array<number> = [1, 2, 3]
let arr: Array<number | string> = [11, 'ui']
```

第三种

```ts
let arr: any = [11, 33, 'hello']
```

元祖类型(tuple)-固定长度的数组

```ts
let arr: [number, string, boolean] = [11, 'str', true]
```

#### 3.any

```ts
let box: any = document.getElementById('box');
box.style.color = 'red';
```

#### 4.枚举类型

```ts
enum colors {
  red,
  blue = 99,
  green
}
console.log(colors.green) //100,没有赋值则返回索引值
//如果blue不是数值，则其后面的green也需要赋值，否则报错

```

#### 5.void

- 表示没有任何类型，一般用于定义方法的时候方法没有返回值

```ts
function fn(): void {
  console.log('fn')
}
fn()
```

- 有返回值,则需要定义返回值的类型

```ts
function fn(): string {
  console.log('fn')
  return 'str'
}
fn()
```

#### 6.never

```ts
function fn():never {
  throw new Error('报错')
}
//永远不会返回结果
```

#### 7.函数

可选参数(可选参数放后面)

```ts
function getInfo(name: string, age?: number): string {
  if (age === undefined) return name + '年龄保密'
  return name + age
}
```

默认参数

```ts
function getInfo(name: string, age: number = 12): string {
  if (age === undefined) return name + '年龄保密'
  return name + age
}
```

剩余参数

```ts
function sum(...res: number[]) {
  return res.reduce((cur, acc) => cur + acc)
}
console.log(sum(1, 2, 3, 4, 88))
```

函数重载

> java中方法的重载：指的是两个或者两个以上同名函数，但是它们的参数不一样，这时会出现函数重载的情况
>
> ts中的重载：通过为同一个函数提供多个函数类型定义来试下多种功能的目的

```ts
function run(name: string): string
function run(age: number): number
function run(str: any): any {
  if (typeof str === 'string') {
    return `传入的是字符串：${str}`
  } else {
    return `传入的是数值：${str}`
  }
}
```

#### 8.类

##### 8.1 ts中定义类

```js
class Person {
  name: string
  run():void {
    console.log('run')
  }
  constructor(name: string) {
    this.name = name
  }
}

let p = new Person('花满楼')
p.run()
```

##### 8.2 继承

```ts
class Person {
  name: string
  run(): void {
    console.log(`${this.name}在跑步~~~`)
  }
  constructor(name: string) {
    this.name = name
  }
}
//使用extends和super实现
class Man extends Person {
  constructor(name: string) {
    super(name)
  }
}

let m = new Man('man')
m.run()
```

##### 8.3 类中的修饰符

- `public` 默认的，公有属性：类自身，子类，类外面可以访问

- `protected`  保护类型：在类里面，子类可以访问，在类外部没法访问

  ```ts
  class Person{
    protected name: string
  }
  var p = new Person //此处为类的外部，访问name会报错
  //Person的子类是Man
  class Man extends Person{} //Man是Persn的子类，可以访问name
  ```

- `private`  私有属性：在类里面可以访问，子类和类外面没法访问

  ```ts
  class Person{
    private name: string
  }
  var p = new Person //此处为类的外部，访问name会报错
  //Person的子类是Man
  class Man extends Person{} //Man是Persn的子类，访问name也会报错
  ```

##### 8.4 静态方法

在类的实例方法前添加`static`关键字

```ts
class Person {
  static speak() {
    console.log('静态方法')
  }
}

Person.speak()
```

##### 8.5 多态

父类定义一个方法不去实现，让继承它的子类去实现，每一个子类有不同的表现

是继承的表现

```ts
class Animal {
  name: string
  constructor(name: string) {
    this.name = name
  }
  eat() {}
}

class Dog extends Animal {
  constructor(name: string) {
    super(name)
  }
  eat() {
    return this.name + '喜欢吃肉'
  }
}

let d = new Dog('旺财')
console.log(d.eat())

class Cat extends Animal {
  constructor(name: string) {
    super(name)
  }
  eat() {
    return this.name + '喜欢吃鱼'
  }
}

let c = new Cat('花花')
console.log(c.eat())
```

##### 8.6抽象类

它是提供其他类继承的基类，不能直接被实例化

用`abstract`关键字定义抽象类和抽象方法，抽象类中的抽象方法不包含具体实现并且必须在派生类中实现

抽象方法只能放在抽象方法中

**抽象类的子类中必须实现抽象类里面的抽象方法，就是eat必须有**

```ts
abstract class Animal {
  //抽象方法
  abstract eat(): any
}
// let a = new Animal() // 无法创建抽象类的实例
class Dog extends Animal {
  //抽象类的子类中必须实现抽象类里面的抽象方法，就是eat必须有
  eat() {
    console.log('eat')
  }
}
```

#### 9.接口

接口的作用：在面向对象的编程中，接口是一种规范的定义，它定义了行为和动作的规范，在程序设计里面，接口起到一种限制和规范的作用

##### 1.属性接口

```ts
interface IFullName {
  firstName: string
  lastName: string
  //可选属性
  age?: number
}

function getInfo(nameObj: IFullName) {
  if(nameObj.age === undefined) return 'no age'
  return (nameObj.firstName + nameObj.lastName)
}
let n = {
  firstName: 'FIRST',
  lastName: 'LAST',
  // age: 99
}
console.log(getInfo(n))
```

##### 2.函数类型接口

对方法传入的参数以及返回值进行约束

```ts
interface encrypt {
  (key: string, value: string): string
}

let md5: encrypt = function (key: string, value: string) {
  return key + value
}
console.log(md5('name', '犀牛'))

let sha1: encrypt = function (key: string, value: string) {
  return key + value + 'xxxx'
}
console.log(sha1('name', '犀牛'))
```

##### 3.可索引接口

对数组和对象的约束

```ts
//约束数组
interface UserArr {
  [index: number]: string
}
let arr: UserArr = ['AAA', 'BBB']
//约束对象
interface UserObj {
  [index: string]: string
}
let arr1:UserObj = {
  name: 'xx',
  favs: 'ball'
}
```

##### 4.类类型接口

注意`implements`执行 关键字

```ts
interface IAnimal {
  name: string
  eat(str: string): void
}
class Dog implements IAnimal {
  name: string
  constructor(name: string) {
    this.name = name
  }
  eat() {
    console.log(this.name)
  }
}
var d = new Dog('旺财')
d.eat()
```

##### 5.接口继承

```ts
interface IAnimal {
  eat(): void
}
interface IPerson extends IAnimal {
  work(): void
}
class Person {
  run() {
    console.log('run')
  }
}
//extends-类继承    implements-接口继承
class Man extends Person implements IPerson {
  eat() {
    console.log('eat')
  }
  work() {
    console.log('work')
  }
}
let m = new Man()
m.eat()
m.work()
m.run()
```

#### 10.泛型

软件工程中，我们不仅要创建一致的定义良好的API,同时也要考虑可重用性。组件不仅能够支持当前数据类型，同时也能支持未来的数据类型，这在创建大型系统时为你提供了十分灵活的功能

`泛型就是解决类接口方法的重用性，以及对不确定数据类型的支持`

T表示泛型，具体什么类型是调用这个方法的时候决定的,这个大写的T可以用其他任意大写字母代替

```ts
function getData<T>(value: T): T {
  return value
}
console.log(getData<string>('hooks'))
console.log(getData<number>(9))
```

```ts
class MinClass<T> {
  list: T[] = []
  add(n: T): void {
    this.list.push(n)
  }
  min(): T {
    let res = this.list[0]
    this.list.forEach((item) => {
      if (item < res) res = item
    })
    return res
  }
}
var m1 = new MinClass<number>()
m1.add(1)
m1.add(4)
m1.add(44)
console.log(m1.min())
var m2 = new MinClass<string>()
m2.add('AA')
m2.add('BB')
m2.add('CC')
console.log(m2.min())

```

```ts
class User {
  name: string | undefined
  pass: string | undefined
  constructor(name: string, pass: string) {
    this.name = name
    this.pass = pass
  }
}
let u = new User('admin', '123456')
//泛型类
class MySql<T> {
  add(user: T): boolean {
    return true
  }
}
let DB = new MySql<User>()
DB.add(u)
```

#### 11.命名空间

命名空间：内部模块，主要用于组织代码，避免命名冲突

模块：ts的外部模块的简称，侧重代码的复用，一个模块里可能会有多个命名空间

```ts
//a.ts
export namespace A {
  class Animal {...}
} 

//index.ts
import { A } from './a.ts'
A.Animal()
```

#### 12.装饰器

装饰器是一种特殊类型的声明，它能够被附加到类声明，方法，属性或参数上，可以修改类的行为

> 通俗的讲，装饰器就是一个方法，可以注入到类，方法，属性参数上来扩展类，属性，方法参数的功能
>
> 常见装饰器：`类装饰器`、`属性装饰器`、`方法装饰器`、`参数装饰器`
>
> 装饰器的写法：`普通装饰器(无法传参)`,`装饰器工厂(可传参)`

##### 1.1类装饰器-普通装饰器(不传参数)

```ts
function logClass(params: any) {
  //params就是Animal类，所以可以在其原型上扩展属性和方法
  params.prototype.say = () => {}
}
@logClass
class Animal {
  name: string
  constructor(name: string) {
    this.name = name
  }
}
var a: any = new Animal('犀牛')
a.say()
```

##### 1.2类装饰器-装饰器工厂(传参)

```ts
function logClass(params: string) { //params指的是传入的参数
  return function(target) {//target指的是Animal这个类
    target.prototype.content = params
  }
}
@logClass('我是装饰器的参数')
class Animal {
  name: string
  constructor(name) {
    this.name = name
  }
}
var a = new Animal('犀牛')
console.log(a.content)
```

##### 1.3类装饰器重载

就是重新定义类中的属性和方法

```ts
function logClass(params: any) {
  return class extends params {
    name: string
    constructor() {
      super()
      this.name = '修改后的名字'
    }
    walk() {
      console.log(this.name + 'xxxxxx')
    }
  }
}
@logClass
class Animal {
  name: string
  constructor(name: string) {
    this.name = name
  }
  walk() {
    console.log(this.name)
  }
}
var a = new Animal('犀牛')
a.walk()
```

##### 2.1属性装饰器

属性装饰器会在运行时当做函数被调用，并传入2个参数：

> 1.对于静态成员来说是类的构造函数|对于实力成员来说是类的原型对象
>
> 2.成员的名字

```ts
function logClass(params: any) {
  //params就是Animal类，所以可以在其原型上扩展属性和方法
  params.prototype.say = () => {}
}
//属性装饰器
function logProps(params: any) {
  return function (target: any, propName: any) {
    console.log(params) //属性装饰器传递的参数
    console.log(target) //类的构造函数
    console.log(propName) //属性名称
    target[propName] = params //在这里可以修改属性的值了
  }
}
@logClass
class Animal {
  name: string
  @logProps('www.baidu.com')
  propsTest: string | undefined
  constructor(name: string) {
    this.name = name
  }
  getData() {
    console.log(this.propsTest)
  }
}
var a: any = new Animal('犀牛')
a.getData()
```



##### 3.方法装饰器

有3个参数

> 1.对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
>
> 2.成员的名字
>
> 3.成员的属性描述符

```ts
function logMethods(params: any) {
  return function (target: any, attrName: any, desc: any) {
    //  console.log(target)
    //  console.log(attrName)
    //  console.log(desc)
    //添加属性
    target.url = 'http://www.baidu.com'
    //添加方法
    target.run = function () {
      console.log(this.name + 'RUNING')
    }
    //修改方法,即修改desc.value
    //保存原来的方法
    let oMethod = desc.value
    desc.value = function (...args: any[]) {
      //原来的方法也会执行，参数会传递过去
      oMethod.apply(this, args)
      //全部转换为字符串
      return [...args].map((item) => `str-${item}`)
    }
  }
}
class Animal {
  name: string
  constructor(name: string) {
    this.name = name
  }
  @logMethods('COOL')
  getData() {
    console.log('我是getData内部的方法', this.name)
  }
}
var a: any = new Animal('犀牛')
// console.log(a.url)
a.run()
console.log(a.getData(999, 'xxx'))

```

##### 4.参数装饰器

有三个参数

> 1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
> 2. 方法的名字
> 3. 参数在函数列表中的索引

```ts
function logParams(params: any) {
  return function (target: any, paramName: any, paramIndex: any) {
    console.log(target)
    console.log(paramName)
    console.log(paramIndex)
    target.apiUrl = params
  }
}

class Animal {
  h() {}
  getData(@logParams('pk') id: string) {
    console.log('getData内部的方法')
  }
}
var a: any = new Animal()
console.log(a.apiUrl)
```

##### 5.装饰器的执行顺序

> 属性装饰器
>
> 方法装饰器
>
> 方法参数装饰器2
>
> 方法参数装饰器1
>
> 类装饰器2
>
> 类装饰器1



















### Vue2

#### Object.defineProperty

属性：

- `value`默认是`undefined`
- `writable`默认是 `false` (是否可写)
- `enumerable`默认是`false`(是否可以枚举，为true时，在控制台打印不会是灰色的，只有为true的时候，才能被for in枚举)
- `configurable`默认是`false`(是否可被配置，只有值是true,该属性的描述符才能被改变)

```js
Object.defineProperty(obj, 'name', {
  // writable: true, //是否可写
  // enumerable: true, //是否可以枚举,默认是false,设置为true的话，在控制台打印该属性会高亮
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

历史中的方案：

1. 纯DOM

   ```js
   for(let i = 0 ; i< data.length; i++) {
     let oli = document.createElement('li')
     oli.innerText = data[i].name
     list.appendChild(oli)
   }
   ```

2. 数组join

   ```js
   //让结构有层次感
   for (let i = 0; i < data.length; i++) {
     list.innerHTML += [
       '<li>'+ data[i].name + '</li>',
       '<li>',
       ' <p>'+ data[i].price + '</p>', 
       '</li>'
       ].join('')
   }
   ```

3. ES6反引号-支持换行

   ```js
   for(let i = 0; i < data.length; i++) {
     list.innerHTML += `
       <p>名字:${data[i].name}</p>
       <p>价格:${data[i].price}</p>
     `
   }
   ```

4. 模板引擎-mustache **Logic-less**

   https://github.com/janl/mustache.js

   基本使用:

   - 循环

     {{#arr}}---循环开始

     {{/arr}}---循环结束

     简单数组，直接用{{.}}

   - 支持嵌套

   - 变量直接使用

   - 布尔值

   - 可以把以下模板字符串的内容写在script标签中

     ```html
     <script type="text/template" id="tm">
     	<h1>{{name}}</h1>
     	...
     </script>
     <script>
     	document.getElementById('tm').innerHTML
     </script>
     ```

     

   ```js
   var str = `
      <h1>{{name}}</h1>
     <ul>
       {{#data}}
         <li>
           <div>{{name}}的详情：</div>
           <p>名字：{{name}}</p>
           <p>价格：{{price}}</p>
           <p>颜色有：</p>
           <ul>
             {{#colors}}
               <li>{{.}}</li>
             {{/colors}}
           </ul>
         </li>
       {{/data}}
     </ul>
     {{#show}}
       <h1>好</h1>
     {{/show}}
     `
   var dataObj = {
     name: 'KB',
     data,
     fruits: ['香蕉', '苹果', '梨子']
   }
   var domStr = mustache.render(str, dataObj)
   document.getElementById('mustache').innerHTML = domStr
   ```

   实现机理：

   > 模板字符串 (编译)-> TOKENS (解析，结合数据)->DOM字符串

​		tokens:代号，符号

- tokens是一个`JS的嵌套数组`，就是模板字符串的JS表示

- 它是"抽象语法树"、"虚拟节点"的开山鼻祖

  简单---模板字符串： `<h3>今天是{{thing}},我心情{{feel}}</h3>`

  tokens: 每一项是一个token

  ```
  [
  	["text": "<h1>今天是"],
  	["name": "thing"],
  	["text": ",我心情"],
  	["name": "feel"]
  	["text": "</h1>"]
  ]
  ```

  数组---模板字符串：

  ```html
  <ul>
    <#arr>
      <li>{{.}}</li>
    </arr>
  </ul>
  ```

  tokens:

  ```
  [
  	["text": "<ul>"],
  	["#", "arr", [
  		["text", "<li>"],
  		["name", "."],
  		["text", "</li>"]
  	]],
  	["text", "</ul>"]
  ]
  ```

  嵌套---数组循环...

​	mustache底层重点做2个事情：

​	①将模板字符串编译为tokens形式

​	②将tokens结合数据，解析为dom字符串

**具体实现:**

1. 定义扫描器类

   定义scan scanUntil方法，移动指针，把{{}}前后的内容抽离出来

   ```js
   export default class Scanner {
     constructor(templateStr) {
       //模板字符串定义到实例上
       this.templateStr = templateStr
       //指针
       this.pos = 0
       //尾巴-模板字符串的剩余部分
       this.tail = templateStr
     }
     //扫描方法：移动指针
     scan(tag) {
       if (this.tail.indexOf(tag) === 0) {
         this.pos += tag.length
         this.tail = this.templateStr.substring(this.pos)
       }
     }
     //让指针进行扫描，遇到指定内容结束，并且能够返回之前扫描的内容
     scanUntil(endTag) {
       let startPos = this.pos
       //当尾巴的开头不是endTag的时候，说明没有扫描到endTag
       while (!this.eos() && this.tail.indexOf(endTag) != 0) {
         this.pos++
         //尾巴是剩余字符串
         this.tail = this.templateStr.substring(this.pos)
       }
       return this.templateStr.substring(startPos, this.pos)
     }
     //返回布尔值  endOfString,判断指针是否到头
     eos() {
       return this.pos >= this.templateStr.length
     }
   }
   ```

2. 定义转换方法，**parseTemplateToTokens**

   ```js
   var scanner = new Scanner(templateStr)
   var words
   //让扫描器开始工作
   while (!scanner.eos()) {
     //收集开始标记之前的内容
     words = scanner.scanUntil('{{')
     scanner.scan('{{')
     // console.log(words)
     words && tokens.push(['text', words])
     //收集标记之间的内容
     words = scanner.scanUntil('}}')
     scanner.scan('}}')
     // console.log(words)
     if (words) {
       if (words.startsWith('#')) {
         tokens.push(['#', words.substring(1)])
       } else if (words.startsWith('/')) {
         tokens.push(['/', words.substring(1)])
       } else {
         tokens.push(['name', words])
       }
     }
   ```

3. 折叠tokens

   ```js
   let res = []
     //定义一个栈，用来存储#的内容
     let stack = []
     //定义一个收集器,让他指向res目标结果
     let collector = res
     let i = 0
     while (i < tokens.length) {
       let token = tokens[i]
       switch (token[0]) {
         case '#':
           //入栈
           stack.push(token)
           //收集器收集token
           collector.push(token)
           //收集器改变指针的内存地址,指向token[2],并且开始收集下面的token
           collector = token[2] = []
           break
         case '/':
           //出栈
           stack.pop()
           //重新改变收集器的指向
           collector = stack.length > 0 ? stack[stack.length - 1][2] : res
           break
         default:
           collector.push(token)
       }
       i++
     }
   ```

   此时的tokens是

   ![](\img\VUE_mustache_tokens.png)

4. 把tokens数组结合数据生成dom字符串

   ```js
   import lookup from './lookup'
   import parseToken from './parseToken'
   export default function renderTemplate(tokens, data) {
     // console.log(tokens)
     let resStr = ''
     for (let i = 0, len = tokens.length; i < len; i++) {
       let token = tokens[i]
       if (token[0] === 'text') {
         resStr += token[1]
       } else if (token[0] === 'name') {
         resStr += lookup(data, token[1])
       } else if (token[0] === '#') {
         //#的处理,获取数组中循环的数组
         resStr += parseToken(token, data)
       }
     }
     return resStr
   }
   ```

   遇到#,则要写个方法`parseToken`去处理这种情况

   ```js
   import renderTemplate from './renderTemplate'
   import lookup from './lookup'
   export default function parseToken(token, data) {
     var resStr = ''
     var arr = lookup(data, token[1])
     // console.log(arr)
     for (let i in arr) {
       resStr += renderTemplate(token[2], arr[i])
     }
     // console.log(resStr)
     return resStr
   }
   ```

   `lookup`用来处理 `a.b.c`对象读取不了这种字符串的问题，注意`{{.}}`这种情况



#### 响应式原理

- `defineReactive` - 劫持对象的属性

- `Observer` - 该类将一个正常的`object`转换为每一个层级的属性都是响应式的

- `observe` - 该方法给obj添加`__ob__`属性(该属性就是`new `出来的`Observer`)

- `def` - 把对象变成响应式的，接收4个参数

- 添加对数组的监听-改写了数组的7个方法

  > - push
  > - pop
  > - shift
  > - unshift
  > - splice
  > - sort
  > - reverse

- 这里有几个注意点：

  ```js
  //1.暴露arrayMethods
  export const = arrayMethods = Object.craete(Object.craete(Array.prototype))
  arrays = [...]
  arrays.forEach(name => {
      //备份原始的方法
      //def arrayMethods的属性
      //def 过程中取出__ob__,并对push、unshift、splice可能添加元素的方法，做响应式处理
      //函数中的arguments是类数组，记得转换一下
      //实际调用原始的方法，并改变其this指向
  })
  //在Observer中，强制改变数组的原型  Object.setPrototypeOf(o, arrayMethods)
  ```

- 依赖收集

  > 需要用到数据的地方，成为依赖
  >
  > 在getter中收集依赖，在setter中触发依赖
  >
  > - 把依赖收集的代码封装成一个`Dep`类，他专门用来管理依赖，每一个`Observer`的实例，成员中都有一个`Dep`的实例
  > - `Watcher`是一个中介，数据发生变化时通知`Watcher`中转，通知组件

  

- Dep 类和Watcher类

  > - 依赖就是`Watcher`。只有`Watcher`触发的`getter`才会收集依赖，哪个`Watcher`触发了`getter`，就把哪个`Watcher`收集到`Dep`中
  > - `Dep`使用发布订阅模式，当数据发生变化时，会循环依赖列表，把所有的Watcher都通知一遍
  > - **`Watcher`把自己设置到全局的一个指定位置，然后读取数据，因为读取了数据，所以会触发这个数据的`getter`。在`getter`中就能得到当前正在读取数据Watcher，并把这个Watcher收集到Dep中**

- Dep

  每一个Observer实例身上都有一个Dep实例

步骤：

> 1.有一个对象`obj`
>
> 2.使用`observe`包装`obj`,给obj添加`__ob__`属性(`new `出来的`Observer`)
>
> 3.会调用`defineReactive`函数，使对象的属性都会被劫持
>
> 4.在`defineReactive`中，会调用``observe``方法，包装其`val` 第三个参数，如果不是对象则不处理;记得在`setter`中也加一个`observe`，预防设置值为一个新的对象，对这个对象也需要监听
>
> 5.至此完成对`obj`属性深层次的监听
>
> 6.处理数组的情况，完成7种方法的改写
>
> 7.依赖收集 Watcher Dep

















































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



#### 自定义指令

一个指令对象可以提供如下几个钩子函数

- `bind`: 只调用一次，指令第一次绑定到元素时调用。这里可以进行初始化的设置。
- `inserted`: 被绑定元素插入父节点时调用(保证父节点存在，但不一定已被插入文档中)
- `update`: 所在组件的VNode更新时调用
- `componentUpdated`: 指令所在组件的VNode及其VNode全部更新后调用
- `unbind`: 只调用一次，指令与元素解绑时调用

指令钩子函数会被传入以下参数：

> - `el` - 指令所绑定的元素，可以直接操作dom
> - `binding` - 一个对象，包含多个属性
>   - name - 指令名
>   - value - 指令的绑定值
>   - oldValue - 指令绑定的前一个值
>   - expression - 字符串形式的指令表达式
>   - arg - 传给指令的参数
>   - modifiers - 一个包含修饰符的对象 `v-my-directive.foo.bar`,修饰对象为`{foo:true, bar:true}`
> - `vnode`
> - `oldVnode`



#### provide/inject传值问题

不是响应的

解决1:传递this

```js
//祖先
export default {
  data() {
    return {
      title: 'xxx'
    }
  },
  provide() {
    return {
      t1: this
    }
  }
}

//子
export default {
  // inject: ['t1']
  inject: {
    t1: {
      default: () => {}
    }
  } 
}
 
//<p>{{t1.title}}</p>
```

解决2：使用Vue.observeable

```js
import Vue from 'vue'
export default {
  methods: {
    change() {
      this.t1.title += '@@'
    }
  },
  provide() {
    this.t1 = Vue.observable({
      title: this.title
    })
    return {
      t1: this.t1
    }
  },
}
```





























### Vue3

#### 搭建项目

```shell
npm init vite-app <project-name>
cd <project-name>
npm install
npm run dev # 启动项目
# or use yarn
yarn create vite-app <project-name>
cd <project-name>
yarn
yarn dev
```



#### 属性继承

如果不希望组件的根元素继承 attribute，你可以在组件的选项中设置 `inheritAttrs: false`

子组件

```vue
<input v-bind="$attrs" />
```

#### $nextTick

视图完成更新之后才能获取

```js
{
  mounted() {
    let o1 = document.querySelector('#box')
    o1.innerHtml // old msg
    this.msg = 'new msg'
    let o2 = document.querySelector('#box')
    o2.innerHtml // old msg
    this.$nextTik(() => {
       let o3 = document.querySelector('#box')
    	 o3.innerHtml // new msg
    })
  }
}
```

#### 全局挂载属性

```js
import { creatApp } from 'vue'
import Axios from 'axios'
import App from './App'

const app = createApp(App)
app.config.globalProperties.Axios = Axios //其他组件就可以直接this.Axios使用了
app.mount('#app')
```



#### mitt

安装

```shell
npm install mitt
```

使用[`model/event.js`]

```js
import mitt from 'mitt'
export default mitt()
```

```js
import event from './model/event.js'
//发送、广播
event.emit('自定义事件名称', '数据')
//接收信息
event.on('自定义事件名称', data => {
  console.log(data) //接收到的数据
})
event.off('自定义事件名称')
```

#### 百度接口：

https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=ui

jsonp形式要加 cb

https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=ui&cb=xxx

#### less

```shell
yarn add less-loader less --save-dev
```

新建一个`common.less`

```less
div {
  background-color: #bfc;
}
// 定义变量
@base-color: #006fd1;
```

vue组件中使用

```vue
<style lang="less">
@import url(test.less);
.home {
  h3 {
    color: @base-color;
  }
}
</style>
```

使用`Volar`插件支持script 标签中 setup语法糖

#### Teleport

Vue3.x中的组件模板属于该组件，有时候我们想把模板的内容移动到当前组件之外的DOM中，这个时候就可以使用 Teleport。

例如模态框组件

```vue
<!-- <teleport to="#app"> -->
<teleport to="body">
  <div class="modal-wrapper" v-show="visible">
    <div class="modal-content">
      <h3>模态框</h3>
      <button @click="close">点击关闭</button>
    </div>
  </div>
</teleport>
```

#### 单文件组件

`<script setup>`是在单文件组件 (SFC) 中使用`组合式API`的编译时语法糖，相比于普通的`script`语法，它具有更多优势：

- 更少的样板内容，更简洁的代码
- 能够使用纯TS声明props和抛出事件
- 更好的运行时性能

```vue
<script setup lang="ts">
  //引入组件后无需注册，直接使用
  import Modal from './modal.vue'
  // 变量
	const msg = 'Hello!'
  const props = defineProps({
    visible: Boolean
  })
  const emit = defineEmits(['close'])
  function close() {
    emit('close')
  }
</script>

<template>
	<p>{{ msg }}</p>
  <Modal :visible="isShow" @close="close"></Modal>
</template>
```

#### 组合式API

composition-api提供了以下几个函数

- setup

- ref

  > `ref`实现对简单值的监听，其底层的本质是`reactive`,
  >
  > `ref(xx) -> reactive({value:xx})`
  >
  > 在template模板中直接使用变量名即可
  >
  > 在js代码中需要使用**`变量名.value`**
  >
  > **Vue解析数据之前，会自动判断这个数据是不是ref类型。会根据数据中的`__v_ref`属性来判断的。也可以根据Vue中封装好的方法来判断 `isRef`  `isReactive`来判断**

- reactive

  参数是对象/数组

  ```vue
   setup(props) {
      let title = ref('犀牛')
      let info = reactive(['AAA'])
      function handle1() {
        console.log(title.value)
        title.value += '+'
      }
      function handle2() {
        console.log(info)
        info.push('+')
      }
      return {
        title,
        info,
        handle1,
        handle2
      }
    }
  ```

  

- watchEffect

  ```js
  import { watchEffect, reactive } from 'vue'
  let data = reactive({
    count: 0
  })
  watchEffect(() => {
    console.log('count改变了', data.count)
  })
  watch(data, (newVal, oldVal) => {
    console.log('newVal', newVal)
    console.log('oldVal', oldVal)
  })
  ```

- watch

  > - 懒执行，也就是说仅在侦听的源变更时才执行回调
  > - 更明确哪些状态的改变会触发侦听器重新运行
  > - 访问侦听状态变化前后的值

- computed

  ```js
  import { computed } from 'vue'
  let msg = reactive({
    firstName: '',
    lastName: ''
  })
  let fullName = computed(() => {
    return msg.firstName + '--' + msg.lastName
  })
  ```

  

- toRefs

  将某个对象的多个属性变成响应式的数据

  结构reactive定义的对象的属性

  ```js
  import { toRefs } from 'vue'
  //...
  export default {
    setup() {
      let msg = reactive({
        desc: '描述信息',
        num: 99
      })
      return {
        ...toRefs(msg)
      }
    }
  }
  ```

  ```vue
  {{ desc }} -- {{ num }}
  ```

  

- 生命周期的hooks

​		没有了`created 和 beforeCreate`钩子，因为setup就是在这两个状态之间执行的

>`onBeforeMount
>onMounted
>onBeforeUpdate
>onUpdated
>onBeforeUnmount
>onUnmounted`

#### provide/inject

解决多层嵌套组件之间的传值问题

1. setup语法糖形式的写法

   App.vue

   ```vue
   <script setup lang="ts">
   	import { provide } from 'vue'
     provide('title', 'App组件的标题')
     provide('info', {
       name: 'APP',
       age: '18'
     })
   </script>
   ```

   Son.vue

   ```vue
   <script setup lang="ts">
   import { inject } from 'vue'
   let title = inject('title')
   </script>
   <template>
     <h3>SON...</h3>
     <p>{{ title }}</p>
   </template>
   ```

2. 组合式API

   ```js
   import { provide } from 'vue'
   export default {
     setup() {
       provide('title', 'App组件的标题')
     }
   }
   ```

   ```js
   import { inject } from 'vue'
   export default {
     setup() {
       let title = inject('title')
       return { title }
     }
   }
   ```

   

3. 非组合式API 

   ```js
   export default {
     provide() {
       return {
         title: 'App组件的标题'
       }
     }
   }
   ```

   ```js
   export default {
     inject: ['title']
   }
   ```

   注意：如果在`setup`和`methods`中都定义了一个方法`test`，那么`methods`中的test会替换`setup`中的`test`方法





























### V2和V3区别

#### 1.环境变量

这里主要是因为构建工具的区别webpack和vite，与vue版本关系不大

`.env.development`

V2(webpack):

定义：

```
#要以VUE_APP开头
VUE_APP_MY_TITLE=PLUS-DEVELOPMENT
```

获取：

```js
console.log(process.env)
```

V3(vite):

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

使用**vite**初始化一个项目

```shel
yarn create vite my-react-ts --template react-ts
```

```js
ReactDOM.render(
  //进行 strict mode 检查
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
```

#### 1.把interface抽离到一个文件

新建`index.ts`

```typescript
export interface Icommom {
  name: string,
  age: number
}
```

#### 2.创建别名@

在`vite.config.ts`中配置

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
const path = require('path')
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src')
      }
    ]
  }
})
```

配置完之后，在项目中使用别名会有红波浪线提示，消除提示，按如下步骤：

在`tsconfig.json`配置中添加如下配置

```json
{
  "compilerOptions": {
    ...
    "baseUrl": "./src",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```



### Solidjs

### Vite

vue3+ts

react+ts

```
# npm 6.x
npm init vite@latest my-vue-app --template vue

# npm 7+, 需要额外的双横线：
npm init vite@latest my-vue-app --template vue

# yarn
yarn create vite my-vue-app --template vue

# pnpm
pnpm create vite my-vue-app --template vue
```

模板选项：`vanilla`，`vanilla-ts`，`vue`，`vue-ts`，`react`，`react-ts`，`preact`，`preact-ts`，`lit`，`lit-ts`，`svelte`，`svelte-ts`

### Webpack

https://zhuanlan.zhihu.com/p/44438844

copy一个文件，不希望被打包

业务场景：H5 vue 拓展性，图片,回答不是很好。7个人，14个人，vue3+ts+vite  vue2

PC + H5 +小程序  SCRM

上海 ： 小程序(计划中。。。)



### Rollup

官网:https://www.rollupjs.com

命令行：

```shell
rollup main.js --file bundle.js --format umd --name "myBundle"
rollup src/main.js -o bundle.js -f cjs
```

rollup.config.js

```js
export default {
  input: 'main.js',
  output: {
    file: 'bundle.js',
    format: 'umd'
  }
}
```

配置config.js文件之后，在命令行输入`rollup -c`默认会找`rollup.config.js`

也可以指定rollup.config.js

```shell
rollup -c my.config.js
```

> `-f/--output.format`	指定所创建的bundle.js的类型: 
>
> - amd--异步模块定义-RequireJS
> - cjs--CommonJS-nodejs
> - esm--将软件包保存为ES模块文件，在现代浏览器中可以通过`<script type="module"></script>`标签引入
> - iife--自动执行
> - umd--通用模块，以amd、cjs、iife为一体
> - system--SystemJS加载器格式
>
> `-w/--watch`	监听源文件是否有变化
>
> `-c/--config`	使用配置文件

rollup起一个服务：

```shell
npm install rollup @babel/core @babel/preset-env rollup-plugin-babel rollup-plugin-serve cross-env -D
```

1. 新建配置文件`rollup.config.js`

   ```js
   import babel from 'rollup-plugin-babel'
   import serve from 'rollup-plugin-serve'
   import livereload from 'rollup-plugin-livereload'
   console.log(process.env.ENV)
   export default {
     input: './src/index.js', //以哪个文件作为打包的入口
     output: {
       file: 'dist/mvvm/Vue.js', //出口路径
       name: 'Vue', //指定打包后全局变量的名字
       format: 'umd', //统一模块规范
       sourcemap: true //打开源码的调试
     },
     plugins: [
       babel({
         exclude: 'node_modules/**'
       }),
       process.env.ENV === 'development'
         ? serve({
             open: true,
             openPage: '/public/index.html', //默认打开html的路径
             port: 3000,
             contentBase: ''
           })
         : null,
       livereload()
     ]
   }
   
   ```
   
   package.json
   
   ```json
   { 
     "scripts": {
       "start": "cross-env ENV=development rollup -c -w",
       "build": "rollup -c",
     }
   }
   
   ```
   
2. 开启热更新

   ```shell
   npm install rollup-plugin-livereload -D
   ```

   

### Jest

TDD 测试驱动开发

1. 安装`jest`

   ```shell
   yarn add --dev jest
   ```

2. 安装babel

   ```shell
   yarn add --dev babel-jest @babel/core @babel/preset-env
   ```

3. 项目根目录创建`babel.config.js`

   ```js
   module.exports = {
     presets: [['@babel/preset-env', {targets: {node: 'current'}}]],
   };
   ```

4. 使用TS

   ```shell
   yarn add --dev @babel/preset-typescript
   ```

   `babel.config.js`添加如下配置

   ```js
   module.exports = {
     presets: [
       ['@babel/preset-env', {targets: {node: 'current'}}],
       '@babel/preset-typescript',
     ],
   };
   ```

   **创建一个新的文件touch xx.txt**

`index.test.js`

```js
test('1.PROMISE 参数函数会立即执行', () => {
  var string
  new myPromise(() => {
    string = 'foo'
  })
  expect(string).toBe('foo')
}, 500)
it('2.PROMISE 在THEN的回调函数可以拿到resolve的数据', () => {
  var str = 'foo'
  var p = new myPromise((resolve) => {
    setTimeout(() => {
      resolve(str)
    }, 10)
  })
  p.then((res) => {
    expect(res).toBe(str)
    done()
  })
}, 500)
```

`jest.config.js`

```js
module.exports = {
  collectCoverage: true //生成分析界面
}
```

`package.json`

```json
{
  "scripts": {
    "test": "jest",
    "start": "jest --watchAll"
  },
}
```







### sentry

https://zhuanlan.zhihu.com/p/210765546



### MockJS

```shell
npm install mockjs
```

```js
var Mock = require('mockjs')
var data = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'list|1-10': [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1,
      	'ctitle': '@ctitle(2, 4)',
        //中文名称
        'cname': "@cname",
        //中文语句 长度是10-15之间
        'cword': '@cword(10, 15)',
        //中文段落
        'csentence': '@csentence(5, 16)',
        'cparagraph': '@cparagraph',
        //取1-5之间的数值
        'number|1-5': 1,
        //自增
        'increment': '@increment',
        //生成id
        'idCard': '@id()',
        //true表示也生成省
        'city': '@city(false)'
    }]
})
// 输出结果
console.log(JSON.stringify(data, null, 4))
```



### SSO(单点登录)

**Single Sign On**

企业业务整合方案，在企业多个系统中，用户只需要登录一次就可以访问所有相互信任的应用系统。



### SDK&API

SDK-Solftware Development Kit `软件开发工具包`，辅助开发某一类软件的相关文档、范例和工具的集合都叫SDK

API -Application Programming Interface `应用编程接口`

可以把SDK想象成一个虚拟的程序包，在这个程序包中有一份做好的软件功能，这份程序包几乎是全封闭的，只有一个小小接口可以连通外界，这个接口就是API

WebHooks 允许我们通过在github.com订阅事件后或者安装GitHub应用。webhook可以用作升级一个issue追踪，触发CI构建，升级一个后端镜像，部署生产服务等















### 方法库

#### 1.下载流文件

```js
function downloadStream (response, filename, includeSuffix = false) {
  if (response.config.responseType !== "blob") return;
  let blob = new Blob([response.data], {
    type: "application/octet-stream",
  });
  let index = response["headers"]["content-disposition"].lastIndexOf(".");
  let suffix = response["headers"]["content-disposition"].substring(index);
	let finalName = includeSuffix ? filename : filename + suffix;

  if (typeof window.navigator.msSaveBlob !== "undefined") {
    window.navigator.msSaveBlob(blob, finalName);
  } else {
    let blobURL = window.URL.createObjectURL(blob);
    let link = document.createElement("a");
    link.style.display = "none";
    link.href = blobURL;
    link.setAttribute("download", finalName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobURL);
  }
}
```

#### 2.浮点精度以及千分位

```js
/* 
      @param 
      num 需要处理的数据
      cent 保留的位数
      isThousand 是否千分位
      22334455.998877->22,334,455.9989
      */
function numFormatter(num, cent, isThousand) {
  if (isEmpty(num) || isNaN(num)) return 0
  let numSource = num
  // 将num中的$ ,符号剔除
  num = num.toString().replace(/\$|\,/g, '')
  console.log(typeof(99,889))
  if (num < 0) num = num * -1
  num = Math.floor(num * Math.pow(10, cent) + 0.50000000001)
  let cents = num % Math.pow(10, cent)
  num = Math.floor(num / Math.pow(10, cent)).toString()
  cents = cents.toString()
  while (cents.length < cent) cents = '0' + cents
  if (isThousand) {
    num = num.toString().replace(/(?=(?!\b)(\d{3})+$)/g, ',')
  }
  if (numSource < 0) num = `-${num}`
  return cent > 0 ? `${num}.${cents}` : `${num}`
}
```

























### CI/CD

- 提高软件质量
- 效率迭代
- 便捷部署
- 快速交付、便于管理

1. 什么是CI/CD? (integration-集成   delivery-交付  deplyment-部署)
2. 介绍CI/CD流程
3. 前端项目：结合CI/CD流程，实现快速迭代
4. Docker的使用，Jenkins+gitlab+nodejs自动化项目
5. 持续集成工具的介绍：Jenkins、Travis CI、Circle CI

#### 持续集成的组成要素

一个最小化的持续集成系统需要包含以下几个要素

1. **版本管理系统**： 一般用git
2. **构建脚本&工具**：可通过命令行自动执行，(编译、静态扫描、运行测试、样式检查、打包、发布等活动串起来)
3. **CI服务器**：可以检测项目中代码变动，并及时的通过构建机器运行构建脚本，并将集成结果通过某种方式反馈给团队成员。

devOps 开发运维

**高效率、高质量、高产出**

用到的工具：

Jenkins

```shell
#!/bin/sh -l
IP=192.168.1xxx.xxxx
ITEM=/data/www/publish/projectName
# 重命名原来war包
ssh root@$IP 'cd /data/www/publish/projectName && mv dist.war dist_`date +%Y%m%d%H%M`.war'
npm install 
npm run build:war
scp dist.war root@$IP:$ITEM/
#ssh root@$IP "chmod -R 666 $ITEM"


```



Travis CI

Circle CI





















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

#### 3.首屏优化 

首屏加载时间，指的是浏览器从响应用户输入网址，到首屏内容渲染完成的时间，此时整个网页不一定全部渲染完成，但是要展示当前视窗需要的内容，首屏加载是用户体验的重要环节。

问题：如何获取首屏加载的时间？

```js
(performance.timing.domComplete - performance.timing.navigationStart)/1000   //单位是ms
```

解决方案：

1. 减少入口文件体积，常用的手段是**路由懒加载**，只有在解析路由的时候才会加载组件

   ```js
   component: () => import('./componets/xxx.js')
   ```

2. 静态资源本地存储

   > - 后端资源返回：采用HTTP缓存
   >
   > - 前端合理利用localStorage
   >
   > - CDN静态资源缓存
   >
   >   react ，react-dom，axios
   >
   >   在index.html中使用link&script引入。对应的文件也要做一些修改

3. UI框架按需加载

4. 避免组件重复打包

   假设A.js文件是一个常用的库，现在有多个路由使用A.js，这样就造成了重复下载。

   解决方案：在webpack的配置中，修改CommonsChunkPlugin的配置minChunks：2

   minChunks会把使用2次以上的包抽离出来，放进公共依赖文件中，避免了重复加载组件 

5. 图片资源压缩，对于icon可以使用字体库，或者雪碧图，将众多小图标合并到一张图上，减轻http请求的压力

6. 开启GZip压缩

   拆完包之后再用gzip压缩一下，安装`compression-webpack-plugin`

   ```js
   const GZIP = require('compression-webpack-plugin')
   const GzipExtensions = ['js', 'css']
   ...
   new GZIP({
     algorithm: 'gzip',
     test: new RegExp('\\.('+GzipExtensions.join('|')+')$'),
     threshold: 10240,
     minRatio: 0.8
   })
   ```
   
   需要了解的几个概念：
   
   1. FP(First Paint)首次绘制，这个指标用于记录页面第一次绘制像素的时间
   
   2. FCP(First Contentful Paint)首次内容绘制，这个指标用于记录页面首次绘制文本、图片、非空白Canvas或SVG的时间
   
      > 这2指标看起来大同小异，但是FP所消耗的时间一定小于等于FCP
   
   3. LCP(Largest Contentful Paint)，用于记录视窗内最大的元素绘制的时间，该时间会随着页面渲染变化而变化
   
   4. TTI(Time to Tinteractive)。
   
      首次可交互时间
   
      > 1. 从FCP指标后开始计算
      > 2. 持续5s内无长任务(执行时间超过50ms)且无两个以上正在进行中的GET请求
      > 3. 往前回溯至5秒前的最后一个长任务结束时间
   
   5. FID(First Input Delay)首次输入延迟，记录在FCP和TTI之间用户首次与页面交互时响应的延迟good(<100ms) needs improvement(100-300) poor(>300ms)
   
   6. TBT(Total Blocking Time)总阻塞时间，记录在FCP到TTI之间所有长任务的阻塞时间总和。
   
   7. CLS(Cumulative Layout Shift) 累计位移偏移，记录了页面上非预期的位移波动。

#### 4.lighthouse

```shell
yarn add lighthouse global

lighthouse http:127.0.0.1:8080 --view #直接在浏览器打开分析页面
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

#### Vue相关

##### 1.组件间通信

> 1. props
>
>    父组件：
>
>    ```vue
>    <Son :title="title"></Son>
>    ```
>
>    子组件：
>
>    ```js
>    <p>{{ title }}</p>
>    export default {
>      props: {
>        title: '',
>    		data: {
>    			type: Object,
>    			default: () => {}
>    		}
>      },
>      props: ['title', 'data']
>    }
>    //props的值可以是数组，也可以是对象(对象支持类型限制，必要性等操作)
>    ```
>
> 2. 自定义事件
>
>    父组件：
>
>    ```vue
>    <Son :send="getMsg"></Son>
>    ```
>
>    子组件：
>
>    ```js
>    //vue2.x
>    handle(msg) {
>      this.$emit('emit-title', msg)
>    }
>    //vue3.x
>    setup(props, { emit }) {
>      emit('emit-title', 'xxMsg')
>    }
>    ```
>
> 3. `$parent`  & `$children`
>
>    子组件：
>
>    ```js
>    mounted() {
>      this.$parent //能直接获取父组件
>    }
>    ```
>
>    父组件：
>
>    ```js
>    mounted() {
>      this.$children[index] //需要放到异步任务才能读取到子组件，那时候赋值index才能读取
>    }
>    ```
>
> 4. `$attrs`& `$listeners`
>
>    子组件：
>
>    ```js
>    mounted() {
>      this.$attrs //是一个对象 {attrs: attrsParam}
>      this.$listeners['handle']() //就会执行这个回调
>      //this.$listeners是一个对象 {handle: function..., handle1: function...}
>    }
>    ```
>
>    父组件：
>
>    ```js
>    <AboutSon attrs="attrsParam" @handle="doSomeThing" @handle1="doSomeThing1"></AboutSon>
>    ```
>
> 5. `$refs`
>
>    父组件：
>
>    ```vue
>    <Son ref="son"></Son>
>    <script>
>    	export default {
>        mounted() {
>          this.$refs.son //就能获取到子组件的实例，从而可以使用其上的方法
>        }
>      }
>    </script>
>    ```
>
> 6. 使用vuex进行管理
>
> 7. 使用事件总线管理 `eventBus`
>
>    在Vue原型上添加一个vue的实例，把公用的方法和属性放在上面
>
>    ```js
>    Vue.prototype.$bus = new Vue()
>    ```
>
>    使用：
>
>    ```js
>    this.$bus.props //直接公用
>    ```
>
>    事件：
>
>    ```js
>    this.$bus.$emit('event-name', params) //发送事件
>    this.$bus.$on('event-name', (params) => {
>      //...params
>    }) //监听事件
>    
>    this.$bus.$once('event-name', () => {
>      //do sth...
>    }) //监听一次事件
>    this.$bus.$off('event-name') //移除监听事件
>    ```
>
> 8. `provide / inject`
>
>    - 普通方式
>
>      提供数据的组件：
>
>      ```js
>      provide() {
>        return {
>          title: 'provide父组件的信息'
>        }
>      }
>      ```
>
>      获取数据的组件：
>
>      ```js
>      inject: ['title']
>      ```
>
>      缺点：数据无法响应式传递
>
>    - 传递this
>
>      提供数据的组件
>
>      ```js
>      export default {
>        data() {
>          return {
>            title: 'xxx'
>          }
>        },
>        provide() {
>          return {
>            _this: this
>          }
>        },
>      }
>      ```
>
>      使用数据的组件：
>
>      ```js
>      export default {
>        inject: {
>        	_this: {
>            default: () => {}
>          }
>        },
>        mounted() {
>      		this._this.msg // 获取数据
>        }
>      }
>      ```
>
>    - 使用`Vue.observable`
>
>      ```js
>      //具体实现
>      ```
>
> 9. v-model
>
>    是以下示例的语法糖
>
>    ```vue
>    <input :value="title"  @input="title = $event.target.value">
>    ```
>
>    ```vue
>    <myComponent v-model="title"></myComponent>
>    <!-- 相当于 -->
>    Vue.component('my-component', {
>    	template: `<h3>
>          {{value}}
>      </h3>`,
>    	props: ['value'],
>    	methods: {
>    		handleInput() {
>    			this.$emit('input', 'new msg')
>    		}
>    	}
>    })
>    
>    ```
>
> 10. .sync修饰符的使用
>
>     是以下代码的语法糖
>
>     ```vue
>     <base-comp :title.sync="title"></base-comp>
>     ```
>
>     ```vue
>     <base-comp :title="title" @update:title="title = $event"></base-comp>
>     ```
>

##### 2.父子组件生命周期顺序

> 父beforeCreate  ->
>
> 父created ->
>
> 父beforeMount -> 
>
> 子beforeCteate -> 
>
> 子created -> 
>
> 子beforeMount -> 
>
> 子mounted ->
>
> 父mounted

keep-alive: include exclude

修饰符.源码





#### 关注分离

> 是一种思想(Separation of Concerns)

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

#### promise为什么可以连续调用then
#### 超长列表的优化

https://juejin.cn/post/6995334008603148295

https://juejin.cn/post/6844903982742110216

#### http1.0&1.1&2区别？



#### 谈谈闭包？

#### vuex数据太大是如何处理的？

#### promise的all怎么实现的？

#### AMD和CMD和UMD？

#### 应用加壳？

#### webpack优化？treeshaking能那么多体积的代码？

#### 20%的编译速度怎么体现？

#### 做过脚手架开发吗？

#### loader和plugin有什么区别？

#### TOC优化

#### 做过哪些首屏优化



