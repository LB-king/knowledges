import { def } from '../utils/index'
import defineReactive from './defineReactive'
import { arrayMethods } from './arr'
import observe from './observe'
//将一个正常的object转换成每个层级的属性都是响应式的(可以被侦测),Observer(观察)类
export default class Observer {
  constructor(value) {
    def(value, '__ob__', this, false)
    //检查value是数组还是对象,将数组的原型指向arrayMethods，使用更改后的方法
    if (Array.isArray(value)) {
      Object.setPrototypeOf(value, arrayMethods)
      //遍历数组，给数组添加
      this.observeArray(value)
    } else {
      this.walk(value)
    }
    // console.log('我是Observer构造器: ', value)
  }
  //遍历
  walk(value) {
    for (let key in value) {
      defineReactive(value, key)
    }
  }
  //数组的特殊遍历
  observeArray(array) {
    for (let i = 0, len = array.length; i < len; i++) {
      observe(array[i])
    }
  }
}
