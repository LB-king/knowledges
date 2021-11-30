/* 
  @param  call是用来改变函数的this指向的
  Fn: 目标函数
  context: 函数要指向的上下文
  params：参数
*/

function call(Fn, context, ...params) {
  //直接传递参数，并且参数不是对象,可直接当成实参
  if (!/^(object)$/.test(getType(context))) {
    params.unshift(context)
    context = globalThis
  }
  //把函数Fn挂载到临时属性
  context.temp = Fn
  //临时函数执行，this指向context
  let res = context.temp(...params)
  //删除临时函数
  delete context.temp
  return res
}
