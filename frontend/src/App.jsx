import React, { useEffect, useState } from 'react'
import HomePage from './components/HomePage'
import SignUp from './components/SignUp'
import Login from './components/Login'

import {Routes,Route} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import io from 'socket.io-client'
import { setSocket } from './redux/socketSlice.js'
import { setOnlineUser } from './redux/userSlice.js'
const App = () => {
const {authuser}=useSelector(store=>store.user)
const {socket} =useSelector(store=>store.socket)

const dispatch=useDispatch();

useEffect(()=>{
  if(authuser){
    console.log("the auther user is",authuser)
    const tempsocket=io('http://localhost:3000',{
      query:{userId:authuser._id}


    });
  dispatch(setSocket(tempsocket));
  tempsocket.on('getOnlineUsers',(onlineUser)=>{
   dispatch( setOnlineUser(onlineUser))

  })
  return ()=>tempsocket.close();
  }
  else{
    if(socket){
      socket.close();
      dispatch(setSocket(null));
    }
  }
},[authuser])

  return (
    // <div><button className="btn btn-secondary">Secondary</button></div>
    <div className="p-4 h-screen flex items-center justify-center">
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App