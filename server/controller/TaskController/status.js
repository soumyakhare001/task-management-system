
import { Task } from "../../models/TaskModel.js";

export const completeTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        owner: req.userId
      },
      {
        $set: { status: "completed" }
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    return res.status(200).json(task);

  } catch (error) {
    console.error("Complete task error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid task ID"
      });
    }

    return res.status(500).json({
      message: "Unable to update task status"
    });
  }
};
