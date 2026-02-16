/**
 * PasswordHasher Interface - Defines how we securely hash and verify passwords.
 * 
 * We NEVER store plain text passwords. Instead, we hash them using a one-way
 * algorithm. This interface abstracts away the specific hashing library (bcrypt)
 * so our use cases don't depend on any particular implementation.
 * 
 * If we wanted to switch from bcrypt to Argon2 (another hashing algorithm),
 * we'd just create a new implementation - no use case changes needed.
 */
export interface PasswordHasher {
  // Convert a plain text password into a secure hash (one-way, cannot be reversed)
  hash(plain: string): Promise<string>;
  
  // Check if a plain text password matches a previously stored hash
  // Used during login to verify the user entered the correct password
  matches(plain: string, hash: string): Promise<boolean>;
}
