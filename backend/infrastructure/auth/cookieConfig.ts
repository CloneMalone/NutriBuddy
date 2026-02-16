/**
 * Cookie Configuration - Settings for the session cookie.
 * 
 * When a user logs in, we create a session and store the session ID
 * in a cookie. These options control how that cookie behaves.
 */

// Name of the cookie that stores the session ID
export const SESSION_COOKIE_NAME = "nb_session";

// Options passed to res.cookie() when setting the session cookie
export const sessionCookieOptions = {
	// httpOnly: JavaScript on the page cannot read this cookie
	// This helps prevent XSS (Cross-Site Scripting) attacks
	httpOnly: true,
	
	// secure: Only send cookie over HTTPS (set to true in production!)
	// We use false for local development since localhost uses HTTP
	secure: false,
	
	// sameSite: Cookie is sent with top-level navigations and GET requests from same site
	// "lax" provides reasonable protection against CSRF attacks while allowing normal use
	sameSite: "lax" as const,
	
	// maxAge: How long the cookie lasts (in milliseconds)
	// 24 * 60 * 60 * 1000 = 86,400,000 ms = 1 day
	maxAge: 24 * 60 * 60 * 1000
};
