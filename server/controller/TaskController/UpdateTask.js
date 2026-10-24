
import { Task } from "../../models/TaskModel.js";

export const UpdateTask = async (req, res) => {
  try {
    const { TaskTittle, discription, subject, periority } = req.body;

    if (
      typeof TaskTittle !== "string" ||
      !TaskTittle.trim()
    ) {
      return res.status(400).json({
        message: "Task title is required",
      });
    }

    const updatedTask = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        owner: req.userId,
      },
      {
        $set: {
          TaskTittle: TaskTittle.trim(),
          discription,
          subject,
          periority,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    return res.status(200).json({
      message: "Task updated successfully",
      task: updatedTask,
    });

  } catch (error) {
    console.error("UpdateTask error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid task ID",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Unable to update task",
    });
  }
};
