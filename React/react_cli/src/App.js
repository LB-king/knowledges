import { Component } from 'react' //分别暴露
import { Menu, Layout } from 'antd'
import { NavLink, Route, Redirect } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import menus from './menu'
import './App.css'
const { Header, Content } = Layout


//创建并暴露App withRouter
class App extends Component {
  state = {
    activeItem: '',
    activeCom: menus[0]['component']
  }
  handleMenu = (item) => {
    // console.log(item)
    this.setState(() => ({ 
      activeItem: item.key,
      activeCom: menus.filter(it => it.name === item.key)[0]['component']
     }))
  }

  componentDidMount() {
    var nav = this.props.location.pathname.replace('/', '')
    this.setState({
      activeItem: nav,
      activeCom: menus.filter(it => it.name === nav)[0]['component']
    })
  }
  render() {
    const { activeItem, activeCom } = this.state

    return (
      <div>
        <Header>
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[activeItem]}
            onSelect={this.handleMenu}
          >
            {menus.map((item) => {
              return (
                <Menu.Item key={item.name}>
                  <NavLink to={item.name}>{item.name}</NavLink>
                </Menu.Item>
              )
            })}
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Route path={`/${activeItem}`} component={activeCom}></Route>
          {/* <Redirect to="/SetState"></Redirect> */}
        </Content>
      </div>
    )
  }
}

export default withRouter(App)
