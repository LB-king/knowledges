import createElement from './creatElement'
import updateChildren from './updateChildren'
export default function patchVnode(oldVnode, newVnode) {
  //2.1判断新旧节点是否完全相同
  if (oldVnode === newVnode) return
  //2.1判断newVnode有没有text属性,有的话直接替换oldVnode的内容(包括text和children)
  if (
    newVnode.text &&
    (newVnode.children === undefined || newVnode.children.length === 0)
  ) {
    console.log('UI_LOG', 'newVnode有text属性')
    //有并且新旧不相同
    if (newVnode.text !== oldVnode.text) oldVnode.elm.innerText = newVnode.text
  } else {
    //新节点有children，老节点是文本内容
    // console.log('UI_LOG', 'newVnode没有text属性')
    //判断老节点有没有children,有则新老节点都有children
    if (oldVnode.children && oldVnode.children.length > 0) {
      // console.log('UI_LOG', '新老节点都有children')
      updateChildren(oldVnode.elm, oldVnode.children, newVnode.children)
      /* //1.新增的情况,末尾新增？中间新增？开头新增
      //新增的节点插入到所有未处理的节点之前，而不是所有已处理的节点之后
      //没处理的oldVnode的索引
      let un = 0
      for (let i = 0; i < newVnode.children.length; i++) {
        let newCh = newVnode.children[i]
        let isExist = false
        for (let j = 0; j < oldVnode.children.length; j++) {
          let oldCh = oldVnode.children[j]
          if (newCh.sel === oldCh.sel && newCh.key === oldCh.key) {
            isExist = true
          }
        }
        if (!isExist) {
          let dom = createElement(newCh)
          newCh.elm = dom
          if (un < oldVnode.children.length) {
            oldVnode.elm.insertBefore(dom, oldVnode.children[un].elm)
          } else {
            oldVnode.elm.appendChild(dom)
          }
        } else {
          //顺序改变，情况就非常复杂
          un++
        }
      } */
    } else {
      //老节点没有children，新节点有children
      //1.删除旧的text
      oldVnode.elm.innerText = ''
      //2.让新的children上树
      for (let i = 0; i < newVnode.children.length; i++) {
        var ch = createElement(newVnode.children[i])
        oldVnode.elm.appendChild(ch)
      }
    }
  }
}
