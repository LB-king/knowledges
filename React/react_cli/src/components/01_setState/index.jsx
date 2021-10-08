import React, { Component } from 'react'
import { Button } from 'antd'
export default class State extends Component {
  state = {
    count: 0
  }
  add = () => {
    /* 1.对象式的 */
    /*  this.setState(
      {
        count: this.state.count + 1
      },
      () => {
        console.log(this.state.count)
      }
    ) */
    /* 2.函数式的 */
    this.setState((state, props) => {
      console.log(state, props)
      return {
        count: state.count + 1
      }
    })
  }
  render() {
    const { count } = this.state
    return (
      <div>
        <h3>当前数值为：{count}</h3>
        <Button type="primary" onClick={this.add}>
          按钮+1
        </Button>
      </div>
    )
  }
}
