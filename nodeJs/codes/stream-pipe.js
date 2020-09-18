const fs = require('fs')
const path = require('path')
let zlib = require('zlib')
// 创建一个可读流
let readerStream = fs.createReadStream(path.resolve(__dirname, 'package.json'))
// 创建一个可写流
let writeStream = fs.createWriteStream(path.resolve(__dirname, 'output.txt'))
//
readerStream.pipe(writeStream)
// 处理流事件 -->data, end, error
writeStream.on('finish', () => {
  console.log('写入完成')
})

writeStream.on('error', (err) => {
  console.log(err.stack)
})

/* *****链式流****** */
// 压缩
fs.createReadStream('output.txt')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('output.txt.gz'))

console.log('压缩完成')