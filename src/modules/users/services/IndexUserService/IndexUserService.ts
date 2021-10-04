import { inject, injectable } from 'tsyringe';
import { IUser } from '../../domain/models/IUser';
import { IUserRepository } from '../../domain/repositories/IUserRepository';

@injectable()
class IndexUserService {
  constructor(@inject('UserRepository') private repository: IUserRepository) {}

  public async execute(): Promise<IUser[]> {
    const users = await this.repository.findAll();

    return users;
  }
}
export default IndexUserService;
