const fs = require('fs')
const path = require('path')
let res = 'Bayern Munich拜仁慕尼黑'

// 创建一个可以写入的流，写到文件 output.txt中
let writeStream = fs.createWriteStream(path.resolve(__dirname, 'testFiles/output.txt'))

//使用utf8编码写入数据
writeStream.write(res, 'UTF8')

// 标记文件末尾
writeStream.end()
// 处理流事件 -->data, end, error
writeStream.on('finish', () => {
  console.log('写入完成')
})

writeStream.on('error', (err) => {
  console.log(err.stack)
})