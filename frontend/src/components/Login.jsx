import React, { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from 'react-redux'
import {setAuthUser} from '../redux/userSlice.js'


const Login = () => {
    const [user,setUser]=useState({
       
        username:"",
        password:"",
       
    })
    const navigate=useNavigate();
    const dispatch = useDispatch()
    const submitHandler=async(e)=>{
        console.log(user);
        e.preventDefault();
        try{
    
            // const res=await axios.post(`http://localhost:3000/login`,user,{
              const res=await axios.post(`https://humanbot-connect-app.onrender.com/login`,user,{
                headers:{
                    "Content-Type":'application/json'
                },
                withCredentials:true
            })
            console.log("res is ",res);
            if(res.data){
                
               
                navigate('/')
                toast.success(`Logged in successfully`);
               dispatch(setAuthUser(res.data));//jo function(reducer function state change karne wala) hamne import kiya hai use di
        
        
            }
        
           }
           catch(err){
           
           console.log("err is ",err);
            toast.error(err.response.data.message)
           
        
           }

        // setUser({
           
        //     username:"",
        //     password:"",
            
        // })


    }
  return (
    // <div><div><button className="btn btn-secondary">Secondary</button></div></div>
   
    <div className="min-w-96 mx-auto">
      <div className="md:min-w-[550px]  my-3 flex flex-col justify-center items-center">
           
           <h1 className="text-4xl text-white  font-bold   ">Human Bot Connect</h1>
       </div>
       
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100">
     
        <h1 className="text-3xl font-bold text-center">Login</h1>
        <form onSubmit={submitHandler} method="POST">
         

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
          
         

          <p className="text-center py-4 ">
            Not Have an account? <Link to="/register">Signup</Link>
          </p>
          <button type="submit" className="  btn btn-block btn-md mt-2 border border-slate-700 ">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
