/* 
  CMD(Common Module Define) 通用模块定义，规范主要是Sea.js推广中行成，一个文件就是一个模块代码。可以像NodeJS书写模块代码。主要在浏览器中运行，当然也可以在nodejs中运行

*/

define(function (require, exports, module) {
  var m1 = require('./module1')
  console.log(m1.say())
  var m2 = require('./module2')
  console.log(m2.say())
})
