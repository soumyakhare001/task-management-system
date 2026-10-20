import { Task } from "../../models/TaskModel.js";



export const UpdateTask = async (req, res) => {
    try {
        const { TaskTittle, discription, periority } = req.body;
    const userId = req.userId;
    //find and update and give task id from params.id
    const Tasks = await Task.findByIdAndUpdate({ _id: req.params.id, owner:userId }, { TaskTittle, discription, periority }, { new: true, runValidators: true });
    if (!Tasks) {
        return res.status(400).json({ message: "you do not any task" });
    }
    return res.status(200).json({ message: "Task got updated",Task:Tasks});
    } catch (error) {
          return res.status(400).json({ message: "Request got denied" });
    }
  
}