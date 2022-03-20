import { getType } from "./utils/utils"
import newArrayProto from "./ArrayProto"
export default function Vue(options) {
  //Vue的初始化操作

}

var data = {
  name: '犀牛',
  age: 10,
  detail: {
    sex: 'man'
  },
  favs: ['敲代码', '游泳']
}

//TODO 触发数组的更新需要细看
data.favs.push('99')
observer(data)


/**
 * 劫持一个对象的方法
 * @param {*} target 被劫持的对象
 */
function observer(target) {
  //简单判断了下，不是数组或者对象就直接返回
  if(typeof target !== 'object' || target == null) {
    return target
  }
  for(let key in target) {
    defineReactive(target, key, target[key])
  }
}

/**
 * 
 * @param {*} obj 需要被监控的对象
 * @param {*} key 被监控对象的键值
 * @param {*} value 键的值
 */
function defineReactive(obj, key, value) {
  //当值是object的时候,再次将其数据劫持
  observer(value)
  Object.defineProperty(obj, key, {
    get() {
      console.log(`${key}被访问了`)
      return value
    },
    set(newValue) {
      console.log(`${key}被修改了`)
      if (value !== newValue) {
        value = newValue
        //当value 是对象的时候，再把这个新值监听起来
        observer(value)
      }
    }
  })
}


