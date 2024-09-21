import express from 'express'
import dotenv from 'dotenv';
dotenv.config({});
import connectDB from './config/database.js';
import userRouter from './routes/userRoute.js';
import cookieParser from 'cookie-parser'
import messageRouter from './routes/messageRoute.js'
import cors from 'cors';
import {Server} from 'socket.io'


const app=express();
const PORT=process.env.PORT || 8080

app.use(express.urlencoded({extended:true}))

app.use(express.json());
app.use(cookieParser());
const corsOption={
    origin:'https://human-bot-connect-app.vercel.app',
    credentials:true,
}
app.use(cors(corsOption))

app.use(userRouter)
app.use(messageRouter);


const server=app.listen(PORT,()=>{
    connectDB();
console.log(`server is listening at ${PORT}`) 
}) 


const io=new Server(server,{cors:{
    origin:['http://localhost:5173'],
    methods:['GET','POST']
}})

const userSocketMap={}//{userId->socketId}
export const getReciverSocketId=(receiverId)=>{
    return userSocketMap[receiverId];
}
io.on('connection',(socket)=>{

    console.log('user Connected',socket.id)
    const userId=socket.handshake.query.userId;
    if(userId!==undefined){
        userSocketMap[userId]=socket.id
    }
    io.emit('getOnlineUsers',Object.keys(userSocketMap))
    socket.on('disconnect',()=>{
        console.log('user disconnected',socket.id);
        delete userSocketMap[userId]
        io.emit('getOnlineUsers',Object.keys(userSocketMap))
    })
})

export {io}