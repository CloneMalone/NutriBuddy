// This file defines the AuthController class, which handles HTTP requests 
// related to user authentication. 

import { Request, Response } from "express";
import { RegisterUser } from "../../../application/useCases/RegisterUser";
import { LoginUser } from "../../../application/useCases/LoginUser";
import { randomUUID } from "crypto";
import { DomainError } from "../../../domain/DomainError";

export class AuthController {
    constructor(
        private readonly registerUser: RegisterUser,
        private readonly loginUser: LoginUser
    ) {}

    register = async (req: Request, res: Response) => {
        try {
            const { firstName, lastName, email, password, calorieBudget } = req.body;

            await this.registerUser.execute({
                id: randomUUID(),
                firstName,
                lastName,
                email,
                password,
                calorieBudget
            });

            return res.status(201).json({ message: "User registered successfully" });
        } catch (error) {
            if (error instanceof DomainError) {
                return res.status(400).json({ error: error.message });
            }

            console.error(error);
            return res.status(500).json({ error: "Internal server error" });
        }
    };

    login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;

            const user = await this.loginUser.execute({ email, password });

            return res.status(200).json({
                message: "Login successful",
                userId: user.id
            });
        } catch (error) {
            if (error instanceof DomainError) {
                return res.status(401).json({ error: error.message });
            }

            console.error(error);
            return res.status(500).json({ error: "Internal server error" });
        }
    };
}
