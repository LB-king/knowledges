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
   
   function A(){}
   function B(){}
   function C(){}
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

   

4. `constructor` 属性是对象才拥有的，他是从一个对象指向一个函数。含义就是指向该对象的构造函数(每个对象都可以找到其对应的constructor)

5. `isPrototypeOf`检测一个对象是否存在于另一个对象的原型链中。某一个对象是否是另一个对象的原型链的一份子

   ```javascript
   let a = {}
   let b = {}
   console.log(Object.prototype.isPrototypeOf(a)) // true
   Object.setPrototypeOf(a, b) // 设置a的原型为b
   console.log(b.isPrototypeOf(a)) // true
   console.log(Object.getPrototypeOf(a) === b)
   ```

6. `Object.setPrototypeOf(obj, prototype)` 方法设置一个指定的对象的原型 ( 即, 内部[[Prototype]]属性）到另一个对象或  null。

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
   let a = { name: 'ok'}
   let b = { age: 12 }
   Object.setPrototypeOf(a, b)
   console.log(a.hasOwnProperty('age')) //false
   console.log('age' in a) //true
   // 加了条件判断就不会去对象的原型链上去找
   for(let i in a) {
     if(a.hasOwnproperty(i)) {
       console.log(i)
     }
   }
   ```

10. `seal`  `freeze` `Object.seal(obj)`

   obj 要被冻结的对象 

   ```javascript
   var obj = {name: 'TEST'}
   Object.seal(obj)
   obj.name = 'TEST1'
   obj.age = 9
   obj // {name: "TEST1"}
   // seal能改变属性值，但是不能向对象中添加方法
   var obj = {name: 'TEST'}
   Object.freeze(obj)
   obj.name = 'TEST1'
   obj.age = 9
   obj // {name: "TEST"}
   // freeze 不可扩展，又是密封,但是可读
   ```

11. `getOwnPropertyDescriptor`

    指定对象上一个自有属性对应的属性描述符。（自有属性指的是直接赋予该对象的属性，不需要从原型链上进行查找的属性）

    ```javascript
    var a = {name: 'a'}
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
      this.show = function() {
        console.log(this.name)
      }
    }
    var a = new User('AAA') // 
    //每次new的时候，会开辟新的内存来存储show方法,因此可以把方法放到原型上实现继承
    User.prototype = {
      constructor: User,
      show(){},
      say(){}
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
  var a = [1,2,3]
  var b = [...a]
  a[2] = 88
  a // [1, 2, 88]
  b // [1,2,3]
  ```

  ```javascript
  // 2.Array.of(...arr)
  var a = [1,2,3]
  var b = Array.of(...a)
  a[2] = 88
  a // [1, 2, 88]
  b // [1, 2, 3]
  ```

  ```javascript
  // 3.new Array
  var a = [1,2,3]
  var b = new Array(...a)
  a[2] = 88
  a // [1, 2, 88]
  b // [1, 2, 3]
  ```

  ```javascript
  // 4.Array(...arr)
  var a = [1,2,3]
  var b = Array(...a)
  a[2] = 88
  a // [1, 2, 88]
  b // [1, 2, 3]
  ```

  ```javascript
  // 5.slice
  var a = [1,2,3]
  var b = a.slice(0)
  a[2] = 88
  a // [1, 2, 88]
  b // [1, 2, 3]
  ```

  ```javascript
  // 6.concat
  var a = [1,2,3]
  var b = a.concat()
  a[2] = 88
  a // [1, 2, 88]
  b // [1, 2, 3]
  ```

### call 和apply

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

### new

### this

```javascript
//指向属性调用的对象
```

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

       词法环境有2中类型：

       1. **全局环境**

       2. **函数环境** 用户在函数中定义的变量被存储在**环境记录**中。对外部环境的引用可以是全局环境，也可以是包含内部函数的外部函数环境

          **环境记录** 同样有两种类型

          - 声明性环境记录
          - 对象环境记录

    3. **VariableEnvironment(变量环境)** 组件被创建

       

  - **执行阶段**

  每当发生一个函数调用，引擎都会为该函数创建一个新的执行上下文并将其推到当前执行栈的顶端

![](E:\codeSpace\knowledges\OverView\img\执行上下文.png)

### 闭包

### vscode设置

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
2. 如果在项目根目录有**.prettierrc** 配置文件。vscode会以此文件的配置优先
3. 安装`run at broswer`
4. 安装`Code Runner`
5. 安装`vetur`支持`.vue`文件
6. 安装`Live Server`实现热更新，有利于学习验证知识点。ps(在vscode打开的目录的根目录下的文件，默认是index.html)

### 常用方法

#### 不能访问github

查询dns： http://tool.chinaz.com/dns?type=1&host=github.com&ip=

https://www.ping.cn

方法：针对windows系统

打开`C:\Windows\System32\drivers\etc`中的hosts文件,添加以下配置

```shell
192.30.255.112  github.com
151.101.185.194 github.global.ssl.fastly.net
```

刷新一下DNS

```shell
ipconfig/flushdns
```

重启浏览器再次访问，刷新。。。应该就可以出来了

#### 防抖函数

```javascript
import { debounce } from 'throttle-debounce'
window.addEventListener('resize', debounce(400, () => {
  // do sth
}))
```

#### 稀疏，密集数组

1. 稀疏数组(稀疏数组含有空缺)

   ```javascript
   let ch = [,,3]
   ```

2. 密集数组(每个位置都有元素(undefined也算是元素))

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
  if(str && str.length > len) {
    let nums = Math.ceil(str.length / len)
    for(let i = 0; i < nums; i++) {
      res.push(str.substr(i * len, len))
    }
    // return res.join(separator)
    return res.reduce((acc, cur) => {
      return acc += separator + cur
    })
  }
  return str
}
```





































2019.11.20

2019.12.20

2020 12

2021.1.20

2021.2.20

2021.3.20

2021.4.20