import { ITokenProvider } from '../../domain/ITokenProvider';
import AppError from '../../../shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IValidateTokenHeader } from '../../domain/IValidateTokenHeader';
import { ITokenPayload } from '../../../shared/domain/ITokenPayload';

@injectable()
class ValidateTokenService {
  constructor(
    @inject('TokenProvider')
    private tokenProvider: ITokenProvider,
  ) {}

  public execute({ authorization }: IValidateTokenHeader) {
    if (!authorization) {
      throw new AppError('JWT Token is missing');
    }

    const [, token] = authorization.split(' ');

    try {
      const decodedToken = this.tokenProvider.verifyToken(
        token,
        '850faad8955c4afa3983ad9cff370117',
      );

      const { sub } = decodedToken as ITokenPayload;

      return true;
    } catch (error) {
      throw new AppError('Invalid JWT Token');
    }
  }
}
export default ValidateTokenService;
