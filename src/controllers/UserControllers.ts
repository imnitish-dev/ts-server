import { Request, Response } from 'express';
import userService from '@/services/UserService';

class UserController {
  public getUsers = async (req: Request, res: Response) => {
    const user = await userService.getAll(
      {},
      {
        limit: 10,
        projection: {
          // _id: false,
        },
      },
    );
    res.send(user);
  };
}

export default new UserController();
