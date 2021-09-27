import React, { Component } from 'react'
export default class Count extends Component {
  /* state = {
    count: 0
  } */
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
