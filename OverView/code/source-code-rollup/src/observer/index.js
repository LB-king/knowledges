import { getType } from '../utils'
import { Observer } from './Observe'
export const observe = function (data) {
  //判断data是不是对象
  if (getType(data) !== 'object') return
  //是对象，则要观测
  new Observer(data)
}
