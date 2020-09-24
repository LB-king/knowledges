<template lang="pug">
  el-menu(:default-active="activeIndex",
    router
    mode="horizontal",
    background-color="#545c64",
    text-color="#fff",
    active-text-color="#ffd04b")
    el-menu-item(index="/") 首页
    el-menu-item(index="/dict") 字典
    el-menu-item(index="/d3") d3
</template>
<script>
export default {
  name: 'main-header',
  data() {
    return {
      msg: 'menu'
    }
  },
  computed: {
    activeIndex() {
      return this.$route.path
    }
  }
}
</script>
<style lang="scss">
</style>
