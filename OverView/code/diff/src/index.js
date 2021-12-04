import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  h
} from 'snabbdom'
import { h as h1 } from './mySnabbsom/h'
import myPatch from './mySnabbsom/patch'
var myNode = h('a', { props: { href: 'http://www.baidu.com' } }, h('span'))
var myNode1 = h1('a', { props: { href: 'http://www.baidu.com' } }, h1('span'))
console.log(myNode)
console.log(myNode1)
/* var myVnode = h('ul', [
  h('li', '苹果'),
  h('li', '香蕉'),
  h('li', [
    h('p', 'AAA'),
    h('p', 'BBB'),
    h(
      'a',
      {
        props: {
          href: 'http://www.baidu.com',
          name: 'test-name',
          id: 'a-id'
        },
        class: {
          'test-class': true
        }
      },
      '链接'
    )
  ])
])

console.log(myVnode)
// 创建一个patch函数
const patch = init([
  classModule,
  propsModule,
  styleModule,
  eventListenersModule
])

//让虚拟节点上树
patch(container, myVnode) */

let node1 = h('ul', [
  h('li', { key: 'A' }, 'AAA'),
  h('li', { key: 'B' }, 'BBB'),
  h('li', { key: 'C' }, 'CCC'),
  h('li', { key: 'D' }, 'DDD')
])
let node2 = h('ul', [
  h('li', { key: 'E' }, 'EEE'),
  h('li', { key: 'A' }, 'AAA'),
  h('li', { key: 'C' }, 'CCC'),
  h('li', { key: 'B' }, 'BBB'),
  
  h('li', { key: 'D' }, 'DDD')
])
const patch = init([
  classModule,
  propsModule,
  styleModule,
  eventListenersModule
])
myPatch(container, node1)

//key的作用是实现最小量更新的
// btn.addEventListener('click', () => {
//   patch(node1, node2)
// })
