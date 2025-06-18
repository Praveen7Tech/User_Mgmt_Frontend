import React from 'react'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../redux/userSlice'
import { DiAndroid  } from "react-icons/di";
import { Link } from 'react-router-dom';
import useUserData from '../hooks/useUserData';

const Navbar = () => {
  
  const {name} = useUserData()
  const dispatch = useDispatch()

  const LogOut =()=>{
    dispatch(logoutUser())
  }
  
  return (
    <div className='flex justify-between p-3 m3 bg-pink-200'>
      <h2 className='font-bold p-2 m-2 text-xl cursor-pointer'><Link to={"/Home"}>Welcome Home : </Link><span className='font-normal'>{name}</span></h2>
      <div className='flex items-center gap-3'>
        <div className='flex w-8 h'>
          <Link to={"/userProfile"}><h3><DiAndroid size={26}/></h3></Link>
        </div>
          <button className='bg-green-300 py-2 px-8 m-2 rounded-lg'
          onClick={LogOut}>LogOut
          </button>
      </div>
    </div>
  )
}

export default Navbar
