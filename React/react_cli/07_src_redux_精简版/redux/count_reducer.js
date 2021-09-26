/* 
1.该文件是用于创建一个为Count组件服务的reducer，reducer的本质就是一个函数
2.reducer函数会接收2个参数，分别是：之前的状态(preState),动作对象(action)


*/

export default function countReducer(preState = 0, action) {
  console.log('action', action)
  let { type, data } = action
  switch (type) {
    case 'increaseNum':
      return preState + data
    case 'decreaseNum':
      return preState - data
    default:
      return preState
  }
}
