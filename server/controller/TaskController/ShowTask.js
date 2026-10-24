
import { Task } from "../../models/TaskModel.js";

export const ShowTask = async (req, res) => {
    try {
        const Alltasks = await Task.find({ owner: req.userId })
            .select("TaskTittle discription periority status");

        return res.status(200).json(Alltasks);

    } catch (error) {
        console.error("ShowTask error:", error);

        return res.status(500).json({
            message: "Request got denied"
        });
    }
};
