import React, { PureComponent } from 'react'

//PureComponent 浅对比
export default class Optimize extends PureComponent {
  state = {
    name: 'TOM'
  }
  change = () => {
    this.setState({
      name: 'JERRY'
    })
    // this.setState({})
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log(this.props, this.state)
  //   console.log(nextProps, nextState)
  //   return !this.state.name === nextState.name
  // }
  render() {
    console.log('parent---render')
    const { name } = this.state
    return (
      <div>
        我是父组件,名字是{name}
        <button onClick={this.change}>点击改变名字</button>
        {/* <Child name={name} /> */}
        <Child />
      </div>
    )
  }
}

class Child extends PureComponent {
  // shouldComponentUpdate(nextProps) {
  //   return !this.props.name === nextProps.name
  // }
  render() {
    console.log('child---render')

    return (
      <div>
        <h3>我是child组件</h3>
        {/* <h3>父组件的名字是{this.props.name}</h3> */}
      </div>
    )
  }
}
