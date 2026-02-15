import { RequestHandler } from "express";
import { SessionRepository } from "../../domain/repositories/SessionRepository";
import { SESSION_COOKIE_NAME, sessionCookieOptions } from "./cookieConfig";

function parseCookies(cookieHeader?: string): Record<string, string> {
	const result: Record<string, string> = {};
	if (!cookieHeader) return result;
	const parts = cookieHeader.split(";");
	for (const part of parts) {
		const [k, v] = part.split("=");
		if (!k || !v) continue;
		result[k.trim()] = decodeURIComponent(v.trim());
	}
	return result;
}

export function createSessionMiddleware(sessionRepository: SessionRepository): RequestHandler {
	return async (req, res, next) => {
		try {
			const cookies = parseCookies(req.headers.cookie);
			const sessionId = cookies[SESSION_COOKIE_NAME];

			if (!sessionId) {
				return next();
			}

			const session = await sessionRepository.findById(sessionId);

			if (!session) {
				res.clearCookie?.(SESSION_COOKIE_NAME, sessionCookieOptions as any);
				return next();
			}

			if (session.expiresAt < new Date()) {
				await sessionRepository.delete(sessionId);
				res.clearCookie?.(SESSION_COOKIE_NAME, sessionCookieOptions as any);
				return next();
			}

			// Attach authenticated user id to request for use in controllers
			(req as any).userId = session.userId;

			return next();
		} catch (err) {
			console.error("Session middleware error:", err);
			return next();
		}
	};
}
