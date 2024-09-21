import React from "react";
import ParticularUser from "./ParticularUser";
import UseGetOtherUser from "../Hooks/UseGetOtherUser";
import { useSelector } from "react-redux";

const OtherUsers = () => {
  UseGetOtherUser();
  const {OtherUsers}=useSelector(store=>store.user)
  if(!OtherUsers)return ;

  return (
    <div className="overflow-auto  flex-1">
      {
        OtherUsers.map((user)=>{
          return (<ParticularUser key={user._id} user={user}/>)
        })
      }
     
    </div>
  );
};

export default OtherUsers;
