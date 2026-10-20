import mongoose from "mongoose";


export const ConnectDb=async()=>{
    try {
         await mongoose.connect(process.env.MONGO_URL);
         console.log("database got connected");
    } catch (error) {
        console.log("database connection got failed!!",error.name,error.message);
    }
   
}