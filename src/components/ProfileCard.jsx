"use client"

import { User, Mail, Phone, Camera } from "lucide-react"
import { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { validateForm } from "../utils/validateForm"
import { useUserContext } from "../context/UserContext"

const ProfileCard = () => {
  const [editMode, setEditMode] = useState(false)
  const [editName, setEditName] = useState("")
  const [editPhone, setEditPhone] = useState("")
  const [image, setImage] = useState(null)
  const [nameMsg, setNameMsg] = useState("")

  const { userData, updateUserData } = useUserContext()

  if (!userData) return <h1 className="text-center text-gray-900 dark:text-white">Loading...</h1>

  const { name, email, profileImage, _id } = userData
  const imageURL = image ? URL.createObjectURL(image) : `http://localhost:3003/${profileImage}`

  const ValidateForm = () => {
    const { nameError } = validateForm(editName)
    setNameMsg(nameError)
    if (nameError) return

    UpdateProfile()
  }

  const UpdateProfile = async () => {
    const formData = new FormData()
    const userData = {}

    if (image) formData.append("profileImage", image)
    if (editName) userData.editName = editName
    formData.append("userData", JSON.stringify(userData))
    try {
      const data = await axios.put(`http://localhost:3003/api/user/updateProfile/${_id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      toast.success(data.data.message)
      updateUserData()
      setEditMode(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6">
      <div className="flex mt-11 items-center justify-center px-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/20 p-8 w-full max-w-md border border-gray-100 dark:border-gray-700">
          {/* Avatar Section */}
          <div className="flex justify-center mb-5 gap-4 items-center">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center ring-4 ring-white dark:ring-gray-700">
              <img
                src={imageURL || "/placeholder.svg"}
                className="w-full h-full rounded-full object-cover"
                alt="Profile"
              />
            </div>
            {editMode && (
              <div>
                <label className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium flex items-center gap-2 cursor-pointer transition-colors duration-200 focus-within:ring-2 focus-within:ring-green-500 focus-within:ring-offset-2 dark:focus-within:ring-offset-gray-800">
                  <Camera className="w-4 h-4" />
                  <span className="text-sm">Upload</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </label>
              </div>
            )}
          </div>

          {/* Profile Information */}
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">User Profile</h2>
              <p className="text-gray-500 dark:text-gray-400">Manage your profile information</p>
            </div>

            <div className="space-y-3 pt-4">
              {/* Name Field */}
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border dark:border-gray-600">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-purple-500 dark:text-purple-400" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Name</p>
                    {editMode ? (
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-500 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        defaultValue={name}
                        placeholder="Enter your name"
                        onChange={(e) => {
                          setEditName(e.target.value)
                          if (e.target.value.trim()) setNameMsg("")
                        }}
                      />
                    ) : (
                      <p className="text-gray-800 dark:text-gray-200 font-medium">{name}</p>
                    )}
                  </div>
                </div>
                {nameMsg && <span className="text-red-500 dark:text-red-400 text-sm ml-8 block mt-1">{nameMsg}</span>}
              </div>

              {/* Email Field - Only show when not in edit mode */}
              {!editMode && (
                <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border dark:border-gray-600">
                  <Mail className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                    <p className="text-gray-800 dark:text-gray-200 font-medium">{email}</p>
                  </div>
                </div>
              )}

              {/* Phone Field */}
              <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border dark:border-gray-600">
                <Phone className="w-5 h-5 text-green-500 dark:text-green-400" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Phone</p>
                  {editMode ? (
                    <input
                      type="text"
                      value={editPhone}
                      onChange={(e) => {
                        const onlyNums = e.target.value.replace(/[^0-9]/g, "")
                        setEditPhone(onlyNums)
                      }}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-500 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder="Enter phone number"
                    />
                  ) : (
                    <p className="text-gray-800 dark:text-gray-200 font-medium">
                      {editPhone || "Phone number not set"}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {editMode ? (
              <div className="flex gap-4 pt-6">
                <button
                  className="flex-1 bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                  onClick={ValidateForm}
                >
                  Update Profile
                </button>
                <button
                  className="flex-1 bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                  onClick={() => {
                    setEditMode(false)
                    setImage(null)
                    setEditName("")
                    setEditPhone("")
                    setNameMsg("")
                  }}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex pt-6">
                <button
                  className="w-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                  onClick={() => {
                    setEditMode(true)
                    setEditName(name)
                  }}
                >
                  Edit Profile
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileCard
