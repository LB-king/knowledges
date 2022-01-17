import { initState } from "./state"
export const initMixin = function (Vue) {
  Vue.prototype._init = function (options) {
    //数据劫持
    const vm = this
    vm.$options = options
    //初始化状态
    initState(vm)
  }
}
