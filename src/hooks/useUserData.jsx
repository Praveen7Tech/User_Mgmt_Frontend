import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

const useUserData = ()=>{

  const [userData, setUserData] = useState(null)
  const [updateData, setUpdateData] = useState(true)

  const User = useSelector((store)=> store.user.userinfo)
  const userId =User._id 

  useEffect(()=>{
    if(!updateData) return
     fetchUserData()
  },[updateData])

  const fetchUserData=async()=>{
     try {
       const json = await axios.get(`http://localhost:3003/api/user/getUserData/${userId}`)
       const data = json?.data
       setUserData(data)
       setUpdateData(false)

     } catch (error) {
      console.log(error)
     }
  }

  const reFetchData = ()=> setUpdateData(true)

    return {userData, reFetchData}
}

export default useUserData;