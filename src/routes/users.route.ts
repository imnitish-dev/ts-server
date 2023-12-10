import { Router } from 'express';
import { Routes } from '@/interfaces/routes';
import userService from '@/services/UserService';
import { IUser } from '@/models/UserModel';

export class UserRoute implements Routes {
  public path: string;
  public router = Router();

  constructor(path: string) {
    this.path = path;
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, async (_req, res) => {
      const data: IUser = {
        username: 'Nitish',
        email: 'nitish@fjfj.com',
        password: '123456',
      };

      const newUser = await userService.create(data);
      console.log(newUser?.toJSON());
      const user = await userService.getAll(
        {
          email: 'Nitish',
        },
        {
          projection: {
            _id: false,
          },
        }
      );
      res.send(user);
    });
  }
}
