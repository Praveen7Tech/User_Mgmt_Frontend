"use client"

import { useState } from "react"
import { User, Mail, Phone, Key } from "lucide-react"
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { validateForm } from "../utils/validateForm"

const CreateUserCard = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [nameMsg, setNameMsg] = useState("")
  const [emailMsg, setEmailMsg] = useState("")
  const [passMsg, setPassMsg] = useState("")

  const navigate = useNavigate()

  const ValidateForm = () => {
    const { nameError, emailError, paswordError } = validateForm(name, email, password)
    setNameMsg(nameError)
    setEmailMsg(emailError)
    setPassMsg(paswordError)

    if (nameError || emailError || paswordError) return

    CreateUser()
  }

  const CreateUser = async () => {
    try {
      const Data = { name, email, password }
      const data = await axios.post("http://localhost:3003/api/admin/createUser", Data)
      toast.success(data.data.message)
      navigate("/dashboard")
    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6">
      <div className="flex m-10 items-center justify-center px-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/20 p-8 w-full max-w-md border border-gray-100 dark:border-gray-700">
          {/* Avatar Section */}
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center ring-4 ring-white dark:ring-gray-700">
              <User className="w-12 h-12 text-white" />
            </div>
          </div>

          {/* Profile Information */}
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Create New User</h2>
              <p className="text-gray-500 dark:text-gray-400">Fill in the details below</p>
            </div>

            <div className="space-y-3 pt-4">
              {/* Name Field */}
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border dark:border-gray-600">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-purple-500 dark:text-purple-400" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Name</p>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-500 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder="Enter full name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value)
                        if (e.target.value.trim()) setNameMsg("")
                      }}
                    />
                  </div>
                </div>
                {nameMsg && <span className="text-red-500 dark:text-red-400 text-sm ml-8 block mt-1">{nameMsg}</span>}
              </div>

              {/* Email Field */}
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border dark:border-gray-600">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Email</p>
                    <input
                      type="email"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-500 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder="Enter email address"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        if (e.target.value.includes("@")) setEmailMsg("")
                      }}
                    />
                  </div>
                </div>
                {emailMsg && <span className="text-red-500 dark:text-red-400 text-sm ml-8 block mt-1">{emailMsg}</span>}
              </div>

              {/* Phone Field */}
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border dark:border-gray-600">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-green-500 dark:text-green-400" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Phone</p>
                    <input
                      type="tel"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-500 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>
              </div>

              {/* Password Field */}
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border dark:border-gray-600">
                <div className="flex items-center space-x-3">
                  <Key className="w-5 h-5 text-red-500 dark:text-red-400" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Password</p>
                    <input
                      type="password"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-500 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder="Enter password (min 6 characters)"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value)
                        if (e.target.value.length >= 6) setPassMsg("")
                      }}
                    />
                  </div>
                </div>
                {passMsg && <span className="text-red-500 dark:text-red-400 text-sm ml-8 block mt-1">{passMsg}</span>}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex pt-6 gap-4">
              <button
                className="flex-1 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                onClick={ValidateForm}
              >
                Create Profile
              </button>
              <button
                className="flex-1 bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                onClick={() => navigate("/dashboard")}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateUserCard
