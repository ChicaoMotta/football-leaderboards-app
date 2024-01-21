// import ITeam from './ITeams';

import ITeam from './ITeams';

export default interface ITeamModel {
  getAll(): Promise<ITeam[]>;
  getByID(id: number): Promise<ITeam | null>
  //   getOne(id: number): ITeam;
}
