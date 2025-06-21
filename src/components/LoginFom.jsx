
import React, { useState } from 'react'
import { Mail, Lock, Shield } from "lucide-react"
import { validateAdmin } from '../utils/validateAdmin'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setAdmin } from '../redux/adminSlice'

const LoginFom = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailMsg, setEmailMsg] = useState("")
    const [passMsg, setPassMsg] = useState("")
    const [Error,setError] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const LalidateForm =async()=>{
        const {emailError, passwordError} = validateAdmin(email,password)

        setEmailMsg(emailError)
        setPassMsg(passwordError)

        if(emailError || passwordError) return;
        await FormSubmit()
    }

    const FormSubmit = async()=>{
        try {
            const adminData = {email,password}
            const {data} = await axios.post("http://localhost:3003/api/admin/adminLogin",adminData)

            dispatch(setAdmin({admin : data.admininfo, token : data.token}))
            navigate("/dashboard", {replace: true})
            
        } catch (error) {
            console.log(error)
            if(error.response.data.message){
                setError(error.response.data.message)
            }
        }
    }
  return (
       <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6 pb-4 space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
          <p className="text-sm text-gray-600">Enter your credentials to access the admin panel</p>
        </div>

        <div className="p-6 pt-0 space-y-4">
          <form className="space-y-4" onSubmit={(e)=> e.preventDefault()}>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700 block">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  onChange={(e)=>{
                     setEmail(e.target.value)
                     if(e.target.value.includes("@")) setEmailMsg("")
                  }}
                />
                <span className="text-red-500 text-sm">{emailMsg}</span>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700 block">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  onChange={(e)=>{
                     setPassword(e.target.value)
                     if(e.target.value.length >=6) setPassMsg("")
                  }}
                />
                <span className="text-red-500 text-sm">{passMsg}</span>
                <span className='text-red-500 text-sm'>{Error}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={LalidateForm}
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginFom
