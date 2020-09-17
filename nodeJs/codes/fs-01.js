let fs = require('fs')
let path = require('path')
let textPath = path.resolve(__dirname, './testFiles/test.txt')
console.log(textPath) // e:\knowledges\nodeJs\codes\testFiles\test.txt
// 1.readFile
fs.readFile(textPath, 'utf8', function (err, data) { // 异步读取
  if (err)
    throw err
  console.log(data.toString())
})
// let file = fs.readFileSync(textPath).toString() // 同步读取
// console.log(file)

// 2.lstat-(异步)
// let stat = fs.lstatSync(textPath) // 同步 lstat(). 返回 fs.Stats 的实例
// console.log(stat)
fs.lstat(textPath, function (err, data) {
  if (err)
    throw err
  //console.log(data) // 异步lstat 异步读取
})
/*  {
  dev: 3561167395, 
  mode: 33206,
  nlink: 1,
  uid: 0,
  gid: 0,
  rdev: 0,
  blksize: undefined,
  ino: 562949953425884,
  size: 52,
  blocks: undefined,
  atimeMs: 1600241543387.5764,
  mtimeMs: 1600241543387.5764,
  ctimeMs: 1600241543387.5764,
  birthtimeMs: 1600241517082.5786,
  atime: 2020-09-16T07:32:23.388Z,
  mtime: 2020-09-16T07:32:23.388Z,
  ctime: 2020-09-16T07:32:23.388Z,
  birthtime: 2020-09-16T07:31:57.083Z 
} */

// let stats = fs.Stats
// console.log(stats)

// 3.readdir 读文件夹-(异步)
// fs.readdir(__dirname, function(err, data){
//   console.log(err)
//   console.log(Object.prototype.toString.call(data))
//   console.log(data) // [ 'fs-01.js', 'testFiles' ]
// })
var readdirRes = fs.readdirSync(__dirname)
console.log(readdirRes) // [ 'fs-01.js', 'testFiles' ]
console.log(Object.prototype.toString.call([])) // [object Array]


