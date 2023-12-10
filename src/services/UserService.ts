import { Document, Model } from 'mongoose';
import { BaseServices } from './BaseService';
import User, { IUser } from '@/models/UserModel';

class UserService extends BaseServices<Document, IUser> {
  constructor(model: Model<Document>) {
    super(model);
  }
}

export default new UserService(User);
