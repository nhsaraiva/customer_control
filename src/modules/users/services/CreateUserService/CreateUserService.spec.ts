import UserRepository from '../../infra/fake/repositories/FakeUserRepository';
import AppError from '../../../../shared/errors/AppError';
import CreateUserService from './CreateUserService';
import HashProvider from '../../../../shared/infra/fakes/FakeHashProvider';

let createUserService: CreateUserService;
let userRepository: UserRepository;
let hashProvider: HashProvider;

describe('CreateUserService', () => {
  beforeEach(() => {
    userRepository = new UserRepository();
    hashProvider = new HashProvider();
    createUserService = new CreateUserService(userRepository, hashProvider);
  });

  it('should create a user successfully', async () => {
    const user = await createUserService.execute({
      name: 'Teste Saraiva',
      email: 'teste@saraiva.com',
      password: 'testpassword',
    });

    expect(user).toHaveProperty('id');
  });

  it('should return an error when creating two users with the same email', async () => {
    await createUserService.execute({
      name: 'Teste Saraiva 2',
      email: 'teste@saraiva.com',
      password: 'testpassword',
    });

    expect(
      createUserService.execute({
        name: 'Teste Saraiva 3',
        email: 'teste@saraiva.com',
        password: 'testpassword',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
