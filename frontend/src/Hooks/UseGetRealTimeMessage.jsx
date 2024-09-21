import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setMessages } from '../redux/messageSlice.js';

const UseGetRealTimeMessage = () => {
    const {socket}=useSelector(store=>store.socket)
    const dispatach=useDispatch();
 const  {message}=useSelector(store=>store.message)
      
    // console.log('socket is ',socket)
    console.log("message is ",message)
useEffect(()=>{
socket.on('newMessage',(newMessage)=>{
    console.log('it is happing or not',newMessage)
    dispatach(setMessages([...message,newMessage]))

})

},[socket,setMessages,message])
}

export default UseGetRealTimeMessage