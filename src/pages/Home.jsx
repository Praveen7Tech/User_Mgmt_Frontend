import React from 'react'
import Navbar from '../components/Navbar'

function Home() {
  return (
    <>
    <Navbar/>
      <div className="min-h-screen bg-gray-50 dark:bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
      <div className="flex items-center justify-center min-h-[80vh] px-4">
        <div className="bg-white dark:bg-gray-800/70 rounded-3xl shadow-xl p-12 max-w-2xl mx-auto border border-gray-100">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4 dark:text-gray-200">Welcome Home</h1>

            <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 leading-relaxed">
              Ever tried? Ever failed? No matter. Try again. Fail again. Fail better. The world is Yours.
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Home
