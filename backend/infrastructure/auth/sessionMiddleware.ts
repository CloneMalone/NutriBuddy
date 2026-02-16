/**
 * Session Middleware - Validates session cookies on every request.
 * 
 * This middleware runs BEFORE your route handlers. It:
 * 1. Reads the session cookie from the request
 * 2. Looks up the session in the database
 * 3. If valid, attaches the userId to the request object
 * 
 * After this middleware runs, controllers can check req.userId to see
 * if the user is logged in.
 */

// Import Express types for middleware
import { RequestHandler } from "express";

// Import repository interface for session lookups
import { SessionRepository } from "../../domain/repositories/SessionRepository";

// Import cookie configuration
import { SESSION_COOKIE_NAME, sessionCookieOptions } from "./cookieConfig";

/**
 * Parse the Cookie header string into a key-value object.
 * 
 * Example: "nb_session=abc123; other=value" becomes { nb_session: "abc123", other: "value" }
 */
function parseCookies(cookieHeader?: string): Record<string, string> {
	const result: Record<string, string> = {};
	
	// Return empty object if no cookies
	if (!cookieHeader) return result;
	
	// Split by semicolon to get individual cookies
	const parts = cookieHeader.split(";");
	
	// Parse each cookie into key=value pairs
	for (const part of parts) {
		const [k, v] = part.split("=");
		if (!k || !v) continue;
		// Trim whitespace and decode URL-encoded values
		result[k.trim()] = decodeURIComponent(v.trim());
	}
	
	return result;
}

/**
 * Create the session middleware with the given session repository.
 * 
 * @param sessionRepository - Repository for looking up sessions
 * @returns Express middleware function
 */
export function createSessionMiddleware(sessionRepository: SessionRepository): RequestHandler {
	return async (req, res, next) => {
		try {
			// Step 1: Parse cookies from the request header
			const cookies = parseCookies(req.headers.cookie);
			
			// Step 2: Look for our session cookie
			const sessionId = cookies[SESSION_COOKIE_NAME];

			// If no session cookie, user is not logged in - continue to route
			if (!sessionId) {
				return next();
			}

			// Step 3: Look up the session in the database
			const session = await sessionRepository.findById(sessionId);

			// If session not found, clear the invalid cookie
			if (!session) {
				res.clearCookie?.(SESSION_COOKIE_NAME, sessionCookieOptions as any);
				return next();
			}

			// Step 4: Check if session has expired
			if (session.expiresAt < new Date()) {
				// Delete expired session and clear cookie
				await sessionRepository.delete(sessionId);
				res.clearCookie?.(SESSION_COOKIE_NAME, sessionCookieOptions as any);
				return next();
			}

			// Step 5: Session is valid! Attach userId to request
			// Controllers can now access req.userId to identify the logged-in user
			(req as any).userId = session.userId;

			return next();
		} catch (err) {
			// Log errors but don't crash - just continue without authentication
			console.error("Session middleware error:", err);
			return next();
		}
	};
}
