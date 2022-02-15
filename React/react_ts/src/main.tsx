import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(
  //进行 strict mode 检查
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
