const events = require('events')
const eventsEmitter = new events.EventEmitter()
eventsEmitter.on('myEvent', () => {
  console.log('UI_LOG: ', '自定义事件触发了')
})
setTimeout(() => {
  eventsEmitter.emit('myEvent')
}, 2000)
