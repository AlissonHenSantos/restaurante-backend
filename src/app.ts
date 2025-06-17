import express from "express"
import container from "./config/dependencyContainer"
import {userRoutes} from "./routes/UserRoute"
import { categoryRoutes } from "./routes/CategoryRoute"

const app = express()

const controller = container.getUserController()
const categoryController = container.getCategoryController()

app.use(express.json())

app.use(userRoutes(controller))
app.use(categoryRoutes(categoryController))

export default app