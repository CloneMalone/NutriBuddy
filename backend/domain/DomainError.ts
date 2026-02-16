/**
 * DomainError is a custom error class for business logic violations.
 * 
 * When something goes wrong with domain rules (like an invalid email format,
 * or a user trying to register with an existing email), we throw this error.
 * Controllers can catch this error type specifically and return a 400 Bad Request.
 */
export class DomainError extends Error {
  constructor(message: string) {
    // Call the parent Error class constructor with the error message
    super(message);
    
    // Set a custom name so we can identify this error type when catching it
    this.name = "DomainError";
  }
}
