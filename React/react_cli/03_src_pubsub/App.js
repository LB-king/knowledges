import { Component } from 'react' //分别暴露
import Search from './components/Search'
import List from './components/List'
import './App.css'
//创建并暴露App
export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Search />
        <List />
      </div>
    )
  }
}
