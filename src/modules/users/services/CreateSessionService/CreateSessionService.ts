import AppError from '../../../../shared/errors/AppError';
import { IHashProvider } from '../../../../shared/domain/IHashProvider';
import { ILogin } from '../../domain/models/ILogin';
import { IUserRepositoy } from '../../domain/repositories/IUserRepository';
import { ITokenProvider } from 'src/shared/domain/ITokenProvider';

class CreateSessionService {
  constructor(
    private userRepository: IUserRepositoy,
    private hashProvider: IHashProvider,
    private tokenProvider: ITokenProvider,
  ) {}

  public async execute({ email, password }: ILogin) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Invalid credentials');
    }

    const isValidPassword = await this.hashProvider.compare(
      password,
      user.password,
    );

    if (!isValidPassword) {
      throw new AppError('Invalid credentials');
    }

    //generate token
    const token = 'TOKEN';

    return { token, user };
  }
}

export default CreateSessionService;
