import { IUser } from '../../domain/models/IUser';
import { IUserRepository } from '../../domain/repositories/IUserRepository';

class IndexUserService {
  constructor(private repository: IUserRepository) {}

  public async execute(): Promise<IUser[]> {
    const users = await this.repository.findAll();

    return users;
  }
}
export default IndexUserService;
