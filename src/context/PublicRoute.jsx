import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"

const PublicRoute = ({ children }) => {
  const userToken = useSelector((store) => store.user.token)
  const adminToken = useSelector((store) => store.admin.token)
  const location = useLocation()

  if (userToken) {
    return <Navigate to="/Home" replace state={{ from: location }} />
  }

  if (adminToken) {
    return <Navigate to="/dashboard" replace state={{ from: location }} />
  }

  return children
}

export default PublicRoute
