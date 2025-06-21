// components/DashboardLayout.jsx
import AdminNavbar from './AdminNavbar'
import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
  return (
    <div>
      <AdminNavbar />
      <div className="mt-6">
        <Outlet /> {/* All nested routes render here */}
      </div>
    </div>
  )
}

export default DashboardLayout
