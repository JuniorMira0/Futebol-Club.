import { Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';

import { createToken, ValidateToken } from '../helper/jwt';

export default class LoginController {
  static async createToken(req: Request, res: Response) {
    const { email } = req.body;

    const token = await createToken(email);

    return res.status(200).json({ token });
  }

  static async UserRole(req: Request, res: Response) {
    const { authorization } = req.headers;
    const { role } = ValidateToken(authorization as string) as JwtPayload;
    return res.status(200).json({ role });
  }
}
