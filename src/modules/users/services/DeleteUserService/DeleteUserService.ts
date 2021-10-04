import { inject, injectable } from 'tsyringe';
import AppError from '../../../../shared/errors/AppError';
import { IDeleteUser } from '../../domain/models/IDeleteUser';
import { IUserRepository } from '../../domain/repositories/IUserRepository';

@injectable()
class DeleteUserService {
  constructor(@inject('UserRepository') private repository: IUserRepository) {}

  public async execute({ id }: IDeleteUser): Promise<void> {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new AppError('User not found');
    }

    await this.repository.remove(user.id);
  }
}

export default DeleteUserService;
