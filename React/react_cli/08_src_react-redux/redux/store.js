/* 该文件专门暴露一个store对象 */
//引入createStore，专门用于创建redux中最核心的store对象
import { createStore, applyMiddleware } from 'redux'
//引入为Count组件服务的reducer
import countReducer from './count_reducer'
import thunk from 'redux-thunk'
//暴露store
export default createStore(countReducer, applyMiddleware(thunk))
