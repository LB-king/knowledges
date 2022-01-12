import observe from './observe'
import Dep from './Dep'
export default function defineReactive(obj, key, value) {
  let dep = new Dep()
  if (arguments.length == 2) {
    value = obj[key]
  }
  //多个函数循环调用
  observe(value)
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: true,
    get() {
      console.log(`访问了${key}属性`)
      return value
    },
    set(newValue) {
      console.log(`修改${key}属性为：`, newValue)
      if (value !== newValue) {
        value = newValue
        //修改的值可能也是对象，因此需要监听
        observe(value)
        dep.notify()
      }
    }
  })
}
