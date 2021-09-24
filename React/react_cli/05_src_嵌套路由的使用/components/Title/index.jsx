import React, { Component } from 'react'

export default class Title extends Component {
  render() {
    console.log('Title中的props',this.props)
    return <h3>React Title</h3>
  }
}
