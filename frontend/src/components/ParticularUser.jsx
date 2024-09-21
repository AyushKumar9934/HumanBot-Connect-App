import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import {setSelectedUser} from '../redux/userSlice'

const ParticularUser = ({user}) => {
  const dispatch=useDispatch();
  const {selectedUser,onlineUser}=useSelector(store=>store.user)
  const selectedUserId=selectedUser?selectedUser._id:null;
  const userId=user._id;
  const isOnline=onlineUser?.includes(user._id)
  
  const selectedUserHandler=(user)=>{

    dispatch(setSelectedUser(user))

  }
  return (
    <div>
    <div onClick={(e)=>selectedUserHandler(user)} className={`${selectedUserId===userId?'bg-zinc-200 flex':'flex'} gap-2 items-center hover:bg-zinc-200 rounded p-2 cursor-pointer`}>
      <div className={`avatar ${isOnline?'online':''}  `}>
        <div className="w-8 rounded-full">
          <img
            src={user.profilePhoto} alt="userprofile"
          />
        </div>
      </div>
      <div className="flex flex-col flex-1">
        <div className="flex justify-between gap-2">
          <p>{user?.fullName}</p>
        </div>
      </div>
    </div>

<div className="divider my-0 py-0 h-1"></div>

    </div>
  )
}

export default ParticularUser