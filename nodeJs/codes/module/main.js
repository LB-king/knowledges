let { say, name } = require('./hello')
say()
console.log(name) // 2020 champion
console.log(__filename) // E:\knowledges\nodeJs\codes\module\main.js

let t = setTimeout(say, 5000)
clearTimeout(t) // 不会执行

let i = 0
let ti = setInterval(function() {
  i++
  fn(new Date())
  if (i === 5) clearInterval(ti)
}, 1000)
function fn(p) {
  console.log(p)
}
