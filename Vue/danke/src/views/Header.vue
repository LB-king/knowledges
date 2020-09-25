<template lang="pug">
  el-menu(:default-active="activeIndex",
    router
    mode="horizontal",
    background-color="#545c64",
    text-color="#fff",
    active-text-color="#ffd04b")
    el-menu-item(v-for="(item, index) in headMenus" :key="index" :index="item.path") {{item.name}}
</template>
<script>
import { headMenus } from '@/libs/headerMenu'
export default {
  name: 'main-header',
  data() {
    return {
      msg: 'menu',
      headMenus
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
