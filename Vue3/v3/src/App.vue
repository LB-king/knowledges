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
  <div data-mygod="haha" data-one="one" @click="getProps($event),one(),two()">自定义属性</div>
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
    let a = [{a:9,b:8}]
    console.log(a)
    function myFn() {
      count.value = count.value += 1
    }
    function handleClick(item) {
      console.log(item)
      console.log(import.meta.env)
      currentCom.value = item
    }
    //获取自定义属性
    function getProps(p) {
      console.log(p.srcElement.dataset)
    }
    function one() {
      console.log('one')
    }
    function two() {
      console.log('two')
    }
    let result = {
      count,
      navs,
      currentCom,
      myFn,
      handleClick,
      getProps,
      one,
      two,
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
