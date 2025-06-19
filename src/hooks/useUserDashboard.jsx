import axios from "axios"
import { useEffect, useState } from "react"


const useUserDashboard = ()=>{
     const [usersData, setUsersData] = useState([])
     const [filteredData, setFilteredData] = useState([])

    useEffect(()=>{
        fetchUsersData()
    },[])

    const fetchUsersData = async()=>{
        try {
        const usersData = await axios.get("http://localhost:3003/api/admin/getUsersData")
        const data = usersData?.data
        setUsersData(data)
        setFilteredData(data)

        } catch (error) {
        console.log(error)
        }
    }

    return {usersData,filteredData, setUsersData, setFilteredData}
}

export default useUserDashboard;