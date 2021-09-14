<template lang="pug">
.home
  | 首页
  p.item(v-for='(item, index) in objList')
    | {{ index }}--{{ item }}
  el-button(@click='click') 按钮
</template>

<script>
// @ is an alias to /src
// v-for 可以循环数组以及对象
import mix1 from './mix1.js'
import mix2 from './mix2.js'
import axios from 'axios'
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
    click() {
      axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8'
      // axios.defaults.withCredentials = true
      // axios.defaults.crossDomain = true
      // axios.defaults.headers.post['Content-Type'] =
      //   'application/x-www-form-urlencoded'
      var p = {
        name: 'admin',
        password: '123456'
      }
      axios({
        url: 'http://127.0.0.1:3000/login',
        method: 'post',
        // data: JSON.stringify(p)
        data: p
      })
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    }
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
