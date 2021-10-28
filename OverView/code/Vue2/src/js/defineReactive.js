import observe from './observe'
import Dep from './Dep'
export default function defineReactive(obj, key, value) {
  // console.log('我是defineReactive: ', key)
  if (arguments.length === 2) {
    value = obj[key]
  }
  observe(value)
  let dep = new Dep()
  Object.defineProperty(obj, key, {
    //writable: true, //是否可写
    enumerable: true, //是否可以枚举,默认是false
    configurable: true,
    get() {
      // console.log(`正在访问的${key}属性`)
      //订阅数据变化时，往Dep中添加观察者
      // dep.addSub()
      Dep.target && dep.addSub(Dep.target)
      return value
    },
    set(newValue) {
      // console.log(`你正在设置${key}的属性值为${newValue}`)
      if (value === newValue) return
      value = newValue
      dep.notify()
      observe(newValue)
    }
  })
}
