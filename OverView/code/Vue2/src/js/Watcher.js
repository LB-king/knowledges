import { compileUtil } from '../mvvm/index'
import Dep from './Dep'
export default class Watcher {
  constructor(vm, expr, cb) {
    this.vm = vm
    this.expr = expr
    this.cb = cb
    this.oldValue = this.getOldVal()
  }
  getOldVal() {
    Dep.target = this
    let oldVal = compileUtil.getValue(this.expr, this.vm)
    Dep.target = null
    return oldVal
  }
  //比较新值和旧值
  update() {
    let newValue = compileUtil.getValue(this.expr, this.vm)
    console.log('新值，', newValue)
    if(newValue !== this.oldValue) {
      this.cb(newValue)
    }
  }
}
