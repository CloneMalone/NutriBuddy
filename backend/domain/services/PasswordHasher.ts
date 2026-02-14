export interface PasswordHasher {
  hash(plain: string): Promise<string>;
  matches(plain: string, hash: string): Promise<boolean>;
}
