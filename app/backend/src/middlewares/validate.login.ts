import { Request, Response, NextFunction } from 'express';

const fieldsFilled = { message: 'All fields must be filled' };

export default class ValidateLogin {
  static async validateEmail(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;

    if (!email) return res.status(400).json(fieldsFilled);

    next();
  }

  static async validadePassword(req: Request, res: Response, next: NextFunction) {
    const { password } = req.body;

    if (!password) return res.status(400).json(fieldsFilled);

    next();
  }
}
