import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../redux/userSlice'

const Navbar = () => {
  
  const dispatch = useDispatch()
  const LogOut =()=>{
    console.log("button click")
    dispatch(logoutUser())
  }
  const userInfo = useSelector((store)=> store.user.userinfo)
  return (
    <div className='flex justify-between p-3 m3 bg-pink-200'>
      <h2 className='font-bold p-2 m-2 text-xl'>Welcome Home : <span className='font-normal'>{userInfo.name}</span></h2>
      <button className='bg-green-300 py-2 px-8 m-2 rounded-lg'
      onClick={LogOut}>LogOut
      </button>
    </div>
  )
}

export default Navbar
