import { IMatches } from '../interface/Matches.interface';
import MatchesModel from '../database/models/MatchesModel';
import TeamsModel from '../database/models/TeamsModel';

const modelsConnect = [
  { model: TeamsModel, as: 'teamHome', attributes: { exclude: ['id'] } },
  { model: TeamsModel, as: 'teamAway', attributes: { exclude: ['id'] } },
];

export default class MatchesService {
  static async getAll(inProgess: string) {
    if (!inProgess) {
      const match = await MatchesModel.findAll({
        attributes: { exclude: ['home_team', 'away_team'] },
        include: modelsConnect,
      });
      return match;
    }
    const bool = JSON.parse(inProgess);
    const matchFiltered = await MatchesModel.findAll({
      attributes: { exclude: ['home_team', 'away_team'] },
      where: { inProgress: bool },
      include: modelsConnect,
    });
    return matchFiltered;
  }

  static async create(body: IMatches) {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = body;

    const createMatch = await MatchesModel.create({
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });
    return createMatch;
  }

  static async finish(id: number) {
    const finishMatch = await MatchesModel.update({ inProgress: false }, { where: { id } });
    return finishMatch;
  }

  static async update(id: number, homeTeamGoals: string, awayTeamGoals: string) {
    const updt = await MatchesModel.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    return updt;
  }
}
