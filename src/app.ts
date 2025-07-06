import express from "express"
import container from "./config/dependencyContainer"
import { userRoutes } from "./routes/UserRoute"
import { categoryRoutes } from "./routes/CategoryRoute"
import { productRoutes } from "./routes/ProductRoute"
import { authRoutes } from "./routes/AuthRoutes"
import cors from "cors"
import { table } from "console"
import { tableRoutes } from "./routes/TableRoutes"
import { orderRoutes } from "./routes/OrderRoutes"

const app = express()

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

const userController = container.getUserController()
const categoryController = container.getCategoryController()
const productContorller =  container.getProductController()
const authController = container.getAuthController()
const tableController = container.getTableController()
const orderController = container.getOrderController()

app.use(express.json())

app.use(orderRoutes(orderController))
app.use(userRoutes(userController))
app.use(categoryRoutes(categoryController))
app.use(productRoutes(productContorller))
app.use(authRoutes(authController))
app.use(tableRoutes(tableController))

export default app