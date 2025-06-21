import React, { useEffect, useState } from 'react'
import { DiAndroid  } from "react-icons/di";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAdmin } from '../redux/adminSlice';

const AdminNavbar = () => {
  const [adminData, setAdminData] = useState(null)
  const dispatch = useDispatch()
  
  const Admin = useSelector((store)=> store.admin.admininfo)
  
  useEffect(()=>{
   FetchAdmin()
 },[])

 const FetchAdmin = async()=>{
  try {
    const json  = await axios.get(`http://localhost:3003/api/admin/getAdmin/${Admin.id}`)
    setAdminData(json.data)
  } catch (error) {
    console.log(error)
  }
 }

 if(!adminData) return
  
  return (
    <div className='flex justify-between p-3 m3 bg-red-200'>
      <h2 className='font-bold p-2 m-2 text-xl cursor-pointer'><Link to={"/dashboard"}>Welcome Home : </Link><span className='font-normal'>{adminData.name}</span></h2>
      <div className='flex items-center gap-3'>
        <div className='flex w-8 h'>
        </div>
          <button className='bg-green-300 py-2 px-8 m-2 rounded-lg'
          onClick={()=> dispatch(logoutAdmin())}>
            LogOut
          </button>
      </div>
    </div>
  )
}

export default AdminNavbar
