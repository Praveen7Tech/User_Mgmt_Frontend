import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

const useUserData = ()=>{

  const [userData, setUserData] = useState(null)

  //const ProfileImage = `http://localhost:3003/${image}`

  const User = useSelector((store)=> store.user.userinfo)
  const Admin = useSelector((store)=> store.admin.admininfo)
  const userId =User ? User._id : Admin.id
  useEffect(()=>{
     fetchUserData()
  },[])

  const fetchUserData=async()=>{
     try {
       
       const json = await axios.get(`http://localhost:3003/api/user/getUserData/${userId}`)
       const data = json?.data
       console.log("duu",data)
       setUserData(data)

     } catch (error) {
      console.log(error)
     }
  }

    return userData
}

export default useUserData;