import './App.css'

import Docs from './components/docs'

import { app, database } from './firebaseConfig'

function App() {
  return (
    <div className="App">
      <Docs database={database} />
    </div>
  )
}

export default App
