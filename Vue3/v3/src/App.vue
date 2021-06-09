<template>
  <div>{{ count }}</div>
  <button @click="myFn">点击</button>
  <TodoList></TodoList>
</template>

<script>
import { ref } from 'vue'
import TodoList from './components/todoList/TODOLIST.vue'
export default {
  name: 'App',
  setup() {
    let count = ref(0)
    function myFn() {
      count.value = count.value += 1
    }
    let result = {
      count,
      myFn
    }
    return { ...result }
  },
  components: {
    TodoList
  }
}
</script>
