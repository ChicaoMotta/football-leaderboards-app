import Team from '../database/models/teams.models';
import Matches from '../database/models/matches.models';

export default class MatchesModel {
  model = Matches;

  async getAllTeams() {
    const getTeamsFromDB = await this.model.findAll({
      // attributes: { exclude: ['home_team_id', 'away_team_id'] },
      include: [{ model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] }],
    });

    return getTeamsFromDB;
  }

  async getFilteredTeams(filterParam: boolean) {
    const getFilteredTeamsFromDb = await this.model.findAll({
      where: {
        inProgress: filterParam,
      },
      // attributes: { exclude: ['home_team_id', 'away_team_id'] },
      include: [{ model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] }],
    });

    return getFilteredTeamsFromDb;
  }

  async endMatch(id: number) {
    await this.model.update({ inProgress: false }, { where: {
      id,
    } });
  }

  async changeScore(homeTeamScore:number, awayTeamScore:number, matchID:number) {
    await this.model
      .update({ homeTeamGoals: homeTeamScore, awayTeamGoals: awayTeamScore }, {
        where: {
          id: matchID,
        },
      });
  }

  async addMatch(
    homeTeamId : number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ) {
    const addedMatch = await this.model.create({
      homeTeamGoals,
      awayTeamGoals,
      homeTeamId,
      awayTeamId,
      inProgress: true,
    });

    return addedMatch;
  }
}

// const a = 'a';

// const b = parseInt(a, 10);

// console.log(b);
