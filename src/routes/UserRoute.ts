import { Router } from "express";
import { UserController } from "../controllers/UserController";



export const userRoutes = (userController: UserController) => {
    const router =  Router()

    router.get("/users", userController.findAll.bind(userController))
    router.post("/users", userController.createUser.bind(userController))
    router.get("/users/:id", userController.findById.bind(userController))
    router.put("/users/:id", userController.updateUser.bind(userController))
    router.delete("/users/:id", userController.deleteUser.bind(userController))


    return router;
}

