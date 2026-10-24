
import { Task } from "../../models/TaskModel.js";

export const AddTask = async (req, res) => {
  try {
    const { TaskTittle, discription, periority, subject, status } = req.body;

    if (!TaskTittle?.trim() || !periority) {
      return res.status(400).json({
        message: "Task title and priority are required",
      });
    }

    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized. Please log in.",
      });
    }

    const createTask = await Task.create({
      TaskTittle: TaskTittle.trim(),
      discription,
      periority,
      subject,
      status,
      owner: userId,
    });

    return res.status(201).json({
      message: "Task created successfully",
      task: createTask,
    });
  } catch (error) {
    console.error("AddTask error:", error);

    return res.status(500).json({
      message: "Task could not be created",
    });
  }
};
