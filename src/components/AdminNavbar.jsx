import React, { useEffect, useState } from 'react'
import { DiAndroid  } from "react-icons/di";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAdmin } from '../redux/adminSlice';

const AdminNavbar = () => {
  console.log("vanbar rendered")
  const [adminData, setAdminData] = useState(null)
  const dispatch = useDispatch()
  
  const Admin = useSelector((store)=> store.admin.admininfo)
  
  useEffect(()=>{
   FetchAdmin()
  },[Admin?.id])

 const FetchAdmin = async()=>{
  try {
    const json  = await axios.get(`http://localhost:3003/api/admin/getAdmin/${Admin.id}`)
    setAdminData(json.data)
  } catch (error) {
    console.log(error)
  }
 }

 if(!adminData) return

 const {name} = adminData
  
  return (
    <div className="flex justify-between p-6 m-4 bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
          <h2 className="font-bold p-2 m-2 text-xl cursor-pointer text-gray-800">
            <Link
              to={"/dashboard"}
              className="hover:text-indigo-600 transition-colors duration-200 underline-offset-4 hover:underline"
            >
              Welcome Dashboard :
            </Link>
            <span className="font-normal text-gray-500">{name}</span>
          </h2>
    
          <div className="flex items-center gap-3">
            
            <button
              className="bg-green-100 hover:bg-green-200 text-green-800 font-medium py-2 px-8 m-2 rounded-lg transition-all duration-200 border border-green-200 hover:border-green-300"
              onClick={()=> dispatch(logoutAdmin())}
            >
              LogOut
            </button>
          </div>
        </div>
  )
}

export default React.memo(AdminNavbar);
