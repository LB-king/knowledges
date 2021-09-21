import React, { Component } from 'react'

export default class Result extends Component {
  //全选和取消全选
  handleChange = (e) => {
    this.props.checkAll(e.target.checked)
    this.setState({
      checked: e.target.checked
    })
  }
  render() {
    let { todos } = this.props

    console.log(todos)
    let total = todos.length
    // let len = todos.filter(todo => todo.selected).length
    let doneLen = todos.reduce((acc, cur) => acc + (cur.selected ? 1 : 0), 0)
    return (
      <div>
        <input
          type="checkbox"
          checked={total === doneLen}
          onChange={this.handleChange}
        />
        一共{total}条，选中{doneLen}条
      </div>
    )
  }
}
