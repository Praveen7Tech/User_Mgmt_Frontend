import React from 'react'
import Navbar from '../components/Navbar'

function Home() {
  return (
      <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex items-center justify-center min-h-[80vh] px-4">
        <div className="bg-white rounded-3xl shadow-xl p-12 max-w-2xl mx-auto border border-gray-100">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mx-auto mb-6 flex items-center justify-center">
              <span className="text-white text-2xl font-bold">H</span>
            </div>

            <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome Home</h1>

            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Step into your personal space where everything is designed with you in mind.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
