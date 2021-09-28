/* 容器组件 */
import React, { Component } from 'react'
// 引入connect用于连接UI组件和react-redux
import { connect } from 'react-redux'
import {
  increaseAction,
  decreaseAction,
  increaseActionAsync
} from '../../redux/actions/count'

//定义Count的UI组件
class CountUI extends Component {
  // 增加
  increaseNum = () => {
    let { value } = this.selectValue
    this.props.increase(+value)
  }
  //减法
  decreaseNum = () => {
    let { value } = this.selectValue
    this.props.decrease(+value)
  }
  //奇数才相加
  increaseNumIfOdd = () => {
    let { value } = this.selectValue
    let { count } = this.props
    if (count % 2 !== 0) {
      this.props.increase(+value)
    }
  }
  //异步加
  increaseNumAsync = () => {
    let { value } = this.selectValue
    this.props.increaseAsync(+value, 500)
  }

  render() {
    let { count } = this.props
    return (
      <div>
        <h2>当前求和为：{count}</h2>
        <select ref={(e) => (this.selectValue = e)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        &nbsp;
        <button onClick={this.increaseNum}>+</button>&nbsp;
        <button onClick={this.decreaseNum}>-</button>&nbsp;
        <button onClick={this.increaseNumIfOdd}>和为奇数的时候+</button>&nbsp;
        <button onClick={this.increaseNumAsync}>异步+</button>
      </div>
    )
  }
}

// 使用connect()()创建并暴露一个Count的容器组件
export default connect(
  (state) => ({ count: state.count }),
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
