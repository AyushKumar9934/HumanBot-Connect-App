import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  authuser: null,
  OtherUsers:null,
  selectedUser:null,
  onlineUser:null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {   //in reducer action is there ,which helps to change the data
    setAuthUser: (state,action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
    state.authuser=action.payload
    },
    setOtherUsers:(state,action)=>{
      state.OtherUsers=action.payload
    },
  setSelectedUser:(state,action)=>{
    state.selectedUser=action.payload;
  },
  setOnlineUser:(state,action)=>{
    state.onlineUser=action.payload;
  }
   

  
   
  },
})

// Action creators are generated for each case reducer function
export const { setAuthUser,setOtherUsers,setSelectedUser,setOnlineUser } = userSlice.actions

export default userSlice.reducer