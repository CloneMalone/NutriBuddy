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
import { createRoutes } from "./interfaces/http/routes";

async function bootstrap() {
    await initializeDatabase(sqliteConnection);

    const userRepository = new SQLiteUserRepository(sqliteConnection);
    const passwordHasher = new BcryptPasswordHasher();

    const registerUser = new RegisterUser(userRepository, passwordHasher);
    const loginUser = new LoginUser(userRepository, passwordHasher);

    const authController = new AuthController(registerUser, loginUser);

    const app = express();
    app.use(cors());
    app.use(express.json());

    app.use("/api/users", createRoutes(authController));

    const PORT = 5000;

    app.listen(PORT, () => {
        console.log(`🚀 NutriBuddy Backend Server listening on http://localhost:${PORT}`);
    });
}

bootstrap();
