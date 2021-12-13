//把新的vnode替换掉原来的节点,相当于在pivot前面插入新的dom，然后再把pivot移除掉
export default function createElement(vnode) {
  //此处的sel只考虑简单的状态 a , a#idA.claasA
  var node = document.createElement(vnode.sel)
  if (
    vnode.text !== '' &&
    (vnode.children === undefined || vnode.length === 0)
  ) {
    //内部是文字
    // console.log('UI_LOG', '孤儿节点上树', vnode)
    node.innerText = vnode.text

    var props = (vnode.data && vnode.data.props) || {}
    for (let i in props) {
      node.setAttribute(i, props[i])
    }
  } else if (Array.isArray(vnode.children) && vnode.children.length > 0) {
    //子节点是数组就需要递归
    var children = vnode.children
    for (let i = 0; i < children.length; i++) {
      let ch = children[i]
      let chDom = createElement(ch)
      node.appendChild(chDom)
    }
  }
  vnode.elm = node
  return node
}
