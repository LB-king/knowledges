import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import axios from 'axios'
export default class List extends Component {
  state = {
    list: [],
    isLoading: false
  }
  componentDidMount() {
    PubSub.subscribe('list-change', (_, data) => {
      console.log('来自list-change的订阅消息', data)
      this.getList(data)
    })
  }
  componentWillUnmount() {
    PubSub.unsubscribe('list-change')
  }
  getList = (val) => {
    this.setState({
      isLoading: true
    })
    //开始请求
    axios
      .get(`https://api.github.com/search/users?q=${val}`)
      .then((res) => {
        this.setState({
          list: res.data.items
        })
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        this.setState({
          isLoading: false
        })
      })
  }
  render() {
    let { list, isLoading } = this.state
    return (
      <div>
        {isLoading ? (
          <h3>加载中......</h3>
        ) : (
          list.map((item) => {
            return <h4 key={item.id}>{item.login}</h4>
          })
        )}
      </div>
    )
  }
}
