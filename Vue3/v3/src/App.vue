<template>
  <!-- <div>{{ count }}</div>
  <button @click="myFn">点击</button> -->
  <button v-for="(item, index) in navs" :key="index" @click="handleClick(item)">
    {{ item }}
  </button>
  <keep-alive>
    <component :is="currentCom"></component>
  </keep-alive>
  <!-- <TodoList></TodoList> -->
</template>

<script>
import { ref, reactive } from 'vue'
import TodoList from './components/todoList/TODOLIST.vue'
import reactiveCom from './components/reactive/index.vue'
import refCom from './components/ref/index.vue'
import toRef from './components/toRef/index.vue'
import shallowReactive from './components/shallowReactive/index.vue'
import customRef from './components/customRef/index.vue'
import readonly from './components/readonly/index.vue'
const navsArr = [
  'TodoList',
  'reactiveCom',
  'refCom',
  'shallowReactive',
  'toRef',
  'customRef',
  'readonly'
]
export default {
  name: 'App',
  setup() {
    let count = ref(0)
    let currentCom = ref('TodoList')
    const navs = reactive(navsArr)
    function myFn() {
      count.value = count.value += 1
    }
    function handleClick(item) {
      console.log(item)
      currentCom.value = item
    }
    let result = {
      count,
      navs,
      currentCom,
      myFn,
      handleClick
    }
    return { ...result }
  },
  components: {
    TodoList,
    reactiveCom,
    refCom,
    shallowReactive,
    toRef,
    customRef,
    readonly
  }
}
</script>
