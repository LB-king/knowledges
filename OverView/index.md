## H5

### video/audio

```html
<audio src="等你下课.mp3" controls ></audio>
<video src="video.mp4" controls></video>
```

- `<video>`标签定义视频，其他电影片段或其他视频流:MP4、WebM、Ogg
  - `controls` 显示控件，比如播放按钮
  - `autoplay`
  - `loop`
- `<audio>`标签定义音频:MP3、Wav、Ogg
  - `controls`
  - `autoplay`
  - `loop`

### canvas画布

### geolocation定位

**---------------------------------------------------------------------------------------------------------------------**

## JavaScrit

### RegRex

​	网站：https://tool.oschina.net/uploads/apidocs/jquery/regexp.html

- 正则实现千分位

  ```javascript
  let num = '123456'
  num.replace(/(?=(?!\b)(\d{3})+$)/g, ',')
  ```

- 自增(前置自增和后置自增)

  ```javascript
  var x = 1
  var y = ++x
  // x = 2; y = 2 (前置自增：先执行加法再赋值)
  var i = 1
  var j = i++
  // i = 2; j = 1 (后置自增：先赋值在执行加法)
  ```

  

**---------------------------------------------------------------------------------------------------------------------**

## Css

### 动画

- `keyframes`

  ```css
  @keyframes move{
    0% {
      margin-left: 0;
      transform: rotate(0);
    }
    50% {
      margin-left: 100px;
      transform: rotate(180deg)
    }
    100% {
      margin-left: 0;
      tansform: rotate(360deg)
    }
  }
  .animate-box {
    animation: move 5s infinite;
  }
  /*transition*/
  .box {
    width: 200px;
    transition: all .3s linear;
  }
  .box:hover {
    width: 220px;
  }
  ```

- .`transition `

  ```css
  .transition {
    width: 100px;
    transition: all .3s linear;
    cursor: pointer;
  }
  ```

- `transform`

  css3提供了元素变形效果。旋转，缩放，平移

  ```css
  .t {
    transform: rotate(7deg) translate(40px, 30px) skew(10deg, 1deg);
  }
  ```

### 响应式

- media

  ```css
  @media screen and (min-width: 1280px) {
    .box {
      width: 30%;
    }
  }
  ```

### less

- 公用属性

  ```less
  .mix-style {
  	height: 10px;
  }
  .main {
  	.mix-style;
  }
  ```

### CSS3新特性

- `border-color`

  ```css
  .m {
    border-color:  red green blue yellow; // 上 右 下 左
  }
  ```

- `border-image`(IE11-不支持此属性)

  ```css
  .m{
    border-image: url(./favicon.png) 30 30 round;
  }
  /*
  border-image-source	用在边框的图片的路径。	
  border-image-slice	图片边框向内偏移。	
  border-image-width	图片边框的宽度。	
  border-image-outset	边框图像区域超出边框的量。	
  border-image-repeat	图像边框是否应平铺(repeat)、铺满(round)或拉伸(stretched)
  */
  ```

- `border-radius` 圆角边框

- `box-shadow` 阴影效果

- `background-size` 背景图片尺寸

- `background-origin` 指定背景图片从哪里开始显示(背景图片可以置放于content-box,padding-box或border-box区域)

- `background-clip` 指定背景图片从什么位置开始裁剪

  ```css
  .m{
    background-clip: content-box;
  }
  ```

- `text-shadow` 文本阴影

  ```css
  .m {
    text-shadow: 3px 3px #00f;
    text-shadow: 2px 2px 2px #ccc, 3px 3px 3px #00f;
  }
  ```

  - 颜色和模糊半径是可选的，颜色未指定的时候，将使用文本颜色；模糊半径未指定时，值为0
  - 可以是逗号分隔的列表：`text-shadow: 2px 2px 2px #ccc, 3px 3px 3px #00f;`
  - 阴影可能会跑到容器之外，但是不会影响容器的大小

- `word-wrap:break-word` 自动换行

  单词太长的话就可能无法超出某个区域，允许对长单词进行拆分，并换行到下一行

**---------------------------------------------------------------------------------------------------------------------**

## Vue

### 1.postman

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
  

### 2.vue.config.js

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

### 3.引入element-ui
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

### 4.pug

```powershell
npm install pug pug-loader pug-plain-loader -S
```

在`.vue`文件中使用

```vue
<template lang="pug">
  #app.main-app
    router-view
    p joke
</template>
```

### 5.全局scss

1. 在`vue.config.js`中配置(见标题2)

2. 在App.vue中引入scss文件

   ```scss
   @import "~@/styles/common.scss";
   ```

### 6.常用utils

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

### 7.d3.js

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

### 8.lodash

https://www.lodashjs.com/docs/lodash

### 9.vue3

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

**---------------------------------------------------------------------------------------------------------------------**

## NodeJs

**---------------------------------------------------------------------------------------------------------------------**

## Git

### 配置

```shell
git config --gloal user.name 'your name'
git config --global user.email 'your email'
git config user.name # 查看用户
git config user.email # 查看邮箱
```

