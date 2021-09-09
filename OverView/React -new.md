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

   作用：

   > 1. es6 => es5
   > 2. jsx => js

   ```html
   <script src="./static/babel.min.js"></script>
     <!-- 核心库 -->
   <script src="./static/react.development.js"></script>
   <!-- 用于react支持dom操作 -->
   <script src="./static/react-dom.development.js"></script>
   
   <script type="text/babel">
     // 此处 不要加引号
       const VDOM = <h1>hello react</h1>
       ReactDOM.render(VDOM, document.getElementById('app'))
   </script>
   ```

   jsx语法

   ```js
   // 此处 不要加引号
   const VDOM = <h1>hello react</h1>
   ReactDOM.render(VDOM, document.getElementById('app'))
   ```

   虚拟dom：

   1. 本质就是Object类型的对象
   2. 虚拟dom比较轻，真实dom比较重，因为虚拟dom是react内部在用，无需真实dom上的那么多属性。
   3. 虚拟dom最终会被react转化为真实dom，呈现在页面上

#### 3.1 JSX

- 全称 Javascript XML

- react定义的一种类似于XML的js扩展语法：js+XML

  > XML:早期用于存储和传输数据

  ```xml
  <student>
    <name>Jack</name>
    <age>18</age>
  </student>
  ```

  后来使用json来存储：js自身的parse stringify两个方法。
  
  ```json
  {
    "name": "Jack",
    "age": 18
  }
  ```
  
- 本质是React.createElement(tag, props,...children)方法的语法糖

基本信息： 出生年月，学历：统招本科 （）

项目经验：和工作经验分开

感觉外包，了解 外包不是很友好。

求职：精通 架构级别，比后端高20%。突出技术优势，强化，具体量化，
         排版: 结合JD。有针对性的。首先针对HR做出一些。业务逻辑复杂？时间赶？
项目的业务：取舍（crm）工作描述：多一些，性能优化，组件开发的可以写2遍
	react自己做的项目？
其他：实际功能

项目写几个？ 1-2个