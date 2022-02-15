import Head from './components/Head'
import {Link} from 'react-router-dom'
// import State  from './hooks/state'
// import Effect  from './hooks/effect'
// import Ref  from './hooks/ref_1'
import Todos from './Todos'
function App() {
  return (
    <div className="App">
      {/* <Head></Head> */}
      {/* <Effect></Effect> */}
      {/* <Ref></Ref> */}
      <Todos></Todos>
    </div>
  )
}

export default App
