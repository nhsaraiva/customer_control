import { ITokenProvider } from '../../domain/ITokenProvider';
import { ITokenOption } from '../../domain/ITokenOption';
import { ITokenPayload } from '../../domain/ITokenPayload';

class FakeTokenProvider implements ITokenProvider {
  public async signToken(
    {},
    secret: string,
    { subject, expiresIn }: ITokenOption,
  ): Promise<string> {
    return '850faad8955c4afa3983ad9cff370117';
  }

  public verifyToken(token: string, secret: string): ITokenPayload {
    if (token !== secret) {
      throw new Error('Fake error validation');
    }

    return {
      sub: token,
      exp: 16000,
      iat: 16000,
    };
  }
}

export default FakeTokenProvider;
