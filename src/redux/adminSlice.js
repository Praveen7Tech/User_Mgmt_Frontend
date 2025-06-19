import { createSlice } from "@reduxjs/toolkit";


const AdminSlice = createSlice({
    name: "admin",
    initialState : {
        admininfo : JSON.parse(localStorage.getItem("admin")) || null,
        token : JSON.parse(localStorage.getItem("adminKey")) || null,
    },
    reducers : {
        setAdmin :(state,action)=>{
            state.admininfo = action.payload.admin
            state.token = action.payload.token

            localStorage.setItem("adminKey",JSON.stringify(action.payload.token))
            localStorage.setItem("admin", JSON.stringify(action.payload.admin))
        },
        logoutAdmin :(state)=>{
            state.admininfo = null
            state.token = null

            localStorage.removeItem("adminKey")
            localStorage.removeItem("admin")
        }
    }
})

export const {setAdmin, logoutAdmin} = AdminSlice.actions
export default AdminSlice.reducer;