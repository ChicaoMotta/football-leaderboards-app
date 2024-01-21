/* eslint-disable max-lines-per-function */
import MatchesModel from '../models/match.model';
import TeamModel from '../models/team.model';

type Matches = {
  'id': number,
  'homeTeamId': number,
  'homeTeamGoals': number,
  'awayTeamId': number,
  'awayTeamGoals': number,
  'inProgress': boolean,
  'homeTeam'?: {
    'teamName': string,
  },
  'awayTeam'?: {
    'teamName': string,
  }
};

type Team = {
  id: number
  'name': string,
  'totalPoints': number,
  'totalGames': number,
  'totalVictories': number,
  'totalDraws': number,
  'totalLosses': number,
  'goalsFavor': number,
  'goalsOwn': number
};

export default class LeaderboardService {
  private leaderboardArrayHome: Team[] = [];
  private leaderboardArrayAway: Team[] = [];
  private leaderboardArrayAll: Team[] = [];
  private matchesArray: Matches[] = [];

  constructor(private teamModel = new TeamModel(), private matchesModel = new MatchesModel()) {

  }

  resetArray() {
    this.leaderboardArrayHome = [];
    this.leaderboardArrayAway = [];
    this.leaderboardArrayAll = [];
  }

  async getTeams(homeOrAwayTeam: 'home' | 'away' | 'all') {
    let leaderboardArray: Team[] = [];
    this.leaderboardArrayAll = [];
    this.resetArray();
    await this.setAllTeams();
    console.log('0 - inicio');

    await this.setMatchesArray();

    if (homeOrAwayTeam === 'home') {
      this.setHomeMatchesPlayed();
      const sortedLB = this.leaderboardArrayHome.sort((a, b) => b.totalPoints - a.totalPoints);
      leaderboardArray = sortedLB;
    }
    if (homeOrAwayTeam === 'away') {
      this.setAwayMatchesPlayed();
      const sortedLB = this.leaderboardArrayAway.sort((a, b) => b.totalPoints - a.totalPoints);
      leaderboardArray = sortedLB;
    }

    if (homeOrAwayTeam === 'all') {
      console.log('1 - zerado');
      console.log(this.leaderboardArrayAll[0]);

      this.setHomeMatchesPlayed();
      console.log('2 - home soma');
      console.log(this.leaderboardArrayHome[0]);

      this.setAwayMatchesPlayed();
      console.log('3 - away soma');
      console.log(this.leaderboardArrayAway[0]);

      this.getAllMatchesPlayed();
      console.log('4 - primeiro map');
      console.log(this.leaderboardArrayAll[0]);

      const sortedLB = this.leaderboardArrayAll.sort((a, b) => b.totalPoints - a.totalPoints);
      leaderboardArray = sortedLB;
    }

    await this.setAllTeams();
    console.log('5 - zerado de novo');
    console.log(this.leaderboardArrayAll[0]);

    return leaderboardArray;
  }

  getAllMatchesPlayed() {
    const sumHomeAndAwayArray = this.leaderboardArrayHome.map((team, index) => ({
      id: team.id,
      name: team.name,
      totalPoints: team.totalPoints + this.leaderboardArrayAway[index].totalPoints,
      totalGames: team.totalGames + this.leaderboardArrayAway[index].totalGames,
      totalVictories: team.totalVictories + this.leaderboardArrayAway[index].totalVictories,
      totalDraws: team.totalDraws + this.leaderboardArrayAway[index].totalDraws,
      totalLosses: team.totalLosses + this.leaderboardArrayAway[index].totalLosses,
      goalsFavor: team.goalsFavor + this.leaderboardArrayAway[index].goalsFavor,
      goalsOwn: team.goalsOwn + this.leaderboardArrayAway[index].goalsOwn,
    }));

    this.leaderboardArrayAll = sumHomeAndAwayArray;
  }

  getFinishedMatches() {
    return this.matchesArray;
  }

