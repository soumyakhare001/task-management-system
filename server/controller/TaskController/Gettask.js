
import { Task } from "../../models/TaskModel.js";

export const GetTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOne({
      _id: id,
      owner: req.userId,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    return res.status(200).json(task);

  } catch (error) {
    console.error("GetTaskById error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid task ID",
      });
    }

    return res.status(500).json({
      message: "Unable to fetch task",
    });
  }
};
