/* 
  @param  bind是用来改变函数的this指向的
  Fn: 目标函数
  context: 函数要指向的上下文
  params：参数
*/

function bind(Fn, context, ...params) {
  //直接传递参数，并且参数不是对象,可直接当成实参
  if (!/^(object)$/.test(getType(context))) {
    params.unshift(context)
    context = globalThis
  }
  return function () {
    return Fn.call(context, ...params)
  }
}
