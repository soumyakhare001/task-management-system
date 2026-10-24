import { Task } from "../../models/TaskModel.js";




export const completeTask = async (req, res) => {
    try {
        const userId = req.userId;

        const task = await Task.findOneAndUpdate({ _id: req.params.id, owner: userId }, { status: "completed" },  {
        new: true,
        runValidators: true
      });

        if (!task) {
           return res.status(400).json({ message: "Task does not exits" });
        }
       console.log(task)
        return res.status(200).json((task))

    } catch (error) {
        return res.status(500).json({message:"Request got decline"});
    }


}