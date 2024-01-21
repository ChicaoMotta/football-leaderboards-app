import { Request, Response, Router } from 'express';
import validateToken from '../middlewares/validateToken';
import LoginController from '../controllers/login.controller';
import validateUser from '../middlewares/validateUser';

// const loginController = new LoginController();

const route = Router();

route.post('/', validateUser, (req: Request, res: Response) => LoginController.getUser(req, res));
route.get(
  '/role',
  validateToken,
  (req: Request, res: Response) => LoginController.getRole(req, res),
);

export default route;
