import vnode from './vnode'
import createElement from './creatElement'
import patchVnode from './patchVnode'
export default function patch(oldVnode, newVnode) {
  //1.判断传入的第一个参数是dom节点还是虚拟节点
  if (!oldVnode.hasOwnProperty('sel')) {
    // 不是虚拟节点，则要包装成虚拟节点
    console.log('UI_LOG', '初始化的节点不是虚拟节点')
    oldVnode = emptyVnodeAt(oldVnode)
  }
  //2.判断oldVnode和newVnode是否是同一个节点
  if (oldVnode.key === newVnode.key && oldVnode.sel === newVnode.sel) {
    console.log('UI_LOG', '是同一个节点')
    //此处比较复杂。。。
    patchVnode(oldVnode, newVnode)
  } else {
    console.log('UI_LOG', '不是同一个节点，需要暴力删除')
    var newElm = createElement(newVnode)
    //在标杆之前插入新的dom
    if (oldVnode.elm && newElm) {
      oldVnode.elm.parentNode.insertBefore(newElm, oldVnode.elm)
      //插入之后删除标杆容器dom
      oldVnode.elm.parentNode.removeChild(oldVnode.elm)
    }
  }
}
//将第一次的dom节点转换为虚拟节点
function emptyVnodeAt(elm) {
  const id = elm.id ? '#' + elm.id : ''
  const classes = elm.getAttribute('class')
  const c = classes ? '.' + classes.split(' ').join('.') : ''
  return vnode(elm.tagName.toLowerCase() + id + c, {}, [], undefined, elm)
}
