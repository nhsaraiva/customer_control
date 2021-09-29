import { ICreateUser } from '../models/ICreateUser';
import { IUser } from '../models/IUser';

export interface IUserRepositoy {
  create({ name, email, password }: ICreateUser): Promise<IUser>;
  findById(id: string): Promise<IUser | undefined>;
  findByEmail(email: string): Promise<IUser | undefined>;
  save(user: IUser): Promise<IUser>;
  findAll(): Promise<IUser[]>;
  remove(id: string): Promise<void>;
}
