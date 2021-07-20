/* 
shallowReactive,shallowRef
shallowReadonly
reactive,ref
readonly
*/

// 原理解析
// 1.shallowReactive
function shallowReactive(obj) {
  return new Proxy(obj, {
    get(obj, key) {
      return obj[key]
    },
    set(obj, key, val) {
      obj[key] = val
      console.log('UI更新')
      return true
    }
  })
}

let obj = {
  a: 'a',
  f: {
    b: 'b',
    gf: {
      c: 'c',
      d: {
        s: 's'
      }
    }
  }
}

// 注释掉第一层之后，就没有打印信息，从而实现了shallowReactive shallowRef

//2.shallowRef
function shallowRef(value) {
  return shallowReactive({ value })
}
/* let state = shallowReactive(obj)
// state.a = 1
state.f.b = 2
state.f.gf.c = 3
state.f.gf.d.s = 4 */

// let state1 = shallowRef(obj)
// state1.value = {
//   a: 'a',
//   f: {
//     b: 'b',
//     gf: {
//       c: 'c',
//       d: {
//         s: 's'
//       }
//     }
//   }
// }

// 3.reactive
var listObj = {
  name: 'a',
  age: 18,
  attr: {
    height: 18
  }
}
var listArr = [
  {
    id: 1,
    name: 'id1'
  },
  {
    id: 2,
    name: 'id2'
  }
]
function reactive(obj) {
  // 如果是一个数组,那么取出数据中的每一个元素，判断每一个元素是否又是一个对象，如果又是一个对象，那么也需要包装成Proxy
  if (getType(obj) === '[object Array]') {
    obj.forEach((item, index) => {
      obj[index] = reactive(item)
    })
  } else if (getType(obj) === '[object Object]') {
    for (let i in obj) {
      obj[i] = reactive(obj[i])
    }
  } else {
    return obj
  }
  return new Proxy(obj, {
    get(obj, key) {
      return obj[key]
    },
    set(obj, key, val) {
      obj[key] = val
      console.log('UI更新')
      return true
    }
  })
}

function getType(value) {
  return Object.prototype.toString.call(value)
}
// 4.ref
function ref(value) {
  return reactive({ value })
}

var res = reactive(listObj)
// res.value.push({ id: 99, name: 'zs' })
res.name = 'zs'
res.attr.height = 20
/* res.name = 'yy'
res.attr.height = 'yy'
console.log(res) */


//5.shallowReadonly
function shallowReadonly(obj) {
  return new Proxy(obj, {
    get(obj, key) {
      return obj[key]
    },
    set() {
      console.warn('只读属性，不可修改')
    }
  })
}

//6.readonly
function readonly(obj) {
  if (getType(obj) === '[object Array]') {
    obj.forEach((item, index) => {
      obj[index] = readonly(item)
    })
  } else if (getType(obj) === '[object Object]') {
    for (let i in obj) {
      obj[i] = readonly(obj[i])
    }
  } else {
    return null
  }
  return new Proxy(obj, {
    get(obj, key) {
      return obj[key]
    },
    set() {
     console.warn('只读属性不可修改')
    }
  })
}
// var res1 = shallowReadonly(obj)
// var res1 = readonly(obj)
// res1.a = 1
// res1.f.b =2
// console.log(res1)