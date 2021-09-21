import React, { Component } from 'react'
import Item from '../Item'
export default class Main extends Component {
  delTodo = (id) => {
    console.log('来自Item的data', id)
    let { delTodo } = this.props
    delTodo(id)
  }

  render() {
    let { todos, updateTodos } = this.props
    return (
      <div>
        {todos.map((todo) => {
          return (
            <Item
              {...todo}
              key={todo.id}
              delTodo={this.delTodo}
              updateTodos={updateTodos}
            />
          )
        })}
      </div>
    )
  }
}
