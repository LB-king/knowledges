let Dep = {
  //容器
  clientList: {},
  //订阅方法
  listen: function (key, fn) {
    // if (!this.clientList[key]) {
    //   this.clientList[key] = []
    // }
    // this.clientList[key].push(fn)
    (this.clientList[key] || (this.clientList[key] = [])).push(fn)
  },
  //发布方法
  trigger: function () {
    let key = Array.prototype.shift.call(arguments),
      fns = this.clientList[key]
      console.log(key, fns)
    if (!fns || fns.length === 0) return false
    for (let i = 0, fn; fn = fns[i++];) {
      fn.apply(this, arguments)
    }
  }
}

//劫持方法
let reactive = function ({ data, tag, dataKey, selector }) {
  let value = '',
    el = document.querySelector(selector)
  Object.defineProperty(data, dataKey, {
    get() {
      return value
    },
    set(newValue) {
      value = newValue
      console.log('设置值')
      console.log(newValue)
      Dep.trigger(tag, newValue)
    }
  })
  Dep.listen(tag, function (text) {
    el.innerHTML = text
  })
}