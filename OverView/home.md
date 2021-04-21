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

4. `Object.setPrototypeOf()` 方法设置一个指定的对象的原型 ( 即, 内部[[Prototype]]属性）到另一个对象或  null。

5. `Object.getPrototypeof()` 返回指定对象的原型

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

6. 通过`__proto__`属性来连接对象直到`null`的一条链即为我们所谓的**原型链**

   参考文章解析：

   https://blog.csdn.net/cc18868876837/article/details/81211729

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
2. 如果在项目根目录有`.prettierrc` 配置文件。vscode会以此文件的配置优先
3. 安装`run at broswer`
4. 安装`Code Runner`
5. 安装`vetur`支持`.vue`文件