import { ITokenOption } from './ITokenOption';

export interface ITokenProvider {
  sign({}, secret: string, options: ITokenOption): Promise<string>;
}
