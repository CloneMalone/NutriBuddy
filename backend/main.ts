// This is the entry point of our backend application. It sets up the Express server, 
// initializes the database, and wires together all the components of our application. 
// This is where we create instances of our repositories, services, use cases, and 
// controllers, and connect them to the HTTP routes.

import express from "express";
import cors from "cors";
import { sqliteConnection } from "./infrastructure/database/sqliteConnection";
import { initializeDatabase } from "./infrastructure/database/initializeDatabase";
import { SQLiteUserRepository } from "./infrastructure/repositories/SQLiteUserRepository";
import { BcryptPasswordHasher } from "./infrastructure/auth/BcryptPasswordHasher";
import { RegisterUser } from "./application/useCases/RegisterUser";
import { LoginUser } from "./application/useCases/LoginUser";
import { AuthController } from "./interfaces/http/controllers/AuthController";
import { createAuthRoutes } from "./interfaces/http/routes";
import { SESSION_COOKIE_NAME, sessionCookieOptions } from "./infrastructure/auth/cookieConfig";
import { SQLiteSessionRepository } from "./infrastructure/repositories/SQLiteSessionRepository";
import { createSessionMiddleware } from "./infrastructure/auth/sessionMiddleware";
import { SQLiteNutritionLogRepository } from "./infrastructure/repositories/SQLiteNutritionLogRepository";
import { AddNutritionLog } from "./application/useCases/AddNutritionLog";
import { GetNutritionLogsByDate } from "./application/useCases/GetNutritionLogsByDate";
import { NutritionController } from "./interfaces/http/controllers/NutritionController";
import { createNutritionRoutes } from "./interfaces/http/routes";

async function bootstrap() {
    await initializeDatabase(sqliteConnection);

    const userRepository = new SQLiteUserRepository(sqliteConnection);
    const sessionRepository = new SQLiteSessionRepository(sqliteConnection);
    const passwordHasher = new BcryptPasswordHasher();

    const nutritionLogRepository = new SQLiteNutritionLogRepository(sqliteConnection);

    const registerUser = new RegisterUser(userRepository, passwordHasher);
    const loginUser = new LoginUser(userRepository, passwordHasher);

    const authController = new AuthController(
        registerUser,
        loginUser,
        sessionRepository,
        SESSION_COOKIE_NAME,
        sessionCookieOptions
    );

    const addNutritionLog = new AddNutritionLog(nutritionLogRepository);
    const getNutritionLogsByDate = new GetNutritionLogsByDate(nutritionLogRepository);
    const nutritionController = new NutritionController(addNutritionLog, getNutritionLogsByDate);

    const app = express();

    // CORS configuration to allow requests from the frontend
    app.use(
        cors({
            origin: "http://localhost:3000",
            credentials: true
        })
    );

    app.use(express.json());

    // Session middleware attaches `req.userId` when a valid session cookie is present
    app.use(createSessionMiddleware(sessionRepository));

    // Set up routes
    app.use("/api/users", createAuthRoutes(authController));
    app.use("/api/nutrition", createNutritionRoutes(nutritionController));

    const PORT = 5000;

    app.listen(PORT, () => {
        console.log(`🚀 NutriBuddy Backend Server listening on http://localhost:${PORT}`);
    });
}

bootstrap();
