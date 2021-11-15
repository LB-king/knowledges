https://juejin.cn/user/958429872534056/posts

### postman配置

- 打开manage enviroments

  | VARIABLE | INITIAL VALUE           | CURRENT VALUE                    |
  | -------- | ----------------------- | -------------------------------- |
  | base_url | http://192.168.1.1:2000 | http://192.168.1.1:2000          |
  | token    | 121212                  | 0c5862de82275e1c575fb4ea7f92eaba |

- 在登陆的接口中设置

  ```shell
  {{base_url}}/sso-auth/api/auth/doLogin
  ```

- 在Tests中设置

  ```javascript
  // 把json字符串转化为对象
  var data = JSON.parse(responseBody);
  //获取data对象的token值
  var token = data.data.token; //根据实际参数结构修改
  pm.globals.set("token", token)
  ```

- 在其他接口中 **Hearder**中加入token即可

  | KEY          | VALUE            |
  | :----------- | :--------------- |
  | token        | {{token}}        |
  | Content-Type | application/json |

### vscode 设置

```json
{
  // 窗口缩放
  "window.zoomLevel": 1.1,
  // 按住ctrl+滚轮缩放编辑器
  "editor.mouseWheelZoom": true,
  // 配置是否接收自动更新。更改后需要重新启动。更新是从微软在线服务获取的。
  //  - none: 禁用更新。
  //  - manual: 禁用自动后台更新检查。如果手动检查更新，更新将可用。
  //  - start: 仅在启动时检查更新。禁用自动后台更新检查。
  //  - default: 启用自动更新检查。代码将定期自动检查更新。
  "update.mode": "manual",
  // 安装完prettier插件后，选择配置会生成以下选项
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  // 单引号
  "prettier.singleQuote": true,
  // 末尾逗号none,all,es5
  "prettier.trailingComma": "none",
  // 禁止末尾分号
  "prettier.semi": false
}
```

1. 安装`Prettier - Code formatter`插件，格式化代码的时候选择这个插件。

2. 如果在项目根目录有**.prettierrc** 配置文件。vscode 会以此文件的配置优先

3. 安装`run at broswer`

4. 安装`Code Runner`

5. 安装`vetur`支持`.vue`文件

6. 安装`Live Server`实现热更新，有利于学习验证知识点。ps(在 vscode 打开的目录的根目录下的文件，默认是 index.html)

   bug管理工具https://pingcode.com/  `PingCode`

### ftp传输文件

```shell
ftp 21.22.311.22
#用户名：xxx
#密码：xxx
ftp> lcd D:\
#目前的本地目录：D:\
ftp> cd xxx
#查看目录里的内容
ftp> ls
ftp> put 要发生的文件名.zip
...
Transfer complete

```



### 继承、原型链

1. `instanceof`

   instanceof 运算符用于测试构造函数的`prototype`属性是否出现在某个实例对象的原型链上。

   ```javascript
   function Car(make, model, year) {
     this.make = make
     this.model = model
     this.year = year
   }
   let auto = new Car('XP', '007', 2021)

   console.dir(Car)
   console.log(auto instanceof Car) // true
   console.log(auto instanceof Object) // true

   // 语法 object instanceof constructor
   // object: 某个实例对象
   // constructor: 某个构造函数

   function A() {}
   function B() {}
   function C() {}
   let c = new C()
   B.prototype = c
   let b = new B()
   A.prototype = b
   let a = new A()
   console.log(a instanceof A) //true
   console.log(a instanceof B) //true
   console.log(a instanceof C) //true
   console.log(b instanceof A) //false
   console.log(b.isPrototypeOf(a)) //true
   console.log(b.isPrototypeOf(c)) //false
   ```

2. `prototype`含义就是 函数的原型对象,认为是函数才有的属性,

   `__proto__`非标准属性(隐式原型)，现在一般弃用了

   ```javascript
   function Foo() {}
   let f1 = new Foo()
   console.log(f1.__proto__ === Foo.prototype) // true
   console.log(Foo.prototype.constructor === Foo) // true
   console.log(Foo.prototype.__proto__ === Object.prototype) // true
   console.log(Foo.__proto__ === Object.__proto__) // true
   ```

3. `Object.create` 能定义对象的原型

   ```javascript
   var P = {
     name: 'AAA'
   }
   var a = Object.create(P, {
     age: {
       value: 99
     }
   })
   // 设置a的原型为P
   Object.getPrototype(a) === P //true
   ```

4. `constructor` 属性是对象才拥有的，他是从一个对象指向一个函数。含义就是指向该对象的构造函数(每个对象都可以找到其对应的 constructor)

5. `isPrototypeOf`检测一个对象是否存在于另一个对象的原型链中。某一个对象是否是另一个对象的原型链的一份子

   ```javascript
   let a = {}
   let b = {}
   console.log(Object.prototype.isPrototypeOf(a)) // true
   Object.setPrototypeOf(a, b) // 设置a的原型为b
   console.log(b.isPrototypeOf(a)) // true
   console.log(Object.getPrototypeOf(a) === b)
   ```

