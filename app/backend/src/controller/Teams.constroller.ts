import { Request, Response } from 'express';
import TeansService from '../service/Teams.service';

export default class ControllerTeams {
  static async getAllTeams(_req: Request, res: Response) {
    const teams = await TeansService.getAllTeams();

    return res.status(200).json(teams);
  }

  static async getOneTeam(req: Request, res: Response) {
    const { id } = req.params;

    const team = await TeansService.getOneTeam(Number(id));

    return res.status(200).json(team);
  }
}
