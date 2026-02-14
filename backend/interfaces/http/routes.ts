// This file defines the routes for our HTTP API, and maps them to the 
// appropriate controller methods. This is where we set up the endpoints that our 
// frontend will call to interact with our backend.

import { Router } from "express";
import { AuthController } from "./controllers/AuthController";

export function createRoutes(authController: AuthController): Router {
    const router = Router();

    router.post("/register", authController.register);
    router.post("/login", authController.login);

    return router;
}
