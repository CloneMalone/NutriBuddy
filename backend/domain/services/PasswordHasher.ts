
// This interface defines the contract for verifying passwords
// Any class that implements this interface handles password verification
export interface PasswordHasher {
  // Compare a plain text password with a hashed password to see if they match
  // Returns true if they match, false otherwise
  matches(plain: string, hash: string): Promise<boolean>;
}
