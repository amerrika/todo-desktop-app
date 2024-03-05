const mongoose = require("mongoose");

const { Schema } = mongoose;

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    priority: {
      type: String,
      required: false,
    },
    isComplete: {
      type: Boolean,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("task", taskSchema);
module.exports = Task;
