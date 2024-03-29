import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Dict from '../views/Dict.vue'
import D3 from '@/views/d3/index1.vue'
import D3Tree from '@/views/d3Tree/index.vue'
import xigua from '@/views/xigua/index.vue'
import Header from '../views/Header.vue'
import Hierarchy from '../views/Hierarchy/index.vue'
import jsPdf from '../views/jsPdf/index.vue'
import echartsComponent from '../views/echartsComponent/index.vue'
import Mars from '@/views/mars/index.vue'

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
	},
	{
		path: '/d3Tree',
		name: 'D3Tree',
		components: {
			header: Header,
			default: D3Tree
		}
	},
	{
		path: '/xigua',
		name: 'xigua',
		components: {
			header: Header,
			default: xigua
		}
	},
	{
		path: '/hierarchy',
		name: 'Hierarchy',
		components: {
			header: Header,
			default: Hierarchy
		}
	},
	{
		path: '/jsPdf',
		name: 'jsPdf',
		components: {
			header: Header,
			default: jsPdf
		}
	},
	{
		path: '/echarts',
		name: 'echarts',
		components: {
			header: Header,
			default: echartsComponent
		}
	},
	{
		path: '/mars',
		name: 'mars',
		components: {
			header: Header,
			default: Mars
		}
	},
	{
		path: '/dialog',
		name: 'dialog',
		components: {
			header: Header,
			default: () => import('@/views/dialog/index.vue')
		}
	},
	{
		path: '/monaco',
		name: 'monaco',
		components: {
			header: Header,
			default: () => import('@/views/monaco/index.vue')
		}
	},
	{
		path: '/complete',
		name: 'complete',
		components: {
			header: Header,
			default: () => import('@/views/complete/index.vue')
		}
	},
	{
		path: '/404',
		name: '404',
		components: {
			header: Header,
			default: () => import('@/views/404/index.vue')
		}
	},
	{
		path: '*',
		redirect: '/404',
		hidden: true
	}
]

const router = new VueRouter({
	mode: 'history',
	routes
})

export default router
