import React, { Component } from 'react'
import './index.css'

const MyContext = React.createContext()
let { Provider, Consumer } = MyContext
export default class A extends Component {
  state = {
    name: 'TANK'
  }
  render() {
    let { name } = this.state
    return (
      <div className="parent">
        <h4>我是A组件</h4>
        <h4>我的名字是：{name}</h4>
        <Provider value={{ name, age: 18 }}>
          <B />
        </Provider>
      </div>
    )
  }
}

class B extends Component {
  render() {
    return (
      <div className="child">
        <h4>我是B组件</h4>
        <C />
      </div>
    )
  }
}
//类式组件
/* class C extends Component {
  static contextType = MyContext
  render() {
    console.log('C', this.context)
    let { name, age } = this.context
    return (
      <div className="grand">
        <h4>我是C组件</h4>
        <h4>
          我从A组件接收的名字是：{name}, 年龄是:{age}
        </h4>
      </div>
    )
  }
} */
class C extends Component {
  render() {
    return (
      <div className="grand">
        <h4>我是C组件</h4>
        <h4>
          我从A组件接收的名字是：
          <Consumer>
            {({name,age}) => `${name},年龄是：${age}`}
          </Consumer>
        </h4>
      </div>
    )
  }
}

//函数式组件
// function C() {
//   return (
//     <div className="grand">
//       <h4>我是C组件</h4>
//       <h4>
//         我从A组件接收的名字是：
//         <Consumer>
//           {({ name, age }) => {
//             return `${name}, 年龄是:${age}`
//           }}
//         </Consumer>
//       </h4>
//     </div>
//   )
// }
