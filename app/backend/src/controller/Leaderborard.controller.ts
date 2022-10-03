import { Request, Response } from 'express';
import LeaderboardService from '../service/Leaderboard.service';

export default class LeaderboardController {
  static async leaderHome(req: Request, res: Response) {
    const home = await LeaderboardService.leaderHome();

    return res.status(200).json(home[0]);
  }
}
