import { container } from 'tsyringe';

import { IHashProvider } from '../domain/IHashProvider';
import FakeHashProvider from '../infra/fakes/FakeHashProvider';

import { ITokenProvider } from '../domain/ITokenProvider';
import FakeTokenProvider from '../infra/fakes/FakeTokenProvider';

import { IProductRepository } from '../../modules/products/domain/repositories/IProductRepository';
import FakeProductRepository from '../../modules/products/infra/fake/repositories/FakeProductRepository';

import { IPaymentRepository } from '../../modules/payments/domain/repositories/IPaymentRepository';
import FakePaymentRepository from '../../modules/payments/infra/fake/repositories/FakePaymentRepository';

import { ICustomerRepository } from '../../modules/customers/domain/repositories/ICustomerRepository';
import FakeCustomerRepository from '../../modules/customers/infra/fake/repositories/FakeCustomerRepository';

import { IUserRepository } from '../../modules/users/domain/repositories/IUserRepository';
import FakeUserRepository from '../../modules/users/infra/fake/repositories/FakeUserRepository';

container.registerSingleton<IUserRepository>(
  'UserRepository',
  FakeUserRepository,
);

container.registerSingleton<IHashProvider>('HashProvider', FakeHashProvider);

container.registerSingleton<ITokenProvider>('TokenProvider', FakeTokenProvider);

container.registerSingleton<IProductRepository>(
  'ProductRepository',
  FakeProductRepository,
);

container.registerSingleton<IPaymentRepository>(
  'PaymentRepository',
  FakePaymentRepository,
);

container.registerSingleton<ICustomerRepository>(
  'CustomerRepository',
  FakeCustomerRepository,
);