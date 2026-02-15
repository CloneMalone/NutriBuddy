// Cookie configuration for session cookies
export const SESSION_COOKIE_NAME = "nb_session";

export const sessionCookieOptions = {
	httpOnly: true,
	// Set `secure: true` in production when using HTTPS
	secure: false,
	sameSite: "lax" as const,
	// 1 day in milliseconds
	maxAge: 24 * 60 * 60 * 1000
};