6. `Object.setPrototypeOf(obj, prototype)` 方法设置一个指定的对象的原型 ( 即, 内部[[Prototype]]属性）到另一个对象或 null。

   - `obj` 要设置其原型的对象
   - `prototype` 该对象的新原型

   ```javascript
   Object.setPrototypeOf(a, b) //设置b为a的原型
   console.log(a.__proto__ === b) //true
   console.log(a.__proto__.__proto__ === Object.prototype) //true
   ```

7. `Object.getPrototypeOf()` 返回指定对象的原型

   ```javascript
   function User(name) {
     this.name = name
     this.show = function() {
       console.log(this.name)
     }
   }
   let u1 = new User('u1')
   function createByObject(obj, ...args) {
     const constructor = Object.getPrototype(obj).constructor
     rerurn new constructor(...args)
   }
   ```

8. 通过`__proto__`属性来连接对象直到`null`的一条链即为我们所谓的**原型链**

   参考文章解析：

   https://blog.csdn.net/cc18868876837/article/details/81211729

9. `hasOwnProperty`与`in`判断属性是否存在。**自身属性**与**继承属性**，前者(`hasOwnProperty`)只会判断对象有没有某个属性，后者(`in`)会找该对象的原型链是否有该属性

   ```javascript
   let a = { name: 'ok' }
   let b = { age: 12 }
   Object.setPrototypeOf(a, b)
   console.log(a.hasOwnProperty('age')) //false
   console.log('age' in a) //true
   // 加了条件判断就不会去对象的原型链上去找
   for (let i in a) {
     if (a.hasOwnproperty(i)) {
       console.log(i)
     }
   }
   ```

10. `seal` `freeze` `Object.seal(obj)`

obj 要被冻结的对象

```javascript
var obj = { name: 'TEST' }
Object.seal(obj)
obj.name = 'TEST1'
obj.age = 9
obj // {name: "TEST1"}
// seal能改变属性值，但是不能向对象中添加方法
var obj = { name: 'TEST' }
Object.freeze(obj)
obj.name = 'TEST1'
obj.age = 9
obj // {name: "TEST"}
// freeze 不可扩展，又是密封,但是可读
```

11. `getOwnPropertyDescriptor`

    指定对象上一个自有属性对应的属性描述符。（自有属性指的是直接赋予该对象的属性，不需要从原型链上进行查找的属性）

    ```javascript
    var a = { name: 'a' }
    Object.getOwnPropertyDescriptor(a, 'name')
    /*
    {
      value: "张飞"
      writable: true
      enumerable: true
      configurable: true
    }
    */
    ```

12. 继承

    ```javascript
    function User(name) {
      this.name = name
      this.show = function () {
        console.log(this.name)
      }
    }
    var a = new User('AAA') //
    //每次new的时候，会开辟新的内存来存储show方法,因此可以把方法放到原型上实现继承
    User.prototype = {
      constructor: User,
      show() {},
      say() {}
    }
    ```

### 数组的拷贝

- 浅拷贝-对象的内存地址一样

  ```javascript
  var a = [11, 22, 33]
  // 1.直接赋值
  var b = a
  b[2] = 88
  a // [11, 22, 88]
  b // [11, 22, 88]
  ```

  ```javascript
  // 2.使用valueOf()
  var b = a.valueOf()
  b[2] = 88
  a // [11, 22, 88]
  b // [11, 22, 88]
  ```

- 深拷贝

  ```javascript
  // 1.展开操作符
  var a = [1, 2, 3]
  var b = [...a]
  a[2] = 88
  a // [1, 2, 88]
  b // [1,2,3]
  ```

  ```javascript
  // 2.Array.of(...arr)
  var a = [1, 2, 3]
  var b = Array.of(...a)
  a[2] = 88
  a // [1, 2, 88]
  b // [1, 2, 3]
  ```

  ```javascript
  // 3.new Array
  var a = [1, 2, 3]
  var b = new Array(...a)
  a[2] = 88
  a // [1, 2, 88]
  b // [1, 2, 3]
  ```

  ```javascript
  // 4.Array(...arr)
  var a = [1, 2, 3]
  var b = Array(...a)
  a[2] = 88
  a // [1, 2, 88]
  b // [1, 2, 3]
  ```

  ```javascript
  // 5.slice
  var a = [1, 2, 3]
  var b = a.slice(0)
  a[2] = 88
  a // [1, 2, 88]
  b // [1, 2, 3]
  ```

  ```javascript
  // 6.concat
  var a = [1, 2, 3]
  var b = a.concat()
  a[2] = 88
  a // [1, 2, 88]
  b // [1, 2, 3]
  ```

### call 和 apply

- `call()`方法使用一个指定的`this`值和单独给出的一个或多个参数来调用一个函数
- 该方法的语法和作用与`apply()`相似，只有一个区别，那就是`call()`方法接受的是一个**参数列表**，而`apply()`接受的是**一个包含多个参数的数组**。

```javascript
function Foo(name, price) {
  this.name = name
  this.price = price
}
function Bar(name, price, age) {
  // Foo.call(this, name, price)
  Foo.apply(this, [name, price])
  this.age = age
}
let res = new Bar('kobe', 33, 40)
console.log(res) //{name: "kobe", price: 33, age: 40}

var A = {
  name: 'AAA',
  say() {
    console.log(this.name)
  }
}
var B = {
  name: 'BABY'
}

//现在要让B也有A的方法say
// A.say.call(B)
A.say.apply(B) // BABY
```

### 数据类型

- String
- Number
- Boolean
- Object(function,Array,Date)
- undefined
- null
- symbol(es6),用来创建独一无二的标识
- bigint(es10)

### Promise

一个promise对象代表一个在这个promise被创建出来时不一定已知的值。它让能够把异步操作最终的成功返回值或者失败原因和相应的处理程序关联起来。异步方法不会立即返回最终的值，而是返回一个promise，以便在未来某个时候把值交给使用者。

promise必然处于一下三种状态：

- 待定(`pending`):初始状态，既没有被兑现，也没有被拒绝
- 已兑现(`fulfilled`):操作成功完成
- 已拒绝(`rejected`):操作失败

`promise`用来解决回调地狱的问题，是回调的升级版，用来处理一些需要花费较长时间的异步任务时，防止阻塞。

### new

### 宏任务和微任务

### this

### 异步引入js的方式

### js的事件机制

### 栈内存和堆内存

### 迭代器

### async await

### 单线程和多线程

### 输入URL过程

### position的属性

### 防抖和节流

### JS事件轮询

### canvas中图片跨域

### SSR

### 前端防止攻击

### 手写new方法

### 跨域问题的解决方案和实现原理

web服务器 http://aaa.com

资源服务器 http://bbb.com

数据服务器 http://ccc.com

协议，域名，端口号有一个不一样，就是跨域。

因此跨域问题普遍存在。浏览器默认限制不让互相访问，非同源策略应用广泛。

1. JSONP:利用script，img，link标签不存在跨域

   > 动态创建script标签，给他src赋值属性

   ```html
   <script src="http://qq.com?callback=func"></script>
   ```

   ```js
   function func(data) {
     //TODO data就是从服务器拿回来的数据
   }
   ```

   服务端：

   data = {xxxx}

   拼接成数据结构： "func({xxxx})"

   GET: 不安全，有缓存，有大小限制

2. 基于iframe的跨域解决方案

   - window.name
   - document.domain
   - location.hash
   - post message

3. CORS跨域资源共享(服务器端处理)

   package.json中加proxy:"地址"

   开发的时候:用 deveServer->proxy -> target/proxyTimeout/ws/changeOrigin

   打包之后：用nginx反向代理

### 全等的规则

==比较规则

- 对象==字符串 - 对象.toString()变为字符串

- null == undefined 相等，但是和其他值比较就不相等了

- NaN == NaN 不相等

- 剩下的都是转化为数字

  ```js
   if (a == 1 && a == 2 && a == 3) {
     console.log('条件成立')
   }
  // 1.toString 或者 valueOf也可以
  /*
  var a = {
  	i: 0,
  	toString() {
  		return ++i
  	}
  }
  */
  // 2. Object.defineProperty
  var i = 0
  Object.defineProperty(window, 'a', {
    get() {
      return ++i
    },
  })
  // 3.数组实现
  var a = [1, 2, 3]
  a.toString = a.shift
  ```

  

### js执行顺序

无参数new

有参数new

**.**表示成员访问

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence

### 变量提升

> es5中，代码执行之前，会进行变量提升，在当前作用域下，带var的会提前声明，带function的会提前声明和定义

### 深克隆和浅克隆

浅克隆：

- ...扩展运算符

  ```js
  var obj = {
    name: 'kobe',
    list: [11, 23, 8],
    hobbies: {
      name: 'basketball'
    }
  }
  var obj1 = {...obj}
  obj1.list.push(999)
  obj // obj会受到污染
  ```

- for循环

  ```js
  for(let i in obj) {
    if(obj.hasOwnProperty(i)) {
      obj1[i] = obj[i]
    }
  }
  ```

深克隆：

- JSON.parse

  ```js
  var obj1 = JSON.parse(JSON.stringify(obj));
  // 缺点
  /**
  1.function(){} => 属性名直接转没了
  2.new Date() =>对象转成字符串了
  3./\W/ => 正则表达式转成{}
  **/
  ```

- 函数写递归

  ```js
  function deepClone(obj) {
    if(obj === null) return null
    if(typeof obj !== 'object') return obj
    var newObj = new obj.constructor
    for(let i in obj) {
      newObj[i] = deepClone(obj[i])
    }
  }
  ```

  



### cookie&localStorage

- 生命周期
  - cookie 可设置失效时间，没有设置的话，默认关闭浏览器就会失效
  - localStorage 永久保存，除非手动清除
  - sessionStorage 仅在当前网页会话下有效，关闭页面或者浏览器后就会被清除
- 存放数据大小
  - cookie 4kb
  - localStorage和sessionStorage可以保存5Mb左右的数据
- http请求
  - cookie 每次都会携带在HTTP请求头中，如果使用cookie存储过多数据会带来性能问题
  - localStorage和sessionStorage 仅在客户端中保存，不参与和服务器的通信

在服务器端使用session管理cookie

localStorage:实现数据持久化，存入的时候，加一个存储的时间，下次请求的时候和该时间做对比，决定是否需要从服务器重新请求资源。

cookie和session的区别：

服务器设置session，服务器返回给客户端的信息，在响应头中带着set-cookie="connect.sid"(当前服务端与客户端建立唯一的标识)，客户端会把信息种植到本地的cookie中(httponly),客户端再次向服务器发送请求的时候，会默认在请求头中cookies把connect.sid传递给服务器。他俩过期时间一致。

```javascript
//指向属性调用的对象
```

### 闭包

​	函数外部可以访问内部的变量。

> 在浏览器打断点，然后在调试工具栏就可以看到Scope->Local->fn->[[Scopes]]

​	谈闭包，先谈谈作用域(全局作用域，函数作用域)

```javascript
function fn() {
  var a = 100
  return function() {
    a++
    return a
  }
}
var res = fn()
res()
```

### 作用域链

全局->嵌套函数->嵌套函数->嵌套函数...

### 执行上下文(execution)

`执行上下文`就是当前`JavaScript`代码被解析和执行时所在环境的抽象概念，`JavaScript`中运行任何的代码都是在执行上下文中运行。

- **全局执行上下文:**这是默认的、最基础的执行上下文。不在任何函数中的代码都位于全局执行上下文中。它做了两件事：1. 创建一个全局对象，在浏览器中这个全局对象就是 window 对象。2. 将 `this` 指针指向这个全局对象。一个程序中只能存在一个全局执行上下文。

- **函数执行上下文:**每次调用函数时，都会为该函数创建一个新的执行上下文。

- **Eval 函数执行上下文:**使用少，不讨论。

- **执行栈:**用于存储在代码执行期间创建的所有执行上下文。在其它语言中也叫调用栈，具有**LIOF(后进先出)**结构。

- **执行上下文的创建:**

  - **创建阶段**

    在任意的 JavaScript 代码被执行前，执行上下文处于创建阶段。在创建阶段中总共发生了三件事情：

    1. 确定**this**的值，也被成为**This Binding**

       在函数执行上下文中，`this` 的值取决于函数的调用方式。如果它被一个对象引用调用，那么 `this` 的值被设置为该对象，否则 `this` 的值被设置为全局对象或 `undefined`（严格模式下）

       ```javascript
       var User = {
         name: 'kobe',
         show() {
           console.log(this.name)
         }
       }
       User.show() //kobe
       var kb = User.show
       kb() //空
       ```

    2. **LexicalEnvironment(词法环境)** 组件被创建

       词法环境是一种规范类型，基于`ECMAScript`代码的词法嵌套结构来定义标识符与特定变量和函数的关联关系。

       词法环境有 2 种类型：

       1. **全局环境**

       2. **函数环境** 用户在函数中定义的变量被存储在**环境记录**中。对外部环境的引用可以是全局环境，也可以是包含内部函数的外部函数环境

          **环境记录** 同样有两种类型

          - 声明性环境记录
          - 对象环境记录

    3. **VariableEnvironment(变量环境)** 组件被创建

  - **执行阶段**

  每当发生一个函数调用，引擎都会为该函数创建一个新的执行上下文并将其推到当前执行栈的顶端

![](.\img\执行上下文.png)

### 缓存

浏览器的缓存类型有2种，**强缓存**和**协商缓存**

- 强缓存：不会向服务器发送请求，直接从缓存中读取资源，在`chrome`控制台中可以看到请求返回200的状态码，并且`size`显示f`rom disk cache` 或 `from memory cache`

- 协商缓存：向服务器发送请求，服务器会根据这个请求的`request header`的一些参数来判断是否命中协商缓存，如果命中，则返回304状态码并带上新的`response header`通知浏览器从缓存中读取资源

- 共同点是：都是从客户端读取资源，区别是强缓存不会发请求，协商缓存会发请求

  **强缓存**

  `Expires`: response header里面的过期时间，浏览器再次加载资源时，如果在过期时间内，则命中强缓存

  `Cache-Control`: 当值设置为`max-age=300`时，则代表在这个请求正确返回时间的5分钟内再次加载资源，就会命中强缓存

  ![](.\img\cache-control.png)

  Expires 是 http1.0的产物

  Cache-Control 优先级高于 Expires

  Cache-Control的属性：

  - no-cache 不进行缓存
- no-store  报文中存在机密信息，不可以保存
  
  - max-age  过期时间
- no-transform  禁止代理改变实体主体的类型
  - 

  **协商缓存**
  
  `etag`和`If-None-Match`: etag是上一次加载资源时，服务器返回的response header，是对该资源的一种唯一标识，只要资源有变化，etag就会重新生成。浏览器在下一次加载资源向服务器发送请求时，会将上一次返回的etag值放到request header里的`If-None-Match`里，服务器接受到`If-None-Match`的值后，会拿来跟该资源文件的etag进行比较，如果相同，则表示资源文件没有发生改变，命中协商缓存。
  
   ![](.\img\协商缓存.png)
  
  `Last-Modified`和`If-Modified-since`:  Last-Modified是该资源文件最后一次更改时间，服务器会在response header中返回，同时浏览器会将这个值保存起来，在下一次发送请求时，放到request header里的`If-Modified-since`里，服务器在接收到后也会做对比，如果相同则命中协商缓存。

  > Etag和last-modified区别
>
  > 1.精度： etag > last-modified(单位时间是s)
  >
  > 2.性能： etag < last-modified(只需要记录时间)，而前者需要通过服务器算出一个hash值
  >
  > 3.优先级：etag > last-modified

  **浏览器缓存过程**

  > 1.浏览器第一次加载资源，服务器返回200，浏览器将资源文件从服务器下载到本地，并缓存response header中返回的时间；
>
  > 2.下一次加载资源时，先比较当前时间和上一次返回200时的时间差，如果没有超过Cache-Control中的max-age,则没有过期，命中强缓存，不发送请求，直接从本地缓存中读取资源(如果浏览器不支持http1.1，则用expires判断是否过期)；如果时间过期，则向服务器发送header中带有If-None-Match和If-Modified-Since的请求；
  >
  > 3.服务器接到请求后，优先根据etag判断被请求的文件是否有修改，etag值一致，则没有修改，命中协商缓存，返回304；如果不一致则有改动，直接返回新的资源并带上新的etag；
  >
  > 4.如果服务器收到的请求没有etag值，则将If-Modified-Since和被请求文件的最后修改时间做对比，一致则命中协商缓存，返回304；不一致则返回新的last-modified和文件以及200.

  **用户行为**

  - 地址栏访问：会触发浏览器缓存机制
  - F5刷新：浏览器会设置max-age=0,跳过强缓存，会进行协商缓存判断
  - ctrl+F5刷新：跳过强缓存和协商缓存，直接从服务器拉取资源

### with

```javascript 
var obj = {
  a: 'AA',
  b: 'BB',
  c: 'CC'
}
with (obj) a // AA

with (obj) {
  var a = a
  a // AA
}
```

- 优点：解构对象时很清晰
- 缺点：js的编辑器会检测`with`块中的变量是否属于`with`传入的对象，以上述例子为例，`js`会检测a和b是否属于`obj`对象。这样就会导致`with`语句的执行速度大大降低，性能比较差。

### 常用方法

#### 不能访问 github

查询 dns： http://tool.chinaz.com/dns?type=1&host=github.com&ip=

https://www.ping.cn

方法：针对 windows 系统

打开`C:\Windows\System32\drivers\etc`中的 hosts 文件,添加以下配置

```shell
192.30.255.112  github.com
151.101.185.194 github.global.ssl.fastly.net
```

刷新一下 DNS

```shell
ipconfig/flushdns
```

重启浏览器再次访问，刷新。。。应该就可以出来了

#### 防抖函数

```javascript
import { debounce } from 'throttle-debounce'
window.addEventListener(
  'resize',
  debounce(400, () => {
    // do sth
  })
)
```

#### 稀疏，密集数组

1. 稀疏数组(稀疏数组含有空缺)

   ```javascript
   let ch = [, , 3]
   ```

2. 密集数组(每个位置都有元素(undefined 也算是元素))

   ```javascript
   let ci = [undefined, undefined, 3]
   ```

#### 自增问题

1. 前置自增-**先计算后赋值**

   ```javascript
   var a = 1
   var b = ++a
   console.log(a) //2
   console.log(b) //2
   ```

2. 后置自增-**先赋值后计算**

   ```javascript
   var a = 1
   var b = a++
   console.log(a) //2
   console.log(b) //1
   ```

#### 截取一段字符串

```javascript
function cutNameBySeparator(str, len, separator) {
  let res = []
  if (str && str.length > len) {
    let nums = Math.ceil(str.length / len)
    for (let i = 0; i < nums; i++) {
      res.push(str.substr(i * len, len))
    }
    // return res.join(separator)
    return res.reduce((acc, cur) => {
      return (acc += separator + cur)
    })
  }
  return str
}
```

#### 实现千分位

```javascript
//方法1，正则实现
let num = '123456'
num.replace(/(?=(?!\b)(\d{3})+$)/g, ',')
//方法2，函数方法
/* 
  @param 
  num 需要处理的数据
  cent 保留的位数
  isThousand 是否千分位
  numFormatter('5175371837', 2, true) -> '5,175,371,837.00'
*/
function numFormatter(num, cent, isThousand) {
  if (isEmpty(num) || isNaN(num)) return 0
  let numSource = num
  // 将num中的$ ,符号剔除
  num = num.toString().replace(/\$|\,/g, '')
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
// 判断是否是空值,空对象{}也被认为是空。为空返回true，否则返回false
function isEmpty(str) {
  if (!str || JSON.stringify(str) === '{}') {
    return true
  }
  return false
}
```



### Vue相关

- Vue中的数据代理

  通过vm对象来代理data对象中的属性操作(读/写)

  好处：更加方便的操作data中的数据

  基本原理：

  ​	通过Object.defineProperty()把data对象中所有属性添加到vm上

  ​	为每一个添加到vm上的属性，都指定一个getter/setter

  ​	在getter和setter内部去操作(读/写)data中对应的属性

- vue响应式数据实现原理？

  > 主要是通过Object.defineProperty属性方法来完成，vue实现数据双向绑定主要是采用数据劫持结合发布者订阅者模式的方式。通过Object.defineProperty来劫持各个属性的getter和setter，在数据变动时发布消息给订阅者，触发相应监听回调。
  >
  > 当把一个普通的js对象传给vue实例来作为它的data选项时，vue将遍历它的属性，用Object.defienProperty将它们转为getter或者setter，vue会追踪依赖，在属性被访问和修改时通知变化。
  >
  > vue的数据双向绑定将mvvm作为数据绑定的入口，整合observer compile和watcher三者，通过observer来监听自己的model数据变化，通过compile来解析编译模板指令，最终利用watcher搭起observer和compile之间的通信桥梁达到数据变化便会更新视图或者视图变化，更新数据

  

  数据代理和数据劫持，对新增的数据无法实现劫持，但是vue3解决了这个问题。使用proxy代理实现。

- 为什么需要数据响应式？

- Object.defineProperty劫持属性用的是什么方法?

- computed和methods区别

- vue&react的区别 

  > vue是一个以数据响应式为核心的框架，核心思想是把所有数据放在一个对象里面，我们操作对象，就是改变数据，监听这个改变从而更新UI
  >
  > react是用一个函数来表示一个组件，数据放进去，它就会把数据渲染到页面上 。dom diff
  
- MVVM的理解

  先说MVC：react(少了一个视图更改影响数据)

  - 视图(View):  用户界面。(传送指令到Controller)
  - 控制器(Controller): 业务逻辑(完成业务逻辑后，要求Model改变状态)
  - 模型(Model): 数据保存(将新的数据发送到View，用户界面更新)

  再谈MVVM：vue

  - View：用户界面
  - Model：业务逻辑
  - ViewModel：核心枢纽，负责把model的数据同步到view中显示。还负责把view修改的内容同步到model

- vue的生命周期

  - beforeCreate：在数据观测和初始化事件还未开始时触发
  - created：会完成数据观测(data observer),属性和方法的运算，watch/event事件回调。然而，挂载阶段还没开始，$el属性尚不可用
  - beforeMount：在挂载开始之前调用；相关的render函数第一次被调用
  - mounted：实例被挂载之后调用，这时el被vm.$el替换了。但是不会保证所有的子组件也都一起被挂载。若想等到所有视图都渲染完毕，可以在mounted内部使用vm.$nextTick()
  - beforeUpdate：数据更新时调用
  - updated：由于数据更改导致虚拟DOM重新渲染，在这之后会调用该钩子
  - activated： 被keep-alive缓存的组件激活时使用
  - deactivated： 被keep-alive缓存的组件停用时调用
  - beforeDestroy：实例销毁之前调用，在这一步，实例任然可用
  - destroyed： 实例销毁后调用

- 什么是vue的生命周期呢？有什么作用呢？

  > 就是vue实例从创建到销毁的过程
  >
  > 从开始创建初始化数据，编译模板，挂载dom，渲染更新，渲染销毁等一系列过程。
  >
  > 作用：有多个事件钩子，让我们在控制整个vue实例的过程时更容易形成一个好的逻辑

- 几个阶段？

  > 八个阶段：创建前后，载入前后，更新前后，销毁前后

- 第一次加载页面时，会触发哪几个钩子呢？

  > 首先会触发beforeCreate，created，beforeMount，mounted

- dom渲染在哪个周期就已经完成呢？

  > mounted

- vue3.0的响应式的理解？

  > vue3改用proxy代替Object.defineProperty,proxy可以直接监听对象和数组的变化，并且有多大13种拦截方法(ownkeys,get,set,has...),
  >
  > proxy只会代理对象的第一层，vue3通过relect.get()方法获取对象的属性值是否是object，如果是，则继续用该方法代理，这样就实现了深度观测。
  >
  > 监听数组的时候可以多次触发get或者set，如何防止呢？我们可以判断key是否为当前被代理对象的target的自身属性，也可以判断旧值与新值是否相同。只有满足以上二者之一，才可能执行trigger

- SPA单页面的理解？

  > spa仅在web页面初始化时加载相应的html，js和css。一旦加载完成后spa不会因为用户的操作而进行页面的重新加载或跳转，取而代之的是使用路由机制实现html内容的变换
  >
  > 优点：用户体验好，速度快，内容的改变不需要重新加载整个页面，避免不必要的跳转和重复渲染
  >
  > spa相对服务器压力较小，前后端职责分离，结构清晰，前端进行交互逻辑，后端负责数据处理
  >
  > 缺点：1.首屏初次加载比较慢，将js css统一加载，部分页面按需加载
  >
  > 2.不利于seo，所有页面都在一个页面动态显示，有着天然的劣势

- 首屏加载慢，如何解决？

  - 资源懒加载
  - 静态资源使用本地缓存
  - 压缩html，就是，css，图片，服务器开启GZIP
  - 插件按需引入，不要全局引入

- vue的优点是什么？

  - 性能好
  - 体积小
  - 灵活
  - 生态丰富

- vue.use是干什么的？原理是什么？

  > vue.use是用来使用插件的
  >
  > 首先检查插件是否注册

- v-for中key的作用？

  为了让vue一个提示，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素，需要给每项提供一个唯一的key。他是vue识别节点的通用机制。为了高效更新虚拟dom，重复的key会造成渲染错误。

- keep-alive的作用？

  是vue中内置的组件，可以使被包含的组件保留状态，

  - include：字符串或正则表达式。只有名称匹配的组件会被缓存
  - exclude：字符串或正则表达式。任何名称匹配的组件都不会被缓存
  - max： 数字，最多缓存多少组件

- vue中的data为什么是一个函数？

  为了避免组件之间互不影响，如果data是对象的话，由于对象是引用类型，会影响所有的实例

- vue为什么需要虚拟dom？

  首先虚拟dom就是用js对象来描述真实的dom，是对真实dom的抽象，由于直接操作dom性能低，但是在js中操作效率就比较高，可以将dom操作转化成对象操作。最终通过diff算法对比差异进行更新dom。这样做可以减少对真实dom的操作

- v-if和v-for的优先级

  > v-for > v-if
  >
  > 不建议一起使用

- v-if和v-show的区别？

  > v-if: 真实的条件渲染，直到条件第一次变成真时才会开始渲染
  >
  > v-show: 不管初始条件是什么，都会渲染，并且只是简单的基于css的display属性进行切换 

- vuex是什么？

  > vuex是一个专为vue.js应用程序开发的状态管理模式.本地存储方案

- vuex的核心概念？

  5大核心属性

  - state：存储数据，用this.$store.state
  - getters: 可以认为是store的计算属性
  - mutations： 更改vuex的store中状态的唯一方法
  - actions：包含任意异步操作，通过提交mutation更改状态
  - modules：将store分割成模块
  
- mixins的用法

  > 名字相同的变量和方法，组件会覆盖mixins中的变量和方法
  >
  > Minxin: [mix2, mix1]  mix1中的同名函数和变量会覆盖mix2中。但是他们都先于实体组件执行。

- vue3的mvvm实现原理？

- computed和watch的区别？

  > computed: 1.是一个计算属性，支持缓存，只有依赖的数据发生变化时，才会更新
  >
  > ​	2.不支持异步
  >
  > watch:  1.是一个监听器，当监听的对象发生变化时，会触发相应的操作，
  >
  > ​	2.支持异步
  >
  > ​	3.监听的函数会返回2个参数(新值和旧值)
  >
  > ​		immediate: 组件加载时就立即触发回调函数执行
  >
  > ​		deep: 深度监听

- 组件之间如何传值

  1. 父组件传递给子组件：父组件通过props向下传值给子组件

  2. 子组件通过事件的形式向父组件传值。子：`this.$emit('xxx', 'yyy')` 父：`@xxx="getVal"`

  3. 兄弟组件传值：ABC ，先new一个Vue对象vm1，A：`vm1.$emit('data-a', 'aa')`, B: `vm1.$emit('data-b', 'bb')`

     ```javascript
     // C
     mounted() {
       vm1.$on('data-a', val => {})
       vm1.$on('data-b', val => {})
     }
     ```

  4. vuex

- $nextTick的原理

- 自定义指令

  钩子：
  
  - bind
  - inserted
  - update
  - componentUpdated
  - unbind
  
- 路由的历史模式和非历史模式有什么区别？

- tree shaking的原理？

- 说说你对diff算法的理解？

- $mount干了什么事？

  > 获取渲染之后的dom，追加到宿主元素
  
- react/vue 中key的作用？(其内部原理是什么？)

  - 简单地说：key是虚拟dom对象的标识，在更新显示时key起着极其重要的作用
  - 详细的说：当状态中的数据发生变化时，react会根据【新数据】生成的【新的虚拟dom】，随后react进行【新虚拟dom】与【旧虚拟dom】的diff比较，比较规则如下：
    - 旧虚拟dom中找到了与新虚拟dom相同的key：
      1. 若虚拟dom中内容没有变化，直接使用之前的真实dom
      2. 若虚拟dom中内容变了，则生成新的真实dom，随后替换掉页面中之前的真实dom
    - 旧虚拟dom中未找到与新虚拟dom相同的key
      1. 根据数据创建新的真实dom，随后渲染到页面

- 为什么遍历列表时，key最好不要使用index?

  ![](\img\不用index作为key.png)

  1. 若对数据进行：逆向添加、删除等破坏顺序操作

     ​	会产生没有必要的真实DOM更新 =>界面效果能实现，但是效率低

  2. 如果结构中还包含输入类的DOM

     ​	会产生错误的DOM更新 =>界面更新有问题

  3. 注意：如果不存在对数据的逆序添加、逆序删除等破坏顺序操作，仅用于渲染列表用于展示，使用index作为key是没有问题的

- 开发中如何选择key？

  1. 最好使用每条数据的唯一标识作为key
  2. 简单展示用index也行

- 修饰符

  1. lazy

     改变输入框的值时value不会改变，当光标离开输入框时，v-model绑定的值value才会改变

  1. trim

     去首尾空格

  2. number

     作用是将数值转化为数字，但是先输入字符串和先输入数字，是两种情况，先输入数字的话，只取前面的数字部分，先输入字母的话，number修饰符无效

  3. stop

     阻止冒泡

  4. capture

     事件默认是由里往外冒泡，capture修饰符的作用是反过来，由外往里捕获

  5. self

     只有点击事件绑定的本身才会触发事件

  6. once

     事件只执行一次

  7. prevent

     阻止默认事件(例如a标签的跳转)

  8. native

     原生事件

  9. left、right、middle

     鼠标的左中右按键触发的事件

  10. passive

      监听元素滚动事件的时候，会一直触发onscroll事件，在PC端是没什么问题的，但是在移动端，会让网页变卡，使用此修饰符，相当于给onscroll事件加了一个lazy修饰符

  11. camel

      确保绑定的参数被识别为驼峰

  12. sync

      父子组件传值，子组件想要更新这个值，使用此修饰符
  
- 刷新当前路由

  App.vue

  ```vue
  <template>
  	<router-view name="default" v-if="isRouterAlive" />
  </template>
  <script>
    export default {
       provide () {
          return {
            reload: this.reload
          }
        },
        data() {
          return {
            isRouterAlive: true,
          }
        },
        methods: {
          reload () {
            this.isRouterAlive = false
            this.$nextTick(() => {
              this.isRouterAlive = true
            })
          },
        },
    }
  </script>
  ```

  需要刷新的组件：

  ```vue
  export default {
  	inject: ['reload']
  	// 在需要刷新的方法中调用
  	methods: {
  		do() {
  			this.reload()
    	}
    }
  } 
  ```

### 前端工程化

1. 项目上线前，压缩代码
2. ES6+或CSS3新特性进行转换
3. Less等CSS预编译语言进行编译处理
4. 格式化代码

![](\img\前工程化端.png)

工程化≠某个工具

- 通用脚手架工具

  - yeoman

  使用说明：

  全局安装yo：

  ```shell
  yarn add yo -g
  ```

  全局安装generator:

  - generator-webapp    网站项目
  - generator-venv    vue项目
  - generator-rn-toolbox    react-native项目
  - generator-node    node项目
  - 。。。

  ```shell
  yarn add generator-webapp -g
  ```

  通过yo运行generator

  ```shell
  mkdir project-name
  cd project-name
  yo webapp#不需要generator前缀
  #启动应用
  npm run start
  ```

- 专用脚手架工具

  - creat-react-app
  - vue-cli
  - angular-cli

#### 1.创建一个generator项目

```shell
yarn add yo -g
```

创建一个 generator-ding 脚手架

1. 安装

   ```shell
   yarn add yeoman-generator
   ```

2. 新建目录

   ![](\img\yeoman-目录.png)

3. 配置js：   \generator-ding\generators\app\index.js

   ```js
   const Generator = require('yeoman-generator')
   
   module.exports = class extends Generator {
     write() {
       this.fs.write(this.destinationPath('test.txt'), Math.random().toString())
     }
   }
   
   ```

4. 在generator-ding目录下运行

   ```shell
   #挂载一个全局命令
   npm link
   #解绑 npm unlink
   ```

5. 在其他文件夹中运行

   ```shell
   yo ding
   ```

   > 就会生成一个test.txt的文件，并且里面的内容是随机数

#### 2.构建自己的脚手架工具(使用模板和命令行交互)

**EJS**模板语法

```ejs
 <%= title%>
```

通过命令行工具启动一个程序，在命令行交互中，获取用户输入，然后创建对应的代码文件

```shell
npm init -y
yarn add ejs inquirer
```

```js
#!/usr/bin/env node
//读取模板文件
const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const ejs = require('ejs')

inquirer.prompt([
  {
    type: 'input',
    name: 'name',
    message: 'enter your project-name'
  }
]).then(res => {
  //模板路径
  const tmpDir = path.join(__dirname, 'templates')
  //目标文件夹
  const destDir = process.cwd()
  //读取文件夹文件
  fs.readdir(tmpDir, (err, files) => {
    if(err) throw err

    files.forEach(file => {
      ejs.renderFile(path.join(tmpDir, file), res, (error, result) => {
        if(error) throw error
        fs.writeFileSync(path.join(destDir, file), result)
      })
    })
  })
})
```

插播：nodejs关于路径的处理

```js
const path = require('path')
console.log(__dirname) //c:\Users\知因\Desktop\YY
console.log(path.resolve('aaa', 'test')) //c:\Users\知因\Desktop\YY\aaa\test
console.log(path.join('aaa', 'ok'))//拼接路径  aaa\ok
```

#### 3.npm scripts

npm 允许在package.json文件中，使用scripts字段定义脚本命令

package.json

```json
{
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
   	"strat": "node index.js",
    "style": "lessc index.less main.css && minify main.css > main.mini.css"
  }
}
```



执行方式有2种：

- 串行-series

  > 任务1&&任务2
  >
  > 任务之间有先后顺序，先执行前一个任务，后执行下一个

- 并行-parallel

  > 任务1 & 任务2
  >
  > 任务之间没有先后顺序，同时执行可以提高执行效率

例如：1.less转化为css

​			2.压缩css

```shell
npm install minify less -g

#1.less转换为css
lessc index.less main.css
#2.压缩css文件
minify main.css > main.mini.css
```

`grunt` `gulp` `fis`

#### 4.手写loader

在webpack中使用

新建`markdown-loader.js`

```js
const marked = require('marked')
module.exports = (source) => {
  const html = marked(source)
  //结果要转成js代码
  // const code = `module.exports=${JSON.stringify(html)}`
  // return code
  return html
}
//在webpack.config.js中加入html-loader
module: {
    rules: [
      {
        test: /\.md$/,
        use: ['html-loader', './markdown-loader.js']
      }
    ]
  }
```

#### 5.vite

新一代构建工具

```shell
npm init @vitejs app-name
```

不需要打包

vite支持http2.0

使用公司内部的npm库

在项目根目录添加`.npmrc`

```shell
registry = http://192.168.1.1:9999/repository/npm/
```





















