import axios from "axios"
import { useEffect, useState } from "react"

const useProfileData =(userId)=>{
    const [userData, setUserData] = useState(null)

    useEffect(()=>{
        fetchData()
    },[userData])

    const  fetchData = async()=>{
        try {
            const json = await axios.get(`http://localhost:3003/api/admin/getProfileData/${userId}`)
            const data = json?.data?.data
            setUserData(data)
        } catch (error) {
            console.log(error)
        }
    }

    return userData
}

export default useProfileData;