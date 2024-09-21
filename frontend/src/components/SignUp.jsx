import React, { useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import axios from 'axios'
import toast from 'react-hot-toast'

const SignUp = () => {
    const [user,setUser]=useState({
        fullName:"",
        username:"",
        password:"",
        confirmPassword:"",
        gender:""
    })
    const navigate=useNavigate();
    const submitHandler=async(e)=>{
        e.preventDefault();
   try{

    
    const res=await axios.post(`http://localhost:3000/register`,user,{
        headers:{
            "Content-Type":'application/json'
        },
        withCredentials:true
    })
    console.log('res is ',res);
    
    if(res.data.success){
        navigate('/login')
        toast.success(res.data.message);


    }

   }
   catch(err){
    toast.error(err.response.data.message)
    console.log('error in try block is' ,err);

   }
        setUser({
            fullName:"",
            username:"",
            password:"",
            confirmPassword:"",
            gender:""
        })
    }
    const handleCheckbox=(gender)=>{
        setUser({...user,gender:gender})
    }
  return (
    // <div><div><button className="btn btn-secondary">Secondary</button></div></div>
    <div className='min-w-96 mx-auto'>

        <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100'>
        <h1 className='text-3xl font-bold text-center'>Signup</h1>
        <form onSubmit={submitHandler} method='POST'>
         <div>
         <label className="label p-2">
         <span className="text-base label-text">Full Name</span>
         </label>
         <input
             value={user.fullName}
            onChange={(e)=>setUser({...user,fullName:e.target.value})}
              type="text"
              className="w-full input input-bordered h-15"
              placeholder="Full Name"
            />
         </div>
         
         <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
                value={user.username}
                onChange={(e)=>setUser({...user,username:e.target.value})}
              type="text"
              className="w-full input input-bordered h-15"
              placeholder="Username"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              value={user.password}
              onChange={(e)=>setUser({...user,password:e.target.value})}
              type="password"
              className="w-full input input-bordered h-15"
              placeholder="Password"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              value={user.confirmPassword}
              onChange={(e)=>setUser({...user,confirmPassword:e.target.value})}
              type="password"
              className="w-full input input-bordered h-15"
              placeholder="Confirm Password"
            />
          </div>
          <div className="flex items-center my-4">
            <div className="flex items-center">
              <p>Male</p>
              <input type="checkbox" checked={user.gender==='male'} onChange={()=>handleCheckbox('male')} defaultChecked className="checkbox mx-2" />
            </div>
            <div className="flex items-center">
              <p>Female</p>
              <input type="checkbox" checked={user.gender==='female'} onChange={()=>handleCheckbox('female')} defaultChecked  className="checkbox mx-2" />
            </div>
          </div>



          <p className="text-center">
            Already Have an account? <Link to="/login">Login</Link>
          </p>
          <button type='submit' className="btn btn-block btn-md mt-2 border border-slate-700 ">SignUp</button>

        </form>
      
          
        </div>

    </div>

  )
}

export default SignUp