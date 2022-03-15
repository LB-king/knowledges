<template>
  <div class="about-son">
    <h1 @click="$bus.$emit('pppp', 'pppppp')">about子页面</h1>
    <!-- <p>{{ _this.msg }}</p> -->
    <!-- <p>{{ value }}</p> -->
    <p>{{ syncMsg }}</p>
  </div>
</template>
<script>
export default {
  props: ['value', 'syncMsg'],
  // inject: {
  //   // _this: {
  //   //   default: () => {}
  //   // }
   
  // },
  inject: ['msg'],
  data() {
    return {
      sonMsg: '子组件的信息'
    }
  },
  computed: {
    fatherMsg() {
      // return this.$parent.msg
    }
  },
  mounted() {
    // console.log('子组件mounted-$attrs',this.$attrs)
    // console.log(this.$listeners)
    // console.log(this.$bus)
    console.log(this.syncMsg)
  }
}
</script>
<style scoped>
.about-son {
  padding: 15px;
  border: 1px solid #bcbcbc;
}
</style>
