export interface IHashProvider {
  generateHash(toHash: string): Promise<string>;
  compare(hash: string, hashed: string): Promise<boolean>;
}
