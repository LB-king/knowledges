const fs = require('fs')
const zlib = require('zlib')
// 压缩文件
const GZIP = zlib.createGzip()

const rs = fs.createReadStream('./note.txt')
const ws = fs.createWriteStream('./note.txt.gz')

rs.pipe(GZIP).pipe(ws)

// pipe管道连接--
// 解压文件
// fs.createReadStream('note.txt.gz')
//   .pipe(zlib.createGunzip())
//   .pipe(fs.createWriteStream('output11.txt'))
// console.log('文件解压完成')