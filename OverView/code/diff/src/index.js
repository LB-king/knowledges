// import {
// init,
// classModule,
// propsModule,
// styleModule,
// eventListenersModule,
// h
// } from './mySnabbdom'
import {h} from 'snabbdom'
import { h as h1 } from './mySnabbsom/h'
var myNode = h1(
  'div',
  {
    props: {
      style: 'color: red'
    },
    class: {
      blue: true
    }
  },
  'haha'
)
console.log(myNode)
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
