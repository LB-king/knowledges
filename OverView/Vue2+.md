### postman

- 打开manage enviroments

  | VARIABLE | INITIAL VALUE           | CURRENT VALUE                    |
  | -------- | ----------------------- | -------------------------------- |
  | base_url | http://192.168.1.1:2000 | http://192.168.1.1:2000          |
  | token    | 121212                  | 0c5862de82275e1c575fb4ea7f92eaba |
  
- 在登陆的接口中设置

  ```shell
  {{base_url}}/sso-auth/api/auth/doLogin
  ```

- 在Tests中设置

  ```javascript
  // 把json字符串转化为对象
  var data = JSON.parse(responseBody);
  //获取data对象的token值
  var token = data.data.token; //根据实际参数结构修改
  pm.globals.set("token", token)
  ```

- 在其他接口中 **Hearder**中加入token即可
  | KEY          | VALUE            |
  | :----------- | :--------------- |
  | token        | {{token}}        |
  | Content-Type | application/json |
  

### 初始化项目

```shell
npm install @vue/cli -g
```



### vue.config.js

```javascript
module.exports = {
  devServer: {
    overlay: {
      warning: true // eslint编译时会有警告，但是不影响结果
    }
  },
  css: { // 引入全局的scss
    loaderOptions: {
      sass: {
        prependData: `@import '~@/styles/common.scss';`
      }
    }
  }
}
```

### 引入element-ui

```shell
npm i element-ui -S
```

- #### 全部引入

```javascript
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI, { size: 'small', zIndex: 3000 })
```

- #### 按需引入

  1.首先需要安装`babel-plugin-component`

  ```shell
  npm i babel-plugin-component -D
  ```

  2.配置`.babelrc`或者直接在``babel.config.js`中添加配置项

  ```json
  {
    "plugin": [
      [
        "component",
        {
          "libraryName": "element-ui",
          "styleLibraryName": "theme-chalk"
        }
      ]
    ]
  }
  ```

  3.`main.js`中按需引入组件

  ```javascript
  import Vue from 'vue'
  import { Button, Upload } from 'element-ui'
  Vue.use(Button)
  Vue.use(Upload)
  /* 或者写成
  * Vue.component(Button.name, Button)
  * Vue.component(Upload.name, Upload)
  */
  Vue.prototype.$loading = Loading.service
  Vue.prototype.$msgbox = MessageBox
  Vue.prototype.$alert = MessageBox.alert
  Vue.prototype.$confirm = MessageBox.confirm
  Vue.prototype.$prompt = MessageBox.prompt
  Vue.prototype.$notify = Notification
  Vue.prototype.$message = Message
  ```

  或者直接在所需组件中引入(babelrc都需要配置)

  ```javascript
  import { Container } from 'element-ui'
  ...
  export default {
  	components: {
      'el-container': Container
    }
  }
  // 注册之后就可以在template标签使用组件了
  ```

  PS:按需引入的体积比全部引入引入的打包体积小1-2MB

  `el-autocomplete`空值也会弹出上次结果的下拉框

  ```javascript
  // 解决方法
  this.$refs.target.suggestion = []
  ```
  
  `el-autocomplete`清除按钮点击之后导致查询不显示列表
  
  ```javascript
  this.$refs.autoComplete.activated = true;
  ```

### pug

```powershell
npm install pug pug-loader pug-plain-loader -D
```

在`.vue`文件中使用

```vue
<template lang="pug">
  #app.main-app
    router-view
    p joke
</template>
```

### 全局scss

1. 在`vue.config.js`中配置(见标题2)

2. 在App.vue中引入scss文件

   ```scss
   @import "~@/styles/common.scss";
   ```

### 常用utils

```javascript
'123456'.replace(/(?=(?!\b)(\d{3})+$)/g,',') // '123,456'
```

交换2个变量的值

```javascript
let [a, b] = [11, 222]
a = [b, (b = a)][0]
```

预渲染(prerender-spa-plugin)

vue的依赖注入

SEO

SSR(服务端渲染) vue-server-render - renderToString方法

### d3.js

https://www.d3js.org.cn/document/d3-hierarchy/

(Data-Driven Document) Document Object Model

svg是他的画布SVG (Scalable Vector Graphics)可缩放矢量图形

svg是d3的主要操作对象 , g:

- Axis可封装成一个group
- Legend(图例)可封装成一个group

文档地址: https://www.it1352.com/OnLineTutorial/d3js/d3js_selections.html

#### 选择

- select()

  ```javascript
  d3.select('#maingroup rect') // 基于层级的查询
  d3.selectAll('.tick text') // 只会返回找到的第一个元素
  ```

  注意：这种形式的查询，要熟悉其用法

- selectAll() 用于选择HTML文档中的多个元素

  ```javascript
  d3.selectAll(".myclass").attr("style", "color: red")
  ```

- append()

- text()

- html()

- attr() 用于添加或更新所选元素的属性。

- style() 用于设置所选元素的样式属性

- classed() 专门用于设置HTML元素的'class'属性。

  ```javascript
  d3.select('.myClass').text()
  d3.select('#hello').text()
  d3.select('div.myClass').append('span')
  d3.select('.myClass').html('hi!<span>from d3</span>')
  d3.select('.myClass').attr('style', 'color: red')
  d3.select('.myClass').style('color', 'green')
  d3.select('.myClass').classed('aname', true) // 添加类，必须将分类方法的第二个参数设置为true
  d3.select('.myClass').classed('bname', false) // 删除类，必须将第二个参数设置为false
  d3.select(".myclass").classed("myanotherclass") // 检查类，检查是否存在类，只需省略第二个参数并传递要查询的类型
  var element = d3.select(".myclass") // 切换类
  element.classed("myanotherclass", !oneBar.classed("myanotherclass"))
  ```

#### 数据加入

数据连接使我们能够注入，修改和删除元素

```javascript
d3.select('#list').selectAll('li')
  .data([10,20,30,25,15])
	.text(function(d){
      return d + 'hi'
    })
	.enter()
	.append('li')
	.text(function(d){
		return d + 22
    })
