import { Component } from 'react' //分别暴露
import { Route, Redirect } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Title from './components/Title'
import MyNavLink from './components/MyNavLink'
import './App.css'
//创建并暴露App
export default class App extends Component {
  render() {
    return (
      <div>
        <Title />
        <div>
          <MyNavLink to="/about">About</MyNavLink>
          <MyNavLink to="/home">Home</MyNavLink>
        </div>
        <div className="routerMain">
          <Route path="/about" component={About} />
          <Route path="/home" component={Home} />
          <Redirect to="home" />
        </div>

        {/* 注册路由 */}
      </div>
    )
  }
}
