/* 容器组件 */
//引入Count的UI组件
import CountUI from '../../components/Count'
import {
  increaseAction,
  decreaseAction,
  increaseActionAsync
} from '../../redux/count_action'
// 引入connect用于连接UI组件和react-redux
import { connect } from 'react-redux'

/* 
  1.mapStateToProps函数返回的是一个对象
  2.返回的对象中的key就作为传递给UI组件props的key，value就作为传递给UI组件props的value
  3.mapStateToProps用于传递状态
*/
function mapStateToProps(state) {
  return { count: state }
}
/* 
  1.mapDispatchToProps函数返回的是一个对象
  2.返回的对象中的key就作为传递给UI组件props的key，value就作为传递给UI组件props的value
  3.mapDispatchToProps用于传递操作状态的方法
*/
function mapDispatchToProps(dispatch) {
  return {
    increase: (num) => dispatch(increaseAction(num)),
    decrease: (num) => dispatch(decreaseAction(num)),
    increaseAsync: (num, time) => dispatch(increaseActionAsync(num, time))
  }
}
// 使用connect()()创建并暴露一个Count的容器组件
export default connect(mapStateToProps, mapDispatchToProps)(CountUI)
