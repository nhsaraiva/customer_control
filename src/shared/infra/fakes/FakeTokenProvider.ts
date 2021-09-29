import { ITokenProvider } from '../../domain/ITokenProvider';
import { ITokenOption } from '../../domain/ITokenOption';

class FakeTokenProvider implements ITokenProvider {
  public async sign(
    {},
    secret: string,
    { subject, expiresIn }: ITokenOption,
  ): Promise<string> {
    return subject;
  }
}

export default FakeTokenProvider;
