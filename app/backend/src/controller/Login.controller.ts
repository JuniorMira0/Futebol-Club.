import { Request, Response } from 'express';

import { createToken } from '../helper/jwt';

export default class LoginController {
  static async createToken(req: Request, res: Response) {
    const { email } = req.body;

    const token = createToken(email);

    return res.status(200).json({ token });
  }
}
