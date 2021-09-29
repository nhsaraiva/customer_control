import UpdateUserService from './UpdateUserService';
import UserRepository from '../../infra/fake/repositories/FakeUserRepository';
import { IUser } from '../../domain/models/IUser';
import AppError from '../../../../shared/errors/AppError';

let userRepository: UserRepository;
let updateUserService: UpdateUserService;
let userCreated: IUser;

describe('UpdateUserService', () => {
  beforeEach(async () => {
    userRepository = new UserRepository();

    userCreated = await userRepository.create({
      name: 'Teste Saraiva',
      email: 'teste@saraiva.com',
      password: 'testpassword',
    });

    await userRepository.create({
      name: 'Teste Saraiva 2',
      email: 'teste2@saraiva.com',
      password: 'testpassword',
    });

    updateUserService = new UpdateUserService(userRepository);
  });

  it('should return updated user if email not exists in another users', async () => {
    let updatedUser = await updateUserService.execute({
      id: userCreated.id,
      name: 'Teste Saraiva Updated',
      email: 'testeupdated@saraiva.com',
    });

    expect(await userRepository.findById(userCreated.id)).toMatchObject(
      updatedUser,
    );
  });

  it('should return error if user not exists', async () => {
    expect(
      await updateUserService.execute({
        id: 'idnotexists',
        name: 'Teste Saraiva Updated',
        email: 'testeupdated@saraiva.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should return error if email exists in another users', async () => {
    expect(
      await updateUserService.execute({
        id: userCreated.id,
        name: 'Teste Saraiva',
        email: 'teste2@saraiva.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
