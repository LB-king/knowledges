### 1.react是什么？

> 用于构建用户界面的JavsScript库

原生js操作dom的问题？

- 原生js操作dom繁琐，效率低(使用dom-api操作ui)
- 使用原生js操作dom，浏览器会进行大量的重绘重排
- 原生js没有组件化的编码方案，代码复用率低

### 2.特点

1. 采用**组件化**模式、**声明式编码**，提高开发效率和组件复用率

   > 声明式编码：一个简单的命令，react内部就会帮助我们完成某些操作

2. 在ReactNative中可以使用React语法进行**移动端开发**

3. 使用**虚拟DOM**+优秀的**Diffing算法**，尽量减少与真实DOM的交互

4. react高效的原因？

   - 使用虚拟dom，不直接对操作页面的真是dom
   - dom diffing算法，最小化页面重绘

### 3.基本使用

#### 3.1引入相关库

1. react.js

2. react-dom  react扩展库

3. babel.min.js  下载地址：  https://github.com/babel/babel-standalone/releases

   > 1. es6 => es5
   > 2. jsx => js

4. 