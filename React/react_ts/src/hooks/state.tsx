import React, { Component, useState } from 'react'
interface stateApi {
  name: string
  price: number
}
//类式组件
// class State extends Component {
//   state: stateApi = {
//     name: '犀牛',
//     price: 222
//   }
//   changePrice = () => {
//     let {price} = this.state
//     this.setState({
//       price: ++price
//     })
//   }
//   render() {
//     const { name, price } = this.state
//     return (
//       <div>
//         <p>名字: {name}</p>
//         <p>价格: {price}</p>
//         <button onClick={this.changePrice}>改变价格</button>
//       </div>
//     )
//   }
// }
function State() {
  //不推荐这样写，应该拆开写name
  // let [state, setMsg] = useState({
  //   name:'犀牛',
  //   price: 8
  // })
  // let {name, price} = state
  let [name, setName] = useState('犀牛')
  let [price, setPrice] = useState(222)
  function changePrice() {
    setPrice(++price)
  }
  return (
    <div>
      <p>名字: {name}</p>
      <p>价格: {price}</p>
      <button onClick={changePrice}>改变价格</button>
    </div>
  )
}
export default State
