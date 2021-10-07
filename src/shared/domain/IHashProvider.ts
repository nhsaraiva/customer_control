export interface IHashProvider {
  generateHash(toHash: string): Promise<string>;
  compareHash(noHash: string, hashed: string): Promise<boolean>;
}