  async setAllTeams() {
    const getTeams = await this.teamModel.getAll();
    if (getTeams) {
      const setLeaderboardKeys = getTeams.map((team) => ({
        id: team.id,
        name: team.teamName,
        totalPoints: 0,
        totalGames: 0,
        totalVictories: 0,
        totalDraws: 0,
        totalLosses: 0,
        goalsFavor: 0,
        goalsOwn: 0,
      }));
      const setLeaderboardKeys2 = getTeams.map((team) => ({
        id: team.id,
        name: team.teamName,
        totalPoints: 0,
        totalGames: 0,
        totalVictories: 0,
        totalDraws: 0,
        totalLosses: 0,
        goalsFavor: 0,
        goalsOwn: 0,
      }));
      const setLeaderboardKeys3 = getTeams.map((team) => ({
        id: team.id,
        name: team.teamName,
        totalPoints: 0,
        totalGames: 0,
        totalVictories: 0,
        totalDraws: 0,
        totalLosses: 0,
        goalsFavor: 0,
        goalsOwn: 0,
      }));

      this.leaderboardArrayHome = setLeaderboardKeys2;
      this.leaderboardArrayAway = setLeaderboardKeys;
      this.leaderboardArrayAll = setLeaderboardKeys3;
    }
  }

  static clearAllTeams(lb: Team[]) {
    return lb.map((team) => ({
      id: team.id,
      name: team.name,
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
    }));
  }

  async setMatchesArray() {
    const matchesArrayFromDB = await this.matchesModel.getFilteredTeams(false);

    this.matchesArray = matchesArrayFromDB;
  }

  setHomeMatchesPlayed() {
    this.matchesArray.forEach((match) => {
      const homeTeam = this.leaderboardArrayHome.find((team) => team.id === match.homeTeamId);
      if (homeTeam) {
        homeTeam.totalGames += 1;
        if (match.homeTeamGoals > match.awayTeamGoals) {
          homeTeam.totalVictories += 1;
        } else if (match.homeTeamGoals < match.awayTeamGoals) {
          homeTeam.totalLosses += 1;
        } else {
          homeTeam.totalDraws += 1;
        }
        homeTeam.goalsFavor += match.homeTeamGoals;
        homeTeam.goalsOwn += match.awayTeamGoals;
      }
    });

    this.setTotalPoints('home');
  }

  setAwayMatchesPlayed() {
    this.matchesArray.forEach((match) => {
      const awayTeam = this.leaderboardArrayAway.find((team) => team.id === match.awayTeamId);
      if (awayTeam) {
        awayTeam.totalGames += 1;
        if (match.awayTeamGoals > match.homeTeamGoals) {
          awayTeam.totalVictories += 1;
        } else if (match.awayTeamGoals < match.homeTeamGoals) {
          awayTeam.totalLosses += 1;
        } else {
          awayTeam.totalDraws += 1;
        }
        awayTeam.goalsFavor += match.awayTeamGoals;
        awayTeam.goalsOwn += match.homeTeamGoals;
      }
    });
    this.setTotalPoints('away');
  }

  setTotalPoints(homeOrAwayTeam: 'home' | 'away') {
    if (homeOrAwayTeam === 'home') {
      this.matchesArray.forEach((match) => {
        const homeTeam = this.leaderboardArrayHome.find((team) => team.id === match.homeTeamId);
        if (homeTeam) {
          homeTeam.totalPoints = (homeTeam.totalVictories * 3) + homeTeam.totalDraws;
        }
      });
    } else {
      this.matchesArray.forEach((match) => {
        const awayTeam = this.leaderboardArrayAway.find((team) => team.id === match.awayTeamId);
        if (awayTeam) {
          awayTeam.totalPoints = (awayTeam.totalVictories * 3) + awayTeam.totalDraws;
        }
      });
    }
  }

  static calculateEfficiency(totalPoints: number, totalMatches: number) {
    const teamEfficiency = (totalPoints / (totalMatches * 3)) * 100;
    return teamEfficiency.toFixed(2);
  }

  //   removeTeamId() {
  //     const removeId = this.leaderboardArray;
  //     const leaderboardArrayWithoutId = removeId.map((team: Team) => {
  //       const { id, ...teamWithoutId } = team;
  //       return teamWithoutId;
  //     });
  //     this.leaderboardArray = leaderboardArrayWithoutId;
  //   }
}
