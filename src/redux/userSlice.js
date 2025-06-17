import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name : "user",
    initialState : {
        userinfo : null,
        token : null
    },
    reducers : {
        setUser :(state,action)=>{
            state.userinfo = action.payload.user
            state.token = action.payload.token
        },
        logoutUser :(state)=>{
            state.userinfo = null
            state.token = null
        }
    }
})


export const {setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer