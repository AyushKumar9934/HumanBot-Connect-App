import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";


const SingleMessage = ({message}) => {
  const scroll=useRef();
  const authUser=useSelector(store=>store.user.authuser);
  const selectedUser=useSelector(store=>store.user.selectedUser)
  //console.log("authUser in singleMessage is ",authUser)
  useEffect(()=>{

    scroll.current?.scrollIntoView({behaviour:'smooth'})
  },[message])
  return (
    <div>
      <div ref={scroll} className={`chat ${authUser?._id===message?.senderId?'chat-end':'chat-start'}  `}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src={message.senderId===authUser?._id?authUser?.profilePhoto:selectedUser.profilePhoto}
            />
          </div>
        </div>
        <div className="chat-header">
          
          <time className="text-xs opacity-50 text-white">12:45</time>
        </div>
        <div className={`chat-bubble ${authUser?._id===message?.senderId?'':'bg-gray-200 text-black'}` }>{message?.message}</div>
       
      </div>
    </div>
  );
};

export default SingleMessage;
