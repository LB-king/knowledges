import def from './def'
import defineReactive from './defineReactive'
import { arrayMethods } from './array'
import observe from './observe'
import Dep from './Dep'
/**
 * 这个类的功能是将一个正常的object转换为每个层级的属性都是响应式的object
 */
export default class Observer {
  constructor(obj) {
    this.dep = new Dep()
    def(obj, '__ob__', this, false)
    let type = Object.prototype.toString.call(obj)
    if (type === '[object Array]') {
      //强制改变数组的原型
      Object.setPrototypeOf(obj, arrayMethods)
      this.observeArr(obj)
    } else if (type === '[object Object]') {
      this.walk(obj)
    }
  }

  walk(obj) {
    for (let k in obj) {
      // console.log(k)
      defineReactive(obj, k)
    }
  }
  observeArr(arr) {
    for (let i = 0, len = arr.length; i < len; i++) {
      observe(arr[i])
    }
  }
}
