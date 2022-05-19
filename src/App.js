import './App.css'

import Docs from './components/docs'
import EditDoc from './components/editDoc'

import { Routes, Route } from 'react-router-dom'
import { app, database } from './firebaseConfig'


function App() {
  return (
    <Routes>
      <Route path="/" element={<Docs database={database} />}></Route>
      <Route path="/editDoc/:id" element={<EditDoc database={database} />}></Route>
    </Routes>
  )
}

export default App
