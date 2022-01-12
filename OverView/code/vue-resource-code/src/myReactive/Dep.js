/**
 * 收集Watcher
 */
var uid = 0
export default class Dep {
  constructor() {
    // console.log('Dep的构造器')
    //subscibes 订阅者
    //存放Watcher的实例
    this.id = uid++
    this.subs = []
  }
  //添加订阅
  addSub(sub) {
    this.subs.push(sub)
  }
  //通知更新
  notify() {
    console.log('dep中的notify')
    const subs = this.subs.slice()
    for (let i = 0, len = subs.length; i < len; i++) {
      subs[i].update()
    }
  }
}
