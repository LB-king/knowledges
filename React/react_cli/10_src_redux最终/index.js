import reactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'
import App from './App'
reactDOM.render(
  <BrowserRouter>
  {/* Provider的目的是让App所有的后代容器组件都能接收到store */}
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
)
