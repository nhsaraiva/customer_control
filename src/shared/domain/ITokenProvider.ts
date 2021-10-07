import { ITokenOption } from './ITokenOption';
import { ITokenPayload } from './ITokenPayload';

export interface ITokenProvider {
  sign({}, secret: string, options: ITokenOption): Promise<string>;
  verify(token: string, secret: string): ITokenPayload;
}
