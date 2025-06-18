import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name : "user",
    initialState : {
        userinfo :JSON.parse(localStorage.getItem("user")) || null,
        token : JSON.parse(localStorage.getItem("key")) || null
    },
    reducers : {
        setUser :(state,action)=>{
            state.userinfo = action.payload.user
            state.token = action.payload.token
            localStorage.setItem("key",JSON.stringify(action.payload.token))
            localStorage.setItem("user", JSON.stringify(action.payload.user))
        },
        logoutUser :(state)=>{
            state.userinfo = null
            state.token = null
            localStorage.removeItem("key")
            localStorage.removeItem("user")
        }
    }
})


export const {setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer