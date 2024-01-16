import { Schema } from "mongoose";

export interface IEvent {
  title: string;
  description: string;
  Date: string;
  required: boolean;
  Time: string;
  category: string;
}
export interface ITask {
  title: string;
  description: string;
  Date: string;
  required: boolean;
  category: string;
}
export interface INotes {
  description: string;
  category: string;
  Date: String
}
