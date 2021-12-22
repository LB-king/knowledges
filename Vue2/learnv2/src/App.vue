<template>
  <div id="app">
    <div id="nav">
      <p>{{ arr }}</p>
      <button @click="change">按钮</button>
      <p>{{ obj.a }}</p>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
export default {
  data() {
    return {
      arr: [111, 222, 333],
      obj: {}
    }
  },
  methods: {
    change() {
      //  this.arr[0] = 'AAA'
      //  this.$set(this.arr, [0], 'AAA')
      Vue.set(this.arr, [0], 'AAA')

      console.log(this.arr)

      this.obj.a = 'change'
    }
  },
  beforeCreate() {
    console.log('beforeCreate---this.$el', this.$el)
    console.log('beforeCreate---this.arr', this.arr)
  },
  created() {
    console.log('created---this.$el', this.$el)
    //已经拿到data中的数据
    console.log('created---this.arr', this.arr)
    this.obj = { a: 9999 }
  },
  beforeMount() {
    console.log('beforeMount---this.$el', this.$el)
    console.log('beforeMount---this.arr', this.arr)
  },
  mounted() {
    //这一步把el挂载
    console.log('mounted---this.$el', this.$el)
    console.log('mounted---this.arr', this.arr)
  }
}
</script>
<style lang="less">
</style>
