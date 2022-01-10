import def from './def'
import defineReactive from './defineReactive'
/**
 * 这个类的功能是将一个正常的object转换为每个层级的属性都是响应式的object
 */
export default class Observer {
  constructor(obj) {
    def(obj, '__ob__', this, false)
    this.walk(obj)
  }

  walk(obj) {
    for (let k in obj) {
      // console.log(k)
      defineReactive(obj, k)
    }
  }
}
