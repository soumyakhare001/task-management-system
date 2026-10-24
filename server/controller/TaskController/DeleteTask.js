import { Task } from "../../models/TaskModel.js";



export const DeleteTask = async (req, res) => {
    try {
        const userId = req.userId;
        const Tasks = await Task.findOneAndDelete({ _id: req.params.id, owner: userId });
        if (!Tasks) {
            return res.status(404).json({
                message: "Task not found"
            });
        }
        return res.status(200).json({ message: "Task got deleted" });
    } catch (error) {
        return res.status(500).json({ message: "Request got denied" });
    }

}