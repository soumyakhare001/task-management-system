
import { Task } from "../../models/TaskModel.js";

export const ShowTask = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        message: "Please log in to view your tasks",
      });
    }

    const tasks = await Task.find({
      owner: req.userId,
    }).select("TaskTittle discription periority status");

    // No tasks is a valid result, not an error.
    return res.status(200).json(tasks);
  } catch (error) {
    console.error("ShowTask error:", error);

    return res.status(500).json({
      message: "Unable to fetch tasks",
    });
  }
};
