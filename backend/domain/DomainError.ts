// Custom error class for business logic errors within the domain layer
export class DomainError extends Error {
  // Constructor takes an error message and creates a DomainError with it
  constructor(message: string) {
    super(message); // Pass message to the parent Error class
    this.name = "DomainError"; // Set the error type name for easy identification
  }
}
