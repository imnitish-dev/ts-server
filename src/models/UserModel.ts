import mongoose, { Document, Model, Schema } from 'mongoose';
import { IBaseDocument } from '@models/BaseModel';

export interface IUser extends IBaseDocument {
  username: string;
  email: string;
  password: string;
}
interface UserDocument extends IUser, Document {}

export const userSchema = new Schema<UserDocument>({
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
