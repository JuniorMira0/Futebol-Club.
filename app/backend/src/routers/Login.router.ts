import * as express from 'express';
import LoginController from '../controller/Login.controller';
import ValidateLogin from '../middlewares/validate.login';

export default class RouterLogin {
  public router: express.Router;

  constructor() {
    this.router = express.Router();

    this.router
      .route('/login')
      .post(
        ValidateLogin.validateEmail,
        ValidateLogin.validadePassword,
        LoginController.createToken,
      );
  }
}
