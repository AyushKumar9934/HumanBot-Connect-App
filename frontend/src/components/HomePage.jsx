// import React from 'react'
// import Sidebar from './Sidebar'
// import MessageContainer from './MessageContainer'
// import { useSelector } from 'react-redux'
// import { Navigate } from 'react-router-dom'

// const HomePage = () => {
//   const {authuser}=useSelector(store=>store.user);
 
//     if(!authuser){
//       return <Navigate to='/login' />;
//     }
  
//   return (
//     <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 border border-gray-100" '><Sidebar />
//     <MessageContainer/>
    
//     </div>
//   )
// }

// export default HomePage


import React from 'react';
import Sidebar from './Sidebar';
import MessageContainer from './MessageContainer';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const HomePage = () => {
  const { authuser } = useSelector(store => store.user);

  if (!authuser) {
    return <Navigate to='/login' />;
  }

  return (
    <div className="flex flex-col md:flex-row md:h-screen h-full w-full rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 border border-gray-100">
      <Sidebar />
      <MessageContainer />
    </div>
  );
};

export default HomePage;