import { IUser } from '../../domain/models/IUser';
import { IUserRepositoy } from '../../domain/repositories/IUserRepository';

class IndexUserService {
  constructor(private repository: IUserRepositoy) {}

  public async execute(): Promise<IUser[]> {
    const users = this.repository.findAll();

    return users;
  }
}
export default IndexUserService;
