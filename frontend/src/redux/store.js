import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice.js'
import messageReducer from './messageSlice.js'
import socketReducer from './socketSlice.js'
export const store = configureStore({
  reducer: {

    //we keep all other slice 
    socket:socketReducer,
    user:userReducer,
    message:messageReducer

  },
})