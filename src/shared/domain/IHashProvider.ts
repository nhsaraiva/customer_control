export interface IHashProvider {
  generateHash(toHash: string): Promise<string>;
  compare(noHash: string, hashed: string): Promise<boolean>;
}
