/*
 *CommonJS主要运行于服务器端，该规范指出，一个单独的文件就是一个模块。NodeJS为主要的实践者，它有4个重要的环境变量为模块化的实现提供支持：
 module  exports  require  global
 其中module.exports === exports
 CommonJS采用同步加载模块，在浏览器端，受制于网络等原因，更合理的方案应该使用异步加载
 *
 */
const { name, age } = require('./a')
setTimeout(() => {
  console.log(age)
  console.log(require('./a').age)
}, 100)
// a = 9
// console.log(name)
