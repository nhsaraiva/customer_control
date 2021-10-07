import { ITokenProvider } from '../../domain/ITokenProvider';
import { ITokenOption } from '../../domain/ITokenOption';
import { ITokenPayload } from '../../domain/ITokenPayload';

class FakeTokenProvider implements ITokenProvider {
  public async sign(
    {},
    secret: string,
    { subject, expiresIn }: ITokenOption,
  ): Promise<string> {
    return subject;
  }

  public verify(token: string, secret: string): ITokenPayload {
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
