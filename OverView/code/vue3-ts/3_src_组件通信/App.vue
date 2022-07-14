<template>
  <h3>{{ title || 'xx' }}</h3>
  <button @click="change">改变标题</button>
  <Home></Home>
</template>
<script lang="ts">

// 添加setup之后无需注册组件
import Home from './components/home.vue'
import { provide, ref } from 'vue'
export default {
  setup() {
    let title = ref('App组件的标题')
    provide('title', title)
    function change() {
      title.value = '改变后的App组件的标题'
    }
    return {
      title,
      change
    }
  },
  // data() {
  //   return {
  //     title: 'App组件的标题'
  //   }
  // },
  provide() {
    return {
      title: this.title
    }
  },
  methods: {
    change() {
      console.log('methods中的change')
      this.title = '改变后的App组件的标题999999'
    }
  },
  components: {
    Home
  }
}
</script>
<!--
1.组合式API语法糖写法
<script setup lang="ts">
// 添加setup之后无需注册组件
import { provide } from 'vue'
import Home from './components/home.vue'
provide('title', 'App组件的标题')
provide('info', {
  name: 'APP',
  age: '18'
})
</script>


2.组合式API

import { provide } from 'vue'
setup() {
    provide('title', 'App组件的标题')
  },



3.非组合式API
export default {
  provide() {
    return {
      title: 'App组件的标题'
    }
  },
  components: {
    Home
  }
}

-->


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
