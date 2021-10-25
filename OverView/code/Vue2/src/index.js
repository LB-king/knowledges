import observe from './js/observe'

let obj = {
  a: {
    m: {
      n: 'NBA'
    }
  },
  b: 12,
  arr: [1,2]
}

observe(obj)
obj.arr.splice(1,1,8888)
console.log(obj.arr)
//数组并不是响应式的
/* 
vue改写了数组的7个方法
push
pop
shift
unshift
splice
sort
reverse
*/



