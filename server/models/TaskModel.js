
import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  TaskTittle: {
    type: String,
    required: [true, "Task title is required"],
    trim: true,
    maxlength: [100, "Task title cannot exceed 100 characters"],
  },

  discription: {
    type: String,
    trim: true,
    maxlength: [200, "Description cannot exceed 200 characters"],
    default: "",
  },

  periority: {
    type: String,
    required: [true, "Task priority is required"],
    enum: {
      values: ["low", "medium", "high"],
      message: "Priority must be low, medium, or high",
    },
    default: "medium",
  },

  subject: {
    type: String,
    trim: true,
    maxlength: [100, "Subject cannot exceed 100 characters"],
    default: "",
  },

  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Task owner is required"],
    index: true,
  },
});

export const Task = mongoose.model("Task", TaskSchema);
