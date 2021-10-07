import 'reflect-metadata';
import IndexUserService from './IndexUserService';
import UserRepository from '../../infra/fake/repositories/FakeUserRepository';

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
      password: 'testpassword',
    });

    expect(indexUserService.execute()).resolves.toHaveLength(1);
  });

  it('should return void array if not has users', async () => {
    expect(indexUserService.execute()).resolves.toHaveLength(0);
  });
});
