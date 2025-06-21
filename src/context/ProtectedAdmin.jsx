import React, { Children } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtectedAdmin = ({children}) => {
    const adminToken =useSelector((store)=> store.admin.token)
    
    if(!adminToken){
        return <Navigate to="/adminLogin" replace/>
    }
  return children
}

export default ProtectedAdmin
