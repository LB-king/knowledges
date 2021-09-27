import { Component } from 'react' //分别暴露
import { Button } from 'antd'
import Count from './containers/Count'
import './App.css'

//创建并暴露App
export default class App extends Component {
  render() {
    return (
      <div>
        <hr />
        <Button type="primary">按钮</Button>
        <Button>基础按钮</Button>
        <hr />
        <Count />
      </div>
    )
  }
}
