import IndexUserService from './IndexUserService';
import UserRepository from '../../infra/fake/repositories/FakeUserRepository';
import { IUser } from '../../domain/models/IUser';
import AppError from '../../../../shared/errors/AppError';

let userRepository: UserRepository;
let indexUserService: IndexUserService;

describe('IndexUserService', () => {
  beforeEach(async () => {
    userRepository = new UserRepository();

    indexUserService = new IndexUserService(userRepository);
  });

  it('should return one user if has users', async () => {
    await userRepository.create({
      name: 'Teste Saraiva',
      email: 'teste@saraiva.com',
    });

    expect(indexUserService.execute()).resolves.toHaveLength(1);
  });

  it('should return void array if not has users', async () => {
    expect(indexUserService.execute()).resolves.toHaveLength(0);
  });
});
