export default function defineReactive(obj, key, value) {
  if (arguments.length === 2) {
    value = obj[key]
  }
  Object.defineProperty(obj, key, {
    //writable: true, //是否可写
    enumerable: true, //是否可以枚举,默认是false
    configurable: true,
    get() {
      console.log(`正在访问obj的${key}属性`)
      return value
    },
    set(newValue) {
      console.log(`你正在设置${key}的属性值为${newValue}`)
      if (value === newValue) return
      value = newValue
    }
  })
}