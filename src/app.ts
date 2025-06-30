import express from "express"
import container from "./config/dependencyContainer"
import { userRoutes } from "./routes/UserRoute"
import { categoryRoutes } from "./routes/CategoryRoute"
import { productRoutes } from "./routes/ProductRoute"
import { authRoutes } from "./routes/AuthRoutes"
const app = express()

const userController = container.getUserController()
const categoryController = container.getCategoryController()
const productContorller =  container.getProductController()

app.use(express.json())

app.use(userRoutes(userController))
app.use(categoryRoutes(categoryController))
app.use(productRoutes(productContorller))
app.use(authRoutes(container.getAuthController()))

export default app