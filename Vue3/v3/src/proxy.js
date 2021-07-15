let obj = {
  name: 'park',
  age: 34
}
let state = new Proxy(obj, {
  get(obj, key) {
    // 两个参数
    console.log(obj, key)
    return obj[key]
  },
  set(obj, key, newVal) {
    //三个参数 obj->操作对象，key->键值，newVal->新的值
    console.log(obj, key, newVal)
    obj[key] = newVal
  }
})

//console.log(state.name) // { name: 'park', age: 34 } name park
//console.log(state.age) // { name: 'park', age: 34 } age 34

//state.name = 'lbj' //{ name: 'park', age: 11 } name lbj
state.age = 11 //{ name: 'park', age: 34 } age 11
console.log(state)

let arr = [2, 4, 6]
let th = new Proxy(arr, {
  get(obj, key) {
    // [ 2, 4, 6 ] push
    // [ 2, 4, 6 ] length
    console.log(obj, key)
    return obj[key]
  },
  set(obj, key, newV) {
    // [ 2, 4, 6 ] 3 8
    // [ 2, 4, 6, 8 ] length 4
    console.log(obj, key, newV)
    obj[key] = newV
    return true
  }
})
th.push(8)
