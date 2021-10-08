/* 
1.该文件是用于创建一个为Count组件服务的reducer，reducer的本质就是一个函数
2.reducer函数会接收2个参数，分别是：之前的状态(preState),动作对象(action)
*/
import { ADD_PERSON } from '../constant'
let initState = [{name:'JAKE',age:18}]
export default function personReducer(preState = initState, action) {
  let { type, data } = action
  switch (type) {
    case ADD_PERSON:
      return [...preState, data]
    default:
      return preState
  }
}
