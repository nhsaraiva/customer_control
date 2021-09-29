import { IHashProvider } from '../../../../shared/domain/IHashProvider';
import AppError from '../../../../shared/errors/AppError';
import { ICreateUser } from '../../domain/models/ICreateUser';
import { IUser } from '../../domain/models/IUser';
import { IUserRepositoy } from '../../domain/repositories/IUserRepository';

class CreateUserService {
  constructor(
    private repository: IUserRepositoy,
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ name, email, password }: ICreateUser): Promise<IUser> {
    const emailExists = await this.repository.findByEmail(email);

    if (emailExists) {
      throw new AppError('The email is in user');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.repository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
