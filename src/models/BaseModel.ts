import mongoose from 'mongoose';

export type BaseModel = {
  _id?: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
};
