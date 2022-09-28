import * as jwt from 'jsonwebtoken';
import { UserInterface, UserVerifyToken } from '../interface/User.interface';

const secret = process.env.JWT_SECRET || 'jwt_secret';

const createToken = (user: UserInterface) => {
  const payload = {
    user,
  };
  const options = {
    expiresIn: '10d',
  };
  return jwt.sign(payload, secret, options);
};

const validateService = (token: string) => {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded as UserVerifyToken;
  } catch (err) {
    return false;
  }
};

export { createToken, validateService };
