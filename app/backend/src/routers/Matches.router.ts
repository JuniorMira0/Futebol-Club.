import * as express from 'express';

import MatchesController from '../controller/Matches.controller';

export default class RouterMatches {
  public router: express.Router;

  constructor() {
    this.router = express.Router();

    this.router
      .route('/matches')
      .get(MatchesController.getAll);
  }
}
