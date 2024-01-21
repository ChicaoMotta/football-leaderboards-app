import { NextFunction, Request, Response } from 'express';
import TeamModel from '../models/team.model';

const validateMatchParams = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeamId, awayTeamId } = req.body;
  if (homeTeamId === awayTeamId) {
    return res.status(422)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }

  const teamModel = new TeamModel();
  const findHomeTeam = await teamModel.getByID(homeTeamId);
  const findAwayTeam = await teamModel.getByID(awayTeamId);

  if (!findAwayTeam || !findHomeTeam) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }

  next();
};

export default validateMatchParams;
