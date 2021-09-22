import { Component } from 'react' //分别暴露
import { Link, BrowserRouter } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
//创建并暴露App
export default class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Link className="item" to="about">About</Link> | 
          <Link className="item" to="home">Home</Link>
        </BrowserRouter>
      </div>
    )
  }
}
