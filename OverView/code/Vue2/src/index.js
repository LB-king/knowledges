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
import {Vue} from './mvvm/index'
const vm = new Vue({
  el: '#app',
  data() {
    return {
      msg: 'Hello Vue',
      htmlStr: 9999,
      title: 'v-text定义的title',
      person: {
        name: 'v-text定义的Garnett',
        age: 46
      },
      attr: {
        color: 'red'
      },
      blue: {
        color: 'blue',
        fontSize: '20px'
      }
    }
  },
  methods: {
    click() {
      this.$data.htmlStr += 1
      this.$data.msg += 1
    }
  }
})
