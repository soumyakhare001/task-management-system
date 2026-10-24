import { Task } from "../../models/TaskModel.js";

export const GetTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const task = await Task.findOne({
      _id: id,
      owner: userId,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    return res.status(200).json(task);
  } catch (error) {
    console.log("GetTaskById error:", error);

    return res.status(500).json({
      message: "Unable to fetch task",
    });
  }
};