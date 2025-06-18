
import { User, Mail,Phone } from "lucide-react"
import useUserData from "../hooks/useUserData"

const ProfileCard = () => {
 
  const {name,email,ProfileImage} = useUserData()
   
  return (
    <div className="flex mt-24 items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        {/* Avatar Section */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
            <img src={ProfileImage || "/placeholder.svg"} className="w-full h-full rounded-full object-cover" />
          </div>
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
                <p className="text-gray-800 font-medium">{name}</p>
              </div>
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
          <div className="flex pt-6">
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium transition-colors">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileCard
