import { Request, Response } from 'express';
import MatchesService from '../services/match.service';

export default class MatchesController {
  constructor(private matchesService = new MatchesService()) {}

  async getAllTeams(req: Request, res: Response) {
    const { inProgress } = req.query;

    if (inProgress === 'true' || inProgress === 'false') {
      const validQuery = JSON.parse(inProgress);
      const serviceResponse = await this.matchesService.getFilterdTeams(validQuery);
      return res.status(200).json(serviceResponse.data);
    }

    const serviceResponse = await this.matchesService.getAllTeams();
    return res.status(200).json(serviceResponse.data);
  }

  async endMatch(req: Request, res: Response) {
    const { id } = req.params;

    await this.matchesService.endMatch(Number(id));
    return res.status(200).json({ message: 'Finished' });
  }

  async changeScore(req: Request, res: Response) {
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const { id } = req.params;
    await this.matchesService.changeScore(Number(homeTeamGoals), Number(awayTeamGoals), Number(id));
    return res.status(200).json({ message: 'rolou ze' });
  }

  async addMatch(req: Request, res: Response) {
    const { homeTeamGoals,
      awayTeamGoals,
      homeTeamId,
      awayTeamId } = req.body;

    const addedMatch = await this.matchesService.addMatch(
      homeTeamGoals,
      awayTeamGoals,
      homeTeamId,
      awayTeamId,
    );

    return res.status(201).json({ ...addedMatch.data });
  }
}
