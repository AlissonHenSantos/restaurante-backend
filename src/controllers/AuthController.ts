import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";

export class AuthController {
    constructor(private authService: AuthService) {}

    public async login(req: Request, res: Response): Promise<Response> {
        try {
            const { email, password } = req.body;
            const token = await this.authService.login(email, password);
            return res.status(200).json({ token });
        } catch (error) {
            return res.status(500).json(error instanceof Error ? error.message : "Internal Server Error");
        }
    }
}