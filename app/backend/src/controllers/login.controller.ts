// import IUser from 'src/Interfaces/IUser';
import { Request, Response } from 'express';
import { createToken } from '../utils/jwt';
// import LoginService from '../services/login.service';

export default class LoginController {
  // constructor(private loginService = new LoginService()) { }

  static getUser(req: Request, res: Response) {
    const { email, role } = req.body;
    const token = createToken(email, role);
    return res.status(200).json(token);
  }

  static getRole(req: Request, res: Response) {
    const { role } = req.body;
    return res.status(200).json({ role });
  }
}
