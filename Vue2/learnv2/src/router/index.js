import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Other from '../views/routeViews/other.vue'
import ProjectManage from '../views/routeViews/projectManage.vue'
import ProjectSetting from '../views/routeViews/projectSetting.vue'
import WorkCenter from '../views/routeViews/workCenter.vue'
import Layout from '../views/layout/index.vue'

import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    children: [
      {
        path: '/workCenter',
        name: 'workCenter',
        component: WorkCenter,
        meta: {
          title: '工作台'
        }
      },
      {
        path: '/projectManage',
        name: 'projectManage',
        component: ProjectManage,
        meta: {
          title: '项目管理'
        }
      },
      {
        path: '/projectSetting',
        name: 'projectSetting',
        component: ProjectSetting,
        meta: {
          title: '项目设置'
        }
      },
      {
        path: '/other',
        name: 'other',
        component: Other,
        meta: {
          title: '其他'
        }
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  store.commit('updateActiveMenu', to.name)
  //刷新的时候要设置激活的tab
  if (!store.state.menuTabs.some(item => item.name === to.name)) {
    let tab = {
      title: to.meta.title,
      name: to.name,
      path: to.path
    }
    store.commit('pushMenuTabs', tab)
    store.commit('updateActiveTab', tab.name)
  }
  next()
})
export default router

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
