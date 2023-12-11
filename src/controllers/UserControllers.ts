import { NextFunction, Request, Response } from 'express';
import userService from '@/services/UserService';

class UserController {
  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    const user = await userService.getAll(
      {
        email: {
          $regex: 'nitish' as string,
          $options: 'i',
        },
      },
      {
        projection: {
          _id: false,
        },
      }
    );
    user.forEach((user) => {
      console.log(user?._id);
    });
    res.send(user);
  };
}

export default new UserController();