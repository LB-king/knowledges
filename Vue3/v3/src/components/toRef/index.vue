<template lang="pug">
.toRef 
  | {{ name }}
button(@click="myFn") 按钮
</template>

<script>
import { ref, toRef } from 'vue'
export default {
  setup() {
    let obj = {
      name: 'park'
    }
    let name = toRef(obj, 'name')
    function myFn() {
      name.value = 'zs' 
      // 如果利用ref将某一个对象中的属性变成响应式的数据，我们修改响应式的数据是不会影响到原始数据的
      // 如果使用toRef的话，我们修改响应式数据是会影响到原始数据
      console.log(obj)
      console.log(name)
    }
    return {
      name,
      myFn
    }
  }
}
</script>
