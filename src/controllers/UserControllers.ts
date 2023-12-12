import { Request, Response } from 'express';
import userService from '@/services/UserService';
import mongoose from 'mongoose';

class UserController {
  public getUsers = async (req: Request, res: Response) => {
    const user = await userService.getAll(
      {
        _id: new mongoose.Types.ObjectId('657373c3ccd31486170b3196'),
      },
      {
        projection: {
          // _id: false,
        },
      },
    );
    user.forEach(user => {
      console.log(user?._id);
    });
    res.send(user);
  };
}

export default new UserController();
