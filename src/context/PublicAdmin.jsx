
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const PublicAdmin = ({children}) => {
    const adminToken = useSelector((store)=> store.admin.token)

    if(adminToken){
        return <Navigate to="/dashboard" replace/>
    }

   return children
}

export default PublicAdmin
