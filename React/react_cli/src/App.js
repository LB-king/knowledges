import { Component } from 'react' //分别暴露
import { NavLink, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Title from './components/Title'
//创建并暴露App
export default class App extends Component {
  render() {
    return (
      <div>
        <Title />
        {/* 编写路由链接 */}
        <NavLink className="item" to="about">
          About
        </NavLink>
        |
        <NavLink className="item" to="home">
          Home
        </NavLink>
        <Route path="/about" component={About} />
        <Route path="/home" component={Home} />
        {/* 注册路由 */}
      </div>
    )
  }
}
