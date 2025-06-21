"use client"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { logoutAdmin } from "../redux/adminSlice"
import { useAdmin } from "../context/AdminContext"
import { useTheme } from "../context/ThemeContex"

const AdminNavbar = () => {
  console.log("navbar rendered")
  const dispatch = useDispatch()
  const { darkTheme, ThemeChange } = useTheme()
  const { adminData } = useAdmin()

  if (!adminData) return

  const { name } = adminData

  return (
    <div className="bg-gray-50 dark:bg-gray-900 px-4 py-2">
      <div className="flex justify-between p-6 m-4 bg-white dark:bg-gray-800 rounded-2xl shadow-md dark:shadow-gray-900/20 border border-gray-100 dark:border-gray-700 hover:shadow-lg dark:hover:shadow-gray-900/40 transition-shadow duration-300">
        <h2 className="font-bold p-2 m-2 text-xl cursor-pointer text-gray-800 dark:text-white">
          <Link
            to={"/dashboard"}
            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 underline-offset-4 hover:underline"
          >
            Welcome Dashboard :
          </Link>
          <span className="font-normal text-gray-500 dark:text-gray-300 ml-2">{name}</span>
        </h2>

        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <div className="p-4">
            <button
              onClick={ThemeChange}
              className={`
                w-12 h-6 rounded-full relative transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800
                ${darkTheme ? "bg-indigo-500 dark:bg-indigo-600" : "bg-gray-300 dark:bg-gray-600"}
              `}
              aria-label={darkTheme ? "Switch to light mode" : "Switch to dark mode"}
            >
              <div
                className={`
                  w-5 h-5 bg-white rounded-full absolute top-0.5 shadow-sm transition-transform duration-200
                  ${darkTheme ? "translate-x-6" : "translate-x-0.5"}
                `}
              >
                {/* Optional: Add icons inside the toggle */}
                <div className="flex items-center justify-center h-full text-xs">{darkTheme ? "🌙" : "☀️"}</div>
              </div>
            </button>
          </div>

          {/* Logout Button */}
          <button
            className="bg-green-100 hover:bg-green-200 dark:bg-green-800 dark:hover:bg-green-700 text-green-800 dark:text-green-100 font-medium py-2 px-8 m-2 rounded-lg transition-all duration-200 border border-green-200 dark:border-green-600 hover:border-green-300 dark:hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            onClick={() => dispatch(logoutAdmin())}
          >
            LogOut
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminNavbar
