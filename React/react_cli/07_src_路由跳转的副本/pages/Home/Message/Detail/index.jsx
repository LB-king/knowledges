import React, { Component } from 'react'
// import qs from 'querystring'
/* var obj = { name: 'kobe', age: 34 }
console.log(qs.stringify(obj)) //name=kobe&age=34
var str = 'name=kobe&age=34'
console.log(qs.parse(str)) //{name: "kobe", age: "34"} */
const contents = [
  { id: '001', content: '你好，我是001' },
  { id: '002', content: '你好，我是002' },
  { id: '003', content: '你好，我是003' }
]
export default class Detail extends Component {
  render() {
    console.log(this.props)
    // 1.接收params参数
    let { id, title } = this.props.match.params
    // 2.接收search参数
    // let { id, title } = qs.parse(this.props.location.search.slice(1))
    // 3.接收state参数
    // let { id, title } = this.props.location.state || {}
    let content = contents.find((c) => c.id === id) || ''
    return (
      <ul>
        <li>ID:{id}</li>
        <li>TITLE:{title}</li>
        <li>CONTENT:{content.content}</li>
      </ul>
    )
  }
}
