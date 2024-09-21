import React, { useState } from 'react'
import { IoMdSearch } from "react-icons/io";
import OtherUsers from './OtherUsers';
import { IoLogOut } from 'react-icons/io5';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser, setOtherUsers } from '../redux/userSlice.js';


const Sidebar = () => {
  const [search,setSearch]=useState('')
  const otherUsersWeHavetoSet=useSelector(store=>store.user.OtherUsers)
  
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const logoutHandler=async()=>{
    try{
      axios.defaults.withCredentials=true;//to write it not not matter as we are not checking for authentication for logout 
      // const res=await axios.get('http://localhost:3000/logout')
      const res=await axios.get('https://humanbot-connect-app.onrender.com/logout')
      console.log("res in logout function",res);
      navigate('/login');
      toast.success(res.data.message);
      dispatch(setAuthUser(null))

    }catch(err){
    console.log("error in logoutHandler",err);

    }
  }
  const searchSubmitHandler=(e)=>{
    e.preventDefault();
    const filteredUser= otherUsersWeHavetoSet.find((user)=>user.fullName.toLowerCase().includes(search.toLowerCase()))
 
    if(filteredUser){
      dispatch(setOtherUsers([filteredUser]))
    }
    else{
      toast.error('user not found')

    }
    
  }
  return (
    <div className='border-r rorder-slate-500 p-4 flex flex-col '>
        <form onSubmit={(e)=>searchSubmitHandler(e)}  action="" className='flex items-center gap-2'>
            <input value={search} onChange={(e)=>setSearch(e.target.value)} className='input input-bordered rounded-md  ' type="text"   placeholder='Search...'/>
            <button type='submit' className='btn  bg-sky-slate-500 '>
            <IoMdSearch size={"24px"} />
            </button>
           
        </form>
        <div className="divider px-3"></div>
        
        <OtherUsers />

        
        <div className='mt-5' >
            <button onClick={logoutHandler} className='btn btn-sm'>Logout</button>
        </div>
    </div>
  )
}

export default Sidebar