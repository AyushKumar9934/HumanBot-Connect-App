// import React, { useEffect } from "react";
// import SendInputMessage from "./SendInputMessage";
// import AllmessageSentByParticularUser from "./AllmessageSentByParticularUser";
// import { useDispatch, useSelector } from "react-redux";
// import { setSelectedUser } from "../redux/userSlice.js";

// const MessageContainer = () => {
//   const { selectedUser,authuser } = useSelector((store) => store.user);

//   const dispatch = useDispatch();
//   useEffect(() => {
//     return () => dispatch(setSelectedUser(null));
//   }, []);
//   return (
//     <>
//       {selectedUser !== null ? (
//         <div className="md:min-w-[550px] flex flex-col  ">
//           <div className="flex gap-2 items-center bg-zinc-800 text-white px-4 py-2  mb-2">
//             <div className="avatar online">
//               <div className="w-8 rounded-full">
//                 <img
//                   src={selectedUser ? selectedUser.profilePhoto : ""}
//                   alt="userprofile"
//                 />
//               </div>
//             </div>
//             <div className="flex flex-col flex-1">
//               <div className="flex justify-between gap-2">
//                 <p>{selectedUser?.fullName}</p>
//               </div>
//             </div>
//           </div>
         
//           <AllmessageSentByParticularUser />
        
//           <SendInputMessage />
//         </div>
//       ) : (
//         <div className="md:min-w-[550px] flex flex-col justify-center items-center">
//              <h1 className="text-4xl text-white font-bold ">Hi,{authuser?.fullName}</h1>
//             <h1 className="text-2xl text-white ">Let's Start Conversation</h1>
//         </div>
       
//       )}
//     </>
//   );
// };

// export default MessageContainer;
import React, { useEffect } from 'react';
import SendInputMessage from './SendInputMessage';
import AllmessageSentByParticularUser from './AllmessageSentByParticularUser';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../redux/userSlice.js';

const MessageContainer = () => {
  const { selectedUser, authuser } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => dispatch(setSelectedUser(null));
  }, []);

  return (
    <>
      {selectedUser !== null ? (
        <div className="flex flex-col w-full md:min-w-[550px] h-full">
          {/* Header Section */}
          <div className="flex gap-2 items-center bg-zinc-800 text-white px-4 py-2 mb-2">
            <div className="avatar online">
              <div className="w-8 rounded-full">
                <img
                  src={selectedUser ? selectedUser.profilePhoto : ''}
                  alt="userprofile"
                />
              </div>
            </div>
            <div className="flex flex-col flex-1">
              <div className="flex justify-between gap-2">
                <p>{selectedUser?.fullName}</p>
              </div>
            </div>
          </div>
          
          {/* Messages Section */}
          <AllmessageSentByParticularUser />
          
          {/* Input Section */}
          <SendInputMessage />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-full w-full md:min-w-[550px]">
          <h1 className="text-4xl text-white font-bold text-center">
            Hi, {authuser?.fullName}
          </h1>
          <h1 className="text-2xl text-white text-center">
            Let's Start a Conversation
          </h1>
        </div>
      )}
    </>
  );
};

export default MessageContainer;
