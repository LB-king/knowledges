const fs = require('fs')
let zlib = require('zlib')

/* *****链式流****** */
// 压缩
fs.createReadStream('output.txt')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('output.txt.gz'))

console.log('压缩完成')