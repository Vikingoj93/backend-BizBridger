import { Schema, model, models } from "mongoose";
import { ITask } from "../../../types/diary";

const taskSchema = new Schema({
    userId: {
        type: Schema.ObjectId,
        ref: 'User',
        require: true
    },
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 40,
      },
      description: {
        type: String,
        required: true,
        trim: true,
        maxlength: 250,
      },
      Date: {
        type: String,
      },
      required: {
        type: Boolean,
      },
      category: {
        type: String,
        required: true,
      },
})

export const Task = models.Task || model<ITask>('Task', taskSchema);