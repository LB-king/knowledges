<template lang='pug'>
.main
  | {{ age }}
//- input(v-model='state.name')
button(@click='handleClick') 按钮
ol
  li(v-for='(item, index) in list', :key='index')
    | {{ item.name }}
</template>

<script>
//import x from ''
import { ref, customRef } from 'vue'
function getValue(value) {
  return customRef((track, trigger) => {
    fetch(value)
      .then((res) => {
        if (typeof res === 'object') {
          return res.json()
        }
        return res
      })
      .then((data) => {
        value = data
        trigger()
      })
      .catch((err) => {
        console.log(err)
      })
    return {
      get() {
        track() //告诉Vue这个数据是要被追踪的
        console.log('get: ', value)
        return value
      },
      set(newValue) {
        value = newValue
        console.log('set: ', value)
        trigger() //告诉Vue触发界面更新
      }
    }
  })
}
export default {
  // setup函数只能是同步的，不能是异步的
  setup() {
    /*  let list = ref([])
      fetch('../public/data.json')
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        list.value = data
      }) */
    let list = getValue('../public/data.json')
    let age = ref(18)
    function handleClick() {
      age.value += 1
      list.value.push({
        id: list.value.length + 1,
        name: '大饼' + (list.value.length + 1)
      })
    }
    // 自定义一个ref
    return { age, list, handleClick }
  }
}
</script>

<style>
</style>