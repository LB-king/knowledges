import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  h
} from 'snabbdom'
import { h as h1 } from './mySnabbdom/h'
import myPatch from './mySnabbdom/patch'
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

/* 
  修改真实dom: 159.724853515625ms
  修改虚拟dom: 0.379150390625ms
  测试直接修改虚拟dom(直接修改数据)和修改dom的区别
  可以看到渲染效率相差很大,使用数据会提升效率

  console.time('修改真实dom')
  for (let i = 0; i < 9999; i++) {
    btn.innerHTML = i
  }
  console.timeEnd('修改真实dom')
  console.time('修改虚拟dom')
  let s = 0
  for (let i = 0; i < 9999; i++) {
    s = i
  }
  btn1.innerHTML = s
  console.timeEnd('修改虚拟dom')
*/
