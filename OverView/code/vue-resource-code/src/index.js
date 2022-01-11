import observe from './myReactive/observe'
var obj = {
  a: {
    b: {
      c: 'cc'
    }
  },
  m: 'mm',
  arr: [11, 22, 33]
}
observe(obj)


