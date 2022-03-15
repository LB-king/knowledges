<template>
  <div class="about">
    <h1>This is an about page</h1>
    <!-- <h4>{{_provided.provideMsg}}</h4> -->
    <input type="text" v-model="syncMsg" />
    <!-- <p>{{ $bus.ppp }}</p> -->
    <!-- <button @click="handle">{{ title }}</button> -->
    <!-- <AboutSon v-model="msg"></AboutSon> -->
    <AboutSon :syncMsg.sync="syncMsg"></AboutSon>


    <!-- <AboutSon test="attrs" @handle="handle" @handle1="handle1"></AboutSon> -->
    <!-- <AboutSon1 ref="as1"></AboutSon1> -->
  </div>
</template>
<script>
import AboutSon from './AboutSon.vue'
import AboutSon1 from './AboutSon1.vue'
import Vue from 'vue'
export default {
  name: 'About',
  data() {
    return {
      msg: '父组件的信息',
      title: 'title',
      syncMsg: 'syncMsg'
    }
  },
  provide() {
    this.t1 = Vue.observable({
      msg: this.title
    })
    return {
      // title: 'provide父组件的信息'
      // _this: this
      msg: this.t1
    }
  },
  methods: {
    handle() {
      // console.log('父组件handle')
      this.title += '@@'
      console.log(this._provided.msg.msg)
    },
    handle1() {
      // console.log('父组件handle')
    }
  },
  mounted() {
    // console.log(this._provided)
    setTimeout(() => {
      console.log('setTimeout')
    })
    this.$nextTick(() => {
      console.log('nextTick')
    })
  },
  components: {
    AboutSon,
    AboutSon1
    // AboutSon: () => import('./AboutSon.vue'),
    // AboutSon1: () => import('./AboutSon1.vue')
  }
}
</script>
<style scoped>
.about {
  padding: 15px;
  border: 1px solid palegreen;
}
</style>
