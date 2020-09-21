const util = require('util')
function Person() {
  this.name = 'kobe'
  this.toString = function() {
    return this.name
  }
}
let obj = new Person()
console.log(util.inspect(obj))
console.log(util.inspect(obj, true))
console.log(util.inspect(obj, true, null, true))

console.log(util.isArray([]))
console.log(util.isArray({}))
console.log(util.isArray('ko'))

console.log(util.isRegExp(/some/)) // true
console.log(util.isRegExp(new RegExp('another pppp'))) // true
console.log(util.isRegExp([])) // false

console.log('isDate')
console.log(util.isDate(new Date())) // true
console.log(util.isDate(Date())) // false
console.log(util.isDate({})) // false
console.log(util.isDate(Date.now())) // 1600671078057 false
