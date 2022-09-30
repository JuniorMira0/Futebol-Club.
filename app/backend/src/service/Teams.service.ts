import TeamsModel from '../database/models/TeamsModel';

export default class ServiceTeams {
  static async getAllTeams() {
    const teams = TeamsModel.findAll();

    return teams;
  }

  static async getOneTeam(id: number) {
    const team = TeamsModel.findByPk(id);

    return team;
  }
}
