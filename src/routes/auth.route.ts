import { Routes } from '@/types/routes';
import { Router } from 'express';

export class AuthRoute implements Routes {
  public path: string;
  public router = Router();

  constructor(path: string) {
    this.path = path;
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, (_req, res) => {
      res.send('auth');
    });
  }
}
