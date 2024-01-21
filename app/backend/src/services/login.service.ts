// import IUser from 'src/Interfaces/IUser';
// import IUser from '../Interfaces/IUser';
import IUserModel from '../Interfaces/IUserModel';
import LoginModel from '../models/login.model';

export default class LoginService {
  constructor(private loginModel: IUserModel = new LoginModel()) { }

  async getUser(email: string) {
    const getUserByEmail = await this.loginModel.getUser(email);

    if (!getUserByEmail) {
      return { status: 'null', data: { message: 'User not found' } };
    }

    return {
      status: 'ok',
      data: {
        email: getUserByEmail.email,
        password: getUserByEmail.password,
        username: getUserByEmail.username,
        role: getUserByEmail.role,
      },
    };
  }
}
