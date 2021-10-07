import { ITokenOption } from '../../domain/ITokenOption';
import { ITokenPayload } from '../../domain/ITokenPayload';
import { ITokenProvider } from '../../domain/ITokenProvider';
import { Secret, sign, verify } from 'jsonwebtoken';

class TokenProvider implements ITokenProvider {
  public async signToken(
    {},
    secret: string,
    options: ITokenOption,
  ): Promise<string> {
    const token = sign({}, secret as Secret, options);

    return token;
  }

  public verifyToken(token: string, secret: string): ITokenPayload {
    const decodedToken = verify(token, secret);

    return decodedToken as ITokenPayload;
  }
}

export default TokenProvider;
