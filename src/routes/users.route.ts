import { Router } from 'express';
import { Routes } from '@/interfaces/routes';
import UserControllers from '@/controllers/UserControllers';

export class UserRoute implements Routes {
  public path: string;
  public router = Router();

  constructor(path: string) {
    this.path = path;
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, UserControllers.getUsers);
  }
}
