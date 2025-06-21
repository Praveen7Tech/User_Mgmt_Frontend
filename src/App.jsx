import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import ProtectedRoute from './context/ProtectedRoute'
import PublicRoute from './context/PublicRoute'
import UserProfile from './pages/UserProfile'
import AdminLogin from './pages/AdminLogin'
import DashBoard from './pages/DashBoard'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import CreateUser from './pages/CrateUser'
import ProtectedAdmin from './context/ProtectedAdmin'
import PublicAdmin from './context/PublicAdmin'
import ShowProfileCard from './components/ShowProfileCard'

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
          <PublicAdmin>
            <AdminLogin/>
          </PublicAdmin>
        } 
         />
         <Route path="/dashboard"
         element={
          <ProtectedAdmin>
           <DashBoard/>
          </ProtectedAdmin>
         }
         />
         <Route path="/ShowUser/:userId"
         element={
          <ProtectedAdmin>
             <ShowProfileCard/>
           </ProtectedAdmin>
         }
         />
         <Route path="/addUser" 
         element={
          <ProtectedAdmin>
            <CreateUser/>
          </ProtectedAdmin>
          }/>
      </Routes>
      <ToastContainer position='top-center' autoClose={2000}/>
    </>
  )
}

export default App
