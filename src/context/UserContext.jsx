import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const UserContext = createContext()

export const UserProvider = ({children}) =>{
  const [userData, setUserData] = useState(null)

  const User = useSelector((store)=> store.user.userinfo)
  const userId = User?._id

  useEffect(()=>{
    fetchUserData()
  },[userId])

  const fetchUserData = async()=>{
    try {
      const json = await axios.get(`http://localhost:3003/api/user/getUserData/${userId}`)
      const data = json?.data
      setUserData(data)
    } catch (error) {
      console.log(error)
    }
  }

  const updateUserData = ()=> fetchUserData()

  return (
    <UserContext.Provider value={{userData, updateUserData}}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = ()=> useContext(UserContext)