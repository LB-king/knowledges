import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Dict from '../views/Dict.vue'
import D3 from '@/views/d3/index.vue'
import Header from '../views/Header.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    components: {
      header: Header,
      default: Home
    }
  },
  {
    path: '/dict',
    name: 'Dict',
    components: {
      header: Header,
      default: Dict
    }
  },
  {
    path: '/d3',
    name: 'D3',
    components: {
      header: Header,
      default: D3
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router