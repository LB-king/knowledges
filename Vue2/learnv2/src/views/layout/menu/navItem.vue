<template>
  <div v-if="!menu.hidden">
    <template
      v-if="(menu.children && menu.children.length === 0) || !menu.children"
    >
      <el-menu-item :index="menu.name" :router="menu.path">
        <i v-if="menu.icon" :class="menu.icon"></i>
        <span slot="title">{{ menu.title }}</span>
      </el-menu-item>
    </template>

    <el-submenu v-else :index="menu.name" :router="menu.path">
      <template slot="title">
        <i v-if="menu.icon" :class="menu.icon"></i>
        <span slot="title">{{ menu.title }}</span>
      </template>
      <nav-item
        v-for="child in menu.children"
        :key="child.name"
        :menu="child"
      />
    </el-submenu>
  </div>
</template>

<script>
export default {
  name: 'nav-item',
  props: {
    menu: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="less">
.el-menu--collapse {
  .el-submenu {
    .el-submenu__title {
      span {
        display: inline-block;
        width: 0;
        height: 0;
        visibility: hidden;
        overflow: hidden;
      }
      .el-submenu__icon-arrow {
        display: none;
      }
    }
  }
}
</style>
