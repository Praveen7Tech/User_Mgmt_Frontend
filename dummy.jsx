import React, { useState } from 'react'
import { User, Mail,Camera } from "lucide-react"
import {  useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setUser } from '../redux/userSlice'

const ProfileCard = () => {
    const [image, setImage] = useState()

    const userinfo = useSelector((store)=> store.user.userinfo)
    const dispatch = useDispatch()

    const baseURL = "http://localhost:3003"; 
    const imageURL = userinfo?.profileImage
  ? `${baseURL}/${userinfo.profileImage}`
  : image || "https://via.placeholder.com/150";

   
    const ImageUpload=async(e)=>{
        const file = e.target.files[0]
        if(!file) return
        setImage(URL.createObjectURL(file))

        const Data = new FormData()
        Data.append("profileImage",file)
        Data.append("userId",userinfo._id )
        console.log("id-",userinfo._id)
        console.log("FormData contents:");
        

        try {
           const {data} = await axios.post("http://localhost:3003/api/user/UploadPicture",Data,{
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            })

            console.log("res data--",data)
            dispatch(setUser({user:data.user, token:data.token}))

        } catch (error) {
          console.log(error)  
        }
    }
  return (
    <div className="flex mt-24 items-center justify-center bg-gray-50 p-4 ">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        {/* Avatar Section */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
              <img
              src={imageURL}
                className="w-full h-full rounded-full object-cover"
              />
          </div>
        </div>

        {/* Profile Information */}
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-1">name</h2>
            <p className="text-gray-500">User Profile</p>
          </div>

          <div className="space-y-3 pt-4">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Mail className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-gray-800 font-medium">email</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-6">
            <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium transition-colors">
              Edit Profile
            </button>
             <label className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-medium flex items-center gap-2 cursor-pointer">
            <Camera className="w-4 h-4" />
            Upload Image
            <input
              type="file"
              accept="image/*"
              onChange={ImageUpload}
              className="hidden"
            />
          </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileCard
