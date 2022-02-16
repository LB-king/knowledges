import { nanoid } from 'nanoid'
import { useState } from 'react'
import Header from './Header'
import Main from './Main'
import Foot from './Foot'
import './index.css'

export default function Todos() {
  interface ITodo {
    id: string
    name: string
  }
  let [todos, setTodos] = useState<Array<ITodo>>([])
  function addTodo(todo: string) {
    let newTodo = {
      id: nanoid(),
      name: todo
    }
    setTodos([newTodo, ...todos])
  }
  return (
    <div className="todos-main">
      <Header addTodo={addTodo}></Header>
      <Main todos={todos}></Main>
      <Foot></Foot>
    </div>
  )
}
