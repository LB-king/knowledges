#### 初始化项目

- webpack

  ```shell
  git clone https://github.com/vuejs/vue-next-webpack-preview.git projectName
  cd projectName
  npm install
  npm run dev
  # or use yarn
  yarn
  yarn dev
  ```

- Vue Cli

  ```shell
  npm install -g @vue/cli  # 升级脚手架工具
  vue create projectName
  cd projectName
  npm run serve
  ```

- vite https://cn.vitejs.dev/guide/

  1. 安装vite： `npm i -g create-vite-app`

     ```shell
     craete-vite-app projectName
     cd projectName
     npm install
     npm run dev
     ```

  2. `vite-app`

     ```shell
     npm init vite-app <project-name>
     cd <project-name>
     npm install
     npm run dev # 启动项目
     # or use yarn
     yarn create vite-app <project-name>
     cd <project-name>
     yarn
     yarn dev
     ```

  3. `vitejs`(实验表明：这种方式初始化的项目使用最新版的vue@3.0.5)

     ```shell
     npm init @vitejs/app <project-name>
     cd <project-name>
     npm install
     npm run dev
     ```

     vite.config.js

     ```javascript
     const path = require('path')
     module.exports = {
       port: 8080 // 默认是3000，可自定义
       alias: {
     		'/@/': path.resolve('src')
       }
     }
     ```

#### V3 的变化

​	`.vue`文件中的`template`不再需要一个根节点。

1. `Performance` 性能提升 1.3~2.x

   - diff 算法的优化(主要体现在以下方面)

     - diff 算法优化

       Vue2 中的虚拟 dom 是进行全量的对比；

       Vue3 新增了静态标记(pathFlag)

       在与上次虚拟节点进行对比时，只对比带有 patchFlag 的节点，并且可以通过 flag 信息得知当前节点要对比的具体内容

       ```javascript
       /*
       <div>静态</div>
       <div>静态</div>
       <div>{{name}}</div>
       <div :class="cls">{{age}}</div>
       */
       export function render(_ctx, _cache, $props, $setup, $data, $options) {
         return (
           _openBlock(),
           _createBlock(
             _Fragment,
             null,
             [
               _createVNode('div', null, '静态'),
               _createVNode('div', null, '静态'),
               _createVNode(
                 'div',
                 null,
                 _toDisplayString(_ctx.name),
                 1 /* TEXT */
               ),
               _createVNode(
                 'div',
                 { class: _ctx.cls },
                 _toDisplayString(_ctx.age),
                 3 /* TEXT, CLASS */
               )
             ],
             64 /* STABLE_FRAGMENT */
           )
         )
       }
       ```

     - hoistStatic 静态提升

       Vue2 中无论元素是否参与更新，每次都会重新创建

       Vue3 中对于不参与更新的元素，只会被创建一次，只会会在每次渲染时被不停的复用

       ```javascript
       /*
       <div>静态</div>
       <div>静态</div>
       <div>{{name}}</div>
       */
       const _hoisted_1 = /*#__PURE__*/ _createVNode(
         'div',
         null,
         '静态',
         -1 /* HOISTED */
       )
       const _hoisted_2 = /*#__PURE__*/ _createVNode(
         'div',
         null,
         '静态',
         -1 /* HOISTED */
       )

       export function render(_ctx, _cache, $props, $setup, $data, $options) {
         return (
           _openBlock(),
           _createBlock(
             _Fragment,
             null,
             [
               _hoisted_1,
               _hoisted_2,
               _createVNode(
                 'div',
                 null,
                 _toDisplayString(_ctx.name),
                 1 /* TEXT */
               )
             ],
             64 /* STABLE_FRAGMENT */
           )
         )
       }
       ```

     - cacheHandlers 事件侦听器缓存
       默认情况下 onClick 会被视为动态绑定，所以每次都会去追踪它的变化

       但是因为是同一个函数，所以没有追踪变化，直接缓存起来复用即可。

       事件监听缓存
       
       ```javascript
       /*
       <div @click="do">静态</div>
       */
       // 开启事件监听之前
       export function render(_ctx, _cache, $props, $setup, $data, $options) {
         return (
           _openBlock(),
           _createBlock('div', { onClick: _ctx.do }, '静态', 8 /* PROPS */, [
             'onClick'
           ])
         )
       }
       // 开启事件监听之后
       export function render(_ctx, _cache, $props, $setup, $data, $options) {
         return (
           _openBlock(),
           _createBlock(
             'div',
             {
               onClick:
                 _cache[1] ||
                 (_cache[1] = (...args) => _ctx.do && _ctx.do(...args))
             },
             _toDisplayString(_ctx.msg),
             1 /* TEXT */
           )
         )
       }
       ```
       
     - ssr 渲染

       当有大量静态内容的时候，这些内容会被当做纯字符串 推进一个`buffer`里面。

       即使存在动态的绑定，会通过模板插值嵌入进去。这样会比通过虚拟dom来渲染的快上很多很多。

       当静态内容大到一定量级时候，会用`createStaticVNode`方法在客户端去生成一个`static node`，这些静态`node`，会被直接`innerHtml`，就不需要创建对象，然后根据对象渲染。

     **Vue 2 Template Explorer** https://vue-template-explorer.netlify.app

     **Vue 3 Template Explorer** https://vue-next-template-explorer.netlify.app

