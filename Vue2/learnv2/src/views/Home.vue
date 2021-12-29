<template>
  <div class="home">
    <div class="box" v-outside-click="handleClick"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import outsideClick from '@/directives/outside.js'
export default {
  name: 'Home',
  directives: {
    outsideClick
  },
  methods: {
    handleClick() {
      console.log(8)
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
.box {
  height: 200px;
  width: 200px;
  background-color: antiquewhite;
}
</style>
