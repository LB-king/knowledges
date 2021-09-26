import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class Title extends Component {
  //回退、前进按钮
  handleBtn = (op) => {
    let { history } = this.props
    history[op]()
  }
  render() {
    console.log('Title中的props', this.props)
    return (
      <div>
        <h3>React Title</h3>
        <button onClick={() => this.handleBtn('goBack')}>回退</button>
        <button onClick={() => this.handleBtn('goForward')}>前进</button>
      </div>
    )
  }
}

export default withRouter(Title)