// enter()方法提供对剩余数据的访问(未映射到现有元素)
```

数据连接提供以下四种方法来处理数据集：

- datum()
- data()
- enter()
- exit()

#### SVG简介

```html
/*一条线段*/
<svg width="300" height="200">
  <line x1="0" y1="0" x2="300" y2="200" style="stroke: rgb(255, 0, 0);stroke-width:2;"></line>
</svg>
```

使用d3实现，代码如下：

svg常见的属性：图元：图形元素，可以编辑的最小的图形单位。

- id, class
- x,y(cx,cy表示圆的圆心位置)
- dx,dy(表示在x,y的位置上再平移dx,dy)
- fill(填充),stroke(轮廓)
- height,width,r(圆的半径)
- transform-> translate.rotate,scale(表示某一个图元的变换)

svg的属性非常多，且属性的取值范围和类型各不同：

所以可能多的记住一些常用的属性，以提高编程速度

可以查阅mdn上属性的解释 https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute

- DOM
  - 父节点的属性会影响子节点
  - 子节点的属性会相对于父节点
- 活用<g>可以省掉很多冗余代码

```javascript
let width = 300
let height = 200
let svg = d3.select('#svgBox')
.append('svg')
.attr('width', width)
.attr('height', height)
svg.append('line')
  .attr('x1', 0)
  .attr('y1', 0)
  .attr('x2', 300)
  .attr('y2', 200)
  .style('stroke', 'rgb(0,250,0)')
  .style('stroke-width', 3)
```

- 矩形(Rectangle Element)

  - `x` 这是矩形左上角的x坐标
  - `y` 这是矩形左上角的y坐标
  - `width` 矩形宽度
  - `height` 矩形高度

  ```html
  <rect x="0" y="0" width="100" height="100" style="fill: rgb(123,33,44);"></rect>
  ```

- 圆圈(Circle Element)

  - `cx` 圆心的x坐标
  - `cy` 圆心的y坐标
  - `r` 半径

  ```html
  <circle cx = "200" cy = "50" r = "20"/>
  ```

  ```javascript
  svg.append('circle')
    .attr('cx', 200)
    .attr('cy', 90)
    .attr('r', 50)
    .style('fill', 'rgb(255, 0, 0)')
  ```

- 椭圆(Ellipse Element)

  - `cx` 椭圆中心的x坐标
  - `cy` 椭圆中心的y坐标
  - `rx` 圆的x半径
  - `ry` 圆的y半径

  ```html
  <ellipse cx = "200" cy = "50" rx = "100" ry = "50" fill = "green" />
  ```

- 图形转换

  ```html
  <svg width="300" height="160">
    <rect 
      x="0" 
      y="0" 
      width="60" 
   		height="60" 
      fill="green" 
      transform="translate(60 60) rotate(0) skewX(45) skewY(-45)"
    >
    </rect>
  </svg>
  ```

  转换:

  - `translate(x ,y)` 平移
  - `rotate(cx, cy)`  **cx** 和 **cy** 指的是x和y轴旋转的中心.如果未指定 **cx** 和 **cy** ，则默认为坐标系的当前原点.对于**示例** : 旋转(60)
  - `scale(sx, sy)` **sx** 是指沿x轴的缩放因子， **sy** 是指沿y轴的缩放因子.这里， **sy** 是可选的，如果未指定，则它取 **sx** 的值.对于**示例** :  scale(10)
  - `SkewX` 倾斜角沿x轴与沿y轴
  - `SkewY`

#### 比例尺

- d3.scaleLinear() - 线性比例尺

- d3.scaleBand() - 序数比例尺

- d3.scaleOrdinal() - 序数比例尺

- d3.scaleQuantize() - 量化比例尺

  逆序的过程

  scaleLinear.invert(120)

  scaleQuantize.invertExtent('a')

```javascript
// 1.线性比例尺 scaleLinear
const scaleLinear = d3
  .scaleLinear()
  .domain([1, 5])
  .range([0, 100])
