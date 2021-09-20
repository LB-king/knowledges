import React, { Component } from 'react'
import Input from './Input'
import Main from './Main'
import Result from './Result'
import './index.css'

export default class TodoList extends Component {
  state = {
    todos: [
      { id: '001', name: '打球', selected: true },
      { id: '002', name: '喝酒', selected: false },
      { id: '003', name: '睡觉', selected: true }
    ]
  }
  //获取input框数据
  addTodo = (todoObj) => {
    console.log('来自input的data', todoObj)
    let { todos } = this.state

    //前方追加，并且更新状态
    this.setState({
      todos: [todoObj, ...todos]
    })
  }
  //del
  delTodo = (id) => {
    console.log('来自Main的：', id)
    let nTodos = this.state.todos.filter((todo) => {
      return todo.id !== id
    })
    this.setState({
      todos: nTodos
    })
  }
  //更新tudos
  updateTodos = (id, selected) => {
    console.log(id, selected)
    let nTodos = this.state.todos.map((todo) => {
      if (id === todo.id) return { ...todo, selected }
      return todo
    })
    this.setState({
      todos: nTodos
    })
  }
  // checkAll
  checkAll = (checked) => {
    console.log(checked);
    let nTodos = this.state.todos.map((todo) => {
      return { ...todo, selected: checked }
    })
    this.setState({
      todos: nTodos
    })
  }
  render() {
    let { todos } = this.state
    return (
      <div className="main_container">
        <Input addTodo={this.addTodo} />
        <Main
          todos={todos}
          delTodo={this.delTodo}
          updateTodos={this.updateTodos}
        />
        <Result todos={todos} checkAll={this.checkAll} />
      </div>
    )
  }
}
