### 1.说说父子组件钩子的执行顺序

  > 父beforeCreate
  > 父created
  > 父beforeMount
  > 子beforeCreate
  > 子created
  > 子beforeMount
  > 子mounted
  > 父mounted
### 2.v-if和v-show的区别
  > opcity为0 和 v-show区别？
  >
  > `v-if`是通过dom元素的删除和生成来实现显示隐藏的，每一次显示隐藏都会重新走一遍生命周期，显隐决定了组件的生成和销毁
  > `v-show`是通过控制dom元素的css样式来实现显隐，不会销毁
  > 频繁或者大数据了显隐建议使用`v-show`
| display: none              | visibility:hidden          | opacity:0                  |
| -------------------------- | -------------------------- | -------------------------- |
| 不占空间                   | 占空间                     | 占空间                     |
| 无法进行DOM事件监听        | 无法进行DOM事件监听        | 可以进行DOM事件监听        |
| 改变属性，会重排，性能较差 | 改变属性，会重绘，性能较高 | 改变属性，会重绘，性能较高 |



### 3.$nextTick的原理？
  > 源码?
  > setTimeout 和 nextTick 哪个会先执行？
  >
  > 异步任务，不进入主线程，而进入任务队列的任务，分为微任务和宏任务
  >
  > 宏任务：渲染事件、setTimeout、setInterval、node中的setImmediate
  >
  > 微任务：Promise.then
  >
  > 语言组织：
  >
  > 1.Vue实现响应式并不是数据发生变化之后DOM立即变化，而是按照一定的策略进行DOM的更新。
  >
  > 2.把异步任务放入事件队列中，
  >
  > 它的执行过程：
  >
  > 1. 把传入的回调函数cb压入callbacks数组
  > 2. 执行timerFunc，延迟调用flushCallbacks
  > 3. 遍历执行callbacks数组中的所有函数



```js
mounted() {
  this.name = 'hi'
  console.log(this.$el.clientHeight) // 0
  this.$nextTick(() => {
    console.log(this.$el.clientHeight) // 21
  })
}
//在执行this.name='xxx'的时候，就会触发Watcher更新，watcher会把自己放到一个队列
//在下次DOM更新循环结束之后执行延迟回调。在修改数据之后使用这个方法，获取更新后的DOM
```
> 里面主要涉及`timerFunc` 会收集所有的callbacks队列，然后依次执行队列中的任务，并且会判断浏览器是否支持`promise`，支持的话这些回调以promise的形式执行，不支持的话以`MutationObserver`,再不支持会判断是否支持 `setImmediate`,最后是`setTimeout`
>
> 就是在不同的环境用不同的方式去执行`flushCallbacks`

### 3.1路由传参

显示：query:{}

隐式：params:{}

​	需要加 `name`

### 4.keep-alive了解吗？他有2个重要属性

用于保存组件的渲染状态

  > include -字符串或者正则表达式。只有名称匹配的组件会被缓存
  > exclude -字符串或者正则表达式。任何名称匹配的组件都不会被缓存。
  > max -最多可以缓存多少组件实例
### 5.修饰符

  > 源码?
  >
  > 常用修饰符：
  >
  > 
### 6.说一说vue的双向绑定？

  > 组织一下语言？
  >
  > Vue的双向数据绑定，使用数据劫持和发布订阅的模式实现的
  >
  > v2采用的是Object.defineProperty进行数据劫持的
  >
  > v3采用es6的proxy实现
  >
  > 两者的差异：
  >
  > - 前者对属性的删减，数组长度的改变时没法监听的
  > - 可以拦截对象
  >
  > 主要实现原理是使用描述对象中的set方法进行拦截，并发送订阅器信号
### 7.谈一谈虚拟dom？
  > 组织语言
  >
  > VM是对DOM的抽象，本质上是JS对象。
### 8.patchNode了解吗？

  > 深入
### 9.vue3中setup的理解？
  > 参数有几个？
  > return 的变量的作用域？

### 10.ref用过吗？
  > 理解有误，回答成了v2的ref
  > 谈谈与reactive的区别？

### 11.script 中 setup 语法糖
### 12.传入的数据不可改变的方法有哪些？
  > 方法列一下。。。
### 13.TS:[[11,22,33]]

  > 写一个这样的接口
  >
  > ```typescript
  > var arr: Array<Array<number>> = [[11, 22, 33]]
  > var a1: number[][] = [[3, 9]]
  > ```
  >
  > 

### 14.浅拷贝的方法？
  > 列一下？
### 15.add(1)(2)(3)
  > 几种方式？
  > 提示了箭头函数

### 16.es6常用方法？

  > promise ...
### 17.promise原理？
  > 语言需要再组织一下

