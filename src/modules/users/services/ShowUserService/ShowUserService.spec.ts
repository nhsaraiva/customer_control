import ShowUserService from './ShowUserService';
import UserRepository from '../../infra/fake/repositories/FakeUserRepository';
import { IUser } from '../../domain/models/IUser';
import AppError from '../../../../shared/errors/AppError';

let userRepository: UserRepository;
let showUserService: ShowUserService;
let userCreated: IUser;

describe('ShowUserService', () => {
  beforeEach(async () => {
    userRepository = new UserRepository();

    userCreated = await userRepository.create({
      name: 'Teste Saraiva',
      email: 'teste@email.com',
    });

    showUserService = new ShowUserService(userRepository);
  });

  it('should return success if user exists', async () => {
    const user = await showUserService.execute({
      id: userCreated.id,
    });

    expect(user).toHaveProperty('id');
  });

  it('should return an error if user not exists', async () => {
    expect(
      showUserService.execute({
        id: 'notexistsid',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
