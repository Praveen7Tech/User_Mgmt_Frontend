import { User, Mail,Phone } from "lucide-react"
import Navbar from "./Navbar"
import { useNavigate, useParams } from "react-router-dom"
import useProfileData from "../hooks/useProfileData"
import { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { validateForm } from "../utils/validateForm"

const ShowProfileCard = () => {
   const [editMode,setEditMode] = useState(false)
   const [editName, setEditname] = useState("")
   const [nameMsg,setNameMsg] = useState("")

   const navigate = useNavigate()
    const {userId} = useParams()

    const userData = useProfileData(userId)
    if(!userData) return 
    const {name,email,profileImage} = userData
    const imageURL = `http://localhost:3003/${profileImage}`

    const ValidateForm = ()=>{
      const {nameError} = validateForm(editName)
      console.log("uii",nameError)
      setNameMsg(nameError)
      if(nameError) return

      EditUser()
    }

    const EditUser = async()=>{
      const Data = {editName} 
      try {
        const data = await axios.put(`http://localhost:3003/api/admin/editUser/${userId}`,Data)
        toast.success(data.data.message)
        setEditMode(false)
      } catch (error) {
        console.log(error)
      }
    }

    const DeleteUser = async()=>{
      try {
        const data = await axios.delete(`http://localhost:3003/api/admin/deleteUser/${userId}`)
        toast.success(data.data.message)
        navigate("/dashboard")
      } catch (error) {
        console.log(error)
      }
    }
    
  return (
    <>
    <Navbar/>
    <div className="flex mt-24 items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        {/* Avatar Section */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
            <img src={imageURL} className="w-full h-full rounded-full object-cover" />
          </div>
        </div>

        {/* Profile Information */}
        <div className="space-y-4">
          <div className="text-center mb-6">
            <p className="text-gray-500">User Profile</p>
          </div>

          <div className="space-y-3 pt-4">
            <div className='p-3 bg-gray-50 rounded-lg'>
            <div className="flex items-center space-x-3">
              <User className="w-5 h-5 text-purple-500" />
              <div>
                <p className="text-sm text-gray-500">Name</p>
                {editMode ? 
                  <input type="text" className="flex-1 px-4 py-1 border border-gray-400 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" onChange={(e)=>{
                     setEditname(e.target.value)
                     if(e.target.value.trim()) setNameMsg("")
                  }}/>
                  :
                  <p className="text-gray-800 font-medium">{name}</p>
                }
              </div>
              </div>
              {nameMsg && <span className="text-red-500 text-sm ml-8">{nameMsg}</span>}
            </div>

            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Mail className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-gray-800 font-medium">{email}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Phone className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="text-gray-800 font-medium">phone number</p>
              </div>
            </div>
          </div>

          {/* Action Button */}
          {
            editMode ? 
            (<div className="flex pt-6 gap-7">
            <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-medium transition-colors" onClick={ValidateForm}>
              Save
            </button>
             <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg font-medium transition-colors" onClick={()=>setEditMode(false)}>
              Cancel Edit
            </button>
          </div>)
          :
          (<div className="flex pt-6 gap-7">
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium transition-colors" onClick={()=> setEditMode(true)}>
              Edit Profile
            </button>
             <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg font-medium transition-colors" onClick={DeleteUser}>
              Delete Profile
            </button>
          </div>)
          }
        </div>
      </div>
    </div>
    </>
  )
}

export default ShowProfileCard
