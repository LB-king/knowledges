import defineReactive from './js/defineReactive'
let obj = {
  a: {
    m: {
      n:'NBA'
    }
  }
}


defineReactive(obj, 'a')

console.log(obj.a.m.n)

