<template lang="pug">
  el-menu(default-active="1",
    mode="horizontal",
    background-color="#545c64",
    text-color="#fff",
    active-text-color="#ffd04b")
    el-menu-item(index="1") 首页
    el-submenu(index ="2")
      template(slot="title") 关于
      el-menu-item(index="2-1") 子菜单
</template>
<script>
export default {
  name: 'main-header',
  data() {
    return {
      msg: 'menu'
    }
  }
}
</script>
<style lang="scss">
</style>
