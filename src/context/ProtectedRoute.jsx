import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"

const ProtectedRoute = ({ children }) => {
  const user = useSelector((store) => store.user.token)
  const admin = useSelector((store) => store.admin.token)
  const location = useLocation()

  const isAuthenticated = user || admin

  return isAuthenticated
    ? children
    : <Navigate to="/" replace state={{ from: location }} />
}

export default ProtectedRoute
