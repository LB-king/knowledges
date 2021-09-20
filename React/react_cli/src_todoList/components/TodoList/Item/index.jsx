import React, { Component } from 'react'
import './index.css'
export default class Item extends Component {
  state = {
    mouse: false
  }
  // 鼠标移入移出，需要用回调函数来接收
  handleMouse = (flag) => {
    return () => {
      this.setState({
        mouse: flag
      })
    }
  }
  //删除某一项
  delTodo = (id) => {
    if(!window.confirm('确定删除')) return
    let { delTodo } = this.props
    delTodo(id)
  }
  //checkbox选项卡
  handleCheck = (id) => {
    return (e) => {
      this.props.updateTodos(id, e.target.checked)
    }
  }
  render() {
    let { id, name, selected } = this.props
    return (
      <div
        onMouseEnter={this.handleMouse(true)}
        onMouseLeave={this.handleMouse(false)}
        className="todo_item clearfix"
      >
        <label>
          <input
            type="checkbox"
            checked={selected}
            onChange={this.handleCheck(id)}
          />
          <span>{name}</span>
        </label>
        <button
          className="fr"
          style={{
            display: this.state.mouse ? 'block' : 'none',
            cursor: 'pointer'
          }}
          onClick={() => this.delTodo(id)}
        >
          删除
        </button>
      </div>
    )
  }
}
