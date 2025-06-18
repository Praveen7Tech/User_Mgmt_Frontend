import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

const useUserData = ()=>{

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [image, setImage] = useState(null)

  const ProfileImage = `http://localhost:3003/${image}`

  const User = useSelector((store)=> store.user.userinfo)

  useEffect(()=>{
     fetchUserData()
  },[])

  const fetchUserData=async()=>{
     try {
       const userId = User._id
       const {data} = await axios.get(`http://localhost:3003/api/user/getUserData/${userId}`)

       setName(data.name)
       setEmail(data.email)
       setImage(data.profileImage)

     } catch (error) {
      console.log(error)
     }
  }

    return {name,email,ProfileImage}
}

export default useUserData;