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
    //1.新前与旧前
    if (isSameNode(oldStartNode, newStartNode)) {
      console.log('1.新前和旧前命中')
      patchVnode(oldStartNode, newStartNode)
      if(newStartNode) newStartNode.elm = oldStartNode?.elm
      oldStartNode = oldCh[++oldStartIdx]
      newStartNode = newCh[++newStartIdx]
      //2.新后与旧后
    } else if (isSameNode(oldEndNode, newEndNode)) {
      console.log('2.新后和旧后命中')
      patchVnode(oldEndNode, newEndNode)
      if(newEndNode) newEndNode.elm = oldEndNode?.elm
      oldEndNode = oldCh[--oldEndIdx]
      newEndNode = newCh[--newEndIdx]
      //3.新后与旧前
    } else if (isSameNode(newEndNode, oldStartNode)) {
      console.log('3.新后和旧前命中')
      patchVnode(oldStartNode, newEndNode)
      if(newEndNode) newEndNode.elm = oldStartNode?.elm
      elm.insertBefore(oldStartNode.elm, oldEndNode.elm.nextSibling)
      oldStartNode = oldCh[++oldStartIdx]
      newEndNode = newCh[--newEndIdx]
      //4.新前与旧后
    }else if(isSameNode(newEndNode, oldStartNode)) {
      console.log('4.新前与旧后命中')
      
      //5.以上不满足
    }else {

    }
  }
}
