import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../redux/userSlice'
import { logoutAdmin } from "../redux/adminSlice"
import { DiAndroid  } from "react-icons/di";
import { Link } from 'react-router-dom';
import useUserData from '../hooks/useUserData';

const Navbar = () => {
  
  const user = useSelector((state) => state.user);
  //const admin = useSelector((store)=> store.admin)
  const dispatch = useDispatch()

  const userData = useUserData()
  if(!userData) return;
  const {name} = userData

  const LogOut =()=>{
    if(user?.userinfo?.role === "user"){
      console.log("user click")
      dispatch(logoutUser())
    }else{
      console.log("admin click")
      dispatch(logoutAdmin())
    }
    
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