### SSH KEY

```shell
ssh-keygen -t rsa -C 'xxx@git.com' # 生成密匙
cd ~/.ssh # 进入到.ssh目录
cat id_rsa.pub # 查看ssh key
# 在git中添加key
```

### 切换协议

```shell
git remote -v # 查看信息
git remote set-url origin git@xxx.git
# or
git remote rm origin
git remote add origin git@xxx.git
```

### 关联远程仓库

- clone的方式

  ```shell
  git clone git@github.com:xxx/demo.git
  ```

  这种方式可以直接使用`git fetch ,git pull`

- 本地文件夹关联远程仓库

  - 远程仓库有文件的

    ```shell
    git init # 初始化
    git remote add origin address # 设置remote地址
    git branch --set-upstream-to=origin/master master # 将当前分支设置为远程仓库的master分支
    git fetch
    git pull # 如果不设置master分支，则需要git pull origin master
    git add .
    git commit -m'message'
    git push origin master
    ```

  - 空白项目的关联

    ```shell
    git init # 初始化
    git remote add 地址 # 设置remote地址
    git add . # 将全部文件加入git版本管理
    git commit -m 'message'
    git push
    ```

### 撤销操作

- 没有`git add`，回到最近一次commit的情况

  ```shell
  git checkout readme.md
  ```

- 已经`git add(未commit)`,回到最近一次add的情况

  ```shell
  git reset HEAD readme.txt
  git checkout readme.txt
  ```

- 已经`commit`

  ```shell
  git reset --soft HEAD^
  git reset HEAD readme.txt
  git checkout readme.txt
  ```

### 修改已经push的commit信息

```shell
git log # 查看需要修改的提交
git log --oneline # 日志一行显示
git rebase -i HEAD~1
git commit --amend
git rebase --continue
git push -f origin dev
```

### 合并分支

```shell
git branch 
git checkout -b fenzhi # 创建一个新的分支
git checkout dev
git merge fenzhi
git push origin dev # 将分支合并到dev
git checkout -b dev1 origin dev1 # 创建dev1分支与远程dev1分支关联，内容也会切换
```

### gitk乱码问题

```shell
git config --global gui.encoding utf-8
```

### 删除分支

```shell
git push origin delete ding # 删除远程分支
git branch -D ding # 删除本地分支
git remote prune origin # 删除不存在的远程分支
```

### 本地、远程分支

```shell
git remote set-head origin my-test # 设置origin/HEAD
git remote show origin # 查看remote分支
git checkout -b test # 创建、切换分支
git checkout -b test origin/test # 创建test分支并与远程test分支同步
git branch -vv
git branch -u origin/branch-name # 本地分支追踪远程分支
git branch --track remotes/origin/ding # 切换远程分支
```

### gitbash快捷键

- `ctrl + L`  = 清屏
- `ctrl + R` = 查找历史记录，输入keyword多次`ctrl + R`可返回下一匹配项
- `ctrl + A` = 跳转至行首
- `ctrl + E` = 跳转至行尾
- `touch` = 新建文件
- `rm` = 删除文件
- `mkdir` = 新建文件夹
- `rmdir` = 删除文件夹
- `rm -r` = 删除文件夹(recusive)
- `mv` = 移动文件
- `pwd` = 展示工作目录
- `ls -ah` = 查看隐藏文件
- `git log -2 --pretty=oneline` 查看2条log数据

### 当前HEAD

```shell
car .git/HEAD
# 用HEAD表示当前版本，上一个版本就是HEAD^，上上一个版本就是HEAD^^，当然往上100个版本写100个^比较容易数不过来，所以写成HEAD~100。
git reset --hard HEAD^(返回到上个版本)
git reset --hard 66a2 (返回到指定版本)
git reflog ---(用来记录每一次的命令)
```

### 暂存区

```shell
git add # 把文件加进去，实际上就是把文件修改添加到暂存区
git commit # 提交修改，实际上就是把暂存区的内容提交到当前分支
git diff HEAD readme.txt # 查看文件修改的内容
git checkout 3c9cfd320fe7 src/test.vue # 某个文件恢复到指定的版本
```

### 删除文件

```shell
git add test.txt
git commit -m'add'
git push origin master
rm test.txt
git rm test.txt
git commit -m"del"
git push origin master
```

**---------------------------------------------------------------------------------------------------------------------**

## npm

- 安装

```shell
npm install -g cnpm --registry=https://registry.npm.taobao.org
npm err! Error: connect ECONNREFUSED 127.0.0.1:8087 // 出现此情况的解决办法
npm config set proxy null
npm ls // 查看包安装目录列表
```

版本号：语义版本号分为X,Y,Z三位，分别代表主版本号，次版本号，补丁版本号

- 如果只是修复bug，需要修改Z位
- 如果是新增了功能，但是向下兼容，需要更新Y位
- 如果有大变动，向下不兼容，需要更新X位

常用命令：

