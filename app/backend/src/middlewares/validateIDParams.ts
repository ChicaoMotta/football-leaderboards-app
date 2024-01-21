import { NextFunction, Request, Response } from 'express';
// import teamIdSchema from '../schemas/teamID.schema';

const ValidateParams = (req: Request, res: Response, next: NextFunction) => {
  const convertIdToNumber = {
    id: Number(req.params.id) };

  if (Number.isNaN(convertIdToNumber.id)) {
    return res.status(400).json({ message: 'Id param need to be a number' });
  }
  next();
};

export default ValidateParams;
