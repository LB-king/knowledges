import React, { Component } from 'react'
import './index.css'

export default class Parent extends Component {
  state = {
    name: 'TANK',
    hasErr: ''
  }
  //当Parent的子组件报错的时候会触发getDerivedStateFromError
  static getDerivedStateFromError(err) {
    console.log(err)
    return { hasErr: err }
  }
  render() {
    let { name } = this.state
    return (
      <div className="parent">
        <h4>我是Parent组件</h4>
        <h4>我的名字是：{name}</h4>
        {this.state.hasErr ? (
          'net err'
        ) : (
          <A render={(param) => <B param={param} />}></A>
        )}
        {/* <A>KKKKK</A> */}
      </div>
    )
  }
}

class A extends Component {
  state = {
    name: 'TOM',
    hasError: ''
  }

  render() {
    const { name } = this.state
    return (
      <div className="child">
        <h4>我是A组件</h4>
        {this.props.render({ name, age: 18 })}
        {/* {this.props.children} */}
      </div>
    )
  }
}

class B extends Component {
  state = {
    // list: ['111','222','333']
    list: 'abc'
  }
  render() {
    const { name, age } = this.props.param
    return (
      <div className="grand">
        <h4>我是B组件</h4>
        <h4>
          来自A组件的名字是{name},年龄是{age}
        </h4>
        <h3>{this.state.list.map((i) => i)}</h3>
      </div>
    )
  }
}
