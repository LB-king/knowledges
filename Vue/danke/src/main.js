import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import 'element-ui/lib/theme-chalk/display.css'
Vue.config.productionTip = false
import { Button, Menu, MenuItem, Table, TableColumn } from 'element-ui'
Vue.use(Button)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Table)
Vue.use(TableColumn)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
