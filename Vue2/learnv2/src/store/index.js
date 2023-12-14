import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //默认菜单
    activeMenu: 'workCenter',
    //默认tab
    activeTab: 'workCenter',
    //菜单导航的tab标签页
    menuTabs: [
      {
        title: '工作台',
        name: 'workCenter',
        path: '/workCenter'
      }
    ]
  },
  getters: {
    activeMenu: state => state.activeMenu,
    activeTab: state => state.activeTab,
    menuTabs: state => state.menuTabs
  },
  mutations: {
    updateActiveMenu: (state, payload) => {
      state.activeMenu = payload
    },
    updateActiveTab: (state, payload) => {
      state.activeTab = payload
    },
    pushMenuTabs: (state, payload) => {
      state.menuTabs.push(payload)
    },
    deleteMenuTabs: (state, index) => {
      state.menuTabs.splice(index, 1)
    }
  },
  actions: {},
  modules: {}
})
