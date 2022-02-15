import { useState } from 'react'
import Header from './Header'
import Main from './Main'
import Foot from './Foot'
import './index.css'
export default function Todos() {
  let [todos, setTodos] = useState([])
  function addTodo(todo: object) {
    let newTodo: Array<object> = [...todos, todo]
    setTodos(newTodo)
  }
  return (
    <div className="todos-main">
      <Header addTodo={addTodo}></Header>
      <Main todos={todos}></Main>
      <Foot></Foot>
    </div>
  )
}
