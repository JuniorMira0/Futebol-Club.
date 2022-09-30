import * as express from 'express';

import MatchesController from '../controller/Matches.controller';
import ValidateMatch from '../middlewares/validate.matches';

export default class RouterMatches {
  public router: express.Router;

  constructor() {
    this.router = express.Router();

    this.router
      .route('/matches')
      .get(MatchesController.getAll)
      .post(
        ValidateMatch.validateTokenMatch,
        ValidateMatch.validateCreate,
        MatchesController.create,
      );

    this.router
      .route('/matches/:id/finish')
      .patch(MatchesController.finish);
  }
}
