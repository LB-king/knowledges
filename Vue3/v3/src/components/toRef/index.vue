<template lang="pug">
.toRef 
  | {{ state }}
button(@click="myFn") 按钮
</template>

<script>
import { ref, toRef, toRefs } from 'vue'
export default {
  setup() {
    let obj = {
      name: 'park',
      age: 18
    }
    // let name = toRef(obj, 'name')
    // let age = toRef(obj, 'age')
    // 可以使用toRefs代替toRef，将对象的多个属性都变成响应式的数据
    let state = toRefs(obj)
    function myFn() {
      // name.value = 'zs' 
      // age.value = 88 
      // 如果利用ref将某一个对象中的属性变成响应式的数据，我们修改响应式的数据是不会影响到原始数据的
      // 如果使用toRef的话，我们修改响应式数据是会影响到原始数据,但是不会触发视图的更新
      state.name.value = 'pk'
      state.age.value = 88
      console.log(obj)
      console.log(state)
      // console.log(name)
    }
    return {
      // name,
      // age,
      state,
      myFn
    }
  }
}
</script>
