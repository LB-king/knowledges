import React, { Component } from 'react'
import reactDom from 'react-dom'

//类的写法
/* export default class Hooks extends Component {
  state = {
    count: 0
  }
  myInput = React.createRef()
  show = (e) => {
    if(e.keyCode === 13)
    console.log(this.myInput.current.value)
  }
  add = () => {
    this.setState((state) => ({ count: state.count + 1 }))
  }
  uninstall = () => {
    reactDom.unmountComponentAtNode(document.getElementById('root'))
  }
  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState((state) => ({ count: state.count + 1 }))
    }, 1000)
  }
  //卸载组件
  componentWillUnmount() {
    clearInterval(this.timer)
  }
  render() {
    let { count } = this.state
    return (
      <div>
        <input type="text" ref={this.myInput} onKeyUp={this.show}/>
        当前求和为：{count}
        <button onClick={this.add}>点击 </button>
        <button onClick={this.uninstall}>点击卸载组件 </button>
      </div>
    )
  }
} */

//函数式组件

export default function Hooks() {
  // 26行代码做了处理，不会因为多次调用而执行这个代码
  const [count, setCount] = React.useState(0)
  const [name, setName] = React.useState('TOM')

  const myRef = React.useRef()
  function add() {
    //setCount(count + 1)//第一种写法
    setCount((count) => count + 1)
  }
  function show(e) {
    if(e.keyCode === 13)
    console.log(myRef.current.value)
  }
  function changeName() {
    setName((name) => name + 'xxx')
  }

  function uninstall() {
    reactDom.unmountComponentAtNode(document.getElementById('root'))
  }

  //不加第二个参数就检测所有人的变化，[]谁都不检测,[name]只检测name
  React.useEffect(() => {
    let timer = setInterval(() => {
      setCount((count) => count + 1)
    }, 1000)
    //返回的回调相当于componentWillUnmount
    return () => {
      clearInterval(timer)
    }
  }, [])
  /*  React.useEffect(() => {
    console.log('@')
  },[name,count]) */

  //进来就自增
  return (
    <div>
    <input type="text" ref={myRef} onKeyUp={show}/>
      当前求和为：{count},名字是{name}
      <button onClick={add}>点击+1 </button>
      <button onClick={changeName}>点击换名字 </button>
      <button onClick={uninstall}>卸载组件</button>
    </div>
  )
}
