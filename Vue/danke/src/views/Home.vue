<template lang="pug">
.home
  | 首页
  p.item(v-for='(item, index) in objList')
    | {{ index }}--{{ item }}
</template>

<script>
// @ is an alias to /src
// v-for 可以循环数组以及对象
import mix1 from './mix1.js'
import mix2 from './mix2.js'
export default {
  name: 'Home',
  data() {
    return {
      name: '组件内部的name',
      list: ['AA', 'BB', 'CC'],
      objList: {
        name: 'KO',
        age: 35
      }
    }
  },
  mixins: [mix2, mix1],
  components: {},
  methods: {
    // say() {
    //   console.log('组件中的name', this.name);
    // }
  },
  mounted() {
    // console.log(this.name)
    this.say()
  }
}
</script>
