import React from 'react'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'

function App() {
  return (
    <>
      <Routes>
        <Route path="/"
         element={<Login/>}
         />
         <Route path="/Register"
         element={<Register/>}
         />
         <Route path="/Home" 
         element={<Home/>}
         />
      </Routes>
    </>
  )
}

export default App
