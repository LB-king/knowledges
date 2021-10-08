import React, { Component } from 'react'
import { NavLink, Route } from 'react-router-dom'
import Home from './pages/Home'
export default class LazyLoad extends Component {
  render() {
    return (
      <div>
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <div>
          <Route path="/home" component={Home}></Route>
        </div>
      </div>
    )
  }
}
