#### V3的变化

1. `Performance` 性能提升1.3~2.x

   - diff算法的优化(主要体现在以下方面)

     - diff算法优化

       Vue2中的虚拟dom是进行全量的对比；

       Vue3新增了静态标记(pathFlag)

       在与上次虚拟节点进行对比时，只对比带有patchFlag的节点，并且可以通过flag信息得知当前节点要对比的具体内容

       ```javascript
       /*
       <div>静态</div>
       <div>静态</div>
       <div>{{name}}</div>
       <div :class="cls">{{age}}</div>
       */
       export function render(_ctx, _cache, $props, $setup, $data, $options) {
         return (_openBlock(), _createBlock(_Fragment, null, [
           _createVNode("div", null, "静态"),
           _createVNode("div", null, "静态"),
           _createVNode("div", null, _toDisplayString(_ctx.name), 1 /* TEXT */),
           _createVNode("div", { class: _ctx.cls }, _toDisplayString(_ctx.age), 3 /* TEXT, CLASS */)
         ], 64 /* STABLE_FRAGMENT */))
       }
       ```

     - hoistStatic静态提升

       Vue2中无论元素是否参与更新，每次都会重新创建

       Vue3中对于不参与更新的元素，只会被创建一次，只会会在每次渲染时被不停的复用

       ```javascript
       /*
       <div>静态</div>
       <div>静态</div>
       <div>{{name}}</div>
       */
       const _hoisted_1 = /*#__PURE__*/_createVNode("div", null, "静态", -1 /* HOISTED */)
       const _hoisted_2 = /*#__PURE__*/_createVNode("div", null, "静态", -1 /* HOISTED */)
       
       export function render(_ctx, _cache, $props, $setup, $data, $options) {
         return (_openBlock(), _createBlock(_Fragment, null, [
           _hoisted_1,
           _hoisted_2,
           _createVNode("div", null, _toDisplayString(_ctx.name), 1 /* TEXT */)
         ], 64 /* STABLE_FRAGMENT */))
       }
       ```

     - cacheHandlers 事件侦听器缓存
       默认情况下onClick会被视为动态绑定，所以每次都会去追踪它的变化

       但是因为是同一个函数，所以没有追踪变化，直接缓存起来复用即可。

     - ssr渲染

     **Vue 2 Template Explorer** https://vue-template-explorer.netlify.app

     **Vue 3 Template Explorer** https://vue-next-template-explorer.netlify.app

   - 事件监听缓存

     ```javascript
     /*
     <div @click="do">静态</div>
     */
     
     export function render(_ctx, _cache, $props, $setup, $data, $options) {
       return (_openBlock(), _createBlock("div", { onClick: _ctx.do }, "静态", 8 /* PROPS */, ["onClick"]))
     }
     
     export function render(_ctx, _cache, $props, $setup, $data, $options) {
       return (_openBlock(), _createBlock("div", {
         onClick: _cache[1] || (_cache[1] = (...args) => (_ctx.do && _ctx.do(...args)))
       }, _toDisplayString(_ctx.msg), 1 /* TEXT */))
     }
     ```
     
     

2. `Tree-Shaking Support` 将无用模块"剪辑"，仅打包需要的

3. `Composition API` 组合API

4. `Fragment，Teleport，Suspense` 碎片 | 心灵运输，远距离传送 | 悬念

5. `Better TypeScript Support`

6. `Custom Render API`

#### 初始化项目

- vite https://cn.vitejs.dev/guide/

  首先升级脚手架工具

  ```powershell
  npm install vue@next #升级全局vue
  npm install -g @vue/cli  # 升级脚手架工具
  ```

  初始化一个项目：

  npm:

  ```powershell
  npm init vite-app <project-name>
  cd <project-name>
  npm install
  npm run dev # 启动项目
  ```

  yarn:

  ```shell
  yarn create vite-app <project-name>
  cd <project-name>
  yarn
  yarn dev
  ```

  另一种方法：

  ```shell
  npm init @vite/app <project-name> 
  cd <project-name>
  npm install
  npm run dev
  ```

  关于配置项：

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

- webpack

```shell
vue create <project-name> #webpack为打包器
```





































































