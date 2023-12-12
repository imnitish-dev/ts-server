import { prop, buildSchema } from '@typegoose/typegoose';
import mongoose, { Document, Model } from 'mongoose';
import { BaseModel } from './BaseModel';

export class User extends BaseModel {
  @prop()
  public username: string;

  @prop()
  public email: string;

  @prop()
  public password: string;
}

export default mongoose.model<Document>('User', buildSchema(User)) as Model<Document>;
