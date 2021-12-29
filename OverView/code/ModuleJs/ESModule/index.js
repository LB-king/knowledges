/* 
  ESModule - 官方标准化模块系统
  1.因为它是标准，所以未来很多浏览器会支持，可以很方便的在浏览器中使用(浏览器默认加载不能省略.js)
  2.同时兼容在node环境下运行
  3.模块的导入导出，通过import和export来确定，可以和commonjs混合使用
  4.ESModule输出的是值的引用，输出接口动态绑定，而commonjs输出的是值的拷贝
  5.ESModule模块编译时执行，而commonjs模块总是在运行时加载
*/