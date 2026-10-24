import { Task } from "../../models/TaskModel.js"



export const ShowTask = async (req, res) => {
    try {
        const Alltasks = await Task.find({ owner: req.userId }).select("TaskTittle discription periority status");
        if (Alltasks.length == 0) {
            return res.status(200).json({ message: "you do not have any task" });
        }
        return res.status(200).json(Alltasks)
    } catch (error) {
        res.status(500).json({ message: "Request got denied" })
    }

}