/**
 * 监测对象的属性
 */
import Observer from './Observer'
export default function observe(obj) {
  let type = Object.prototype.toString.call(obj)
  if ( ['[object Object]', '[object Array]'].indexOf(type) === -1) return
  let ob
  if (typeof obj.__ob__ === 'undefined') {
    ob = new Observer(obj)
  } else {
    ob = obj.__ob__
  }
  return ob
}
