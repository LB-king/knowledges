console.log(__dirname)
/*
process.on('exit', (code) => {
  console.log('退出码为' + code)
})
console.log('程序执行结束')
 
执行结果是:
程序执行结束
退出码为0 

console.log(process.argv) 
[ 'C:\\Program Files\\nodejs\\node.exe',
  'E:\\knowledges\\nodeJs\\codes\\global.js' ]
*/

console.log(process.version) // v10.16.0
// console.log(process.config)
console.log(process.pid) // 26852
process.title = 'DIY'
console.log(process.title) // DIY
console.log(process.arch) // x64
console.log(process.platform) // win32
console.log(process.mainModule)
/*
 Module {
  id: '.',
  exports: {},
  parent: null,
  filename: 'E:\\knowledges\\nodeJs\\codes\\global.js',
  loaded: false,
  children: [],
  paths:
   [ 'E:\\knowledges\\nodeJs\\codes\\node_modules',
     'E:\\knowledges\\nodeJs\\node_modules',
     'E:\\knowledges\\node_modules',
     'E:\\node_modules' 
    ]
  }
*/
