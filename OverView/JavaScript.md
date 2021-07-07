### ES6的一些方法（不分先后）

- ```javascript
  import * as xxx from 'xxx' // 会将'xxx'中所有export导出的内容组合成一个对象返回
  import * as obj from 'xxx' // 这种写法表示把所有的输出包裹到obj对象里
  ```
  
- 在线转换成ES5语法

- 在开发时直接转译

- 比较通用的方案有babel,jsx,traceur,es6-shim等

#### Proxy

用于创建一个对象的代理，从而实现基本操作的拦截和自定义(如属性查找、赋值、枚举、函数调用等等)。

语法：

```javascript
const p = new Proxy(target, handler)
```



### JavaScript方法积累

#### 上传读取txt文件内容

```javascript
let reader = new FileReader()
reader.readAsText(file)
// 这个方法是异步的，只有执行完成后才能查看到结果，直接查看是无结果的，并返回undefined
// 所以要挂载到实例的onload或onloadend的方法处理转化后的结果
reader.onload = e => {
  let content = e.target.result
  let arr = content.split('\r') //string到array时用'\r'
  let res = arr.filter(item => item !== '\n') //内容过滤换行用'\n'
}
```

#### 判断类型

```javascript
Object.prototype.toString.call([]) // [object Array]
Object.prototype.toString.call({}) // [object Object]
```

#### 数组的深拷贝

```javascript
// 1.使用扩展运算符
let a = [11, 22, 33]
let b = [...a]
a.push(888)
a // [11, 22, 33, 888]
b // [11, 22, 33]
// 2.对象数组
b = a.map(i => {...a})
```

#### reduce解析

​		如果没有提供`initialValue`，reduce 会从索引1的地方开始执行 callback 方法，跳过第一个索引。如果提供`initialValue`，从索引0开始。

```javascript
var a = [0, 1, 2, 3]
a.reduce(callback, 10)
function callback(acc, cur) {
  return acc + cur
}
// 结果是 10 + 1 + 2 + 3 = 16
```

| `callback`      | `accumulator` | `currentValue` | `currentIndex` | return value |
| --------------- | ------------- | -------------- | -------------- | ------------ |
| first callback  | 0             | 1              | 1              | 1            |
| second callback | 1             | 2              | 2              | 3            |
| third callback  | 3             | 3              | 3              | 6            |



#### call和apply的区别

都是Function.prototype上的方法，用来改变函数this指向，区别是call接收的是参数列表，apply接收的是数组

```javascript
function fn(x, y, z) {
  this.x = x
}
let obj = {}
fn.call(obj, 11, 22, 33)
fn.apply(obj, [11, 22, 33])

let args = [1, 2, 3]
fn.call(obj, ...args)
fn.apply(bj, args)
```

bind(obj)预先改变this，并未立即执行

call性能优于apply

测试一段程序代码执行的时间

```javascript
console.time('tag')
console.timeEnd('tag')
```

#### 变量提升

```javascript
var a
a()
function a() {
  console.log(a)
}
// 函数提升优先级 高于 变量提升,上面代码等价于：
function a() {
  console.log(a)
}
var a
a()
```

#### 原型&原型链

`object` 某个实例对象

`constructor` 某个构造函数

`instanceof`用于检测构造函数的`constructor.prototype` 属性是否出现在某个实例对象(`object`)的原型链上。

#### js的内置对象

- `Array`
- `Boolean`
- `Date`
- `Error`
- `Function`
- `Math`
- `Number`
- `Object`
- `RegExp`
- `String`

#### 数字千分位的实现

```javascript
/* 
  @param 
  num 需要处理的数据
  cent 保留的位数
  isThousand 是否千分位
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



宿主对象就是执行JS脚本的环境提供的对象

自定义对象

#### reflow(回流)和repaint(重绘)

reflow:

repaint:



#### IIFE(立即调用函数表达式)

```javascript
(function () {
  statements
})()
```

#### 函数表达式和函数声明

函数表达式： 

```javascript
let fn = function(){}
```

函数声明：

```javascript
function fn(){}
```

#### Proxy

#### Reflect

是一个内置的对象，它提供拦截JavaScript操作的方法。这些方法与proxy_handler的方法相同。不是一个函数对象，所以不可构造。类似Math就可以理解，它里面的方法都是静态的

Reflect.apply(target, thisArgument, argumentsList)

​	对一个函数进行调用，同时可以传入一个数组作为调用函数

Reflect.get(target, propertyKey)

​	获取对象某个属性的值

Reflect.set(target, propertyKey, receiver)

​	将值分配给属性的函数。返回一个`Boolean`，如果更新成功，则返回`true`。

Reflect.has(target, propertyKey)

​	判断一个对象是否存在某个属性，和 in 运算符 的功能完全相同

### 正则表达式

​	https://tool.oschina.net/uploads/apidocs/jquery/regexp.html

- 正则实现千分位

  ```javascript
  let num = '123456'
  num.replace(/(?=(?!\b)(\d{3})+$)/g, ',')
  ```

### vscode的一些设置

在项目的根目录新建`.prettierrc`.前提是要安装prettier插件

```json
{
  "tabWidth": 2,
  "singleQuote": true,
  "semi": false
}
```

### tweenmax

官网地址： https://www.tweenmax.com.cn/

### 西瓜播放器

参考地址：http://h5player.bytedance.com/gettingStarted

### 学习网站

https://www.houdunren.com   dxl_1234