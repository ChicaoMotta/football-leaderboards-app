import * as jwt from 'jsonwebtoken';
import { Token } from '../Interfaces/token';

const secret = process.env.JWT_SECRET;

const createToken = (email: string, role: string): Token | void => {
  const payload = {
    email,
    role,
  };
  if (secret) {
    const token = jwt.sign(payload, secret);
    return { token };
  }
};

const decodeToken = (token: string) => {
  if (secret) {
    try {
      const decoded = jwt.verify(token, secret);
      // console.log(decoded);
      return decoded as { email: string, role: string };
    } catch (er) {
      return false;
    }
  }
  return false;
};

export { createToken, decodeToken };
