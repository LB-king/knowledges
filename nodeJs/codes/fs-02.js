const fs = require('fs')
const path = require('path')

fs.open(path.resolve(__dirname, 'output.txt'), 'r+', function (err, fd) {
  if (err) throw err
  console.log('文件打开成功')
})

// 获取文件信息
fs.stat(__dirname, 'output.txt', function (err, stats) {
  console.log(stats)
  console.log('是否是文件', stats.isFile())
  console.log('是否是目录', stats.isDirectory())
})

fs.writeFile('test.txt', 'hahaha酷玩1','utf-8', function(err) {
  if (err) throw err
  console.log('写入文件成功')
  fs.readFile(path.resolve(__dirname, 'test.txt'), function(err, data){
    if(err) throw err
    console.log(data.toString())
  })
})

let buf = new Buffer.alloc(1024)
fs.open(path.resolve(__dirname, 'test.txt'),'r+',function(err,fd){
  if(err) throw err
  console.log('截取5个字节')
  fs.ftruncate(fd, 5, function(err) {
    console.log('文件截取成功')
    fs.read(fd, buf, 0, buf.length, 0, function(err, bytes) {
      if(err) throw err
      if(bytes.length > 0) {
        console.log(buf.slice(0, bytes).toString())
      }
      fs.close(fd, function(err) {
        console.log('关闭文件')
      })
    })
  })
})