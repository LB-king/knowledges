import reactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import store from './redux/store'
reactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
)
store.subscribe(() => {
  reactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById('root')
  )
})
