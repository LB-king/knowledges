import { Component, createContext } from 'react'



let { Provider, Consumer } = createContext()
interface IProps {
  info: string
}
class Child extends Component {
  render() {
    return (
      <Consumer>
        {(context) => {
          return <h4>这是child组件，祖父组件的信息是：{context.info}</h4>
        }}
      </Consumer>
    )
  }
}
class Parent extends Component {
  render() {
    return <Child></Child>
  }
}

class Context extends Component {
  render() {
    return (
      <div>
        <Provider value={{ info: '这是祖父组件的信息' }}>
          <Parent></Parent>
        </Provider>
      </div>
    )
  }
}
export default Context
