export interface PasswordHasher {
  matches(plain: string, hash: string): Promise<boolean>;
}
