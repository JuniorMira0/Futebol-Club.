import MatchesModel from '../database/models/MatchesModel';
import queryHome from './query';

export default class LeaderboardService {
  static async leaderHome() {
    const home: any = await MatchesModel.sequelize?.query(queryHome);
    return home;
  }
}
