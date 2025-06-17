import express from "express"
import {userRoutes} from "./routes/UserRoute"
import { UserController } from "./controllers/UserController"
import { UserRepositoryImpl } from "./repository/respositoryImpl/UserRepositoryImpl"
import { PrismaClient } from "../generated/prisma"
import { UserService } from "./services/UserService"


const app = express()

const userController = new UserController(new UserService(new UserRepositoryImpl(new PrismaClient())))

app.use(express.json())

app.use(userRoutes(userController))

export default app