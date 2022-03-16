import { getType } from "./utils/utils"
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
data.favs.push('11')
observer(data)

/**
 * 劫持一个对象的方法
 * @param {*} target 被劫持的对象
 */
function observer(target) {
  //1.监听对象
  if (['object'].indexOf(getType(target)) > -1) {
    let keys = Object.keys(target)
    keys.forEach(key => {
      defineReactive(target, key, target[key])
    })
  }
  //2.监听数组
  else if (['array'].indexOf(getType(target)) > -1) {
    // for (let i = 0; i < target.length; i++) {
    //   observer(target[i])
    // }
  } else {
    return target
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


