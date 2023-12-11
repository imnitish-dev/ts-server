import mongoose, { Document, Model, Schema, Types } from 'mongoose';
import { BaseModel } from '@models/BaseModel';

export type User = BaseModel & {
  username: string;
  email: string;
  password: string;
};

const userSchema = new Schema<User & Document>({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model<Document>('User', userSchema) as Model<Document>;
