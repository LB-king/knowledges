import React, { Component } from 'react'
import { Route, NavLink } from 'react-router-dom'
import Detail from './Detail'
import './Message.css'
export default class Message extends Component {
  state = {
    messageList: [
      { id: '001', title: '消息1' },
      { id: '002', title: '消息2' },
      { id: '003', title: '消息3' }
    ]
  }
  // push或者replace按钮
  handClick = (op, item) => {
    let {history} = this.props
    history[op](`/home/message/detail/${item.id}/${item.title}`)
  }
  //回退、前进按钮
  handleBtn = (op) => {
    let {history} = this.props
    history[op]()
  }
  render() {
    let { messageList } = this.state
    return (
      <div>
        <h3>Message的内容</h3>
        <ul>
          {messageList.map((item) => {
            return (
              <li key={item.id} style={{ marginBottom: '6px' }}>
                {/* 1.向路由组件传递params参数 */}
                <NavLink to={`/home/message/detail/${item.id}/${item.title}`}>
                  {item.title}
                </NavLink>
                <span className="btn" onClick={() => this.handClick('push', item)}>push查看</span>
                <span className="btn" onClick={() => this.handClick('replace', item)}>replace查看</span>
                {/* 2.向路由组件传递search参数 */}
                {/*  <NavLink to=`/home/message/detail/?id=${item.id}&title=${item.title}`>
                  {item.title}
                </NavLink> */}
                {/* 3.向路由组件传递state参数 */}
                {/*  <NavLink
                  to={{
                    pathname: '/home/message/detail',
                    state: { id: item.id, title: item.title }
                  }}
                >
                  {item.title}
                </NavLink> */}
              </li>
            )
          })}
        </ul>

        {/* 1.声明接收params参数 */}
        <Route path="/home/message/detail/:id/:title" component={Detail} />
        {/* 2.声明接收search参数,什么都不用传 */}
        {/* <Route path="/home/message/detail /> */}
        {/* 3.声明接收state参数,什么都不用传 */}
        {/* <Route path="/home/message/detail" component={Detail} /> */}
        <button onClick={() => this.handleBtn('goBack')}>回退</button>
        <button onClick={() => this.handleBtn('goForward')}>前进</button>
      </div>
    )
  }
}
