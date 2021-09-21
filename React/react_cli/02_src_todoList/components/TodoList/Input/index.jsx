import React, { Component } from 'react'
import { nanoid } from 'nanoid'
import PropTypes from 'prop-types'
export default class Input extends Component {
  static propTypes = {
    addTodo: PropTypes.func.isRequired
  }
  hanldeKeyUp = (event) => {
    //获取输入框的值
    let { target, keyCode } = event
    let { addTodo } = this.props
    if (keyCode !== 13 || !target.value.trim()) return
    //直接追加一个对象
    let todoObj = {
      id: nanoid(),
      name: target.value,
      selected: false
    }
    addTodo(todoObj)
    //追加完毕，清空输入框
    target.value = ''
  }
  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="请输入内容，按回车键添加"
          onKeyUp={this.hanldeKeyUp}
        />
      </div>
    )
  }
}
