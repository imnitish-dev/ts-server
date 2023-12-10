import { Router } from 'express';

export interface Routes {
  path?: string;
  router: Router;
}

class IndexRoute implements Routes {
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', (req, res) => {
      res.send('hello');
    });
  }
}

export default new IndexRoute();
