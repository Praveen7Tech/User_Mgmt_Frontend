import React from 'react'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import ProtectedRoute from './context/ProtectedRoute'
import PublicRoute from './context/PublicRoute'
import UserProfile from './pages/UserProfile'
import AdminLogin from './pages/AdminLogin'
import DashBoard from './pages/DashBoard'
import ShowProfileCard from './components/ShowpROFILEcARD.JSX'

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
         <Route path="/userProfile" 
         element={
          <ProtectedRoute>
            <UserProfile/>
          </ProtectedRoute>
         }
         />
         <Route path="/adminLogin"
         element={
          <PublicRoute>
            <AdminLogin/>
         </PublicRoute>
        } 
         />
         <Route path="/dashboard"
         element={
          <ProtectedRoute>
           <DashBoard/>
          </ProtectedRoute>
         }
         />
         <Route path="/ShowUser/:userId"
         element={
           <ShowProfileCard/>
         }/>
      </Routes>
    </>
  )
}

export default App
