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

- jsx的语法规则：

  - 定义虚拟dom时，不要加引号
  - 标签中混入js表达式时要加{}
  - 样式的类名不要用class，要用className
  - 内联样式要用对象的写法 `style={{color: 'red'}}`
  - 只有一个根标签
  - 标签必须闭合
  - 标签首字母
    - 小写字母：将标签转化为html同名元素，若html中无该标签对应的同名标签，则报错
    - 大写：react就去渲染对应的组件，若无则报错

  ```jsx
  const VDOM = (<div>
      <h1 id="main">hello react</h1>
      <h3 className="red">我是H3标签</h3>
      <h4 style={{color: 'red', backgroundColor: '#ccc'}}>基本信息：{name}</h4>
    </div>)
  ```

  **{}**混入表达式不报错，js语句(代码)就会报错
  
  表达式：一个表达式可以产生一个值，可以放在任何需要的地方
  
  - a (一个变量)
  
  - a + b
  
  - func(1)
  
  - arr.map
  
  - function fn(){}
  
    > let xxx = 表达式  有一个返回值，就是表达式
  
  语句(代码)
  
  - if(){}
  - for(){}
  - switch() {case:xx}

#### 3.2模块化、组件

##### 3.2.1模块

1. 理解：向外提供特定功能的js程序，一般就是一个js文件
2. 为什么要拆成模块：随着业务逻辑增加，代码越来越多且复杂
3. 作用：复用js，简化js的编写，提高js运行效率

##### 3.2.2组件

1. 理解：用来实现局部功能效果的代码和资源的集合(html/css/js/image)
2. 为什么：一个界面的功能更复杂
3. 作用：**复用代码**，简化项目编码，提高运行效率

##### 3.2.3模块化

​	当应用的js都以模块来编写，这个应用就是模块化的应用

##### 3.2.4组件化

​	当应用以多组件的方式实现，这个应用就是一个组件化应用

### 4.面向组件编程

#### 4.1函数式组件

​	用函数定义的组件

```jsx
function Com() {
  // this -> undefined
  return <h3>hello</h3>
}
ReactDOM.render(<Com/>, app) //首字母必须大写

/*
ReactDOM.render(<Com/>, app) 之后发生了什么
1.React解析组件标签，找到Com组件
2.发现组件是用函数定义的，随后调用该函数，将返回的虚拟dom转化为真实dom，呈现在页面中
*/

```

#### 4.2类式组件

用类定义的组件

```jsx
class MyCom extends React.Component {
  render() {
    //this ->组件实例对象  props  refs  state
    return <h3>类组件</h3>
  }
}
// 1.继承extends 2.render 3.return
/*
ReactDOM.render(<Com/>, app) 之后发生了什么
1.React解析组件标签，找到Com组件
2.发现组件是用类定义的，随后new出来该类的实例，并通过该实例调用到原型上的render方法。
3.将render返回的虚拟dom转化为真实dom，随后呈现到页面中
*/
```

**class类**的注意事项：

- 类中的构造器不是必须要写的，要对实例进行一些初始化的操作，如添加指定属性时才写

- 如果A类继承B类，且A类中写了构造器，那么A类中的**super**是必须调用的

- 类中所定义的方法，都放在了类的原型对象上，供实例去使用

- class中定义的方法，已经在局部开启了严格模式

- 类中可以直接写赋值语句

- 类自身添加属性

  ```jsx
  class Car {
    constructor(name) {
      this.name = name
    }
    // 给car的实例对象添加一个属性，名a 值333
    a = 333
    // 类自身添加属性
  	static color = {
    	bg: 'red'
    }
  }
  ```
  
  

#### 4.3组件三大核心属性

##### 4.3.1state

1. state是组件对象最重要的属性，值是对象(可以包含多个key-value的组合)

2. 组件被称为"状态机"，通过更新组件的state来更新对应的页面显示(重新渲染组件)

   ```jsx
   class Weather extends React.Component {
     // 构造器调用1次
     constructor(props) {
       // 如果A类继承B类，且A类中写了构造器，那么A类中的super是必须调用的
       super(props)
       this.state = {
         name: ''
       }
       // 绑定this
       this.change = this.change.bind(this)
     }
     render() {
       // 更新的时候就调用,this指向当前的实例对象
       return (<h3 onClick={change}>this is {this.state.name}</h3>)
     }
     change() {
       this.setState({
         name: 'xxx'
       })
     }
   }
   ```

   简写：

   ```html
   <!-- 引入prop-types 用于对组件标签属性进行限制 -->
   <script src="./static/prop-types.js"></script>
   ```

