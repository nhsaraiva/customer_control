import AppError from '../../../../shared/errors/AppError';
import { IHashProvider } from '../../../../shared/domain/IHashProvider';
import { ILogin } from '../../domain/models/ILogin';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { ITokenProvider } from '../../../../shared/domain/ITokenProvider';
import { IUserLogin } from '../../domain/models/IUserLogin';
import { inject, injectable } from 'tsyringe';

@injectable()
class CreateSessionService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
    @inject('TokenProvider')
    private tokenProvider: ITokenProvider,
  ) {}

  public async execute({ email, password }: ILogin): Promise<IUserLogin> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Invalid credentials');
    }

    const isValidPassword = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!isValidPassword) {
      throw new AppError('Invalid credentials');
    }

    //generate token
    const token = await this.tokenProvider.signToken(
      {},
      '850faad8955c4afa3983ad9cff370117',
      {
        subject: user.id,
        expiresIn: '1d',
      },
    );

    return { token, user };
  }
}

export default CreateSessionService;