2. `Tree-Shaking Support` 将无用模块"剪辑"，仅打包需要的，按需编译

3. `Composition API` 组合 API

   setup函数是组合API的入口函数，如果想到定义响应式变量，需要引入ref 

   ```javascript
   import {ref, reactive} from 'vue'
   setup() {
     // ref函数注意点：只能监听简单类型的变化，不能监听复杂类型的变化(对象/数组)
     // reactive 可以监听复杂类型的变化
     // 定义了count这个变量，初始值是0，此变量改变后，Vue会自动更新UI
     let count = ref(0)
     // 在组合api中，如果想定义方法，不需要到methods中去定义，直接在setup中定义即可
     function myCount() {
       // TODO
     }
     let obj = {
       count,
       myCount
     }
     return {...obj}
   }
   ```

   `Composition API` 和 `Option API`混用

   注入`API`,把`setup`中的变量注入到`data`中，方法注入到`methods`里面，以供页面使用。

4. `Fragment，Teleport，Suspense` 碎片 | 心灵运输，远距离传送 | 悬念

5. `Better TypeScript Support`

6. `Custom Render API`

#### pug语法

直接安装包就行了

```shell
npm install pug pug-loader pug-plain-loader -D
```

```vue
<template lang="pug">
  #app.main-app
    router-view
    p joke
</template>
```

#### setup

1. `setup`执行时机

   是在组件的`beforeCreated`和`created`之间的时机执行的。

   `beforeCreate:` 表示组件刚刚被创建，组件的`data`和`methods`属性还没有初始化好。

   `setup:`

   `created:` 表示组件刚刚被创建，组件的`data`和`methods`属性已经初始化好了。

2. `setup`注意点

   - 由于在执行`setup`函数的时候，还没有执行`created`的生命周期方法。所以在`setup`函数中，是无法使用`data`和`methods`属性的
   
   - 由于我们不能在setup函数中使用data和methods，所以Vue为了避免我们错误的使用，直接将setup函数中的this修改成了undefined
   
   - setup函数只能是同步的，不能是异步的。

#### reactive

什么是`react`

- `reactive`是`Vue3`中提供响应式数据的方法
- 在`Vue2`中响应式数据是通过`defineProperty`来实现的，而在`Vue3`中响应式数据是通过`ES6`的`Proxy`来实现的

`reactive`注意点

- `reactive`参数必须是对象`(json/arr)`
- 如果给`reactive`传递了其他对象
  - 默认情况下修改对象，界面不会自动更新
  - 如果想更新，可以通过重新赋值的方式

#### ref

​	`ref`和`reactive`一样，也是用来实现响应式数据的方法

​	`ref`实现对简单值的监听

`ref`本质：

​	`ref`底层的本质还是`reactive`，系统会自动根据我们给`ref`传入的值将它转换成`ref(xx)->reactive({value:xx})`

`ref`注意点：

​	在`Vue`中使用`ref`的值不用通过`value`获取

​	在`JS`中使用ref的值必须通过`value`获取







































