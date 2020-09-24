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
```

### 8.lodash

https://www.lodashjs.com/docs/lodash