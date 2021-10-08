/* 该文件专门为Count组件生成action对象 */
import { INCREASE, DECREASE } from '../constant'
export const increaseAction = (data) => ({ type: INCREASE, data })
export const decreaseAction = (data) => ({ type: DECREASE, data })
//异步action，就是指action的值为函数，异步action中一般会调用同步action
export const increaseActionAsync = (data, time) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(increaseAction(data))
    }, time)
  }
}
