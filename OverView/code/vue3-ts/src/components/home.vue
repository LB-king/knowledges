<template>
  <header>Home组件</header>
  <h3>ref,reactive</h3>
  <p>{{ title }}</p>
  <p>{{ info }}</p>
  <button @click="handle1">获取title</button>
  <button @click="handle2">获取info</button>
  <br />
  <h3>toRefs解构</h3>
  <input type="text" v-model="desc" />
  <p>{{ desc }}</p>
</template>
<script lang="ts">
import { ref, reactive, toRefs } from 'vue'

export default {
  setup(props) {
    let title = ref('犀牛')
    let info = reactive(['AAA'])
    let msg = reactive({
      desc: '描述信息'
    })
    function handle1() {
      console.log(title)
      title.value += '+'
    }
    function handle2() {
      console.log(info)
      info.push('+')
    }
    return {
      title,
      info,
      handle1,
      handle2,
      ...toRefs(msg)
    }
  }
}
</script>
