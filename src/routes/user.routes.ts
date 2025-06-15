import { Router } from "express";
import { createUser, deleteUser, getUserById, getUsers, updateUser } from "../controllers/user.controller";

const userRoutes = Router()

userRoutes.get("/users", getUsers)
userRoutes.post("/users", createUser)
userRoutes.get("/users/:id", getUserById)
userRoutes.put("/users/:id", updateUser)
userRoutes.delete("/users/:id", deleteUser)
export default userRoutes