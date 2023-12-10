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
