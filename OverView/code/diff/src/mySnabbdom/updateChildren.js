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
    if (isSameNode(oldStartNode, newStartNode)) {
      //1.新前与旧前
      console.log('1.新前和旧前命中')
      patchVnode(oldStartNode, newStartNode)
      // if(newStartNode) newStartNode.elm = oldStartNode?.elm
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
      //此时要把新后放到旧后的后面,此时新后===旧前,下面用oldStartNode或
      elm.insertBefore(oldStartNode.elm, oldEndNode.elm.nextSibling)
      oldStartNode = oldCh[++oldStartIdx]
      newEndNode = newCh[--newEndIdx]
    } else if (isSameNode(oldEndNode, newStartNode)) {
      //4.新前与旧后
      console.log('4.新前与旧后命中')
      patchVnode(oldEndNode, newStartNode)
      //此时要把新前插入到旧前的前面,此时新前===旧后，下面用oldEndNode
      elm.insertBefore(oldEndNode.elm, oldStartNode.elm)
      oldEndNode = oldCh[--oldEndIdx]
      newStartNode = newCh[++newStartIdx]
    } else {
      //5.以上不满足
      console.log('5.以上情况都不满足')
    }
  }
  //while循环走完，有新增的节点
  if (newStartIdx <= newEndIdx) {
    console.log('有新的节点')
    // let before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].elm
    // for (let i = newStartIdx; i <= newEndIdx; i++) {
    //   elm.insertBefore(newCh[i].elm, before)
    // }
  }
}
