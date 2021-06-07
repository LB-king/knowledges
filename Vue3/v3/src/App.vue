<template>
  <div>{{ count }}</div>
  <button @click="myFn">点击</button>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'App',
  setup(ctx) {
    let count = ref(0)
    function myFn() {
      count.value = count.value += 1
    }
    let result = {
      count,
      myFn
    }
    return { ...result }
  }
}
</script>
