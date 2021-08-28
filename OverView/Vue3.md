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

       Vue3 新增了静态标记(patchFlag)

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

ref与reactive的区别：

​	如果在template使用的是ref类型的数据，Vue会自动帮我们添加.value

​	如果在template使用的是reactive类型的数据，Vue不会自动帮我们添加.value

​	Vue解析数据之前，会自动判断这个数据是不是ref类型。会根据数据中的`__v_ref`属性来判断的。也可以根据Vue中封装好的方法来判断 `isRef`  `isReactive`来判断。

#### 递归监听

1.无论是通过`ref`还是`reactive`都是通过递归监听的

递归(recursion) 

2.递归监听存在的问题：

​	如果数据量比较大，非常消耗性能。递归监听会将对象每一层都包装成proxy

3.非递归监听 `shallowReactive` `shallowRef`

​	非递归监听会将对象第一层包装成`proxy`

只改变对象里某一个字段的值，仅支持`shallowRef`(数据量大的时候使用)类型数据。可以通过`triggerRef`来触发

```javascript
import { triggerRef } from 'vue'
state.value.son.son.c = 3
triggerRef(state)
```

如果是通过`shallowRef`创建的数据，它监听的是`.value`的变化

因为底层本质上`value`才是第一层。

#### toRaw

用来获取`ref/reactive/readonly`代理的原始对象。可用于临时读取数据而不用触发更改。不建议保留对原始对象的持久引用。

```javascript
import { reactive, toRaw, ref } from 'vue'
let obj = {
  name: 'park'
}
let state = reactive(obj) // state的本质是Proxy对象，在这个Proxy对象中引用了obj
// 如果只是修改了obj，视图是不会触发更新的
// 只有通过修改包装之后的对象来修改，才会触发界面的更新
let obj2 = toRaw(state)
obj === obj2 // true

let state1 = ref(obj)
let obj3 = toRaw(state1.value) // 通过toRaw拿到ref类型的数据，需要添加.value
obj3 === obj
```

注意：如果想通过`toRaw`拿到`ref`类型的原始数据(创建时传入的那个对象)，那就需要获取`.value`中保存的值

#### markRaw

标记一个对象，使其永远不会转换为`proxy`

- 有些值不应该是响应式的，例如复杂的第三方实例或Vue组件对象
- 当渲染具有不可变数据源的大列表时，跳过`proxy`可以提高性能

```javascript
import { reactive, markRaw } from 'vue'
let obj = { name: 'park' }
obj = markRaw(obj)
let state = reactive(obj)
// 此时的变量就不是响应式的
```

#### toRef

数据发生改变，不会触发UI更新 

```javascript
setup() {
  let obj = {
    name: 'park'
  }
  // let name = ref(obj)
  let name = toRef(obj, 'name')
  function myFn() {
    name.value = 'zs' 
    // 如果利用ref将某一个对象中的属性变成响应式的数据，我们修改响应式的数据是不会影响到原始数据的
    // 如果利用toRef将某一个对象中的属性变成响应式的数据，我们修改响应式的数据是会影响到原始数据的
    console.log(obj)
    console.log(name)
  }
  return {
    name,
    myFn
  }
}
/*
ref -> 复制，数据改变，界面也更新
toRef -> 引用，数据改变，界面不会更新
*/
```

#### toRefs

就是将某个对象的多个属性的值变成响应式的数据，是对toRef的补充

```javascript
import { toRefs } from 'vue'
let obj = {
  name: 'park',
  age: 18
}
let state = toRefs(obj)
state.name = 'zs'
```



#### customRef

返回一个`ref`对象，可以显示地控制依赖追踪和触发响应。

用来自定义一个`ref`

```javascript
import { customRef } from 'vue'
function myFn(value) {
  return customRef((track, trigger) => {
    return {
      get() {
        track() //标记这个变量需要追踪变化
        return value
      },
      set(newValue) {
        value = newValue
        trigger() //告诉vue触发界面更新
      }
    }
  })
}
setup() {
  let state = myFn('sun')
  return { state }
}
```

为什么需要自定义一个`ref`,可以封装一个异步请求的方法

```javascript
import { customRef } from 'vue'
function myFn(value) {
  return customRef((track, trigger) => {
    fetch(value)
    	.then(res => {
      	return res.json()
    	})
    	.then(data => {
      	value = data
      	trigger()
    	})
    return {
      get() {
        // 不能在get方法中发送网络请求 ->进入死循环
        track() //标记这个变量需要追踪变化
        return value
      },
      set(newValue) {
        value = newValue
        trigger() //告诉vue触发界面更新
      }
    }
  })
}
setup() {
  //let state = myFn('sun')
  let list = myFn('../data.json')
  return { list }
}
```