```shell
# npm help <command> 可以查看某条命令的详细帮助
# npm update <package> 可以把当前目录下`node_modules`子目录里对应的模块更新至最新版本
# npm update <package> -g 全局更新
# npm cache clear 可以清空npm本地缓存
npm publish # 发布？(未曾使用)
```

设置缓存的目录：

```shell
npm config get cache # 获取缓存目录
npm config set cache "d:/cache" # 设置
npm config get prefix # 包安装目录
npm config set prefix "d:/cache"
```

快速删除node_modules文件夹

```shell
rimraf node_modules
```



**---------------------------------------------------------------------------------------------------------------------**

## yarn

安装：https://classic.yarnpkg.com/zh-Hans/docs/install#windows-stable

| NPM                      | YARN                 | 说明               |
| :----------------------- | :------------------- | :----------------- |
| npm init                 | yarn init            | 初始化某个项目     |
| npm install/link         | yarn install/link    | 默认的安装依赖操作 |
| npm install vue --save   | yarn add vue         | 安装某个依赖       |
| npm uninstall vue --save | yarn remove vue      | 移除某个依赖项     |
| npm update vue --save    | yarn upgrade vue     | 更新某个依赖项     |
| npm install cnpm -g      | yarn global add cnpm | 安装全局依赖       |

安装项目的全部依赖项：yarn || yarn install

**---------------------------------------------------------------------------------------------------------------------**

## 跨终端



**---------------------------------------------------------------------------------------------------------------------**

## 实用工具

- 截屏软件GIF：GifCam :https://gifcam.softonic.cn/download

- 代码风格

  - standard: https://github.com/standard/standard/blob/master/docs/README-zhcn.md

    安装vscode-standardjs 

    安装vscode-standardjs-snippets 以获得JS snippets

    ```powershell
    npm install standard -g
    standard --fix # 直接可以格式化js代码
    ```

    - 无需配置。统一代码风格

    - 自动代码格式化。`standard --fix`

    - 提前发现风格及程序问题

    - 细则：

      - 使用2个空格-进行缩进

      - 字符串使用单引号-需要转义的地方除外

      - 不再有冗余的变量

      - 无分号

      - 行首不要以`(`,`[`,or ` 开头

        ```json
        {
          "scripts": {
            "test": "standard --fix && node my.test.js"
          }
        }
        ```

  - Airbnb: https://github.com/lin-123/javascript

  `FAQ` = `Frequently Asked Questions` 常见问题解答

  https://www.hifini.com/   731540792qq + qq
  
  https://www.91flac.com/users/index    731540792@qq.com + qq

##  Nginx

```shell
# use nobody
worker_processes 1;
use nginx;
events {
	worker_connections 1024
}
http {
	include mime.types;
	default_type application/octet-stream;
	#log_format main '$remote_addr - $remote_user [$time_local] "$request"'
	#								'$status $body_bytes_sent "$http_referer"'
	#								'"$http_user_agent" "$http_x_forwarded_for"'
	sendfile on;
	#tcp_nopush on;
	#keepalive_timeout 65;
	tcp_nodelay on;
	client_header_buffer_size 32k;
	large_client_header_buffers 4 32k;
	client_max_body_size 1024m;
	client_body_buffer_size 10m;
	
	gzip on;
	gzip_disable "msie6";
	
	gzip_vary on;
	gzip_proxied any;
	gzip_comp_level 6;
	gzip_buffers 16 8k;
	gzip_http_version 1.1;
	gzip_min_length 256;
	gzip_types application/javascript text/plain text/css application/json application/x-javascript text/xml application/xml+rcc text/javascript application/vnd.ms-fontobject application/x-fontobject application/x-font-ttf font/opentype image/svg+xml image/x-icon image/png;
	
	upstream kgApi_server {
		server 22.188.1.122:8000;
		server 22.188.1.133:8080;
		keepalive 2000
	}
	upstream auth_server {
		ip_hash;
		server 22.188.1.122:8000 weight=1 max_fails=2;
		server 22.188.1.133:8080 weight=1 max_fails=2;
	}
	
	server {
		listen 80;
		server_name localhost;
		
		#charset koi8-r;
		access_log logs/host.access.log main;
		
		location / {
			try_files $uri $uri/ /index.html;
			root html;
			index index.html index.htm;
		}
		
		location /kg-api/ {
			proxy_pass http://kgApi_server;
			prox_set_header Host $host:#server_port;
		}
		
		location /authSvr/ {
			proxy_pass http://auth_server;
			prox_set_header Host $host:#server_port;
		}
		
		error_page 500 502 503 504 /50x.html;
	}
}

```

## React

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

#### 4.2-Diff算法

- **tree diff**：新旧两棵DOM树对比的过程，就是Tree Diff;当整棵DOM逐层对比完毕，则所有需要按需更新的元素，必然能够找到
- **component diff**：在进行tree diff的时候，每一层的组件级别的对比叫做component diff
  - 如果对比前后，则**暂时**认为此组件不需要被更新
  - 如果对比前后，类型不同，则需要移除旧组件，创建新组件，并追加到页面上
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

```

