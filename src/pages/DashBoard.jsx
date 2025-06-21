
import React from 'react'
import UsersCard from '../components/UsersCard'
import Navbar from '../components/Navbar'
import AdminNavbar from '../components/AdminNavbar'

const DashBoard = () => {
  return (
    <div>
      <AdminNavbar/>
      <UsersCard/>
    </div>
  )
}

export default DashBoard
