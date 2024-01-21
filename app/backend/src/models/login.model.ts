import IUser from '../Interfaces/IUser';
import IUserModel from '../Interfaces/IUserModel';
import User from '../database/models/users.models';

export default class LoginModel implements IUserModel {
  private model = User;

  async getUser(email: string): Promise<IUser | null> {
    const findUserById = await this.model.findOne({ where: {
      email,
    } });

    if (findUserById) {
      return {
        email: findUserById.email,
        password: findUserById.password,
        username: findUserById.username,
        role: findUserById.role,
      };
    }
    return findUserById;
  }
}
