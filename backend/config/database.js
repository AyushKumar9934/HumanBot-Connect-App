import mongoose from 'mongoose';

const connectDB=async()=>{
    await mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log('Connected to mongoDb')
    }).catch(err=>{
        console.log('error in connecting mongoDb',err);
    })
}
export default connectDB;