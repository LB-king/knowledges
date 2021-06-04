#### V3的变化

1. `Performance` 性能提升1.3~2.x

   - diff算法的优化(主要体现在以下方面)

     - diff算法优化

       Vue2中的虚拟dom是进行全量的对比；

       Vue3新增了静态标记(pathFlag)

       在与上次虚拟节点进行对比时，只对比带有patchFlag的节点，并且可以通过flag信息得知当前节点要对比的具体内容

     - hoistStatic静态提升

     - cacheHandlers

     - ssr渲染

     **Vue 2 Template Explorer** https://vue-template-explorer.netlify.app

     **Vue 3 Template Explorer** https://vue-next-template-explorer.netlify.app

   - 事件监听缓存

     

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





































































