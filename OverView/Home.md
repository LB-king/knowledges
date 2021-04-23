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

3. `constructor` 属性是对象才拥有的，他是从一个对象指向一个函数。含义就是指向该对象的构造函数(每个对象都可以找到其对应的constructor)

4. `isPrototypeOf`检测一个对象是否存在于另一个对象的原型链中。某一个对象是否是另一个对象的原型链的一份子

   ```javascript
   let a = {}
   let b = {}
   console.log(Object.prototype.isPrototypeOf(a)) // true
   Object.setPrototypeOf(a, b) // 设置a的原型为b
   console.log(b.isPrototypeOf(a)) // true
   console.log(Object.getPrototypeOf(a) === b)
   ```

5. `Object.setPrototypeOf(obj, prototype)` 方法设置一个指定的对象的原型 ( 即, 内部[[Prototype]]属性）到另一个对象或  null。

   - `obj` 要设置其原型的对象
   - `prototype` 该对象的新原型

   ```javascript
   Object.setPrototypeOf(a, b) //设置b为a的原型 
   console.log(a.__proto__ === b) //true
   console.log(a.__proto__.__proto__ === Object.prototype) //true
   ```

   

6. `Object.getPrototypeOf()` 返回指定对象的原型

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

7. 通过`__proto__`属性来连接对象直到`null`的一条链即为我们所谓的**原型链**

   参考文章解析：

   https://blog.csdn.net/cc18868876837/article/details/81211729
   
8. `hasOwnProperty`与`in`判断属性是否存在。**自身属性**与**继承属性**，前者(`hasOwnProperty`)只会判断对象有没有某个属性，后者(`in`)会找该对象的原型链是否有该属性

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

   

9. `seal` `Object.seal(obj)`

   obj 要被冻结的对象 

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
```

### new

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

### 不能访问github

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