##### 4.3.2props

解释：

- 每个组件对象都会有props属性
- 组件标签的所有属性都保存在props中

作用：

- 通过标签属性从组件外向组件内传递变化的数据
- 注意：组件内部不要修改props数据

对数据的限制：

- 第一种方式`15.5`已经弃用

  ```jsx
  P.propTypes = {
    name: React.PropTypes.string.isRequired,
    age: React.PropTypes.number
  }
  ```

- 第二种方式(新)

  ```jsx
  P.propTypes = {
    name: PropTypes.string.isRequired,
    age: PropTypes.number
  }
  P.defaultProps = {
    age: 12,
    sex: 'man'
  }
  ```

  

```jsx
class Com extends React.Component {
   //构造器是否接受props，是否传递给super，取决于：是否希望在构造器中通过this访问props
  constructor (props) {
    super(props)
    console.log(this.props) //不传props 就是undefined
  }
  // 类中的构造器能省则省
  state = {
    name: 'kobe'
  }
// 自定义方法：赋值语句 + 箭头函数
  change = () => {
    let name = this.state.name
    this.setState({
      name: name === 'kobe' ? 'james' : 'kobe'
    })
  }
  render() {
    let { name } = this.state
    return <h4 onClick={this.change}>{name}</h4>
  }
}
Com.propTypes = {
  name: PropTypes.string.isRequired,
  sex: PropTypes.string,
  age: PropTypes.number,
  say: PropTypes.func //不能写function，因为它是一个关键字
}
Com.defaultProps = {
  sex: '未知性别'
}

ReactDOM.render(<Com />, app)
```

##### 关联

|       | 函数式组件               | 类式组件 |
| ----- | ------------------------ | -------- |
| state | X                        | √        |
| props | √                        | √        |
| refs  | X(后面版本的hooks会解决) | √        |

##### 4.3.3refs

- 字符串ref

- 回调函数形式ref

  - 内联形式

    ```jsx
    <input ref={(c) => { this.state.input1 = c console.log('#', c)}} type="text"/>
    ```

  - 类绑定

    ```jsx
     saveInput = (c) => {
       this.state.input1 = c
       console.log('#', c)
     }
    <input ref={this.saveInput} type="text" />
    ```

    > 如果**ref**回调函数是以内联函数的方式定义的，在更新过程中他会被执行2次，第一次传入null，然后第二次会传入参数DOM元素。因为在每次渲染时会创建一个新的函数实例，所以React清空旧的ref并设置新的。通过将ref的回调函数定义成class的绑定函数的方式可以避免上述问题，但是大多数情况下是无关紧要的。

- createRef

  ```jsx
  myRef = React.createRef()
  show = () => {
    let v = this.myRef.current.value
  }
  <input ref={this.myRef} type="text" placeholder="请输入" />
  <button onClick={this.show}>点击提示左侧数据</button>
  ```

  字符串类型的ref  不推荐使用;createRef推荐使用

#### 4.4react事件处理

1. 通过**onXxxx**属性指定事件处理函数，注意大小写、
   - **react**使用的是自定义(合成)事件，而不是使用原生的**DOM**事件——为了更好的兼容性
   - **react**中的事件是通过事件委托方式处理的(委托给最外层的元素)——为的是高效
2. 通过**event.target**得到发生事件的**dom**元素对象——不要过度使用**ref**

#### 4.5收集表单数据

包含表单的组件分类：

- 受控组件
- 非受控组件

### 5.函数柯里化

1. 高阶函数

   > 如果一个函数符合下面2个规范中的任何一个，那么该函数就是高阶函数
   >
   > 1.若A函数，接收的参数是一个函数，那么A就可以称之为高阶函数
   >
   > 2.若A函数，调用的返回值依然是一个函数，那么A就可以称之为高阶函数
   >
   > 常见的高阶函数有：promise / setTimeout / arr.map ......

2. 函数柯里化

   > 通过函数调用继续返回函数的方式，实现多次接收参数最后统一处理的函数编码形式

   补充：如果注释的代码不可折叠则可以这样写

   ```js
   //#region
   //代码片段
   //#endregion
   ```

### 6.生命周期

> 挂载 - mount
>
> 卸载 - unmount

















​	











