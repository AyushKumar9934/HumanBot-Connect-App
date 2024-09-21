import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setOtherUsers } from '../redux/userSlice.js'

const UseGetOtherUser = () => {
    const dispatch=useDispatch();
 useEffect(()=>{
   const fetchOtherUsers=async()=>{
    try{
        axios.defaults.withCredentials=true;
        const res=await axios.get(`http://localhost:3000/`)
     
        dispatch(setOtherUsers(res.data))

    }
    catch(err){
        console.log("error in fetching other User",err)
    }
   }
   fetchOtherUsers();
 },[])
}

export default UseGetOtherUser