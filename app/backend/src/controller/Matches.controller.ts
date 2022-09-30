import { Request, Response } from 'express';
import MatchesService from '../service/Matches.service';

export default class MatchesController {
  static async getAll(req: Request, res: Response) {
    const { inProgess } = req.query;
    const matches = await MatchesService.getAll(inProgess as string);
    return res.json(matches);
  }

  static async create(req: Request, res: Response) {
    const createMatch = await MatchesService.create(req.body);

    return res.status(201).json(createMatch);
  }

  static async finish(req: Request, res: Response) {
    const { id } = req.params;
    const finishMatch = await MatchesService.finish(+id);

    if (finishMatch) return res.json({ message: 'Finished' });
  }
}
