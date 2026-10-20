import { Task } from "../../models/TaskModel.js";


export const AddTask=async(req,res)=>{
    try {
        const{TaskTittle,discription,periority}=req.body;

    if(!TaskTittle||!periority){
        return res.status(400).json({message:"Incomplete task info"});
    }
    const userId=req.userId;
    const createTask=await Task.create({
      TaskTittle,
      discription,
      periority,
      owner:userId
    });
    return res.status(200).json({message:"Task got Created"});

    } catch (error) {
        return res.status(500).json({message:"Task can not be created"});
    }
    


}
