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
/*
 h('div', {
  props: {
    style: 'color: red'
  }
},'haha')

*/
/* 
  手写，默认传3个参数
*/
export const h = (sel, b, c) => {
  const [typeB, typeC] = [getType(b), getType(c)]
  let [data, elm, text, children] = [{}, undefined, undefined, undefined]
  //1.当第二个参数b没有传时,b可能是''|h()|[]|undefined.以下4种情况
  // h('div') 不需要处理
  // h('div', '内容')
  // h('div', [])
  // h('div', h())
  if (
    /^(undefined|object|string|array)$/i.test(typeB) &&
    /^(undefined)$/i.test(typeC)
  ) {
    //1.h('div', '内容')
    if (/^(string)$/i.test(typeB)) {
      text = b
    }

    //2.h('div', [])
    // 函数嵌套，不是递归
    if (/^(array)$/i.test(typeB)) {
      children = [...b]
    }
    //3.h('div', h())
    if (/^(object)$/i.test(typeB) && b.hasOwnProperty('sel')) {
      children = [b]
    }
  } else if (
    /^(object)$/i.test(typeB) &&
    /^(undefined|object|string|array)$/i.test(typeC)
  ) {
    data = b
    //2. 当b是对象,c是undefined|object|string|array时
    /* 
      h('div', {})
      h('div', {}, '内容')
      h('div', {}, [])
      h('div', {}, h()) 
    */
    //1.c是string  h('div', {}, '内容')
    if (/^(string)$/i.test(typeC)) {
      text = c
    }
    //2. h('div', {}, [])
    if (/^(array)$/i.test(typeC)) {
      children = [...c]
    }
    //3.h('div', {}, h())
    if (/^(object)$/i.test(typeC) && c.hasOwnProperty('sel')) {
      children = [c]
    }
  } else {
    //具体错误信息可以按细分类添加，此处不一一列出
    throw new TypeError('please enter correct parameter')
  }
  return vnode(sel, data, children, text, elm)
}
