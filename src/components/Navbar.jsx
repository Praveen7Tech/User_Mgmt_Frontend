"use client"

import { useDispatch } from "react-redux"
import { logoutUser } from "../redux/userSlice"
import { DiAndroid } from "react-icons/di"
import { Link } from "react-router-dom"
import { useUserContext } from "../context/UserContext"
import { useTheme } from "../context/ThemeContex"

const Navbar = () => {
  const dispatch = useDispatch()
  const { darkTheme, ThemeChange } = useTheme()
  const { userData } = useUserContext()

  if (!userData) return

  const { name } = userData

  const LogOut = () => {
    dispatch(logoutUser())
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 px-4 py-2">
      <div className="flex justify-between p-6 m-4 bg-white dark:bg-gradient-to-r dark:from-gray-800 dark:to-slate-800 rounded-2xl shadow-md dark:shadow-gray-900/20 border border-gray-100 dark:border-gray-700 hover:shadow-lg dark:hover:shadow-gray-900/40 transition-shadow duration-300">
        <h2 className="font-bold p-2 m-2 text-xl cursor-pointer text-gray-800 dark:text-white">
          <Link
            to={"/Home"}
            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 underline-offset-4 hover:underline"
          >
            Welcome Home :
          </Link>
          <span className="font-normal text-gray-500 dark:text-gray-300 mx-4">{name}</span>
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
                  w-5 h-5 bg-white rounded-full absolute top-0.5 shadow-sm transition-transform duration-200 flex items-center justify-center text-xs
                  ${darkTheme ? "translate-x-6" : "translate-x-0.5"}
                `}
              >
                {darkTheme ? "🌙" : "☀️"}
              </div>
            </button>
          </div>

          {/* Profile Icon */}
          <div className="flex w-10 h-10 items-center justify-center rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
            <Link to={"/userProfile"}>
              <div className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200">
                <DiAndroid size={26} />
              </div>
            </Link>
          </div>

          {/* Logout Button */}
          <button
            className="bg-green-100 hover:bg-green-200 dark:bg-green-800 dark:hover:bg-green-700 text-green-800 dark:text-green-100 font-medium py-2 px-8 m-2 rounded-lg transition-all duration-200 border border-green-200 dark:border-green-600 hover:border-green-300 dark:hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            onClick={LogOut}
          >
            LogOut
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
