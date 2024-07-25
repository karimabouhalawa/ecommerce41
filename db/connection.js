import mongoose from 'mongoose';

export const dbConnection = ()=>{
    mongoose.connect(process.env.DB_Online)
    .then(()=>console.log("DB connected"))
    .catch((err)=>console.log(err));
}