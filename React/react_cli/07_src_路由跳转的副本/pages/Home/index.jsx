import React, { Component } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import MyNavLink from '../../components/MyNavLink'
import Message from './Message'
import News from './News'
class Home extends Component {
  render() {
    return (
      <div>
        <h3>Home页面的内容</h3>
        <MyNavLink to="/home/news">news</MyNavLink>
        <MyNavLink to="/home/message">message</MyNavLink>
        <div>
          <Switch>
            <Route path="/home/message" component={Message} />
            <Route path="/home/news" component={News} />
            <Redirect to="/home/news" />
          </Switch>
        </div>
      </div>
    )
  }
}

export default Home
