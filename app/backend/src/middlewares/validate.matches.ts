import { Request, Response, NextFunction } from 'express';
import { ValidateToken } from '../helper/jwt';
import MatchesModel from '../database/models/MatchesModel';

export default class ValidateMatch {
  static async validateCreate(req: Request, res: Response, next: NextFunction) {
    const { homeTeam, awayTeam } = req.body;
    const homeTeams = await MatchesModel.findByPk(homeTeam);
    const awayTeams = await MatchesModel.findByPk(awayTeam);

    if (homeTeam === awayTeam) {
      return res.status(401).json({
        message: 'It is not possible to create a match with two equal teams' });
    }

    if (!homeTeams) {
      return res.status(404).json({
        message: 'There is no team with such id!' });
    }

    if (!awayTeams) {
      return res.status(401).json({
        message: 'There is no team with such id!' });
    }
    next();
  }

  static async validateTokenMatch(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Token must be a valid token',
      });
    }

    const verify = ValidateToken(authorization as string);

    if (!verify) {
      return res.status(401).json({ message: 'Token must be a valid token',
      });
    }
    next();
  }
}
