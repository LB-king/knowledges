<template lang='pug'>
.read-only
  p {{ state.name }}
  p {{ state.attr.age }}
  p {{ state.attr.height }}
  p
    button(@click='myFn') 按钮
</template>

<script>
//import x from ''
import { readonly, isReadonly, shallowReadonly } from 'vue'
export default {
  setup() {
    // let state = readonly({
    let state = shallowReadonly({
      name: 'lbj',
      attr: {
        height: 1.88,
        age: 18
      }
    })
    function myFn() {
      state.name = 'new-name'
      state.attr.age = 16
      state.attr.height = 1.6
      console.log(state) // 修改未成功,被赋予了只读属性
    }

    console.log(isReadonly(state)) //true 是否是只读数据

    // const a = 12 不能给变量重新赋值
    const a = {
      n: 99
    }
    a.n = 34
    console.log(a)
    return { state, myFn }
  }
}
</script>

<style>
</style>