import {Schema} from 'mongoose'

export interface IEvent {
  title: string;
  description: string;
  Date: string;
  required: boolean;
  Time: string;
  category: string;
}