#### onMounted

在`Vue2.x`中我们可以通过给元素添加`ref='xxx'`,然后代码中通过`refs.xxx`的方法来获取元素，在`Vue3.x`中我们也可以通过`ref`来获取元素

```vue
<template>
	<p ref="box">
    {{age}}
  </p>
</template>
```

```javascript
import { ref, onMOunted } from 'vue'
setup() {
  let box = ref(null)
  onMounted(() => {
    console.log(box)
  })
  return {box}
}
```

#### readonly

`readonly:` 用于创建一个只读的数据，并且是递归只读的  递归(recursion)

`shallowReadonly` 用于创建一个只读的数据，但是不是递归只读的

`const和readonly的区别` 

- const  赋值保护，不能给变量重新赋值
- readonly  属性保护，不能给属性重新赋值

```javascript
import { readonly, isReadonly, shallowReadonly } from 'vue'
setup() {
  let state = readonly({
    name: 'lbj',
    attr: {
      height: 1.8
      age: 18
    }
  })
  function myFn() {
    state.name = 'new-name'
    state.attr.height = 2
    state.attr.age = 22
    console.log(state) // 并未更新
  }
  console.log(isReadonly(state))
  return { state, myFn }
}
```

#### 本质

在Vue2.X中是通过defineProperty来实现响应式数据的，详见：手写Vue全家桶视频

Vue3是通过Proxy来实现响应式的

```javascript
let obj = {
  name: 'park',
  age: 34
}
let state = new Proxy(obj, {
  get(obj, key) {
    // 两个参数 obj->操作对象，key->键值
    console.log(obj, key)
    return obj[key]
  },
  set(obj, key, newVal) {
    //三个参数 obj->操作对象，key->键值，newVal->新的值
    console.log(obj, key, newVal)
    obj[key] = newVal
  }
})

console.log(state.name) // { name: 'park', age: 34 } name park
console.log(state.age) // { name: 'park', age: 34 } age 34

state.name = 'lbj' //{ name: 'park', age: 11 } name lbj
state.age = 11 //{ name: 'park', age: 34 } age 11

```

#### 实现原理

##### 1.shallowReactive&shallowRef

```javascript
function shallowReactive(obj) {
   return new Proxy(obj, {
      get(obj, key) {
        return obj[key]
      },
      set(obj, key, val) {
        obj[key] = val
      }
    })
}

function shallowRef(obj) {
  return shallowReactive({
    value: obj
  })
}
```

##### 2.reactive&ref

```javascript
function reactive(obj) {
  // 如果是一个数组,那么取出数据中的每一个元素，判断每一个元素是否又是一个对象，如果又是一个对象，那么也需要包装成Proxy
  if (getType(obj) === '[object Array]') {
    obj.forEach((item, index) => {
      obj[index] = reactive(item)
    })
  } else if (getType(obj) === '[object Object]') {
    for (let i in obj) {
      obj[i] = reactive(obj[i])
    }
  } else {
    return obj
  }
  return new Proxy(obj, {
    get(obj, key) {
      return obj[key]
    },
    set(obj, key, val) {
      obj[key] = val
      console.log('UI更新')
      return true
    }
  })
}

function getType(value) {
  return Object.prototype.toString.call(value)
}

function ref(obj) {
  return reactive({
    value: obj
  })
}
```



##### 3.shallowReadonly&readonly

```javascript
function shallowReadonly(only) {
  return new Proxy(obj, {
    get(obj, key) {
      return obj[key]
    },
    set() {
      console.warn('只读属性，不可修改')
    }
  })
}

function readonly(obj) {
  if (getType(obj) === '[object Array]') {
    obj.forEach((item, index) => {
      obj[index] = readonly(item)
    })
  } else if (getType(obj) === '[object Object]') {
    for (let i in obj) {
      obj[i] = readonly(obj[i])
    }
  } else {
    return obj
  }
  return new Proxy(obj, {
    get(obj, key) {
      return obj[key]
    },
    set() {
     console.warn('只读属性不可修改')
    }
  })
}
```

##### 4.isReactive&isRef

```javascript
// 判断一个对象是不是ref对象
function isRef(obj) {
  return obj.__v_isRef || false
}
```

#### 环境配置

根目录新建`.env.production` `env.development`,要以`VITE_`开头，配置的变量才能暴露给客户端。

```te
VITE_SOME_KEY=开发环境
VITE_SOME_KEY=生产环境
```



