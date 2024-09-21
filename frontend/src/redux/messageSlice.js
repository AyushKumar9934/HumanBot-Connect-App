import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 message:[],
}

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    
    setMessages: (state, action) => {
      state.message= action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setMessages } = messageSlice.actions

export default messageSlice.reducer