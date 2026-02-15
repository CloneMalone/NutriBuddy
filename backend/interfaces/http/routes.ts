// This file defines the routes for our HTTP API, and maps them to the 
// appropriate controller methods. This is where we set up the endpoints that our 
// frontend will call to interact with our backend.

import { Router } from "express";
import { AuthController } from "./controllers/AuthController";
import { NutritionController } from "./controllers/NutritionController";

export function createAuthRoutes(authController: AuthController): Router {
    const router = Router();

    router.post("/register", authController.register);
    router.post("/login", authController.login);

    return router;
}

export function createNutritionRoutes(nutritionController: NutritionController): Router {
    const router = Router();

    router.post("/", nutritionController.createLog);
    router.get("/", nutritionController.getLogsByDate);

    return router;
}
