import React, { Component } from 'react'
import PubSub from 'pubsub-js'

export default class Search extends Component {
  search = (event) => {
    // 获取用户输入的值
    let {
      inputValue: { value }
    } = this
    // 发送网络请求
    if (!value) return
    PubSub.publish('list-change', value)
  }

  render() {
    return (
      <div>
        <input
          type="text"
          ref={(event) => {
            this.inputValue = event
          }}
        />
        <button onClick={this.search}>查询</button>
      </div>
    )
  }
}
