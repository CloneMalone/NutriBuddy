/**
 * AuthController - Handles HTTP requests for user authentication.
 * 
 * Controllers are in the Interface layer. They:
 * - Receive HTTP requests from Express routes
 * - Extract data from the request body
 * - Call the appropriate use case
 * - Return an HTTP response
 * 
 * Controllers should NOT contain business logic - that belongs in use cases.
 * Controllers only handle HTTP concerns (request/response, status codes, cookies).
 */

// Import Express types for request/response handling
import { Request, Response } from "express";

// Import use cases that this controller will call
import { RegisterUser } from "../../../application/useCases/RegisterUser";
import { LoginUser } from "../../../application/useCases/LoginUser";

// Import crypto for generating UUIDs
import { randomUUID } from "crypto";

// Import DomainError to handle validation failures
import { DomainError } from "../../../domain/DomainError";

// Import session repository for creating login sessions
import { SessionRepository } from "../../../domain/repositories/SessionRepository";

export class AuthController {
    constructor(
        // Use case for registering new users
        private readonly registerUser: RegisterUser,
        
        // Use case for authenticating users
        private readonly loginUser: LoginUser,
        
        // Repository for creating sessions after successful login
        private readonly sessionRepository: SessionRepository,
        
        // Name of the session cookie (e.g., "nb_session")
        private readonly sessionCookieName: string,
        
        // Cookie options (httpOnly, secure, maxAge, etc.)
        private readonly sessionCookieOptions: Record<string, unknown>
    ) {}

    /**
     * Handle POST /api/users/register
     * 
     * Creates a new user account.
     */
    register = async (req: Request, res: Response) => {
        try {
            // Extract registration data from request body
            const { firstName, lastName, email, password, calorieBudget } = req.body;

            // Call the use case with the registration data
            // Use case handles validation and business logic
            await this.registerUser.execute({
                id: randomUUID(),  // Generate unique ID for the new user
                firstName,
                lastName,
                email,
                password,
                calorieBudget
            });

            // Registration successful - return 201 Created
            return res.status(201).json({ message: "User registered successfully" });
        } catch (error) {
            // If it's a business rule violation (DomainError), return 400 Bad Request
            if (error instanceof DomainError) {
                return res.status(400).json({ error: error.message });
            }

            // For unexpected errors, log and return 500 Internal Server Error
            console.error(error);
            return res.status(500).json({ error: "Internal server error" });
        }
    };

    /**
     * Handle POST /api/users/login
     * 
     * Authenticates a user and creates a session.
     */
    login = async (req: Request, res: Response) => {
        try {
            // Extract login credentials from request body
            const { email, password } = req.body;

            // Call the use case to authenticate the user
            // Returns the User entity if credentials are valid
            const user = await this.loginUser.execute({ email, password });

            // Create a new session for the authenticated user
            const sessionId = randomUUID();
            
            // Calculate when the session should expire (based on cookie maxAge)
            const expiresAt = new Date(Date.now() + (this.sessionCookieOptions as any).maxAge);

            // Save the session to the database
            await this.sessionRepository.create(sessionId, user.id, expiresAt);

            // Set the session cookie in the response
            // This cookie will be sent with future requests to identify the user
            res.cookie(this.sessionCookieName, sessionId, this.sessionCookieOptions as any);

            // Login successful - return 200 OK
            return res.status(200).json({ message: "Login successful" });
        } catch (error) {
            // Invalid credentials - return 401 Unauthorized
            if (error instanceof DomainError) {
                return res.status(401).json({ error: error.message });
            }

            // For unexpected errors, log and return 500 Internal Server Error
            console.error(error);
            return res.status(500).json({ error: "Internal server error" });
        }
    };
}
