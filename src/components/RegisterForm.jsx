"use client";

import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import {validateForm} from "../utils/validateForm"

const RegisterForm = () => {
  const [isLogin, setLogin] = useState(false)

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [nameMsg, setNameMsg] = useState("")
  const [emailMsg, setEmailMsg] = useState("")
  const [passMsg, setPassMsg] = useState("")

  const [error,setError] = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()


  const checkValidation = async()=>{
    const {nameError,emailError,paswordError} = validateForm(name,email,password,isLogin)
    setNameMsg(nameError)
    setEmailMsg(emailError)
    setPassMsg(paswordError)

    if(nameError || emailError || paswordError) return;

    await FormSubmit()
  }

const FormSubmit= async()=>{
    try {
        const formData = isLogin ? {name,email,password} : {email,password}
        console.log("dta-",formData)
        const url = isLogin ? "http://localhost:3003/api/auth/register" : "http://localhost:3003/api/auth/login"
        const {data} = await axios.post(url, formData)
        
        dispatch(setUser({user : data.user, token : data.token}))
        navigate("/Home")

    } catch (error) {
        console.log(error)
        if(error.response.data.message){
            setError(error.response.data.message)
        }
    }
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
           {isLogin ? "Create Account" : "Log In" }
          </h1>
          <p className="text-gray-600">{isLogin ? "Join us today" : "Welcome Back.."}</p>
        </div>

        <form className="space-y-6" onSubmit={(e)=> e.preventDefault()}>
          <div>
          {isLogin &&
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your full name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              value={name}
              onChange={(e)=> setName(e.target.value)}
            />
            <span className="text-red-500 text-sm">{nameMsg}</span>
          </div>
          }
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
            />
            <span className="text-red-500 text-sm">{emailMsg}</span>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Create a password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
            />
            {passMsg && <span className="text-red-500 text-sm">{passMsg}</span>}
            {!passMsg && error && <span className="text-red-500 text-sm">{error}</span>}

          </div>

          <button
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 font-medium"
            onClick={checkValidation}
          >
            {isLogin ? "Register" : "Log In"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600 mb-4">{isLogin ? "Already have an account?" : "Don't have an account please register"}</p>
          <button
            className="inline-block bg-gray-100 text-gray-700 py-2 px-6 rounded-md hover:bg-gray-200 transition duration-200 font-medium cursor-pointer"
            onClick={() => {
              setLogin(!isLogin)  
            }}
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
