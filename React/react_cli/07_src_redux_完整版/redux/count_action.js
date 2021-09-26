/* 该文件专门为Count组件生成action对象 */
import { INCREASE, DECREASE } from './constant'
export const increaseAction = (data) => ({ type: INCREASE, data })
export const decreaseAction = (data) => ({ type: DECREASE, data })
