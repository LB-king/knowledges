<template>
  <!-- <div>{{ count }}</div>
  <button @click="myFn">点击</button> -->
  <button v-for="(item, index) in navs" :key="index" @click="handleClick(item)">{{ item }}</button>
  <component :is="currentCom"></component>
  <!-- <TodoList></TodoList> -->
</template>

<script>
import { ref, reactive } from 'vue'
import TodoList from './components/todoList/TODOLIST.vue'
import reactiveCom from './components/reactive/index.vue'
const navsArr = ['TodoList', 'reactiveCom', 'ref']
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
    reactiveCom
  }
}
</script>
