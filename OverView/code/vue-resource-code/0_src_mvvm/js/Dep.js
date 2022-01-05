export default class Dep{
  constructor() {
    this.subs = []
  }
  //收集观察者
  addSub(watcher) {
    this.subs.push(watcher)
  }
  //通知观察者去更新
  notify() {
    console.log('观察者', this.subs)
    this.subs.forEach(watcher => watcher.update())
  }
}