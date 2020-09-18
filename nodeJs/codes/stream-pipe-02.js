const fs = require('fs')
const zlib = require('zlib')
// 解压
fs.createReadStream('output.txt.gz')
  .pipe(zlib.createGunzip())
  .pipe(fs.createWriteStream('output11.txt'))
  
console.log('文件解压完成')