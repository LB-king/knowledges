/* 
  传统回调编程的方法:
  1.回调函数
  2.事件监听
  3.发布/订阅
  4.Promise 对象
  JavasScript语言对异步编程的实现，就是回调函数callback
  callback hell http://callbackhell.com 回调地域
  Promise允许将回调函数的横向加载改成纵向加载
  "协程" coroutine
  第一步: 协程A开始执行
  第二步: 协程A执行到一半，进入暂停，执行权转移到协程B
  第三步: (一段时间后) 协程B交还执行权
  第四步: 协程A恢复执行
  上面流程的协程A就是异步任务
*/

const fs = require('fs')
const path = require('path')
// console.log(path.join(__dirname, '/async.js'))
fs.readFile(path.join(__dirname, '/async.js'), (err, data) => {
  if(err) throw err
  // console.log(data.toString())
})

var gen = function* (x) {
  var y = yield x + 2
  return y
}
var g = gen(1)
console.dir(g.next())
console.dir(g.next())

