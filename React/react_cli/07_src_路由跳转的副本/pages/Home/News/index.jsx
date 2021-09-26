import React, { Component } from 'react'

export default class News extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.history.push('/home/message')
    }, 3000)
  }
  render() {
    return (
      <div>
        News
      </div>
    )
  }
}
