import { Router } from 'express';

// CONTROLLERS
import UserController from './app/controllers/UserController';
import ClientController from './app/controllers/ClientController';
import SessionController from './app/controllers/SessionController';

// MIDDLEWARES
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/signUp', UserController.store);
routes.post('/sessions', SessionController.store);
routes.use(authMiddleware);
routes.post('/client', ClientController.store);
routes.get('/clients', ClientController.index);

export default routes