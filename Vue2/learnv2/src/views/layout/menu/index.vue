<template>
  <div class="menu-container" style="height: 100%">
    <el-button
      class="collapse-icon"
      :icon="collalseIcon"
      type="text"
      @click="isCollapse = !isCollapse"
    ></el-button>
    <el-scrollbar>
      <el-menu
        class="el-menu-vertical"
        :collapse="isCollapse"
        :default-active="activeMenu"
        router
        @select="handleSelect"
        unique-opened
      >
        <NavItem
          v-for="menu in menuDatas"
          :key="menu.name"
          :menu="menu"
        ></NavItem>

        <!-- <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">导航一</span>
        </template>
        <el-submenu index="1-4">
          <span slot="title">选项4</span>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item> -->
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script>
import NavItem from './navItem.vue'
import {mapGetters} from 'vuex'
export default {
  data() {
    return {
      openeds: [],
      isCollapse: false,
      // defaultActive: 'workCenter',
      menuDatas: [
        {
          title: '工作台',
          icon: 'el-icon-s-home',
          name: 'workCenter',
          path: '/workCenter'
        },
        {
          title: '项目',
          icon: 'el-icon-s-data',
          name: 'project',
          path: '',
          children: [
            {
              title: '项目管理',
              icon: '',
              name: 'projectManage',
              path: '/projectManage'
            },
            {
              title: '项目设置',
              icon: '',
              name: 'projectSetting',
              path: '/projectSetting'
            },
            {
              title: '其他',
              icon: '',
              name: 'other',
              path: '/other'
            }
          ]
        },
        {
          title: '项目',
          icon: 'el-icon-s-data',
          name: 'project5',
          path: '',
          children: [
            {
              title: '项目管理',
              icon: '',
              name: 'projectManage5',
              path: '/projectManage'
            },
            {
              title: '项目设置',
              icon: '',
              name: 'projectSetting5',
              path: '/projectSetting'
            }
          ]
        },
        {
          title: '项目',
          icon: 'el-icon-s-data',
          name: 'project4',
          path: '',
          children: [
            {
              title: '项目管理',
              icon: '',
              name: 'projectManage4',
              path: '/projectManage'
            },
            {
              title: '项目设置',
              icon: '',
              name: 'projectSetting4',
              path: '/projectSetting'
            }
          ]
        },
        {
          title: '项目2',
          icon: 'el-icon-s-data',
          name: 'project2',
          path: '',
          children: [
            {
              title: '项目管理2',
              icon: '',
              name: 'projectManage2',
              path: '/projectManage'
            },
            {
              title: '项目设置',
              icon: '',
              name: 'projectSetting2',
              path: '/projectSetting'
            }
          ]
        },
        {
          title: '项目3',
          icon: 'el-icon-s-data',
          name: 'project3',
          path: '',
          children: [
            {
              title: '项目管理2',
              icon: '',
              name: 'projectManage3',
              path: '/projectManage'
            },
            {
              title: '项目设置',
              icon: '',
              name: 'projectSetting3',
              path: '/projectSetting'
            }
          ]
        },
        {
          title: '项目1',
          icon: 'el-icon-s-data',
          name: 'project1',
          path: '',
          children: [
            {
              title: '项目管理1',
              icon: '',
              name: 'projectManage1',
              path: '/projectManage'
            },
            {
              title: '项目设置1',
              icon: '',
              name: 'projectSetting1',
              path: '/projectSetting'
            }
          ]
        }
      ]
    }
  },
  watch: {
    defaultActive(v) {
      console.log('UI_LOG: ', v)
    }
  },
  components: {
    NavItem
  },
  computed: {
    ...mapGetters(['activeMenu']),
    collalseIcon() {
      return this.isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'
    }
  },
  methods: {
    handleSelect(v) {
      // this.defaultActive = v
    }
  }
}
</script>
<style lang="less" scoped>
.menu-container {
  height: 100%;
  position: relative;
  .collapse-icon {
    position: absolute;
    right: -18px;
    top: 20px;
    font-size: 18px;
  }
  .el-menu {
    height: 100%;
    &.el-menu-vertical:not(.el-menu--collapse) {
      width: 200px;
    }
  }
}
</style>
