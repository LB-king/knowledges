<template lang="pug">
.mars-pro 
  pro-layout-contaner(:columnCount="1" :span="12")
    pro-action(@click.native='doHandle') 按钮
    pro-action(@handler='doHandle') 按钮
</template>

<script>
import createState from 'mars-pro/lib/pro/createState'
// console.log(createState)
export default {
  name: 'mars',
  props: {
    ppp: {
      type: String,
      default: 'pp'
    }
  },
  data() {
    return {
      form: { info: {} },
      iName: ''
    }
  },
  methods: {
    doHandle() {
      console.log(this.form)
      this.form.name = '9999'
    }
  },
  mounted() {
    console.log('UI_LOG', this.$scopedSlots)
  }
}
</script>

<style lang="scss">
</style>
