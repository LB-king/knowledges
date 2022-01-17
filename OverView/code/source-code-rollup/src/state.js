import { observe } from './observer/index.js'
export const initState = function (vm) {
  const options = vm.$options
  //属性
  if (options.props) {
    initProps(vm)
  }
  //方法
  if (options.methods) {
    initMethods(vm)
  }
  //数据
  if (options.data) {
    initData(vm)
  }
  if (options.computed) {
    initComputed(vm)
  }
}

function initProps() {}
function initMethods() {}
function initData(vm) {
  let data = vm.$options.data
  //把数据加载vm的_data上，让vue实例能够访问
  data = vm._data = typeof data === 'function' ? data.call(vm) : data
  // console.log('初始化数据', data)
  //对象劫持，用户改变了数据会触发相应的操作
  observe(data)
}
function initComputed() {}
