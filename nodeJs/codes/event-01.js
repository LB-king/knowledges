const events = require('events')
const eventEmitter = new events.EventEmitter()

/* let connectHandler = function () {
  console.log('连接成功!')
  eventEmitter.emit('data_received')
}
eventEmitter.on('connection', connectHandler)

eventEmitter.on('data_received', function () {
  console.log('数据接收成功')
})

eventEmitter.emit('connection')
console.log('加载结束') */

eventEmitter.on('test_event', function (a1, a2) {
  console.log('测试事件')
  console.log(a1, a2)
})
setTimeout(() => {
  eventEmitter.emit('test_event', '参数1', '参数2')
}, 1000)