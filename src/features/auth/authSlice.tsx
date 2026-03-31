import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userDetails:{
    name:"",
    email:"",
    role:"",
    token:""
  }
}

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    updateUser: (state,action) => {
      console.log("action.payload",action.payload);
      
      // window.localStorage.setItem("userInfo",JSON.stringify(action.payload))
      state.userDetails = {...action.payload}
    },
    logout:(state)=>{
        state.userDetails={...initialState.userDetails}
        window.localStorage.clear()
    }
  },
})

// Action creators are generated for each case reducer function
export const { updateUser,logout } = authSlice.actions

export default authSlice.reducer