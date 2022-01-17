export const Observer = class {
  constructor(value) {
    this.walk(value)
  }
  walk(data) {
    let keys = Object.keys(data)
    for (let i = 0, len = keys.length; i < len; i++) {
      let key = keys[i]
      let value = data[key]
      //定义响应式数据
      
    }
  }
}
