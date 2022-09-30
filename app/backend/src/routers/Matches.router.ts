import * as express from 'express';
import ValidateLogin from '../middlewares/validate.login';

import MatchesController from '../controller/Matches.controller';

export default class RouterMatches {
  public router: express.Router;

  constructor() {
    this.router = express.Router();

    this.router
      .route('/matches')
      .get(MatchesController.getAll)
      .post(
        ValidateLogin.ValidateToken,
        MatchesController.create,
      );

    this.router
      .route('/matches/:id/finish')
      .patch(MatchesController.finish);
  }
}
