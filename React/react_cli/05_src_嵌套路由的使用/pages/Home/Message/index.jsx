import React, { Component } from 'react'
import MyNavLink from '../../../components/MyNavLink'
import {Route,Switch} from 'react-router-dom'
import Detail from './Detail'
export default class Message extends Component {
  render() {
    return (
      <div>
        <h3>Message的内容</h3>
        <MyNavLink to="/home/message/detail">消息详细信息</MyNavLink>
        <Switch>
          <Route path="/home/message/detail" component={Detail}/>
        </Switch>
      </div>
    )
  }
}
