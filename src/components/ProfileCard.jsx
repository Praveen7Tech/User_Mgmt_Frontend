
import { User, Mail,Phone,Camera } from "lucide-react"
import useUserData from "../hooks/useUserData"
import { useState } from "react"
import { Input } from "postcss"
import axios from "axios"
import { toast } from "react-toastify"

const ProfileCard = () => {

  const [editMode, setEditMode] = useState(false)
  const [editName, setEditName] = useState("")
  const [editPhone, setEditPhone] = useState("")
  const [image,setImage] = useState(null)
 
  const userData = useUserData()
  if(!userData) return <h1>loading...</h1>
    const {name,email,profileImage,_id} = userData
    const imageURL = image ? URL.createObjectURL(image) : `http://localhost:3003/${profileImage}`
  

  const UpdateProfile = async()=>{
    const formData = new FormData()
    const userData = {}

    if(image) formData.append("profileImage",image)
    if(editName) userData.editName = editName
    formData.append("userData",JSON.stringify(userData))
    try {
      const data = await axios.put(`http://localhost:3003/api/user/updateProfile/${_id}`,formData,{
        headers:{
          "Content-Type" : "multipart/form-data"
        }
      })
      toast.success(data.data.message)
      setEditMode(false)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }
   
  return (
    <div className="flex mt-11 items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        {/* Avatar Section */}
        <div className="flex justify-center mb-5 gap-4 items-center">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
            <img src={imageURL || "/placeholder.svg"} className="w-full h-full rounded-full object-cover" />
          </div>
          {editMode && 
          (<div>
           <label className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-medium flex items-center gap-2 cursor-pointer">
            <Camera className="w-4 h-4" />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e)=> setImage(e.target.files[0])}
            />
        </label>
        </div>)
        }
        </div>
       

        {/* Profile Information */}
        <div className="space-y-4">
          <div className="text-center mb-6">
            <p className="text-gray-500">User Profile</p>
          </div>

          <div className="space-y-3 pt-4">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <User className="w-5 h-5 text-purple-500" />
              <div>
                <p className="text-sm text-gray-500">Name</p>
                {editMode ? (<input type="text" className="flex-1 px-4 py-1 border border-gray-400 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" defaultValue={name} onChange={(e)=> setEditName(e.target.value)}/>)
                :
                (<p className="text-gray-800 font-medium">{name}</p>)
                }
              </div>
            </div>

           {!editMode &&
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Mail className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-gray-800 font-medium">{email}</p>
              </div>
            </div>
            }

            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Phone className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                {editMode ? (<input
                  type="text"
                  value={editPhone}
                  onChange={(e) => {
                    const onlyNums = e.target.value.replace(/[^0-9]/g, '')
                    setEditPhone(onlyNums)
                  }}
                  className="flex-1 px-4 py-1 border border-gray-400 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter phone number"
                />)
                :
                (<p className="text-gray-800 font-medium">phone number</p>)
                }
              </div>
            </div>
          </div>

          {/* Action Button */}
          
            {
              editMode ? 
              (<div className="flex gap-7 pt-4">
              <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-medium transition-colors" onClick={UpdateProfile}>
              Update
            </button>
            <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg font-medium transition-colors" onClick={()=>{
               setEditMode(false)
               setImage(null)
               }}>
              Cancel Edit
            </button>
            </div>)
            :
            (<div className="flex pt-6">
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium transition-colors" onClick={()=> setEditMode(true)}>
              Edit Profile
            </button>
            </div>)
            }
          
        </div>
      </div>
    </div>
  )
}

export default ProfileCard
