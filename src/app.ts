import express from "express"
import {userRoutes} from "./routes/UserRoute"
import { UserController } from "./controllers/UserController"
import { UserRepositoryImpl } from "./repository/respositoryImpl/UserRepositoryImpl"
import { PrismaClient } from "../generated/prisma"
import { UserService } from "./services/UserService"
import { CategoryController } from "./controllers/CategoryController"
import { CategoryService } from "./services/CategoryService"
import { CategoryRepositoryImpl } from "./repository/respositoryImpl/CategoryRepositoryImpl"
import { categoryRoutes } from "./routes/CategoryRoute"


const app = express()

const userController = new UserController(new UserService(new UserRepositoryImpl(new PrismaClient())))
const categoryController = new CategoryController(new CategoryService(new CategoryRepositoryImpl(new PrismaClient())))

app.use(express.json())

app.use(userRoutes(userController))
app.use(categoryRoutes(categoryController))

export default app