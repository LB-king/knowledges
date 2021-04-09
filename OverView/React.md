### 1.简介

- 起源于Facebook公司的内部项目，用来架设Instagram...**2013年5月开源**
- 清楚两个概念：
  - library(库):`小而巧，只提供了特定的API`，优点就是：可以很方便的从一个库切换到另外的库 ；但是代码几乎不会改变
  - Framework(框架):`大而全` ，框架提供了一整套的解决方案；所以在项目中间想切换到另外的框架，是比较困难的

### 2.三大主流框架

- Angular
  - 最早
- Vue
  - 最火
- React
  - 最流行

### 3.React与Vue的对比

- **组件化方面**
  1. **什么是模块化？**是从**代码**的角度来进行分析的；把一些可复用的代码，抽离为单个的模块；便于项目的维护和开发

  2. **什么是组件化？**是从**UI界面**的角度进行分析的；把一些可复用的UI元素，抽离为单独的组件

  3. **组件化的好处？**随着项目规模的增大，组件会越来越多；能方便的使用

  4. **Vue**是如何实现组件的：通过.vue文件，来创建对应的组件
     - Vue.component()
     - Vue.extends()
     - .vue模板文件
       - template - 结构
       - script - 行为
       - style - 样式

  5. **React**：一切都是以JS来表现的

- **移动APP**

  - vue---->weex

  - react---->ReactNative

### 4.React中的几个核心概念

#### 4.1-虚拟DOM(Virtual Document Object Model)

- **DOM的本质**：浏览器中的概念，用js对象来表示页面上的元素，并提供了操作DOM对象的API
- **什么是react中的虚拟DOM**：是框架中的概念，是程序员用js对象来模拟页面上的dom和dom嵌套关系。这个API是由程序员提供的，为了实现页面上元素的高效更新。
- **为什么需要虚拟DOM**：为了实现页面中，DOM元素的高效更新
- 本质：用js对象，来模拟dom元素和嵌套关系
- 目的：就是为了实现页面元素的高效更新

#### 4.2-Diff算法

- **tree diff**：新旧两棵DOM树对比的过程，就是Tree Diff;当整棵DOM逐层对比完毕，则所有需要按需更新的元素，必然能够找到
- **component diff**：在进行Tree Diff的时候，每一层的组件级别的对比叫做component diff
  - 如果对比前后，组件类型相同，则**暂时**认为此组件不需要被更新
  - 如果对比前后，组件类型不同，则需要移除旧组件，创建新组件，并追加到页面上
- **element diff**：在进行组件对比的时候，如果组件类型相同，则要进行元素级别的对比，这就叫做Element Diff
- 点击表头，实现表格中的列的数据的排序
  - 表格中的数据从哪儿来的？数据库查询得到的
  - 这些查询到的数据存哪儿了？浏览器的内存中
  - 这些数据是怎么渲染到页面上的？
    - 模板引擎渲染
    - 排序渲染到页面上，会触发哪些流程？
      - 把内存中的数组进行排序。把排好序的数据再渲染到表格中。
      - 按需更新最好，对性能比较友好
      - dom树是浏览器提供的
      - 程序员手动模拟dom树，如何模拟一个dom元素(使用js对象)

手动模拟的2个新旧dom树，使用js对象

### 5.webpack创建应用

```powershell
npm init -y
```

1. 在项目根目录创建`src`源代码目录和`dist`产品目录

2. 在`src`目录下新建`index.html`

3. 安装webpack

   ```shell
   npm i webpack webpack-cli -D
   ```

   > 注意：卸载全局安装的webpack和webpack-cli失败
   >
   > `npm cache clean --force`清一下缓存

   **webpack.config.js**

   ```javascript
   let path = require('path')
   module.exports = {
       mode: "production", //development
       //自定义打包的入口文件
       entry: path.resolve(__dirname,"./src/test.js")
       //自定义打包的出口文件
       output: {
           path: path.resolve(__dirname,'bundle'),
           filename: "b.js"
       }
   }
   ```

4. 注意：webpack 4.x提供了约定大于配置的概念；目的是为了减少配置文件的体积

   - 默认约定了
   - 打包入口是：`src`--->`index.js`
   - 打包输出文件是：`dist`--->`main.js`
   - `mode`必须要，选项`production`和`development`

5. webpack-dev-server

   ```shell
   npm i webpack-dev-server -D
   ```

   > WDS打包好的main.js是托管到内存中；所以在项目根目录看不到；
   >
   > 但是我们可以认为在根目录中有一个main.js

**package.json**

```json
{
    "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
   	"dev": "webpack-dev-server --open firefox --port 8081 --progress --hot --compress --host 127.0.0.1"
  }
}
```

ie：`iexplore`

6.html-webpack-plugin (在内存中生成index.html，它会将打包后的main.js自动导入到项目中)

```javascript
let path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const htmlPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, './src/index.html'),
    filename: 'index.html' //生成的内存中首页的名称
})
module.exports = {
    plugins: [
        htmlPlugin
    ]
}
```

### 6.在项目中使用react

安装`react`、`react-dom`

```shell
cnpm i react react-dom -S
```

- react:专门用于创建组件和虚拟dom，组件的生命周期都在这个包中

- react-dom：专门进行dom操作的，最主要场景：ReactDom.render()

创建虚拟dom元素

```javascript
React.createElement('h1',{id:'hello'},'内容')
```

- 参数1：创建元素的类型，字符串，表示元素的名称
- 参数2：是一个对象或者null，表示当前dom元素的属性
- 参数3：子节点(其他 虚拟dom 文本子节点)

使用ReactDOM把虚拟dom插入到页面上

```javascript
ReactDOM.render(myElement,document.getElementById('app'))

```

- 参数1：要渲染的虚拟dom
- 参数2：指定页面上的容器

> 注意：项目目录使用小写，不然编译会有警告

**渲染页面上dom元素最好的方式就是写html代码**

```javascript
const mydiv = <div id='mydiv'>这是div元素</div>
//这是JSX语法 符合XML规范的js

```

在js中默认不允许写这种类似html一样的标记

可以使用**babel**来转换这些js中的标签

#### 6.1 JSX语法

JSX的本质是运行的时候被转换成了React.createElement 形式来执行

#### 6.2 安装babel

1. 安装babel插件(babel-loader注意版本问题)


```shell
cnpm i babel-core babel-loader babel-plugin-transform-runtime -D
cnpm i babel-loader@7 -D

```

```shell
cnpm i babel-preset-env babel-preset-stage-0 -D

```

2. 安装能够识别转换jsx语法的包`babel-preset-react`

```shell
cnpm i babel-preset-react -D

```

3. 配置`webpack.config.js`

   ```javascript
   module.exports = {
     mode:'development',
     //所有第三方 模块的配置规则
     //webpack默认只能处理.js后缀名类型的文件
     module:{
       rules:[
         {
           test:/\.js|jsx$/,
           use:'babel-loader',
           exclude:/node_modules/
         }
       ]
     }
   }
   ```
   
4. 添加`.babelrc`配置文件

```json
{
  "presets":["enc","statge-0","react"],
  "plugins":["transform-runtime"]
}

```

presets：语法

plugins：插件

#### 6.3 react基本用法

```jsx
let num = 99
let str = 'string'
let bool = true
ReactDom.render(<div>
<h2>{num}</h2>
<h2>{str}</h2>
<h2>{bool?'真':'假'}</h2>
</div>,document.getElementById('app'))


6c04b3da353c71903417e739ab225d39083deae24f83fdd50ba1aa8668ad0782

```

