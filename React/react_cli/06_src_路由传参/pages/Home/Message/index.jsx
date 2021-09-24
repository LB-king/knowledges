import React, { Component } from 'react'
import { Route, NavLink } from 'react-router-dom'
import Detail from './Detail'
export default class Message extends Component {
  state = {
    messageList: [
      { id: '001', title: '消息1' },
      { id: '002', title: '消息2222' },
      { id: '003', title: '消息3' }
    ]
  }
  render() {
    let { messageList } = this.state
    return (
      <div>
        <h3>Message的内容</h3>
        <ul>
          {messageList.map((item) => {
            return (
              <li key={item.id}>
                {/* 1.向路由组件传递params参数 */}
                {/*  <NavLink to={`/home/message/detail/${item.id}/${item.title}`}>
                  {item.title}
                </NavLink> */}

                {/* 2.向路由组件传递search参数 */}
                 {/*  <NavLink to=`/home/message/detail/?id=${item.id}&title=${item.title}`>
                  {item.title}
                </NavLink> */}
                {/* 3.向路由组件传递state参数 */}
                <NavLink
                  to={{
                    pathname: '/home/message/detail',
                    state: { id: item.id, title: item.title }
                  }}
                >
                  {item.title}
                </NavLink>
              </li>
            )
          })}
        </ul>

        {/* 1.声明接收params参数 */}
        {/* <Route path="/home/message/detail/:id/:title" component={Detail} /> */}
        {/* 2.声明接收search参数,什么都不用传 */}
        {/* <Route path="/home/message/detail /> */}
        {/* 3.声明接收state参数,什么都不用传 */}
        <Route path="/home/message/detail" component={Detail} />
      </div>
    )
  }
}
