import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const AdminContext = createContext()

export const AdminProvider = ({children})=>{
    const [adminData, setAdminData] = useState(null)

    const Admin = useSelector((store)=> store.admin.admininfo)

    useEffect(()=>{
        FetchAdmin()
    },[Admin.id])

    const FetchAdmin = async()=>{
        try {
            const json= await axios.get(`http://localhost:3003/api/admin/getAdmin/${Admin.id}`)
            console.log("rnd",json)
            setAdminData(json.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <AdminContext.Provider value={{adminData}}>
            {children}
        </AdminContext.Provider>
    )
}

export const useAdmin = ()=> useContext(AdminContext)