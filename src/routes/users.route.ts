import { Routes } from '@/interfaces/routes';
import { Router } from 'express';

export class UserRoute implements Routes {
  public path:string;
  public router = Router();

  constructor(path: string) {
    this.path = path;
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, (_req, res) => {
      res.send('user');
    });
  }
}
