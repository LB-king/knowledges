/* 该文件专门暴露一个store对象 */
//引入createStore，专门用于创建redux中最核心的store对象
import { createStore, applyMiddleware } from 'redux'

import thunk from 'redux-thunk'
//引入redux-devtools-extension
import { composeWithDevTools } from 'redux-devtools-extension'

import allReducer from './reducers'

//暴露store  applyMiddleware(thunk)
export default createStore(
  allReducer,
  composeWithDevTools(applyMiddleware(thunk))
)
