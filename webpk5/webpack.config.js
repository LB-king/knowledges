const path = require('path')

module.exports = {
  mode: 'development',
  // entry: ['./src/index.js']
  // entry: {
  //   main: ['./src/index.js', './src/a.js']
  // },
  entry: {
    a: './src/a.js',
    b: './src/b.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'bundle')
  },
  // loader配置
  module: {
    rules: []
  },
  // plugins插件配置
  plugins: []
}

/* 
// 1、join是把各个path片段连接在一起， resolve把'/'当成根目录
console.log(path.join('/a', '/b')) // \a\b
console.log(path.resolve('/a', '/b')) // e:\b


// 2、join直接拼接字段，resolve解析路径并返回
console.log(path.join('a', 'b1', '..', 'b2')) // a\b2
console.log(path.resolve('a', 'b1', '..', 'b2')) // e:\codeSpace\a\b2

*/

function A(a,b) {
  console.dir(arguments)
}
A(1,2)