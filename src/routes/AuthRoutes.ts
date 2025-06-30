import { Router } from "express";
import { AuthController } from "../controllers/AuthController";


export const authRoutes = (authController: AuthController) => {
    const router = Router();

    router.post("/login", authController.login.bind(authController));

    return router;
};