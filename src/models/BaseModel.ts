import { prop } from '@typegoose/typegoose';
import { ObjectId } from 'mongoose';

export class BaseModel {
  @prop()
  public _id!: ObjectId;

  @prop()
  public createdAt: Date;

  @prop()
  public updatedAt: Date;
}
