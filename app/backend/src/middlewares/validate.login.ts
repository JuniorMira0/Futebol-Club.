import { Request, Response, NextFunction } from 'express';
import VerifyPassword from '../utils/bcrypt.decode';
import LoginService from '../service/Login.service';

const fieldsFilled = { message: 'All fields must be filled' };
const incorrectEmail = { message: 'Incorrect email or password' };

export default class ValidateLogin {
  static async validateEmail(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;

    const user = await LoginService.findUser(email);

    if (!email) return res.status(400).json(fieldsFilled);

    if (!user) return res.status(401).json(incorrectEmail);

    next();
  }

  static async validadePassword(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    if (!password) return res.status(400).json(fieldsFilled);

    const validate = await VerifyPassword.decodePassword(email, password);

    if (!validate) return res.status(400).json(fieldsFilled);

    next();
  }
}
