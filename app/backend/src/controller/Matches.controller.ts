import { Request, Response } from 'express';
import MatchesService from '../service/Matches.service';

export default class MatchesController {
  static async getAll(req: Request, res: Response) {
    const { inProgess } = req.query;
    const matches = await MatchesService.getAll(inProgess as string);
    return res.json(matches);
  }
}
