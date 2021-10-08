/* 该文件专门暴露一个store对象 */
//引入createStore，专门用于创建redux中最核心的store对象
import { createStore, applyMiddleware, combineReducers } from 'redux'
//引入为Count组件服务的reducer
import countReducer from './reducers/count'
import personReducer from './reducers/person'
import thunk from 'redux-thunk'
// 汇总reducer
const allReducer = combineReducers({
  count: countReducer,
  persons: personReducer
})
//暴露store
export default createStore(allReducer, applyMiddleware(thunk))
