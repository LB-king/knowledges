const express = require('express')
const app = express()
app.use('/ding', express.static('public'))
app.get('/', function (req, res) {
  res.send('hi express 首页面')
})
app.get('/del', function (req, res) {
  res.send('删除页面')
})
app.get('*', function (req, res) {
  res.send('404 not found')
})
app.listen(3000, function () {
  console.log('3000端口已被监听')
})

app.set('title', 'myTitle')
app.get('title')
console.log(app.get('title')) // myTitle