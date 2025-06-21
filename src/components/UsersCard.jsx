
import { Link } from 'react-router-dom'
import useUserDashboard from '../hooks/useUserDashboard'
import React, { useState } from 'react'

const UsersCard = () => {
  const [searchValue, setSearchValue] = useState("")
  
  const {usersData,filteredData,setFilteredData} = useUserDashboard()

  const SearchUser =()=>{
     const filteredData = usersData.filter((data)=> data.name.toLowerCase().includes(searchValue.toLowerCase()))
     setFilteredData(filteredData)
     setSearchValue("")
  }

  if(!usersData) return;
  return (
     <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl text-center font-bold text-gray-900 mb-8">Users List</h1>
       <div className="mb-8">
        <div className="flex gap-3 max-w-md mx-auto">
          <h1 className="font-bold p-2 cursor-pointer whitespace-nowrap flex-shrink-0 w-24" onClick={SearchUser}>All Users</h1>
          <input
            type="text"
            placeholder="Search user"
            value={searchValue}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            onChange={(e)=> setSearchValue(e.target.value)}
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={SearchUser}>
            Search
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
           <Link to={"/addUser"}>Add</Link>
          </button>
        </div>
      </div>
     
      <div className="space-y-4">
        {filteredData.length === 0 && <p className='font-normal font-serif text-base'>Oops no users found......</p>}
        {filteredData.map((user) => (
          <div
            key={user._id}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="mb-3">
                  <h2 className="text-lg font-semibold text-gray-900 mb-1">
                    Name: <span className="font-normal">{user.name}</span>
                  </h2>
                </div>
                <div className="mb-4">
                  <p className="text-gray-600">
                    Email: <span className="text-gray-800">{user.email}</span>
                  </p>
                </div>
              </div>

              <div className="ml-6">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  <Link to={`/ShowUser/${user._id}`}>View</Link>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    
  )
}

export default React.memo(UsersCard);