### 18.协商缓存？

### 19.伪类选择器了解哪些？
  > :active这些....

### 20.transform?

### 21.webpack的plugin作用？

### 22.webpack中copy一个文件夹，不希望他被打包，这个插件叫什么？

### 23.webpack优化手段？

### 24.搭建项目框架？你会怎么做？图片较多的情况。。。

### 分割线-------

### 1.vue中响应式原理是怎么实现的？

### 2.key的作用?

### 3.$nextTick?

### 4.vuex,组件直接直接修改state的值,

> 直接修改的话，会有什么影响？
>
> 如何判断是直接修改的还是mutation触发的？

### 5.每个组件都可以访问this.$store,怎么能访问到的？

```js
new Vue({

store

})
```



### 6.vite与webpack的区别？

### 7.vite --force干嘛的？

### 8.js修改this的执行

### 9.es6箭头函数的this?

### 10.js作用域链的概念？

### 11.闭包是怎么形成的？

### 12.原型链是什么概念？

### 13.首屏优化？手段？性能工具？

### 14.难点怎么解决的？

### 15.nuxt私服？CI/CD是自己搭建的吗？

### 16.说说js的设计模式？

- 单例模式：把描述当前事物的信息进行分组归类(减少全局变量的污染)

  ```js
  var name = 'tom'
  var age = 18
  
  var name = 'alice'
  var age = 9
  
  var girl = {
    name: 'alice',
    age: 9
  }
  var boy = {
    name: 'tom',
    age: 18
  }
  
  //girl和boy不仅仅被叫做变量(对象名)，也被成为“命名空间”
  //单例模式：把描述事物的信息放到一个命名空间进行归组，防止全局变量的污染
  //高级单例模式
  let Person = (function() {
    let fn = function(){}
    return {
      namw: 'xxx',
      fn
    }
  })()
  ```

- 工厂模式

  批量化生产,把实现某个功能的方法代码进行封装，后期在想实现这个功能的时候，直接执行函数即可

  - 低耦合：减少页面的冗余代码
  - 高内聚：提高代码的复用率

  ```js
  function create(name, age) {
    let person = {}
    person.name = name
    person.age = age
    return person
  }
  ```

  

### 分割线-----



### 1.vue和react的区别？

> vue 和 react：
>
> 相同：都是基于组件化开发，都有虚拟dom，AST解析可以转成各种平台的应用，数据驱动
>
> 不同：vue2是一种option的编码方式

### 2.对应的SEO的方案？

> vue-nuxt.js 
>
> react-next.js
>
> 网站3大标签：TDK(Title, Description, Keyword)
>
> 1. title:网站名，网站的介绍(尽量不要超过30个汉字)
> 2. description：简要说明我们网站主要是做什么的
> 3. keywords：页面关键词，是搜索引擎的关注点之一，最好限制为6-8个关键词，之间用英文逗号隔开

```html
<title>商城页面，欢迎选购</title>
<meta name="description" content="这是关于商城的描述"/>
<meta name="keywords" content="网上购物,网上商城,手机,笔记本,相机"/>
```

自定义的SEO优化：

- TDK是一个点

- 标签语义化

- h1和h2标签使用要限制，不要嵌入其他标签，

- sitemap:我们称为sitemap.xml 为网站地图，它的创建是为了更有利于搜索引擎的抓取策略，从而提高工作效率:
  - 良好的`robot.txt`协议可以指导搜索引擎的抓取方向，节省"爬虫"抓取时间，所以会提升爬虫的工作效率
  - 将`sitemap.xml`和`robot.txt`放在网站的根目录下

​		

### 3.nuxt.js哪些生命周期有什么不同

### 4.axios封装过？

### 5.axios源码？

可以在node中运行，也可以在浏览器端运行？

fetch 模块进行封装

进行环境的区分？在node端使用 request,在浏览器端就是 调用XMLHTTPRequest

### 6.大文件的下载？

文件就是一个blob ->eventTarget->slice的方法，可以进行切片,服务器端配合 206的响应

http的 range字段

>  请求资源的部分内容，单位是byte，字节，从0开始
>
> 如果服务器能够正常响应的话，服务器会返回206 Partial Content的状态码说明
>
> 如果不能处理的话，就会返回整个资源

分片上传：

断点续传

### 7.优化指标？

性能工具，

Lighthouse： 可访问性，无障碍访问

### 8.首屏时间如何计算？

fp  fcp 的时间，performance这个api中记录了很多时间

这个计算的时间准确吗？这个不好说？？？？

### 9.MutationObserver

计算出一个趋于稳定的时间点：

监听body

变动最大的一次，再稳定的话

权重计算：层级

### 10.webworker

单线程不利于大量数据的计算

