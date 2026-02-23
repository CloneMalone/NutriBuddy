/**
 * Routes Configuration - Maps HTTP endpoints to controller methods.
 * 
 * This file sets up the API routes for our application.
 * Each route group is created by a factory function that receives
 * the appropriate controller.
 * 
 * API Endpoints:
 * - POST /api/users/register - Create a new user account
 * - POST /api/users/login    - Authenticate and get a session
 * - POST /api/users/logout   - Destroy session and clear cookie
 * - POST /api/nutrition      - Add a nutrition log entry (requires auth)
 * - GET  /api/nutrition      - Get logs for a date (requires auth)
 */

// Import Express Router for route grouping
import { Router } from "express";

// Import controllers that will handle requests
import { AuthController } from "./controllers/AuthController";
import { NutritionController } from "./controllers/NutritionController";

/**
 * Create authentication routes.
 * 
 * @param authController - Controller with register and login methods
 * @returns Express Router configured with auth endpoints
 */
export function createAuthRoutes(authController: AuthController): Router {
    const router = Router();

    // POST /api/users/register - Create new user
    router.post("/register", authController.register);
    
    // POST /api/users/login - Authenticate user
    router.post("/login", authController.login);

    // POST /api/users/logout - Destroy session and clear cookie
    router.post("/logout", authController.logout);

    // GET /api/users/me - Get authenticated user's profile
    router.get("/me", authController.getProfile);

    return router;
}

/**
 * Create nutrition tracking routes.
 * 
 * @param nutritionController - Controller with createLog and getLogsByDate methods
 * @returns Express Router configured with nutrition endpoints
 */
export function createNutritionRoutes(nutritionController: NutritionController): Router {
    const router = Router();

    // POST /api/nutrition - Create new log entry
    router.post("/", nutritionController.createLog);
    
    // GET /api/nutrition - Get logs for a date
    router.get("/", nutritionController.getLogsByDate);

    return router;
}
