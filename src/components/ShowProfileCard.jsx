"use client"

import { User, Mail, Phone } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"
import useProfileData from "../hooks/useProfileData"
import { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { validateForm } from "../utils/validateForm"

const ShowProfileCard = () => {
  const [editMode, setEditMode] = useState(false)
  const [editName, setEditname] = useState("")
  const [nameMsg, setNameMsg] = useState("")

  const navigate = useNavigate()
  const { userId } = useParams()

  const userData = useProfileData(userId)
  if (!userData) return
  const { name, email, profileImage } = userData
  const imageURL = `http://localhost:3003/${profileImage}`

  const ValidateForm = () => {
    const { nameError } = validateForm(editName)
    setNameMsg(nameError)
    if (nameError) return

    EditUser()
  }

  const EditUser = async () => {
    const Data = { editName }
    try {
      const data = await axios.put(`http://localhost:3003/api/admin/editUser/${userId}`, Data)
      toast.success(data.data.message)
      setEditMode(false)
    } catch (error) {
      console.log(error)
    }
  }

  const DeleteUser = async () => {
    try {
      const data = await axios.delete(`http://localhost:3003/api/admin/deleteUser/${userId}`)
      toast.success(data.data.message)
      navigate("/dashboard")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6">
      <div className="flex mt-24 items-center justify-center px-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/20 p-8 w-full max-w-md border border-gray-100 dark:border-gray-700">
          {/* Avatar Section */}
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center ring-4 ring-white dark:ring-gray-700">
              <img
                src={imageURL || "/placeholder.svg"}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>

          {/* Profile Information */}
          <div className="space-y-4">
            <div className="text-center mb-6">
              <p className="text-gray-500 dark:text-gray-400">User Profile</p>
            </div>

            <div className="space-y-3 pt-4">
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border dark:border-gray-600">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-purple-500 dark:text-purple-400" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
                    {editMode ? (
                      <input
                        type="text"
                        className="w-full px-4 py-1 border border-gray-400 dark:border-gray-500 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        placeholder="Enter name"
                        onChange={(e) => {
                          setEditname(e.target.value)
                          if (e.target.value.trim()) setNameMsg("")
                        }}
                      />
                    ) : (
                      <p className="text-gray-800 dark:text-gray-200 font-medium">{name}</p>
                    )}
                  </div>
                </div>
                {nameMsg && <span className="text-red-500 dark:text-red-400 text-sm ml-8">{nameMsg}</span>}
              </div>

              <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border dark:border-gray-600">
                <Mail className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                  <p className="text-gray-800 dark:text-gray-200 font-medium">{email}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {editMode ? (
              <div className="flex pt-6 gap-4">
                <button
                  className="flex-1 bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                  onClick={ValidateForm}
                >
                  Save
                </button>
                <button
                  className="flex-1 bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                  onClick={() => setEditMode(false)}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex pt-6 gap-4">
                <button
                  className="flex-1 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                  onClick={() => setEditMode(true)}
                >
                  Edit Profile
                </button>
                <button
                  className="flex-1 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                  onClick={DeleteUser}
                >
                  Delete Profile
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShowProfileCard
