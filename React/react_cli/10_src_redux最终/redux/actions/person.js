/* 该文件专门为Count组件生成action对象 */
import { ADD_PERSON } from '../constant'
export const addPerson = (data) => ({ type: ADD_PERSON, data })
//异步action，就是指action的值为函数，异步action中一般会调用同步action

