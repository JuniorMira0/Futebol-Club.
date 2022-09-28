import Users from '../database/models/UsersModel';

export default class LoginService {
  static async findUser(email: string) {
    const user = await Users.findOne({ where: { email } });

    return user;
  }
}
