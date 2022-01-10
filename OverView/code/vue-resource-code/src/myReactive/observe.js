/**
 * 监测对象的属性
 */
import Observer from './Observer'
export default function observe(obj) {
  if (Object.prototype.toString.call(obj) !== '[object Object]') return
  let ob
  if (typeof obj.__ob__ === 'undefined') {
    ob = new Observer(obj)
  } else {
    ob = obj.__ob__
  }
  return ob
}
