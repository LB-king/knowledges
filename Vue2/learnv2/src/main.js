import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './style/common.less'
Vue.config.productionTip = false


Vue.use(ElementUi)
new Vue({
  router,
  store,
  // template: `<h2>你好</h2>`,
  // render(h) {
  //   return h('h2', '你好')
  // }
  // components: {
  //   App
  // }
  render: h => h(App)
}).$mount('#app')

Vue.prototype.$bus = new Vue()