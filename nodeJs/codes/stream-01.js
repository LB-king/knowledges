const fs = require('fs')
const path = require('path')
let readData = ''
let filePath = path.resolve(__dirname, 'package.-json')
console.log(filePath)
// 创建可读流
let readerStream = fs.createReadStream(filePath)
// 设置编码为utf8
readerStream.setEncoding('UTF8')
// 处理流事件-->data,end,error,end
readerStream.on('data', function (data) {
  readData += data
})

readerStream.on('end', function(d) {
  console.log(readData)
})

readerStream.on('error', function(err) {
  console.log(err.stack)
})
