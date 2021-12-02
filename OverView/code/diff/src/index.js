import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  h
} from 'snabbdom'

/* var myVnode = h(
  'a',
  {
    props: {
      href: 'http://www.baidu.com',
      target: '_blank',
    },
    class: {
      'alink': true
    }
  },
  '百度'
) */

var myVnode = h('ul', [
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
          name: 'test-name'
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
patch(container, myVnode)
