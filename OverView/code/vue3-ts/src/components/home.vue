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
  <h3>computed</h3>
  <input type="text" v-model="firstName" placeholder="firstName">
  <input type="text" v-model="lastName" placeholder="lastName">
  <br>
  <p>{{fullName}}</p>
</template>
<script lang="ts">
import {
  ref,
  reactive,
  toRefs,
  onMounted,
  onBeforeMount,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  computed
} from 'vue'

export default {
  setup(props) {
    console.log(props)
    let title = ref('犀牛')
    let info = reactive(['AAA'])
    let msg = reactive({
      desc: '描述信息',
      firstName: '',
      lastName: ''
    })
    function handle1() {
      console.log(title)
      title.value += '+'
    }
    function handle2() {
      console.log(info)
      info.push('+')
    }
    let fullName = computed(() => {
      return msg.firstName + '--' + msg.lastName
    })
    onBeforeMount(() => console.log('onBeforeMount'))
    onMounted(() => console.log('onMounted'))
    onBeforeUpdate(() => console.log('onBeforeUpdate'))
    onUpdated(() => console.log('onUpdated'))
    onBeforeUnmount(() => console.log('onBeforeUnmount'))
    onUnmounted(() => console.log('onUnmounted'))
    return {
      title,
      info,
      handle1,
      handle2,
      ...toRefs(msg),
      fullName  
    }
  }
}
</script>
