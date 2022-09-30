import * as express from 'express';

import TeamsController from '../controller/Teams.constroller';

export default class RouteTeams {
  public router: express.Router;

  constructor() {
    this.router = express.Router();

    this.router
      .route('/teams/:id')
      .get(
        TeamsController.getOneTeam,
      );

    this.router
      .route('/teams')
      .get(
        TeamsController.getAllTeams,
      );
  }
}
