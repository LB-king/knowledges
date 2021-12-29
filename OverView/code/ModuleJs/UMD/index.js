/* 
  UMD - Universal Module Definition 通用模块定义
*/
!(function (global, factory) {
  /* 
    1.判断是否是commonjs规范
    2.判断define是不是函数,是否存在define.amd，判断是不是AMD规范
    3.都不满足，则设置为原始的代码规范
  */
  typeof exports === 'object' && typeof module !== 'undefined'
    ? (module.exports = factory())
    : typeof define === 'function' && define.amd
    ? define(factory)
    : ((global = global || self), (global.myFunc = factory()))
})(this, function () {
  'use strict'
  var main = () => {
    return 'UMD'
  }
  return main
})
