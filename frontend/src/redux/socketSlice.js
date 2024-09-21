import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 socket:null,
 
}

export const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    
    setSocket: (state, action) => {
      state.socket= action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setSocket } = socketSlice.actions

export default socketSlice.reducer