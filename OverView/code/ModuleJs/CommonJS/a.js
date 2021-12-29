const name = '我是a.js的内容'
var age = 18
var obj = {
  name,
  age
}
setTimeout(() => {
  age = 19
}, 10)

module.exports = obj
// exports.obj1 = obj
