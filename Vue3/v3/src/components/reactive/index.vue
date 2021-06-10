<template lang="pug">
.reactive_box
  | {{ state.time }}
button(@click='handleClick') 按钮
</template>

<script>
import { reactive } from 'vue'
export default {
  setup() {
    // 如果传递了其他对象，页面不会响应式更新
    // let state = reactive(123) // 不能响应式改变
    // let state = reactive([11, 222, 333]) //数组可以改变
    // let state = reactive({ a: 'AAA', b: 'BBB' }) //对象可以改变
    let state = reactive({
      time: new Date()
    })
    function handleClick() {
      // state[0] = 666
      // state.a = '我可以变'
      // 直接改变日期对象，控制台改变，但是界面不更新。
      // state.time.setDate(state.time.getDate() + 1)
      // 所以只能重新赋值
      let newTime = new Date(state.time.getTime())
      newTime.setDate(state.time.getDate() + 1)
      state.time = newTime
      console.log(state)
    }
    return {
      state,
      handleClick
    }
  }
}
</script>