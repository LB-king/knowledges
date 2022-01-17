import { initMixin } from './init'
export default function Vue(options) {
  //Vue的初始化操作
  this._init(options)
}
//通过引入文件的方式，给vue原型上添加方法
initMixin(Vue)
