import AppError from '../../../../shared/errors/AppError';
import { IDeleteUser } from '../../domain/models/IDeleteUser';
import { IUserRepository } from '../../domain/repositories/IUserRepository';

class DeleteUserService {
  constructor(private repository: IUserRepository) {}

  public async execute({ id }: IDeleteUser): Promise<void> {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new AppError('User not found');
    }

    await this.repository.remove(user.id);
  }
}

export default DeleteUserService;