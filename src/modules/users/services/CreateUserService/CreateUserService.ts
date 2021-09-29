import AppError from '../../../../shared/errors/AppError';
import { ICreateUser } from '../../domain/models/ICreateUser';
import { IUser } from '../../domain/models/IUser';
import { IUserRepositoy } from '../../domain/repositories/IUserRepository';

class CreateUserService {
  constructor(private repository: IUserRepositoy) {}

  public async execute({ name, email }: ICreateUser): Promise<IUser> {
    const emailExists = await this.repository.findByEmail(email);

    if (emailExists) {
      throw new AppError('The email is in user');
    }

    const user = await this.repository.create({ name, email });

    return user;
  }
}

export default CreateUserService;