console.log('scaleLinear(-2):', scaleLinear(-2)) // -75 超出范围也能计算
console.log('scaleLinear(10):', scaleLinear(10)) // 225
// 2.序数比例尺 scaleBand
const scaleBand = d3
  .scaleBand()
  .domain([1, 2, 3, 4])
  .range([0, 100])
console.log('scaleBand(6):', scaleBand(6)) // undefined 只针对domain()中的数据集映射相应的值
console.log('scaleBand(3)', scaleBand(3)) // 50
// 3.序数比例尺 scaleOrdinal domain()和range()的数据是一一对应的，如果不一致，则按照顺序循环取range()的值
const scaleOrdinal = d3
  .scaleOrdinal()
  .domain(['a', 'b', 'c'])
  .range([10, 20, 30])
console.log('scaleOrdinal(a):', scaleOrdinal('a'))
console.log('scaleOrdinal(b):', scaleOrdinal('b'))
console.log('scaleOrdinal(c):', scaleOrdinal('c'))
console.log('scaleOrdinal(d):', scaleOrdinal('d'))
console.log('scaleOrdinal(e):', scaleOrdinal('e'))

// 4.量化比例尺 scaleQuantize() domain()之外的值是对range()两侧的延展
const scaleQuantize = d3
  .scaleQuantize()
  .domain([0, 10])
  .range(['small', 'middle', 'big'])
console.log('scaleQuantize(2):', scaleQuantize(2))
console.log('scaleQuantize(5):', scaleQuantize(5))
console.log('scaleQuantize(8):', scaleQuantize(8))
console.log('scaleQuantize(-99):', scaleQuantize(-99)) //small
console.log('scaleQuantize(99):', scaleQuantize(99)) //big
// 时间比例尺
// 颜色比例尺
// 其他比例尺。。。
// 逆序的过程
console.log('scaleLinear(50)', scaleLinear.invert(50))
console.log('scaleQuantize(big)', scaleQuantize.invertExtent('big'))
```

#### 绘制柱状图

- axisTop,axisRight,axisBottom,axisLeft 4条轴

```javascript
const barData = [
  { name: 'java', value: 12 },
  { name: 'c++', value: 30 },
  { name: 'json', value: 32 },
  { name: 'php', value: 11 },
  { name: 'python', value: 18 }
]
const styles = window.getComputedStyle(document.getElementById('svgBox'))
const margin = {
  top: 60,
  right: 30,
  bottom: 60,
  left: 100
}
const [width, height] = [parseInt(styles.width), parseInt(styles.height)]
const [innerWidth, innerHeight] = [
  width - margin.left - margin.right,
  height - margin.top - margin.bottom
]
// 比例尺-x轴
const xScale = d3
.scaleLinear()
.domain([0, d3.max(barData, d => d.value)])
.range([0, innerWidth])
// 比例尺-y轴
const yScale = d3
.scaleBand()
.domain(barData.map(d => d.name))
.range([0, innerHeight])
let svg = d3.select('#svgBox')

// 添加绘画的容器
const g = svg
.append('g')
.attr('id', 'mainGroup')
.attr('transform', `translate(${margin.left} ${margin.top})`)
// 画坐标轴
let yAxis = d3.axisLeft(yScale)
let xAxis = d3.axisBottom(xScale)
g.append('g').call(yAxis)
g.append('g').call(xAxis).attr('transform', `translate(0 ${innerHeight})`)
```





#### 动画

```javascript
d3.select('#trs')
  .transition()
// .style('background-color', 'lightblue')
  .style('background-color', 'rgb(0,0,200)')
// .style('background-color', 'gray')
  .duration(2000)
  .delay(3000)
```

转型生命周期

1. 计划转换

   转换在创建时计划。当我们调用`selection.transition`时，当调用`attr()`、`style()`和其他过渡方法来定义结束关键帧时。

2. 转换开始

3. 转换运行

4. 过渡结束

   直接文档：https://www.it1352.com/OnLineTutorial/d3js/d3js_animation.html

### lodash

https://www.lodashjs.com/docs/lodash

### vue3

```powershell
npm install vue/@next
npm install -g vue/@cli  # 升级脚手架工具
```

初始化一个项目：

```powershell
npm init vite-app <project-name>
cd <project-name>
npm install
npm run dev # 启动项目
```

IIFE(立即调用函数表达式)

```javascript
(function () {
  statements
})()
```

