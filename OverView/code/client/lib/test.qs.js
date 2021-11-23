const qs = require('qs')
var obj = {
  name: 'joke',
  age: 13,
  id: 112233
}
var objStr = 'name=kb&age=18'

console.log(qs.stringify(obj)) // name=joke&age=13&id=112233
console.log(qs.parse(objStr)) // { name: 'kb', age: '18' }