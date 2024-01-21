// import ITeam from '../Interfaces/ITeams';
import ITeam from '../Interfaces/ITeams';
import ITeamModel from '../Interfaces/ITeamsModel';
import Team from '../database/models/teams.models';

export default class TeamModel implements ITeamModel {
  private model = Team;

  async getAll(): Promise<ITeam[]> {
    const getTeams = await this.model.findAll();
    // console.log(getTeams);

    return getTeams;
  }

  async getByID(id: number): Promise<ITeam | null> {
    const getByPk = await this.model.findByPk(id);

    return getByPk;
  }
}
