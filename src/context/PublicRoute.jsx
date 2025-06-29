import { useSelector } from "react-redux"
import { Navigate} from "react-router-dom"

const PublicRoute = ({ children }) => {
  const userToken = useSelector((store) => store.user.token)
  if (userToken) {
    return <Navigate to="/Home" replace />
  }

  return children
}

export default PublicRoute
