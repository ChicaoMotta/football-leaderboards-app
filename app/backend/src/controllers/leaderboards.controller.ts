import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.service';

export default class LeaderboardController {
  constructor(private leaderboardService = new LeaderboardService()) { }
  async getHomeTeam(_req: Request, res: Response) {
    const serviceResponse = await this.leaderboardService.getTeams('home');
    return res.status(200).json(serviceResponse);
  }

  async getAwayTeam(_req: Request, res: Response) {
    const serviceResponse = await this.leaderboardService.getTeams('away');
    return res.status(200).json(serviceResponse);
  }

  async getAllMatchScores(_req: Request, res: Response) {
    const serviceResponse = await this.leaderboardService.getTeams('all');
    return res.status(200).json(serviceResponse);
  }
}
