import React from 'react'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../redux/userSlice'
import { DiAndroid  } from "react-icons/di";
import { Link } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';

const Navbar = () => {
  
  const dispatch = useDispatch()

  const {userData} = useUserContext()
  if(!userData) return;
  const {name} = userData

  const LogOut =()=>{
    dispatch(logoutUser())
  }
  
  return (
     <div className="flex justify-between p-6 m-4 bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
      <h2 className="font-bold p-2 m-2 text-xl cursor-pointer text-gray-800">
        <Link
          to={"/Home"}
          className="hover:text-indigo-600 transition-colors duration-200 underline-offset-4 hover:underline"
        >
          Welcome Home :
        </Link>
        <span className="font-normal text-gray-500">{name}</span>
      </h2>

      <div className="flex items-center gap-3">
        <div className="flex w-10 h-10 items-center justify-center rounded-lg hover:bg-gray-50 transition-colors duration-200">
          <Link to={"/userProfile"}>
            <h3 className="text-gray-600 hover:text-indigo-600 transition-colors duration-200">
              <DiAndroid size={26} />
            </h3>
          </Link>
        </div>

        <button
          className="bg-green-100 hover:bg-green-200 text-green-800 font-medium py-2 px-8 m-2 rounded-lg transition-all duration-200 border border-green-200 hover:border-green-300"
          onClick={LogOut}
        >
          LogOut
        </button>
      </div>
    </div>
  )
}

export default Navbar
