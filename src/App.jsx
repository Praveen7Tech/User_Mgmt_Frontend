import React from 'react'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import ProtectedRoute from './context/ProtectedRoute'
import PublicRoute from './context/PublicRoute'

function App() {
  return (
    <>
      <Routes>
        <Route path="/"
         element={
          <PublicRoute>
             <Register/>
         </PublicRoute>
        }
         />
         <Route path="/Home" 
         element={
          <ProtectedRoute>
              <Home/>
         </ProtectedRoute>
        }
         />
      </Routes>
    </>
  )
}

export default App
