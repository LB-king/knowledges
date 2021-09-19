import { Component } from 'react' //分别暴露
import Hello from './components/Hello'

//创建并暴露App
export default class App extends Component {
  render() {
    return (
      <div>
        <Hello />
      </div>
    )
  }
}
