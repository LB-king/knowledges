import React, { Component, lazy, Suspense } from 'react'
import { NavLink, Route } from 'react-router-dom'
// import Home from './pages/Home'
// import About from './pages/About'
let Home = lazy(() => import('./pages/Home'))
let About = lazy(() => import('./pages/About'))
export default class LazyLoad extends Component {
  render() {
    return (
      <div>
        <NavLink to="/LazyLoad/home">Home</NavLink>
        <NavLink to="/LazyLoad/about">About</NavLink>
        <div>
          <Suspense fallback={<h3>loading......</h3>}>
            <Route path="/LazyLoad/home" component={Home}></Route>
            <Route path="/LazyLoad/about" component={About}></Route>
          </Suspense>
        </div>
      </div>
    )
  }
}
