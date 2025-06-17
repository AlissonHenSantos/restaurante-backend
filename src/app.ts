import express from "express"
import container from "./config/dependencyContainer"
import { userRoutes } from "./routes/UserRoute"
import { categoryRoutes } from "./routes/CategoryRoute"
import { productRoutes } from "./routes/ProductRoute"

const app = express()

const controller = container.getUserController()
const categoryController = container.getCategoryController()
const productContorller =  container.getProductController()

app.use(express.json())

app.use(userRoutes(controller))
app.use(categoryRoutes(categoryController))
app.use(productRoutes(productContorller))

export default app