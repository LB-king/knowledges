import { getType } from '../utils/utils'
import vnode from './vnode'
/* import {util as tt} from './utils/utils'
console.log(tt)
var a = 'AAA',b='BBB'
export default {a, b}

export const a = 'AAA'
export const b = 'BBB' */

// h函数的使用场景,要对以下情景进行分别处理
/* 
  h('div', '内容')
  h('div', [])
  h('div', h())
  h('div', {}, '内容')
  h('div', {}, [])
  h('div', {}, h()) 
*/
/* h('div', {
  props: {
    style: 'color: red'
  }
},'haha') */

export const h = (sel, b, c) => {
  var data = { ...b },
    elm = '',
    text = c,
    children = []
  var res = vnode(sel, data, elm, text, children)

  return res
}
