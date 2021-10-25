import { def } from '../utils/index'
const arrayPrototype = Array.prototype
export const arrayMethods = Object.create(arrayPrototype)
//要被修改的7个方法
const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]

methodsToPatch.forEach((methodName) => {
  //备份原来的方法
  let original = arrayPrototype[methodName]
  //定义新的方法
  def(
    arrayMethods,
    methodName,
    function () {
      let args = [...arguments]
      //把这个数组身上的__ob__属性取出来，__ob__已经被添加了，obj.arr在第一次遍历的时候就已经添加了__ob__属性
      let ob = this.__ob__
      //有3种方法push，unsfift，splice能够插入新值，此时就需要把新值也变成observe的
      let inserted = []

      switch (methodName) {
        case 'push':
        case 'unshift':
          inserted = arguments
          break
        case 'splice':
          inserted = args.slice(2)
          break
      }
      if (inserted.length) {
        ob.observeArray(inserted)
      }
      console.log('触发监听啦~~~')
      //保证原来的方法
      var res = original.apply(this, arguments)

      return res
    },
    false
  )
})
