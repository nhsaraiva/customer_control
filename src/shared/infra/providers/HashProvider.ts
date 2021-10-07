import { IHashProvider } from '../../domain/IHashProvider';
import { compare, hash } from 'bcryptjs';

class HashProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}

export default HashProvider;
