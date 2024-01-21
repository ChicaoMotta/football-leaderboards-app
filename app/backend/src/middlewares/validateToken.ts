import { NextFunction, Request, Response } from 'express';
import { decodeToken } from '../utils/jwt';
import LoginService from '../services/login.service';

const invalidMessage = 'Token must be a valid token';

const getRoleFromDB = async (decodedToken: { email: string, role: string }) => {
  const { email, role } = decodedToken;
  const loginService = new LoginService();
  const getUser = await loginService.getUser(email);
  if (!getUser) {
    return false;
  }

  if (getUser.data.role !== role) return false;

  return role;
};

const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  const rawToken = req.headers.authorization;
  if (!rawToken || rawToken?.length === 0) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const splitToken = rawToken.split(' ');
  const [,token] = splitToken;
  if (!token) return res.status(401).json({ message: invalidMessage });
  const decodedToken = decodeToken(token);
  if (!decodedToken) return res.status(401).json({ message: invalidMessage });

  const validatedToken = await getRoleFromDB(decodedToken as {
    email: string;
    role: string;
  });

  if (!validatedToken) return res.status(401).json({ message: invalidMessage });

  req.body.role = validatedToken;
  next();
};

export default validateToken;
