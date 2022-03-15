<template>
  <div class="home">
    <!-- <div class="box" v-outside-click="handleClick">
      
    </div> -->
    <!-- <input type="text" v-model="title" />
    <Son></Son> -->
    <div>{{name}}</div>
  </div>
</template>

<script>
// @ is an alias to /src
import outsideClick from '@/directives/outside.js'
import Son from './HomeSon.vue'
export default {
  name: 'Home',
  data() {
    return {
      title: "home's title",
      name: ''
    }
  },
  directives: {
    outsideClick
  },
  components: {
    Son
  },
  methods: {
    handleClick() {
      console.log(8)
    }
  },
  beforeCreate() {
    // console.log('beforeCreate---this.$el', this.$el)
    // console.log('beforeCreate---this.arr', this.arr)
    console.log('父-beforeCreate')
  },
  created() {
    console.log('父-created')
    // console.log('created---this.$el', this.$el)
    // //已经拿到data中的数据
    // console.log('created---this.arr', this.arr)
    // this.obj = { a: 9999 }
  },
  beforeMount() {
    console.log('父-beforeMount')
    // console.log('beforeMount---this.$el', this.$el)
    // console.log('beforeMount---this.arr', this.arr)
  },
  watch: {
    title(n, o) {
      console.log(n)
    }
  },
  mounted() {
    //这一步把el挂载
    // console.log('mounted---this.$el', this.$el)
    // console.log('mounted---this.arr', this.arr)
    console.log('父-mounted')
    // this.title += '1'
    // this.title += '2'
    // this.title += '3'
    // for (let i = 0; i < 100; i++) {
    //   this.title += i
    // }

    this.name = 'ok'
    console.log(this.$el.clientHeight)
    this.$nextTick(() => {
      console.log(this.$el.clientHeight)
    })
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
