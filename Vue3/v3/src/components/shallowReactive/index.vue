<template>
  <div class="shallow-reactive">
    shallow-reactive
    <p>{{ state.a }}</p>
    <p>{{ state.son.b }}</p>
    <p>{{ state.son.son.c }}</p>
    <button @click="handleClick">btn</button>
  </div>
</template>

<script>
//import x from ''
// 非递归监听 && 递归监听,非递归监听只能监听对象第一层的属性值变化
import { reactive, shallowReactive, shallowRef, triggerRef } from 'vue'
export default {
  setup() {
    // shallowRef(99) -> shallowReactive({value: 99})
    // let state = reactive({
    // let state = shallowReactive({
    let state = shallowRef({
      a: 'a',
      son: {
        b: 'b',
        son: {
          c: 'c'
        }
      }
    })
    function handleClick() {
      // state.a = 1
      // state.son.b = 2
      state.value.son.son.c = 3
      triggerRef(state)
      console.log(state)
    }
    return { state, handleClick }
  }
}
</script>
