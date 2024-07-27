import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/Home'
import LoginPage from './pages/Login'
import RegisterPage from './pages/register'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes >
      <Route path='' index element={<HomePage/>} />
      <Route path='/login' element={<LoginPage/> } />
      <Route path="/register" element={<RegisterPage/> } />
      
    </Routes>
  )
}

export default App
