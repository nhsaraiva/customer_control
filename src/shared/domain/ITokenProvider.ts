import { ITokenOption } from './ITokenOption';
import { ITokenPayload } from './ITokenPayload';

export interface ITokenProvider {
  signToken({}, secret: string, options: ITokenOption): Promise<string>;
  verifyToken(token: string, secret: string): ITokenPayload;
}
