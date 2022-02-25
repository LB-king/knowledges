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
  <input type="text" v-model="firstName" placeholder="firstName" />
  <input type="text" v-model="lastName" placeholder="lastName" />
  <br />
  <p>{{ fullName }}</p>
  <h3>watchEffect</h3>
  <p>count----{{ count }}</p>
  <h3>watch</h3>
  <p>watchCount ==== {{ watchCount }}</p>
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
  computed,
  watchEffect,
  watch
} from 'vue'

export default {
  beforeCreate() {
    console.log('hooks-----beforeCreate')
  },
  created() {
    console.log('hooks-----created')
  },
  setup(props) {
    console.log('hooks-----setup')
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
    let data = reactive({
      count: 0,
      watchCount: 99
    })
    watchEffect(() => {
      console.log('count改变了', data.watchCount)
    })
    //watch
    watch(data, (nVal, oVal) => {
      console.log('new', nVal)
      console.log('oVal', oVal)
      console.log('watchCount---' + data.count)
    })
    setInterval(() => {
      data.count++
    }, 9000)
    onBeforeMount(() => console.log('hooks-----onBeforeMount'))
    onMounted(() => console.log('hooks-----onMounted'))
    // onBeforeUpdate(() => console.log('hooks-----onBeforeUpdate'))
    // onUpdated(() => console.log('hooks-----onUpdated'))
    // onBeforeUnmount(() => console.log('hooks-----onBeforeUnmount'))
    // onUnmounted(() => console.log('hooks-----onUnmounted'))
    return {
      title,
      info,
      handle1,
      handle2,
      ...toRefs(msg),
      ...toRefs(data),
      fullName
    }
  }
}
</script>
