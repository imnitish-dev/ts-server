import { Router } from 'express';
import { AuthRoute } from '@/routes/auth.route';
import { UserRoute } from '@/routes/users.route';
import { Routes } from '@/interfaces/routes';

const routes: Routes[] = [new AuthRoute('/auth'), new UserRoute('/users')];
class Route {
  public router = Router();

  constructor() {
    this.initializeRoutes(routes);
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.router.use('/', route.router);
    });
  }
}
export const myRoute = new Route();
export default routes;
