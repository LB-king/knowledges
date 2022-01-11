import observe from './observe'
import def from './def'
const arrays = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse']
let arrayPrototype = Array.prototype
//以arrayPrototype为原型创建一个对象
export const arrayMethods = Object.create(arrayPrototype)
arrays.forEach((methodName) => {
  //备份原始的方法
  let original = arrayPrototype[methodName]
  def(
    arrayMethods,
    methodName,
    function () {
      let ob = this.__ob__
      let inserted = []
      //arguments是类数组，没有数组身上的方法
      let args = [...arguments]
      //插入的操作要添加监听
      switch (methodName) {
        case 'push':
        case 'unshift':
          inserted = args
          break
        case 'splice':
          inserted = args.slice(2)
          break
      }
      console.log('触发def数组~~~')
      inserted.length > 0 && ob.observeArr(inserted)
      //this指向数组
      original.apply(this, arguments)
      // return res
    },
    false
  )
})
