import { IHashProvider } from '../../domain/IHashProvider';

class FakeHashProvider implements IHashProvider {
  public async generateHash(toHash: string): Promise<string> {
    return toHash;
  }

  public async compare(noHash: string, hashed: string): Promise<boolean> {
    return noHash === hashed;
  }
}

export default FakeHashProvider;
