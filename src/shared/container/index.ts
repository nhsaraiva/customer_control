import { container } from 'tsyringe';

import { IHashProvider } from '../domain/IHashProvider';
import FakeHashProvider from '../infra/fakes/FakeHashProvider';

import { ITokenProvider } from '../domain/ITokenProvider';
import FakeTokenProvider from '../infra/fakes/FakeTokenProvider';

import { IProductRepository } from '../../modules/products/domain/repositories/IProductRepository';

import { IPaymentRepository } from '../../modules/payments/domain/repositories/IPaymentRepository';

import { ICustomerRepository } from '../../modules/customers/domain/repositories/ICustomerRepository';

import { IUserRepository } from '../../modules/users/domain/repositories/IUserRepository';
import UserRepository from '../../modules/users/infra/prisma/repositories/UserRepository';
import ProductRepository from '../../modules/products/infra/prisma/repositories/ProductRepository';
import CustomerRepository from '../../modules/customers/infra/prisma/repositories/CustomerRepository';
import PaymentRepository from '../../modules/payments/infra/prisma/repositories/PaymentRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<IHashProvider>('HashProvider', FakeHashProvider);

container.registerSingleton<ITokenProvider>('TokenProvider', FakeTokenProvider);

container.registerSingleton<IProductRepository>(
  'ProductRepository',
  ProductRepository,
);

container.registerSingleton<IPaymentRepository>(
  'PaymentRepository',
  PaymentRepository,
);

container.registerSingleton<ICustomerRepository>(
  'CustomerRepository',
  CustomerRepository,
);
