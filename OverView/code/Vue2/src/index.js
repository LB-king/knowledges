/* import observe from './js/observe'

let obj = {
  a: {
    m: {
      n: 'NBA'
    }
  },
  b: 12,
  arr: [1,2]
}

observe(obj)
obj.arr.splice(1,1,8888)
console.log(obj.arr) */
import Vue from './mvvm/index'
const vm = new Vue({
  el: '#app',
  data() {
    return {
      msg: 'Hello Vue',
      htmlStr: '<h3>这是一段文档片段,使用v-html解析</h3>',
      title: 'v-text定义的title',
      person: {
        name: 'v-text定义的Garnett',
        age: 46
      }
    }
  },
  methods: {
    click() {
      console.log(this)
    }
  }
})



