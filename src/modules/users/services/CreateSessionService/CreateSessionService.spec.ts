import UserRepository from '../../infra/fake/repositories/FakeUserRepository';
import AppError from '../../../../shared/errors/AppError';
import CreateSessionService from './CreateSessionService';
import HashProvider from '../../../../shared/providers/HashProvider';
import { IUser } from '../../domain/models/IUser';

let createSessionService: CreateSessionService;
let userRepository: UserRepository;
let hashProvider: HashProvider;
let userCreated: IUser;

describe('CreateSessionService', () => {
  beforeEach(async () => {
    userRepository = new UserRepository();
    hashProvider = new HashProvider();

    userCreated = await userRepository.create({
      name: 'Teste Saraiva',
      email: 'teste@saraiva.com',
      password: 'testpassword',
    });

    createSessionService = new CreateSessionService(
      userRepository,
      hashProvider,
    );
  });

  it('should return an error if email is incorrect', async () => {
    expect(
      createSessionService.execute({
        email: 'teste@saraiva.com.br',
        password: 'testpassword',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should return an error if password is incorrect', async () => {
    expect(
      createSessionService.execute({
        email: 'teste@saraiva.com',
        password: 'testpassworderror',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should return a token if credentials is correct', async () => {
    const login = await createSessionService.execute({
      email: 'teste@saraiva.com',
      password: 'testpassword',
    });

    expect(login).toHaveProperty('token');
  });
});
