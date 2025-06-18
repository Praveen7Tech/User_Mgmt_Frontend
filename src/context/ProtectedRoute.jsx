import { useSelector } from "react-redux"
import { Navigate} from "react-router-dom"

const ProtectedRoute = ({children})=>{
    const user = useSelector((store)=> store.user.token)
    console.log("tok",user)

    return user ? children : <Navigate to="/" replace></Navigate>

}

export default ProtectedRoute;