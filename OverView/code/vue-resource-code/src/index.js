import observe from './myReactive/observe'
var obj = {
  a: {
    b: {
      c: 'cc'
    }
  },
  m: 'mm',
  arr: []
}
observe(obj)

obj.arr.push(99)