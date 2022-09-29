import * as jwt from 'jsonwebtoken';
import LoginService from '../service/Login.service';
import { UserInterface } from '../interface/User.interface';

const secret = process.env.JWT_SECRET || 'jwt_secret';

const createToken = async (email: string) => {
  const { role, username, id } = await LoginService.findUser(email) as UserInterface;
  const payload = {
    role,
    username,
    id,
  };

  return jwt.sign(payload, secret);
};

const ValidateToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, secret);

    return decoded;
  } catch (err) {
    return false;
  }
};

export { createToken, ValidateToken };
