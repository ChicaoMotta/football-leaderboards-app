import { Request, Response } from 'express';
import TeamService from '../services/team.service';

export default class TeamController {
  constructor(private teamService = new TeamService()) { }

  async getTeams(_req: Request, res: Response) {
    const serviceResponse = await this.teamService.getAll();
    return res.status(200).json(serviceResponse.data);
  }

  async getTeamByID(req: Request, res: Response) {
    const { id } = req.params;
    const serviceResponse = await this.teamService.getById(Number(id));
    return res.status(200).json(serviceResponse.data);
  }
}
