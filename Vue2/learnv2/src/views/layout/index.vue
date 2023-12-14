<template>
  <el-container style="height: 100%">
    <Menu></Menu>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>王小虎</span>
      </el-header>

      <el-main style="padding: 0">
        <div style="height: 60px">
          <el-tabs :value="activeTab" type="card" @tab-click="tabClick">
            <el-tab-pane
              :key="item.name"
              v-for="(item, index) in menuTabs"
              :label="item.title"
              :name="item.name"
            >
              <template slot="label">
                <span>{{ item.title }}</span>
                <i
                  v-if="index > 0"
                  style="display: inline-block; width: 14px"
                  class="el-icon-close"
                  @click.stop="deteleTab(item)"
                ></i>
              </template>
            </el-tab-pane>
          </el-tabs>
        </div>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Menu from './menu/index.vue'
import { mapMutations, mapGetters } from 'vuex'
export default {
  data() {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    }
    return {
      tableData: Array(20).fill(item)
    }
  },
  watch: {
    $route: {
      handler(v) {
        let tab = {
          title: v.meta.title,
          name: v.name,
          path: v.path
        }
        if (this.menuTabs.some(item => item.name === v.name)) return
        this.pushMenuTabs(tab)
        this.updateActiveTab(tab.name)
      }
    }
  },
  computed: {
    ...mapGetters(['menuTabs', 'activeTab'])
  },
  components: {
    Menu
  },
  methods: {
    ...mapMutations([
      'updateActiveTab',
      'updateActiveMenu',
      'pushMenuTabs',
      'deleteMenuTabs'
    ]),
    tabClick(tab) {
      this.$router.push({
        name: tab.name
      })
      this.updateActiveMenu(tab.name)
    },
    deteleTab(tab) {
      let index = this.menuTabs.findIndex(item => item.name === tab.name)
      console.log('UI_LOG: ', this.activeTab)
      //当前tab是激活的，则下一个激活的菜单往前推一个
      if (tab.name === this.activeTab) {
        let nextActive = this.menuTabs[index - 1]
        console.log('UI_LOG: ', nextActive)
        this.updateActiveTab(nextActive.name)
        this.$router.push({
          path: nextActive.path
        })
      } else {
        this.$router.push({
          name: this.activeTab
        })
      }
      //当前菜单是非激活的，则保证原来的激活菜单
      this.deleteMenuTabs(index)
    },
    handleTabsEdit(v) {
      console.log('UI_LOG: ', v)
    }
  }
}
</script>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>
