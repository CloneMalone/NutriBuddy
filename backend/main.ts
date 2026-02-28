/**
 * main.ts - Application Entry Point (Composition Root)
 * 
 * This file bootstraps the entire backend application. It's called the "Composition Root"
 * because this is where we compose (wire together) all the pieces of our application.
 * 
 * This is the ONLY place in the codebase that knows about all concrete implementations.
 * Every other file works with interfaces/abstractions.
 * 
 * The bootstrap process:
 * 1. Initialize the database (create tables if needed)
 * 2. Create infrastructure implementations (repositories, services)
 * 3. Create use cases with injected dependencies
 * 4. Create controllers with injected use cases
 * 5. Configure Express middleware and routes
 * 6. Start the HTTP server
 */

// ============================================================================
// IMPORTS - External Libraries
// ============================================================================
import express from "express";
import cors from "cors";

// ============================================================================
// IMPORTS - Infrastructure Layer (Concrete Implementations)
// ============================================================================

// Database connection and initialization
import { sqliteConnection } from "./infrastructure/database/sqliteConnection";
import { initializeDatabase } from "./infrastructure/database/initializeDatabase";

// Repository implementations (how we store data)
import { SQLiteUserRepository } from "./infrastructure/repositories/SQLiteUserRepository";
import { SQLiteSessionRepository } from "./infrastructure/repositories/SQLiteSessionRepository";
import { SQLiteNutritionLogRepository } from "./infrastructure/repositories/SQLiteNutritionLogRepository";

// Authentication infrastructure
import { BcryptPasswordHasher } from "./infrastructure/auth/BcryptPasswordHasher";
import { SESSION_COOKIE_NAME, sessionCookieOptions } from "./infrastructure/auth/cookieConfig";
import { createSessionMiddleware } from "./infrastructure/auth/sessionMiddleware";

// ============================================================================
// IMPORTS - Application Layer (Use Cases)
// ============================================================================
import { RegisterUser } from "./application/useCases/RegisterUser";
import { LoginUser } from "./application/useCases/LoginUser";
import { AddNutritionLog } from "./application/useCases/AddNutritionLog";
import { GetNutritionLogsByDate } from "./application/useCases/GetNutritionLogsByDate";
import { GetUserProfile } from "./application/useCases/GetUserProfile";
import { CheckSession } from "./application/useCases/CheckSession";
import { GetNutritionLogById } from "./application/useCases/GetNutritionLogById";
import { UpdateNutritionLog } from "./application/useCases/UpdateNutritionLog";

// ============================================================================
// IMPORTS - Interface Layer (Controllers & Routes)
// ============================================================================
import { AuthController } from "./interfaces/http/controllers/AuthController";
import { NutritionController } from "./interfaces/http/controllers/NutritionController";
import { createAuthRoutes, createNutritionRoutes } from "./interfaces/http/routes";

// ============================================================================
// BOOTSTRAP FUNCTION - Wires everything together
// ============================================================================
async function bootstrap() {
    // ------------------------------------------------------------------------
    // Step 1: Initialize the Database
    // ------------------------------------------------------------------------
    // Creates tables if they don't exist (users, sessions, nutrition_logs)
    await initializeDatabase(sqliteConnection);

    // ------------------------------------------------------------------------
    // Step 2: Create Infrastructure Layer (Concrete Implementations)
    // ------------------------------------------------------------------------
    
    // Create repositories - these implement domain interfaces using SQLite
    const userRepository = new SQLiteUserRepository(sqliteConnection);
    const sessionRepository = new SQLiteSessionRepository(sqliteConnection);
    const nutritionLogRepository = new SQLiteNutritionLogRepository(sqliteConnection);

    // Create services - the password hasher uses bcrypt
    const passwordHasher = new BcryptPasswordHasher();

    // ------------------------------------------------------------------------
    // Step 3: Create Application Layer (Use Cases)
    // ------------------------------------------------------------------------
    // Use cases receive their dependencies through constructor injection
    // They receive interfaces, not concrete implementations!
    
    const registerUser = new RegisterUser(userRepository, passwordHasher);
    const loginUser = new LoginUser(userRepository, passwordHasher);
    const getUserProfile = new GetUserProfile(userRepository);
    const checkSession = new CheckSession(userRepository);
    const addNutritionLog = new AddNutritionLog(nutritionLogRepository);
    const getNutritionLogsByDate = new GetNutritionLogsByDate(nutritionLogRepository);
    const getNutritionLogById = new GetNutritionLogById(nutritionLogRepository);
    const updateNutritionLog = new UpdateNutritionLog(nutritionLogRepository);

    // ------------------------------------------------------------------------
    // Step 4: Create Interface Layer (Controllers)
    // ------------------------------------------------------------------------
    // Controllers receive use cases through constructor injection
    
    const authController = new AuthController(
        registerUser,
        loginUser,
        getUserProfile,
        checkSession,
        sessionRepository,
        SESSION_COOKIE_NAME,
        sessionCookieOptions
    );

    const nutritionController = new NutritionController(
        addNutritionLog, 
        getNutritionLogsByDate,
        getNutritionLogById,
        updateNutritionLog
    );

    // ------------------------------------------------------------------------
    // Step 5: Configure Express Application
    // ------------------------------------------------------------------------
    const app = express();

    // CORS middleware - allows frontend (localhost:5173) to make requests
    // credentials: true allows cookies to be sent cross-origin
    app.use(
        cors({
            origin: "http://localhost:5173",
            credentials: true
        })
    );

    // JSON body parser - converts request body to JavaScript object
    app.use(express.json());

    // Session middleware - validates cookies and sets req.userId for authenticated users
    app.use(createSessionMiddleware(sessionRepository));

    // ------------------------------------------------------------------------
    // Step 6: Register Routes
    // ------------------------------------------------------------------------
    // Mount route groups at their base paths
    app.use("/api/users", createAuthRoutes(authController));
    app.use("/api/nutrition", createNutritionRoutes(nutritionController));

    // ------------------------------------------------------------------------
    // Step 7: Start the Server
    // ------------------------------------------------------------------------
    const PORT = 5000;

    app.listen(PORT, () => {
        console.log(`🚀 NutriBuddy Backend Server listening on http://localhost:${PORT}`);
    });
}

// Run the bootstrap function to start the application
bootstrap();
