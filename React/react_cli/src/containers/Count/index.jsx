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

// 使用connect()()创建并暴露一个Count的容器组件
export default connect(
  (state) => ({ count: state }),
  //一般写法
  /*  (dispatch) => ({
    increase: (num) => dispatch(increaseAction(num)),
    decrease: (num) => dispatch(decreaseAction(num)),
    increaseAsync: (num, time) => dispatch(increaseActionAsync(num, time))
  }) */
  //精简写法，API层面的优化
  {
    increase: increaseAction,
    decrease: decreaseAction,
    increaseAsync: increaseActionAsync
  }
 
)(CountUI)



