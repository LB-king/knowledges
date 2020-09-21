process.stdout.write('std world' + '\n')
console.log(process.argv)
process.argv.forEach(function(val, index, array) {
  console.log(index, val)
})
// process.abort()
console.log(process.execPath) // 获取执行路径 C:\Program Files\nodejs\node.exe

console.log(process.cwd()) // E:\knowledges\nodeJs\codes
console.log(process.memoryUsage()) // 查看内存使用情况
/*
{ 
  rss: 20303872,
  heapTotal: 7061504,
  heapUsed: 4287752,
  external: 8680 
}
*/