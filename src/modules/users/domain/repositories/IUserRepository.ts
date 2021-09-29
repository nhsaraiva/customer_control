import { ICreateUser } from '../models/ICreateUser';
import { IShowUser } from '../models/IShowUser';
import { IUser } from '../models/IUser';

export interface IUserRepositoy {
  create({ name, email }: ICreateUser): Promise<IUser>;
  findById(id: string): Promise<IUser | undefined>;
  findByEmail(email: string): Promise<IUser | undefined>;
}
