let { ref, reactive } = require('vue')
let state = ref(9)
console.log(reactive({value: {
  a:99
}}))
let state1 = reactive({ a: 9 })
console.log(state)


// 判断一个对象是不是ref对象
function isRef(obj) {
  return obj.__v_isRef || false
}

console.log('isRef', isRef(state))
