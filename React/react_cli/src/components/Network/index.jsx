import React, { Component } from 'react'
import axios from 'axios'
export default class Network extends Component {
  state = {
    list: []
  }
  getList = () => {
    axios
      .get('http://localhost:3000/api/users')
      .then((res) => {
        console.log('success: ', res.data)
        this.setState({
          list: res.data
        })
      })
      .catch((err) => {
        console.log('fail: ', err)
      })
  }
  render() {
    let { list } = this.state
    return (
      <div>
        <button onClick={this.getList}>点击获取列表</button>
        <ul>
          {list.map((item) => {
            return <li key={item.id}>{item.name}</li>
          })}
        </ul>
      </div>
    )
  }
}
