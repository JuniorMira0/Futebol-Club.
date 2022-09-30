import MatchesModel from '../database/models/MatchesModel';
import TeamsModel from '../database/models/TeamsModel';

const modelsConnect = [
  { model: TeamsModel, as: 'teamHome', attributes: { exclude: ['id'] } },
  { model: TeamsModel, as: 'teamAway', attributes: { exclude: ['id'] } },
];

export default class MatchesService {
  static async getAll() {
    const match = await MatchesModel.findAll({
      attributes: { exclude: ['home_team', 'away_team'] },
      include: modelsConnect,
    });
    return match;
  }
}
