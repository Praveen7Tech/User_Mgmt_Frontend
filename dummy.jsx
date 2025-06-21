import React from 'react'
import Navbar from '../components/Navbar'

function Home() {
  return (
     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
      <Navbar />

      <div className="flex items-center justify-center min-h-[80vh] px-4">
        <div className="text-center max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
              Welcome
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Home
              </span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Your journey begins here. Explore, discover, and make yourself comfortable.
            </p>
          </div>

          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto rounded-full mb-8"></div>

          <div className="bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-700/50">
            <p className="text-gray-200 text-lg">Ready to get started? Everything you need is just a click away.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
///////////////////////////////


import React from 'react'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../redux/userSlice'
import { DiAndroid  } from "react-icons/di";
import { Link } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';

const Navbar = () => {
  
  const dispatch = useDispatch()

  const {userData} = useUserContext()
  if(!userData) return;
  const {name} = userData

  const LogOut =()=>{
    dispatch(logoutUser())
  }
  
  return (
    <div className="flex justify-between p-6 m-3 bg-gradient-to-r from-gray-900 to-slate-800 rounded-xl shadow-2xl border border-gray-700">
      <h2 className="font-bold p-3 m-2 text-2xl cursor-pointer text-white hover:text-blue-400 transition-colors duration-300">
        <Link to={"/Home"} className="hover:text-blue-400 transition-colors duration-200">
          Welcome Home :
        </Link>
        <span className="font-normal text-gray-300 ml-2">{name}</span>
      </h2>

      <div className="flex items-center gap-4">
        <div className="flex w-12 h-12 items-center justify-center bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-gray-600">
          <Link
            to={"/userProfile"}
            className="flex items-center justify-center w-full h-full rounded-full hover:bg-gray-700 transition-colors duration-200"
          >
            <h3 className="text-gray-300 hover:text-blue-400 transition-colors duration-200">
              <DiAndroid size={28} />
            </h3>
          </Link>
        </div>

        <button
          className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-8 m-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          onClick={LogOut}
        >
          LogOut
        </button>
      </div>
    </div>
  )
}

export default Navbar

