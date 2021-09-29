import UserRepository from '../../infra/fake/repositories/FakeUserRepository';
import AppError from '../../../../shared/errors/AppError';
import CreateUserService from './CreateUserService';

let createUserService: CreateUserService;
let userRepository: UserRepository;

describe('CreateUserService', () => {
  beforeEach(() => {
    userRepository = new UserRepository();
    createUserService = new CreateUserService(userRepository);
  });

  it('should create a user successfully', async () => {
    const user = await createUserService.execute({
      name: 'Teste Saraiva',
      email: 'teste@saraiva.com',
    });

    expect(user).toHaveProperty('id');
  });

  it('should return an error when creating two users with the same email', async () => {
    await createUserService.execute({
      name: 'Teste Saraiva 2',
      email: 'teste@saraiva.com',
    });

    expect(
      createUserService.execute({
        name: 'Teste Saraiva 3',
        email: 'teste@saraiva.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
