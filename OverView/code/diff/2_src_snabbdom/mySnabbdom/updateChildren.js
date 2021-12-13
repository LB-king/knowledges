import createElement from './creatElement'
import patchVnode from './patchVnode'
//是否是相同节点
function isSameNode(oldNode, newNode) {
  return oldNode.key === newNode.key && oldNode.sel === newNode.sel
}
export default function updateChildren(elm, oldCh, newCh) {
  console.log('新老节点都有子节点，开始DIFF核心算法')
  //旧前
  let oldStartIdx = 0
  //新前
  let newStartIdx = 0
  //旧后
  let oldEndIdx = oldCh.length - 1
  //新后
  let newEndIdx = newCh.length - 1
  //旧前节点
  let oldStartNode = oldCh[0]
  //新前节点
  let newStartNode = newCh[0]
  //旧后节点
  let oldEndNode = oldCh[oldEndIdx]
  //新后节点
  let newEndNode = newCh[newEndIdx]
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (!oldStartNode) {
      oldStartNode = oldCh[++oldStartIdx]
    } else if (!oldEndNode) {
      oldEndNode = oldCh[--oldEndIdx]
    }
    if (isSameNode(oldStartNode, newStartNode)) {
      //1.新前与旧前
      console.log('1.新前和旧前命中')
      patchVnode(oldStartNode, newStartNode)
      if (newStartNode) newStartNode.elm = oldStartNode?.elm
      oldStartNode = oldCh[++oldStartIdx]
      newStartNode = newCh[++newStartIdx]
    } else if (isSameNode(oldEndNode, newEndNode)) {
      //2.新后与旧后
      console.log('2.新后和旧后命中')
      patchVnode(oldEndNode, newEndNode)
      //在后面插入节点有用，不在末尾插入，只在中间插入
      if (newEndNode) newEndNode.elm = oldEndNode?.elm
      oldEndNode = oldCh[--oldEndIdx]
      newEndNode = newCh[--newEndIdx]
    } else if (isSameNode(oldStartNode, newEndNode)) {
      //3.新后与旧前
      console.log('3.新后和旧前命中')
      patchVnode(oldStartNode, newEndNode)
      if (newEndNode) newEndNode.elm = oldStartNode?.elm
      //此时要把新后放到旧后的后面,此时新后===旧前,下面用oldStartNode或
      elm.insertBefore(oldStartNode.elm, oldEndNode.elm.nextSibling)
      oldStartNode = oldCh[++oldStartIdx]
      newEndNode = newCh[--newEndIdx]
    } else if (isSameNode(oldEndNode, newStartNode)) {
      //4.新前与旧后
      console.log('4.新前与旧后命中')
      patchVnode(oldEndNode, newStartNode)
      if (newStartNode) newStartNode.elm = oldEndNode?.elm
      //此时要把新前插入到旧前的前面,此时新前===旧后，下面用oldEndNode
      elm.insertBefore(oldEndNode.elm, oldStartNode.elm)
      oldEndNode = oldCh[--oldEndIdx]
      newStartNode = newCh[++newStartIdx]
    } else {
      //5.以上不满足-触发查询
      console.log('5.以上情况都不满足')
      //新前画到页面，并且在旧节点中查找有没有新前，有的话设置其为undefined
      let keyMap = {}
      for (let i = oldStartIdx; i < oldEndIdx; i++) {
        let key = oldCh[i]?.key
        key && (keyMap[key] = i)
      }
      let idxInOld = keyMap[newStartNode.key]
      //有的话，说明新旧节点都存在，所以只需要移动位置
      if (idxInOld) {
        let moveNode = oldCh[idxInOld]

        patchVnode(moveNode, newStartNode)
        //旧节点中要赋值为undefined
        oldCh[idxInOld] = undefined
        elm.insertBefore(moveNode.elm, oldStartNode.elm)
      } else {
        //没找到则添加
        elm.insertBefore(createElement(newStartNode), oldStartNode.elm)
      }
      //新前指针++
      newStartNode = newCh[++newStartIdx]
    }
  }
  //while循环走完，有新增的节点
  if (newStartIdx <= newEndIdx) {
    console.log('有新的节点')
    let before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].elm
    for (let i = newStartIdx; i <= newEndIdx; i++) {
      elm.insertBefore(createElement(newCh[i]), before)
      // elm.insertBefore(newCh[i].elm, before)
    }
  }
  //while循环走完，删除了部分节点,删除旧节点 start和end之间节点，包含start和end
  if (newStartIdx > newEndIdx) {
    console.log('需要删除节点')
    for (let i = oldStartIdx; i <= oldEndIdx; i++) {
      elm.removeChild(oldCh[i].elm)
    }
  }
}
