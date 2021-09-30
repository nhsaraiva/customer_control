import AppError from '../../../../shared/errors/AppError';
import { IShowUser } from '../../domain/models/IShowUser';
import { IUser } from '../../domain/models/IUser';
import { IUserRepository } from '../../domain/repositories/IUserRepository';

class ShowUserService {
  constructor(private repository: IUserRepository) {}

  public async execute({ id }: IShowUser): Promise<IUser> {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new AppError('User not found');
    }

    return user;
  }
}

export default ShowUserService;
