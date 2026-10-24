//what is owner-owner is the one who is allowed to see,update,deleted and add task apart from owner no one is allowed untill and unless you decide to let them

import mongoose from "mongoose";


const TaskSchema=new mongoose.Schema({
    TaskTittle:{
        type:String,
        required:true,
    },
    discription:{
        type:String,
         maxlength: [200, "Description cannot exceed 200 characters"]
    },
    periority:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:"pending"
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId, // Types.ObjectId is used to store a unique ID that identifies a document in MongoDB.
        ref:"User"
    }
})

export const Task=mongoose.model("Task",TaskSchema);