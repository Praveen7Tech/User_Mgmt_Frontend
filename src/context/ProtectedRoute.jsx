import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ children }) => {
  const user = useSelector((store) => store.user.token)
  console.log("pro user",user)

  if(user){
    return children
  }
  return  <Navigate to="/" />
}

export default ProtectedRoute
