import DeleteUserService from './DeleteUserService';
import UserRepository from '../../infra/fake/repositories/FakeUserRepository';
import { IUser } from '../../domain/models/IUser';
import AppError from '../../../../shared/errors/AppError';

let userRepository: UserRepository;
let deleteUserService: DeleteUserService;
let userCreated: IUser;

describe('DeleteUserService', () => {
  beforeEach(async () => {
    userRepository = new UserRepository();

    userCreated = await userRepository.create({
      name: 'Teste Saraiva',
      email: 'teste@saraiva.com',
      password: 'testpassword',
    });

    deleteUserService = new DeleteUserService(userRepository);
  });

  it('should return void if user deleted', async () => {
    expect(
      deleteUserService.execute({
        id: userCreated.id,
      }),
    ).resolves.toBeNull();
  });

  it('should return error if user not exists', async () => {
    expect(
      await deleteUserService.execute({
        id: 'idnotexists',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
