import React, { Component } from 'react'
import store from '../../redux/store'
import { increaseAction, decreaseAction, increaseActionAsync } from '../../redux/count_action'
export default class Count extends Component {
  /* state = {
    count: 0
  } */
  // 增加
  increaseNum = () => {
    let { value } = this.selectValue
    store.dispatch(increaseAction(+value))
    //状态改变了，页面没更新
    //所以在组件挂载的时候要去监听store中状态的改变
  }
  //减法
  decreaseNum = () => {
    let { value } = this.selectValue
    // let { count } = this.state
    // this.setState({
    //   count: count - +value
    // })
    store.dispatch(decreaseAction(+value))
  }
  //奇数才相加
  increaseNumIfOdd = () => {
    let { value } = this.selectValue
    let count = store.getState()
    if (count % 2 !== 0) {
      store.dispatch(increaseAction(+value))
    }
  }
  //异步加
  increaseNumAsync = () => {
    let { value } = this.selectValue

    setTimeout(() => {
      store.dispatch(increaseActionAsync(+value, 500))
    }, 500)
   /*  setTimeout(() => {
      store.dispatch(increaseAction(+value))
    }, 500) */
  }
  //触发组件更新
  /*   componentDidMount() {
    store.subscribe(() => {
      this.setState({})
    })
  } */
  render() {
    // let { count } = this.state
    return (
      <div>
        <h2>当前求和为：{store.getState()}</h2>
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
