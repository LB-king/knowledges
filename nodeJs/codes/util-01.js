const util = require('util')
/* async function fn() {
  return 'hello world'
}
const callbackFunction = util.callbackify(fn)
callbackFunction((err, res) => {
  if (err) throw err
  console.log(res)
}) */

// 插曲 async/await
/* function resolveAfter2Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved')
    }, 2000)
  })
}
async function asyncCall() {
  console.log('calling')
  let res = await resolveAfter2Seconds()
  console.log(res)
}
asyncCall() */

function Base() {
  this.name = 'base'
  this.base = 1991
  this.sayHello = function() {
    console.log('Hello' + this.name)
  }
}
Base.prototype.showName = function() {
  console.log(this.name)
}
function Sub() {
  this.name = 'sub'
}
util.inherits(Sub, Base)
let objBase = new Base()
objBase.showName() // base
objBase.sayHello() // Hellobase
let objSub = new Sub()
objSub.showName() // sub



