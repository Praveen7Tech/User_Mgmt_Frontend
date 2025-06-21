import React  from 'react'
import { Link } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { logoutAdmin } from '../redux/adminSlice';
import { useAdmin } from '../context/AdminContext';

const AdminNavbar = () => {
  console.log("vanbar rendered")
  const dispatch = useDispatch()

  const {adminData} = useAdmin()

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

export default AdminNavbar
