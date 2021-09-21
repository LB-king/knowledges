import { Component } from 'react' //分别暴露
import Network from './components/Network'
//创建并暴露App
export default class App extends Component {
  render() {
    return (
      <div>
        <Network /> 
      </div>
    )
  }
}
