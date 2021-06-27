import { Express } from 'express';
import Auth from '../routes/auth.routes';
import Home from '../routes/home.routes';

const routesMiddleware = (app: Express) => {
  app.use('/', Auth);
  app.use('/', Home);
};

export default routesMiddleware;
