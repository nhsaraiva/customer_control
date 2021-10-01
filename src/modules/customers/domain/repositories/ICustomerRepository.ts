import { ICreateCustomer } from '../models/ICreateCustomer';
import { ICustomer } from '../models/ICustomer';

export interface ICustomerRepository {
  findById(id: string): Promise<ICustomer | undefined>;
  findByEmail(email: string): Promise<ICustomer | undefined>;
  findByPhone(phone: string): Promise<ICustomer | undefined>;
  findAll(): Promise<ICustomer[]>;
  create({ name, email, phone, status }: ICreateCustomer): Promise<ICustomer>;
  save(customer: ICustomer): Promise<ICustomer>;
  remove(id: string): Promise<void>;
}
