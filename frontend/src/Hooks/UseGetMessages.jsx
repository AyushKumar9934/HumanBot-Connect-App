import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedUser } from '../redux/userSlice';
import { setMessages } from '../redux/messageSlice.js';

const UseGetMessages = () => {
    const {selectedUser}=useSelector(store=>store.user);
    const dispatch=useDispatch();
    //console.log("selected User is ",selectedUser)
   
   useEffect(()=>{
    const fetchMessage=async ()=>{
          
            try{
                console.log("selected userId is ",selectedUser._id);
                axios.defaults.withCredentials=true;
                // const res=await axios.get(`http://localhost:3000/${selectedUser._id}`)
                const res=await axios.get(`https://humanbot-connect-app.onrender.com/${selectedUser._id}`)
                dispatch(setMessages(res.data))
                
            }catch(err){
                console.log("it is in  usegetMessage hook  err",err)
            }
        
        
    }
    fetchMessage();
},[selectedUser])


}

export default UseGetMessages