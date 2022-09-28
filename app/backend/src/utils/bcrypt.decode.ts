import * as bcrypt from 'bcryptjs';
import { UserInterface } from '../interface/User.interface';
import LoginService from '../service/Login.service';

export default class VerifyPassword {
  static async decodePassword(email: string, pass: string) {
    const user = await LoginService.findUser(email);

    const { password: passData } = user as UserInterface;

    const decrypt = bcrypt.compareSync(pass, passData);

    if (decrypt) return true;
  }
}
