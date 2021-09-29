import { v4 as uuidv4 } from 'uuid';
import { ICreateUser } from '../../../domain/models/ICreateUser';
import { IUser } from '../../../domain/models/IUser';
import { IUserRepositoy } from '../../../domain/repositories/IUserRepository';
import FakeUser from '../entities/FakeUser';

class FakeUserRepository implements IUserRepositoy {
  private users: IUser[] = [];

  public async create({ name, email }: ICreateUser): Promise<IUser> {
    const user = new FakeUser();

    user.id = uuidv4();
    user.name = name;
    user.email = email;

    this.users.push(user);

    return user;
  }

  public async findByEmail(email: string): Promise<IUser | undefined> {
    const user = this.users.find(user => user.email === email);

    return user;
  }

  public async findById(id: string): Promise<IUser | undefined> {
    const user = this.users.find(user => user.id === id);

    return user;
  }
}

export default FakeUserRepository;
