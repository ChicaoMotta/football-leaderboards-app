// import { Response, Request } from 'express';
// import ITeam from '../Interfaces/ITeams';
import ITeamModel from '../Interfaces/ITeamsModel';
import TeamModel from '../models/team.model';

export default class TeamService {
  constructor(private TeamMod: ITeamModel = new TeamModel()) { }

  async getAll() {
    const findAll = await this.TeamMod.getAll();

    return { status: 'ok', data: findAll };
  }

  async getById(id: number) {
    const getTeamById = await this.TeamMod.getByID(id);
    if (!getTeamById) return { status: 'null', data: { message: 'Team not found' } };
    return { status: 'ok', data: getTeamById };
  }
}
