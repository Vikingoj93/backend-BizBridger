import { Schema, model, models } from "mongoose";
import { INotes } from "../../../types/diary";

const noteSchema = new Schema({
    userId: {
        type: Schema.ObjectId,
        ref: 'User',
        require: true
    },
      description: {
        type: String,
        required: true,
        trim: true,
        maxlength: 250,
      },
      category: {
        type: String,
        required: true,
      },
      Date: {
        type: String,
        required: true
      },
})

export const Note = models.Note || model<INotes>('Note', noteSchema);