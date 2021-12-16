<template>
  <div id="app">
    <div id="nav">
      <p>{{arr}}</p>
      <button @click="change">按钮</button>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
export default {
  data() {
    return {
      arr: [111,222,333]
    }
  },
  methods: {
    change() {
    //  this.arr[0] = 'AAA'
    //  this.$set(this.arr, [0], 'AAA')
     Vue.set(this.arr, [0], 'AAA')

     console.log(this.arr)
    }
  }
}
</script>
<style lang="less">

</style>
