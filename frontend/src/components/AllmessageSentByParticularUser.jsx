import React from 'react'
import SingleMessage from './SingleMessage'
import UseGetMessages from '../Hooks/UseGetMessages'
import { useSelector } from 'react-redux';
import UseGetRealTimeMessage from '../Hooks/UseGetRealTimeMessage';

const AllmessageSentByParticularUser = () => {
  UseGetRealTimeMessage();
  UseGetMessages();
 
   const {message}=useSelector(store=>store.message);
   
    

  
  return (
    <div className='px-4 flex-1 overflow-auto '>
      {
       message&& message.length>0 && message.map((message)=>{
          return (
            <SingleMessage key={message._id} message={message}/>
          )
        })
      }
    


    </div>
  )
}

export default AllmessageSentByParticularUser