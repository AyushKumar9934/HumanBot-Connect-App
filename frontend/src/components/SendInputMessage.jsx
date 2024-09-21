import React, { useState } from "react";
import { IoSendSharp } from "react-icons/io5";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";


const SendInputMessage = () => {
  const [message,setInputMessageInThisCompOnly]=useState('')
 
  const dispatch=useDispatch();
  const {selectedUser}=useSelector(store=>store.user)
  let newMessage=useSelector(store=>store.message.message) 
  console.log("new message in sendInputMessageComp",newMessage);

  //newMessage=newMessage?newMessage:[];

  
  const handleSubmit=async (e)=>{
    e.preventDefault();
    
   try{
   const   res=await axios.post(`http://localhost:3000/send/${selectedUser?._id}`,{message},{
      headers:{
          "Content-Type":'application/json'
      },
      withCredentials:true
  }
  
         
    )
    
   
    //dispatch(setMessages([...newMessage,res.data.newMessage]))
    dispatch(setMessages([...newMessage, res.data.newMessage]));
    setInputMessageInThisCompOnly('');



   }catch(err){
    console.log("new message in sendInputMessageComp",newMessage);
    console.log("newArray is ",newMessage.message,Array.isArray(newMessage));
// console.log("res.data.newMessage",res.data.newMessage,Array.isArray(res.data.newMessage));
    console.log('err in sending message in SendInputMessage',err);
   }

  }
  
  return (
    <div className="">
      <form onSubmit={handleSubmit} className="px-4 my-4" action="">
        <div className="w-full relative">
          <input
          value={message}
          onChange={(e)=>setInputMessageInThisCompOnly(e.target.value)}
            type="text"
            placeholder="Send a message..."
            className="border text-sm rounded-lg block p-3  border-zinc-500 text-white w-full bg-gray-500"
          />
          <button type='submit' className="absolute inset-y-0 end-2 fext items-center">
          <IoSendSharp />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendInputMessage;
