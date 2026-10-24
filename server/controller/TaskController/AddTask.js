
import { Task } from "../../models/TaskModel.js";

export const AddTask = async (req, res) => {
  try {
    const { TaskTittle, discription, periority, subject } = req.body;

    // Validate title
    if (typeof TaskTittle !== "string" || !TaskTittle.trim()) {
      return res.status(400).json({
        message: "Task title is required",
      });
    }

    // Validate priority
    if (!["low", "medium", "high"].includes(periority)) {
      return res.status(400).json({
        message: "Priority must be low, medium, or high",
      });
    }

    // Ensure the request belongs to an authenticated user
    if (!req.userId) {
      return res.status(401).json({
        message: "Please log in to create a task",
      });
    }

    // Create task with the authenticated user as owner
    const createTask = await Task.create({
      TaskTittle: TaskTittle.trim(),
      discription:
        typeof discription === "string" ? discription.trim() : "",
      subject: typeof subject === "string" ? subject.trim() : "",
      periority,
      owner: req.userId,
      // status defaults to "pending" in the schema
    });

    return res.status(201).json({
      message: "Task created successfully",
      task: createTask,
    });
  } catch (error) {
    console.error("AddTask error:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: error.message,
      });
    }

    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid task data",
      });
    }

    return res.status(500).json({
      message: "Task could not be created",
    });
  }
};
