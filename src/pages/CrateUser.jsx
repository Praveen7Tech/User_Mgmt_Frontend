
import React from 'react'
import Navbar from '../components/Navbar'
import CreateUserCard from '../components/CreateUserCard'
import AdminNavbar from '../components/AdminNavbar'

const CreateUser = () => {
  return (
    <div>
      <AdminNavbar/>
      <CreateUserCard/>
    </div>
  )
}

export default CreateUser
