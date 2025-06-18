import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"


const PublicRoute = ({children})=>{
    const user = useSelector((store)=> store.user.token)

    return !user ? children : <Navigate to="/Home" replace/>
}

export default PublicRoute