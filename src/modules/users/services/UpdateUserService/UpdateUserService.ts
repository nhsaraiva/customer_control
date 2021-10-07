import { inject, injectable } from 'tsyringe';
import { IHashProvider } from '../../../../shared/domain/IHashProvider';
import AppError from '../../../../shared/errors/AppError';
import { IUpdateUser } from '../../domain/models/IUpdateUser';
import { IUser } from '../../domain/models/IUser';
import { IUserRepository } from '../../domain/repositories/IUserRepository';

@injectable()
class UpdateUserService {
  constructor(
    @inject('UserRepository')
    private repository: IUserRepository,
    @inject('HashProvider')
    private hasProvider: IHashProvider,
  ) {}

  public async execute({
    id,
    name,
    email,
    password,
    old_password,
  }: IUpdateUser): Promise<IUser> {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new AppError('User not found');
    }

    const userHasThisEmail = await this.repository.findByEmail(email);

    if (userHasThisEmail && userHasThisEmail.id != user.id) {
      throw new AppError('Email already exists to antoher user');
    }

    if (password && !old_password) {
      throw new AppError('Password received but old passwor not found');
    }

    if (password && old_password) {
      const oldPasswordIsValid = await this.hasProvider.compareHash(
        old_password,
        user.password,
      );

      if (!oldPasswordIsValid) {
        throw new AppError('Invalid password');
      }

      user.password = password;
    }

    user.email = email;
    user.name = name;

    await this.repository.save(user);

    return user;
  }
}
export default UpdateUserService;