webwork能计算数据，不能操作dom  postmessage

webwork会影响主线程？

### 11.前端工程化怎么理解？

有构建工具的时候，前端工程化已经形成。。。

减少重复性工作

热更新

结合nodejs会方便多，在读取文件的时候也更加便利

图片-webp

### 12.webpack打包？

### 13.刷算法？

### 14.二叉树的种类？

平衡二叉树

完全二叉树

搜索二叉树

### 15.二叉树遍历？

前序

中序

后序

### 16.网络？

验证学习

抓包

### 17.http2相对于1？

1.1对于1.0已经做了一个keep-alive的优化

域名分片

多路复用

Hpack算法

服务器推送

问题：队头阻塞

### 18.TCP和UDP有什么区别？

这俩都是传输层协议

http是应用层协议

### 19.安全防护？

XSS

CSRF

### 20.又没写过类似babel插件？

jsx->js

es6->js

AST抽象语法树进行分析。。

识别到某种type，然后对其进行操作

### 21.babel和polyfill有什么区别？

### 22.错误监控？

sentry

采集

上报

清洗

可视化展示



### 23.规范

代码风格

### 24.husky 

.git hook: pre-commit

### 25.换肤

定制肤色

定制布局：

- resolve.extension

### 26.微前端

模块太多

webpack5 子应用

拆分

跨团队会好一点

### 27.部署流程

开发

测试

pre

生产

### 28.数据结构

链表

栈

队列

树

图

###  分割线------

### 1.说一说js的数据类型有哪些？有哪些方法可以判断？

> JS中一共有7种内置数据类型，包括**基本类型**和**对象类型**
>
> - 基本类型：string | number | boolean | null | undefined | symbol
>   - 注意：前面5种类型统称为**原始类型**
>   - symbol是ES6新增的数据类型，表示独一无二的值，通过Symbol函数生成
>
> - 对象类型：
>
>   对象类型也叫**引用类型**
>
> 判断方法：`typeof` | `instanceof` | `constructor` | `Object.prototype.toString.call()`
>
> - typeof:
>
>   不足：判断null => object
>
>   ​			数组和对象都是 object
>
> - instanceof:
>
>   不足：不能检测基本类型
>
>   ​			可以任意修改原型的指向，会造成判断不准确
>
>   ```js
>   var fn = function () { this. name = 9}
>   fn.prototype = Object.create(Array.prototype)
>   var f = new fn()
>   f instanceof Array //true
>   ```
>
> - constructor:
>
>   也可以自定义：
>
>   ```js
>   var arr = []
>   Array.prototype.constructor = {}
>   arr.constructor === Array //false
>   ```
>
> - Object.prototype.toString.call() 最佳方法

### 2.谈谈你对原型链的理解？

### 3.判断某个方法是否是原型链上？

### 4.谈谈对闭包的理解？

### 5.工作中闭包的使用？

### 6.深拷贝和浅拷贝？

> - 浅拷贝-对基本类型的值拷贝，以及对象类型的地址拷贝
>
> - 深拷贝-除了拷贝基本类型的值，还完全复制了对象类型
>
>   一个对象在内存空中是固定存在的，我们如果要对其进行深拷贝，唯一的办法就是创建一个新的对象，里面的值完全复制原来的值

### 7.用什么方法？

````js

//1.一层对象
var p1 = {
  name: 'p1',
  obj: {
    name: 'obj1'
  }
}
var p2 = {}
Object.assign(p2, p1)
//2.JSON.parse(JSON.stringify(target)) 不足
//3.手写一个deepClone的方法
var a1 = {
	name: 'aaa1',
  obj: {
    name: 'ooo1'
  }
}
//简易版本，不考虑symbol，不考虑相互嵌套  var a = {}; a.xx= {a}
function deep(target) {
  if (typeof target !== 'object') {
    return target
  } else {
    let res = target.constructor === 'Array' ? [] : {}
    for(let key in target) {
      if(target.hasOwnProperty(key)) {
        res[key] = deep(target[key])
      }
    }
    return res
  }
}
var a2 = deep(a1)
a2.obj.name = '2222'
//
````

### 8.es6语法，用的多吗？用过哪些？

> promise 必问

### 9.数组去重？

### 10.数组片段截取？

> - splice
> - slice

### 11.vue-router的路由跳转方式？

### 12.路由传参?

### 13.computed和methods有啥区别？

> 使用上有什么区别？(没理解)

### 14.v-for和v-if的优先级？

### 15.v-for中key的作用？

### 16.谈谈事件循环机制？

### 17.常见微任务？

### 18.重排与重绘的区别？

### 19.项目PC端？IE兼容？

### 20.工作中结果过啥让你感觉很有意义？

























