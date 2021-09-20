import { Component } from 'react' //分别暴露
import TodoList from './components/TodoList'


//创建并暴露App
export default class App extends Component {
  render() {
    return (
      <div>
        <TodoList />
      </div>
    )
  }
}
