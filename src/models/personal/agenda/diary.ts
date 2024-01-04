import { Schema, model, models } from "mongoose";
import { IEvent } from "../../../types/diary";

const eventSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
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
    required: true,
  },
  required: {
    type: Boolean,
  },
  Time: {
    type: null || String,
  },
  category: {
    type: String,
    required: true,
  },
});

export const Event = models.Event || model<IEvent>("Event", eventSchema);
