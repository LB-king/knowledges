/* 
  AMD(Asynchronous Module Definition)-异步模块定义。采用异步方式加载模块，模块加载不影响后面语句的运行。所以依赖这个模块的语句，都定义在一个回调函数中。RequireJS是最佳实践者。
  主要的几个命令：
  define  require  return  define.amd
  define(id?, dependencies? factory) - 全局函数，用来定义模块
  require - 用来输入其他模块提供的功能
  return - 用于规范模块的对外接口
  define.amd - 次属性的存在表示函数遵循AMD规范
*/
define(function (require) {
  var m1 = require('./module1')
  console.log(m1.say())
  var m2 = require('./module2')
  console.log(m2.say())
});

