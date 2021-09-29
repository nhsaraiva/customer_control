import { ICreateUser } from '../models/ICreateUser';
import { IUser } from '../models/IUser';

export interface IUserRepositoy {
  create({ name, email }: ICreateUser): Promise<IUser>;
  findByEmail(email: string): Promise<IUser | undefined>;
}
