"use client"

import { Link } from "react-router-dom"
import useUserDashboard from "../hooks/useUserDashboard"
import React, { useState } from "react"

const UsersCard = () => {
  const [searchValue, setSearchValue] = useState("")

  const { usersData, filteredData, setFilteredData } = useUserDashboard()

  const SearchUser = () => {
    const filteredData = usersData.filter((data) => data.name.toLowerCase().includes(searchValue.toLowerCase()))
    setFilteredData(filteredData)
    setSearchValue("")
  }

  if (!usersData) return
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6">
      <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:via-slate-800 dark:to-gray-900 rounded-lg shadow-sm dark:shadow-none">
        <h1 className="text-3xl text-center font-bold text-gray-900 dark:text-white mb-8">Users List</h1>
        <div className="mb-8">
          <div className="flex gap-3 max-w-md mx-auto">
            <h1
              className="font-bold p-2 cursor-pointer whitespace-nowrap flex-shrink-0 w-24 text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              onClick={SearchUser}
            >
              All Users
            </h1>
            <input
              type="text"
              placeholder="Search user"
              value={searchValue}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-medium py-2 px-6 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              onClick={SearchUser}
            >
              Search
            </button>
            <button className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white font-medium py-2 px-6 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800">
              <Link to={"/addUser"}>Add</Link>
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {filteredData.length === 0 && (
            <p className="font-normal font-serif text-base text-gray-700 dark:text-gray-300">
              Oops no users found......
            </p>
          )}
          {filteredData.map((user) => (
            <div
              key={user._id}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm hover:shadow-md dark:shadow-gray-900/20 dark:hover:shadow-gray-900/40 transition-shadow duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="mb-3">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      Name: <span className="font-normal text-gray-800 dark:text-gray-200">{user.name}</span>
                    </h2>
                  </div>
                  <div className="mb-4">
                    <p className="text-gray-600 dark:text-gray-400">
                      Email: <span className="text-gray-800 dark:text-gray-200">{user.email}</span>
                    </p>
                  </div>
                </div>

                <div className="ml-6">
                  <button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800">
                    <Link to={`/ShowUser/${user._id}`}>View</Link>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default React.memo(UsersCard)
