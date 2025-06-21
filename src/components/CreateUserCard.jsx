import React, { useState } from 'react'
import { User, Mail,Phone, Key } from "lucide-react"
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { validateForm } from '../utils/validateForm'

const CreateUserCard = () => {
    const [name,setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [nameMsg, setNameMsg] = useState("")
    const [emailMsg, setEmailMsg] = useState("")
    const [passMsg, setPassMsg] = useState("")

    const navigate = useNavigate()

    const ValidateForm = ()=>{
        const {nameError,emailError,paswordError} = validateForm(name,email,password)
        setNameMsg(nameError)
        setEmailMsg(emailError)
        setPassMsg(paswordError)
        
        if(nameError || emailError || paswordError) return;

        CreateUser()
    }

    const CreateUser = async()=>{
        try {
            const Data ={name,email,password}
            const data = await axios.post("http://localhost:3003/api/admin/createUser",Data)
            toast.success(data.data.message)
            navigate("/dashboard")
        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error)
        }
    }
  return (
    <div className="flex m-10 items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        {/* Avatar Section */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
            <img  className="w-full h-full rounded-full object-cover" />
          </div>
        </div>

        {/* Profile Information */}
        <div className="space-y-4">
          <div className="text-center mb-6">
            <p className="text-gray-500">User Profile</p>
          </div>

          <div className="space-y-3 pt-4">
            <div className='p-3 bg-gray-50 rounded-lg'>
            <div className="flex items-center space-x-3 ">
              <User className="w-5 h-5 text-purple-500" />
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <input type="text" className='flex-1 px-4 py-1 border border-gray-700 rounded-md'
                value={name} onChange={(e)=> {
                    setName(e.target.value)
                    if (e.target.value.trim()) setNameMsg("")
                    }}/>
              </div>
            </div> 
            {nameMsg && <span className="text-red-500 text-sm ml-11">{nameMsg}</span>}
            </div>
            <div className='p-3 bg-gray-50 rounded-lg'>
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <input type="email" className='flex-1 px-4 py-1 border border-gray-700 rounded-md'
                value={email} onChange={(e)=> {
                    setEmail(e.target.value)
                    if(e.target.value.includes("@")) setEmailMsg("")
                    }}/>
              </div>
            </div>
                {emailMsg && <span className="text-red-500 text-sm ml-11">{emailMsg}</span>}
            </div>

            <div className='p-3 bg-gray-50 rounded-lg'>
            <div className="flex items-center space-x-3 ">
              <Phone className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <input type="phone" className='flex-1 px-4 py-1 border border-gray-700 rounded-md'/>
              </div>
            </div>
            </div>
            <div className='p-3 bg-gray-50 rounded-lg'>
            <div className="flex items-center space-x-3">
              <Key className="w-5 h-5 text-red-500" />
              <div>
                <p className="text-sm text-gray-500">Password</p>
                <input type="password" className='flex-1 px-4 py-1 border border-gray-700 rounded-md'
                value={password} onChange={(e)=>{ 
                    setPassword(e.target.value)
                    if(e.target.value.length >= 6) setPassMsg("")
                    }}/>
              </div>
            </div>
                {passMsg && <span className="text-red-500 text-sm ml-11">{passMsg}</span>}
            </div>
          </div>

          {/* Action Button */}
          <div className="flex pt-6">
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium transition-colors" onClick={ValidateForm}>
              Create Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateUserCard
