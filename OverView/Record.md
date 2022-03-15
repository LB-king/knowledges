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

```js
mounted() {
  this.name = 'hi'
  console.log(this.$el.clientHeight) // 0
  this.$nextTick(() => {
    console.log(this.$el.clientHeight) // 21
  })
}
```
```
在执行this.name='xxx'的时候，就会触发Watcher更新，watcher会把自己放到一个队列
```
> 用队列的原因是比如更新多个数据，就更新视图多次的话，性能上就不好了，所以对视图更新做一个异步更新的队列，避免重复计算和不必要的DOM操作，在下一轮事件循环的时候刷新队列，并执行已经去重的任务，更新视图

### 4.keep-alive了解吗？他有2个重要属性

  > include -字符串或者正则表达式。只有名称匹配的组件会被缓存
  > exclude -字符串或者正则表达式。任何名称匹配的组件都不会被缓存。
  > max -最多可以缓存多少组件实例
### 5.修饰符
  > 源码?
### 6.说一说vue的双向绑定？
  > 组织一下语言？
### 7.谈一谈虚拟dom？
  > 组织语言
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
  > Array<Array<number>>

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

### 25.MutationObserver干啥用的？

