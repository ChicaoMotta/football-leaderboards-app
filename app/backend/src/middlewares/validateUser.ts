import { NextFunction, Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
// import { emailSchema, passSchema } from '../schemas/user.schema';
import LoginService from '../services/login.service';

const invalidMessage = 'Invalid email or password';
const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

const validateUserFromDB = async (
  email: string,
  password: string,
): Promise<false | { role: string }> => {
  const loginService = new LoginService();
  const getUser = await loginService.getUser(email);

  if (getUser.status === 'null') return false;

  const { password: passwordFromDb } = getUser.data;

  let validatePassword;

  if (passwordFromDb) {
    validatePassword = bcrypt.compareSync(password, passwordFromDb);
  }

  if (!validatePassword) return false;

  if (getUser.data.role) {
    return {
      role: getUser.data.role,
    };
  }
  return false;
};

const validateUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  // try {
  //   const resultEmail = emailSchema.parse({ email });
  //   const resultPass = passSchema.parse({ password });
  //   console.log(resultEmail);
  //   console.log(resultPass);
  // } catch (err) {
  //   console.log(err);
  //   return res.status(400).json(err);
  // }

  if (!email || !password) return res.status(400).json({ message: 'All fields must be filled' });

  const isValidEmail = emailRegex.test(email);
  if (!isValidEmail) return res.status(401).json({ message: invalidMessage });

  if (password.length < 6) {
    return res.status(401).json({ message: invalidMessage });
  }

  const validatedUserFromDb = await validateUserFromDB(req.body.email, req.body.password);
  if (!validatedUserFromDb) {
    return res.status(401).json({ message: invalidMessage });
  }
  if (validatedUserFromDb.role) {
    const { role } = validatedUserFromDb;
    req.body.role = role;
  }

  next();
};

export default validateUser;
