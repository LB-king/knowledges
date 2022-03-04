
/**
 * 
 * @param {*} callback 回调函数
 * @param {*} context 执行上下文
 */
Array.prototype.myForEach = function (callback, context) {
  //备份一下要处理的数组
  let _this = this,
    len = this.length,
    i = 0
  context = context | globalThis
  for (; i < len; i++) {
    callback.call(context, _this[i], i)
  }
}
