import { Component } from 'react' //分别暴露
import { Menu, Layout } from 'antd'
import { NavLink, Route } from 'react-router-dom'
import State from './components/01_setState'
import LazyLoad from './components/02_lazyLoad'
import './App.css'
const { Header, Content } = Layout

const menus = ['setState', 'lazyLoad']
//创建并暴露App
export default class App extends Component {
  render() {
    return (
      <div>
        <Header>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys="0">
            {menus.map((item, index) => {
              return (
                <Menu.Item key={index}>
                  <NavLink to={item}>{item}</NavLink>
                </Menu.Item>
              )
            })}
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}></Content>
      </div>
    )
  }
}
