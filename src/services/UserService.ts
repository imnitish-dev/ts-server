import { Document, Model } from 'mongoose';
import { BaseServices } from './BaseService';
import UserModel, { User } from '@/models/UserModel';

class UserService extends BaseServices<Document, User> {
  constructor(model: Model<Document>) {
    super(model);
  }
}

export default new UserService(UserModel);
