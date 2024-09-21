import { Conversation } from "../models/conversationModel.js";
import {Message} from '../models/messageModel.js'
import { getReciverSocketId, io } from "../index.js";
import axios from 'axios'
import Groq from "groq-sdk";
export const sendMessage=async (req,res)=>{
    try{
        let senderId=req.id   //loggedinuser
        let  receiverId=req.params.id;
        let {message}=req.body;
        //kiske kiske beech conversation chal raha hai 
        
        let gotConversation=await Conversation.findOne({
            participants:{$all :[senderId,receiverId]}
            
        })
        if(!gotConversation){
            gotConversation=await Conversation.create({
                participants:[senderId,receiverId]
            })
        }
        const newMessage=await Message.create({
          senderId,receiverId,message
        })
        if(newMessage){
            gotConversation.message.push(newMessage._id);
        }
         await Promise.all([gotConversation.save(),newMessage.save()])
         //socket io implementation
         const receiverSocketId=getReciverSocketId(receiverId);
            console.log("receiverSocketId is",receiverSocketId)
         if(receiverSocketId){
          io.to(receiverSocketId).emit('newMessage',newMessage)
         }
          res.status(201).json({
            newMessage:newMessage,
         })
        
       
         //chatModel Implement
         if(receiverId===`66e52aee115b3f7529e13bff`){
            let temp=senderId;
            senderId=receiverId;
            receiverId=temp;
            console.log('receiverId in this is chat ai is',receiverId)

            const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
        //     const senderId= req.params.id      chatgpt is now sender;
        // const  receiverId=req.id     loggedin User is receiver

        message=message?message:'Hare Krishna Lets start '
       // const chatAIres=await axios.post('http://localhost:3000/openai',{message})//this endpoint made by me 
        async function getGroqChatCompletion(message) {
            return groq.chat.completions.create({
              messages: [
                {
                  role: "user",
                  content: `${message} .write in maximum 1-2 lines.`,
                },
              ],
              model: "llama3-8b-8192",
            });
          }
          const chatCompletion = await getGroqChatCompletion(message);
        //kiske kiske beech conversation chal raha hai 
        let gotConversation=await Conversation.findOne({
            participants:{$all :[senderId,receiverId]}
            
        })
        if(!gotConversation){
            gotConversation=await Conversation.create({
                participants:[senderId,receiverId]
            })
        }
        const newMessage=await Message.create({
          senderId,receiverId,message:chatCompletion.choices[0]?.message?.content || ""
        })
        if(newMessage){
            gotConversation.message.push(newMessage._id);
        }
         await Promise.all([gotConversation.save(),newMessage.save()])
        // socket io implementation
         const receiverSocketId=getReciverSocketId(receiverId);
            console.log("receiverSocketId is",receiverSocketId)
         if(receiverSocketId){
          io.to(receiverSocketId).emit('newMessage',newMessage)
         }
         return res.status(201).json({
            newMessage:newMessage,
         })












         }
       
    }catch(err){
        console.log(err)
    }
}
export const giveOpenAiResponse=async(req,res)=>{
    try{
        const {message}=req.body;
          return res.status(201).json({newMessage:`Hare Krishna Pr it is coming from open Ai along with your message as ${message}`})


    }catch(error){
    console.log('error in  giving open ai response',error)

    }
}
export const getMessage=async(req,res)=>{
    try{
        const recieverId=req.params.id;
        const senderId=req.id;
       // console.log('recieverId and senderId is ',recieverId ,senderId);
        const conversation=await Conversation.findOne({

            participants:{$all:[senderId,recieverId]}
        }).populate("message")
        if(conversation){
    //    console.log("conversataion is",conversation.message);
       return res.status(200).json(conversation.message);}
       else{
        return res.status(200).json({message:[]})
       }


    }catch(err){
        const recieverId=req.params.id;
        const senderId=req.id;
        console.log('recieverId and senderId is ',recieverId ,senderId);
        console.log(" error in receving getMessage",err);
    }
}