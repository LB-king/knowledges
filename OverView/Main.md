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

#### 1.1手写instance

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
  function getType(target) {
    const types = ['Number', 'String', 'Boolean', 'Object', 'Array', 'Function', 'RegExp', 'Date', 'Symbol', 'Undefined', 'Null']
    
    let typeObj = {}
    types.forEach(item => {
      typeObj[`[object ${item}]`] = item.toLowerCase()
    })
    return typeObj[Object.prototype.toString.call(target)]
  }
  ```

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

   

#### 2.1手写forEach

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

1. 性能比较

   for 优于 forEach

   

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