import * as express from 'express';
import LeaderboardController from '../controller/Leaderborard.controller';

export default class LeaderboardRouter {
  public router: express.Router;

  constructor() {
    this.router = express.Router();

    this.router
      .route('/leaderboard/home')
      .get(LeaderboardController.leaderHome);
  }
}
