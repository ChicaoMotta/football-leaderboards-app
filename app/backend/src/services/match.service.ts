import MatchesModel from '../models/match.model';

export default class MatchesService {
  constructor(private matchesModel = new MatchesModel()) {}

  async getAllTeams() {
    const modelResponse = await this.matchesModel.getAllTeams();

    return {
      status: 'ok',
      data: modelResponse,
    };
  }

  async getFilterdTeams(filterParam: boolean) {
    const modelResponse = await this.matchesModel.getFilteredTeams(filterParam);
    return {
      status: 'ok',
      data: modelResponse,
    };
  }

  async endMatch(id: number) {
    await this.matchesModel.endMatch(id);
  }

  async changeScore(homeTeamScore:number, awayTeamScore:number, matchID:number) {
    await this.matchesModel.changeScore(homeTeamScore, awayTeamScore, matchID);
  }

  async addMatch(
    homeTeamId : number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ) {
    const addedMatch = await this.matchesModel
      .addMatch(homeTeamGoals, awayTeamGoals, homeTeamId, awayTeamId);

    return { status: 'ok',
      data: {
        id: addedMatch.id,
        homeTeamId: addedMatch.homeTeamId,
        homeTeamGoals: addedMatch.homeTeamGoals,
        awayTeamId: addedMatch.awayTeamId,
        awayTeamGoals: addedMatch.awayTeamGoals,
        inProgress: addedMatch.inProgress,
      } };
  }
}
